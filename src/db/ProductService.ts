import { Feature, IncludedItem, Model, PrismaClient, Product, QuantizedIncludedItem, Question, Series } from '@prisma/client';
import fs from 'fs-extra';
import path from 'path';
const prisma = new PrismaClient();

type IGetMany = (options: { seriesName?: string; seriesDescription?: string }) => Promise<Array<Product> | null | undefined>;
type IGetUnique = (options: { id?: number }) => Promise<Product | null | undefined>;
type IGetCount = () => Promise<number>;

type IParseJson = (data: Record<string, any>) => {
	product: Product;
	model: Model;
	series: Series;
	features: Array<Feature>;
	includedItems: Array<QuantizedIncludedItem & IncludedItem>;
	faqs: Array<Question>;
};

class ProductService {
	_defaultDataPath = path.join(process.cwd(), 'src/data/product_list.json');

	getMany: IGetMany = async (options) =>
		prisma.product.findMany({
			where: {
				series: {
					is: {
						name: options.seriesName,
						description: options.seriesDescription,
					},
				},
			},
			include: {
				model: true,
				series: true,
				features: true,
				includedItems: true,
				faqs: true,
			},
		});

	getUnique: IGetUnique = async (options) =>
		prisma.product.findUnique({
			where: {
				id: options.id,
			},
			include: {
				model: true,
				series: true,
				features: true,
				includedItems: true,
				faqs: true,
			},
		});

	getCount: IGetCount = async () => await prisma.product.count();

	addDefaultData = async () => {
		const defaultProducts = await fs.readJson(this._defaultDataPath);

		for (const productJson of defaultProducts) {
			const {
				product: { id: _, seriesId: __, modelId: ___, ...product },
				model,
				series,
				features,
				includedItems,
				faqs,
			} = this.parseJson(productJson);

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

			//	Check if there is an existing product with the same name
			const existingProduct = await prisma.product.findFirst({ where: { name: product.name } });

			//	If there is an existing product, update it
			if (existingProduct) {
				await prisma.product.update({
					where: { name: product.name },
					data: query,
				});
				return;
			}

			await prisma.product.create({ data: query });
		}
	};

	private parseJson: IParseJson = ({
		_id,
		model: { position, rotation, cameraPosition, ...model },
		series: { model: seriesModel, ...series },
		features,
		includedItems,
		faqs,
		...data
	}) => ({
		product: {
			...data,
			modelName: seriesModel,
		} as any,
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
