import { ProductCreate } from '@/types/Product';
import { Feature, IncludedItem, Model, PrismaClient, Product, QuantizedIncludedItem, Question, Series } from '@prisma/client';
import fs from 'fs-extra';
import path from 'path';
const prisma = new PrismaClient();

type FullProduct = Product & {
	model: Model;
	series: Series;
	features: Array<Feature>;
	includedItems: Array<QuantizedIncludedItem & { item: IncludedItem }>;
	faqs: Array<Question>;
};

type IGetMany = (options: { seriesName?: string; seriesDescription?: string }) => Promise<Array<FullProduct> | null | undefined>;
type IGetUnique = (id: number) => Promise<FullProduct | null | undefined>;
type IGetCount = (options: { seriesName?: string; seriesDescription?: string }) => Promise<number>;

type IAddOne = (data: ProductCreate, options?: { upsert?: boolean }) => Promise<Product | null | undefined>;

type IUpdateOne = (id: number, data: ProductCreate, options?: { upsert?: boolean }) => Promise<Product | null | undefined>;

type IParse = (data: Record<string, any>) => {
	product: Omit<Product, 'id' | 'modelId' | 'seriesId'>;
	model: Model;
	series: Series;
	features: Array<Feature>;
	includedItems: Array<QuantizedIncludedItem & IncludedItem>;
	faqs: Array<Question>;
};
type ITransform = (data: FullProduct | null | undefined) => Record<string, any>;

class ProductService {
	_defaultDataPath = path.join(process.cwd(), 'src/data/product_list.json');

	getMany: IGetMany = async (options) =>
		prisma.product.findMany({
			where: {
				series: {
					name: options.seriesName,
					description: options.seriesDescription,
				},
			},
			include: {
				model: true,
				series: true,
				features: true,
				includedItems: {
					include: {
						item: true,
					},
				},
				faqs: true,
			},
		});

	getUnique: IGetUnique = async (id) =>
		prisma.product.findUnique({
			where: {
				id: id,
			},
			include: {
				model: true,
				series: true,
				features: true,
				includedItems: {
					include: {
						item: true,
					},
				},
				faqs: true,
			},
		});

	getCount: IGetCount = async (options) =>
		prisma.product.count({
			where: {
				series: {
					name: options.seriesName,
					description: options.seriesDescription,
				},
			},
		});

	addOne: IAddOne = async (data, options) => {
		const { upsert = false } = options || {};
		const { product, model, series, features, includedItems, faqs } = this.parse(data);

		//	Check if there is an existing product with the same name
		const existingProduct = await prisma.product.findFirst({ where: { name: product.name } });

		//	Find or create included items
		const dbIncludedItems = [];
		for (const { quantity, ...item } of includedItems) {
			const existingItem = await prisma.includedItem.findFirst({
				where: { name: item.name, imageUrl: item.imageUrl },
			});
			if (existingItem) {
				dbIncludedItems.push({ data: existingItem, quantity });
				continue;
			}
			dbIncludedItems.push({ data: await prisma.includedItem.create({ data: item }), quantity });
		}

		//	Format the query to create the product
		const query = {
			...product,
			model: { connectOrCreate: { where: { url: model.url }, create: model } },
			series: { connectOrCreate: { where: { name: series.name }, create: series } },
			features: {
				connectOrCreate: features.map((feature) => ({ where: { name: feature.name }, create: feature })),
			},
			includedItems: {
				connectOrCreate: dbIncludedItems.map(({ data, quantity }) => ({
					where: { quantity_itemId: { quantity, itemId: data.id } },
					create: { quantity, itemId: data.id },
				})),
			},
			faqs: {
				connectOrCreate: faqs.map((faq) => ({
					where: { question_answer: { question: faq.question, answer: faq.answer } },
					create: faq,
				})),
			},
		};

		//	If there is an existing product and we are upserting, update it
		if (upsert && existingProduct)
			return await prisma.product.update({
				where: { name: product.name },
				data: query,
			});

		return await prisma.product.create({ data: query });
	};

	addDefaultData = async () => {
		const defaultProducts = await fs.readJson(this._defaultDataPath);
		for (const productJson of defaultProducts) await this.addOne(productJson);
	};

	updateOne: IUpdateOne = async (id, data, options) => {
		const { upsert = false } = options || {};
		const { product, model, series, features, includedItems, faqs } = this.parse(data);

		//	Check if there is an existing product with the same name
		const existingProduct = await prisma.product.findFirst({ where: { id } });

		if (!upsert && !existingProduct) return;

		//	Find or create included items
		const dbIncludedItems = [];
		for (const { quantity, ...item } of includedItems) {
			const existingItem = await prisma.includedItem.findFirst({
				where: { name: item.name, imageUrl: item.imageUrl },
			});
			if (existingItem) {
				dbIncludedItems.push({ data: existingItem, quantity });
				continue;
			}
			dbIncludedItems.push({ data: await prisma.includedItem.create({ data: item }), quantity });
		}

		//	Format the query to create the product
		const query = {
			...product,
			model: { connectOrCreate: { where: { url: model.url }, create: model } },
			series: { connectOrCreate: { where: { name: series.name }, create: series } },
			features: {
				connectOrCreate: features.map((feature) => ({ where: { name: feature.name }, create: feature })),
			},
			includedItems: {
				connectOrCreate: dbIncludedItems.map(({ data, quantity }) => ({
					where: { quantity_itemId: { quantity, itemId: data.id } },
					create: { quantity, itemId: data.id },
				})),
			},
			faqs: {
				connectOrCreate: faqs.map((faq) => ({
					where: { question_answer: { question: faq.question, answer: faq.answer } },
					create: faq,
				})),
			},
		};

		if (existingProduct)
			return await prisma.product.update({
				where: { id },
				data: query,
			});

		return await prisma.product.create({ data: query });
	};

	parse: IParse = ({
		_id,
		model: { position, rotation, cameraPosition, ...model },
		series: { model: seriesModel, ...series },
		features,
		includedItems,
		faqs,
		...data
	}) => ({
		product: {
			...(data as any),
			modelName: seriesModel,
		},
		model: {
			...model,
			positionX: position.x,
			positionY: position.y,
			positionZ: position.z,
			rotationX: rotation.x,
			rotationY: rotation.y,
			rotationZ: rotation.z,
			cameraX: cameraPosition.x,
			cameraY: cameraPosition.y,
			cameraZ: cameraPosition.z,
		},
		series: series,
		features: features,
		includedItems: includedItems,
		faqs: faqs,
	});

	transform: ITransform = (data) => {
		if (!data) return {};
		const {
			id,
			modelId: _,
			seriesId: __,
			modelName: ___,
			model,
			series: { id: ____, ...series },
			features,
			includedItems,
			faqs,
			...product
		} = data;
		return {
			...product,
			_id: id,
			model: {
				url: model.url,
				scale: model.scale,
				position: { x: model.positionX, y: model.positionY, z: model.positionZ },
				rotation: { x: model.rotationX, y: model.rotationY, z: model.rotationZ },
				cameraPosition: { x: model.cameraX, y: model.cameraY, z: model.cameraZ },
			},
			series,
			features: features.map(({ id: _, ...data }) => data),
			includedItems: includedItems.map(({ id: _, itemId: __, item: { id: ___, ...item }, ...feature }) => ({
				...feature,
				...item,
			})),
			faqs: faqs.map(({ id: _, ...data }) => data),
		};
	};

	// Method to calculate the total sales revenue
	calculateTotalSalesRevenue = async (): Promise<number> => {
		try {
			const orders = await prisma.order.findMany();
			const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
			return totalRevenue;
		} catch (error) {
			console.error('Error calculating total sales revenue:', error);
			return 0;
		}
	};

	// Method to calculate the average order value
	calculateAverageOrderValue = async (): Promise<number> => {
		try {
			const orders = await prisma.order.findMany();
			const totalOrderValue = orders.reduce((acc, order) => acc + order.total, 0);
			const averageOrderValue = totalOrderValue / orders.length;
			return averageOrderValue;
		} catch (error) {
			console.error('Error calculating average order value:', error);
			return 0;
		}
	};

	// Method to get the top selling products
	getTopSellingProducts = async (limit: number): Promise<Product[]> => {
		try {
			const topSellingProducts = await prisma.product.findMany({
				orderBy: {
					numberOfSales: 'desc',
				},
				take: limit,
			});
			return topSellingProducts;
		} catch (error) {
			console.error('Error getting top selling products:', error);
			return [];
		}
	};

	calculateTotalUsers = async (): Promise<number> => {
		try {
			const totalUsers = await prisma.user.count();
			return totalUsers;
		} catch (error) {
			console.error('Error calculating total number of users:', error);
			return 0;
		}
	};

	// Method to calculate the average rating of products
	calculateAverageProductRating = async (): Promise<number> => {
		try {
			const products = await prisma.product.findMany();
			const totalRatings = products.reduce((acc, product) => acc + product.rating, 0);
			const averageRating = totalRatings / products.length;
			return averageRating;
		} catch (error) {
			console.error('Error calculating average product rating:', error);
			return 0;
		}
	};

	// Method to get the total number of orders
	getTotalNumberOfOrders = async (): Promise<number> => {
		try {
			const totalOrders = await prisma.order.count();
			return totalOrders;
		} catch (error) {
			console.error('Error getting total number of orders:', error);
			return 0;
		}
	};

	// Method to calculate the total sales revenue within a specific date range
	calculateTotalSalesRevenueByDateRange = async (startDate: Date, endDate: Date): Promise<number> => {
		try {
			const orders = await prisma.order.findMany({
				where: {
					dateTime: {
						gte: startDate,
						lte: endDate,
					},
				},
			});
			const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
			return totalRevenue;
		} catch (error) {
			console.error('Error calculating total sales revenue by date range:', error);
			return 0;
		}
	};
}

export default new ProductService();
