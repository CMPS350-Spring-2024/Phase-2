import { Feature, IncludedItem, Model, PrismaClient, Product, QuantizedIncludedItem, Question, Series } from '@prisma/client';
import fs from 'fs-extra';
import path from 'path';
const prisma = new PrismaClient();

class ProductsRepo {
	private _defaultDataPath = path.join(process.cwd(), 'src/data/product_list.json');

	addProductList = async () => {
		try {
			const defaultProducts = await fs.readJson(this._defaultDataPath);

			for (const productJson of defaultProducts) {
				const {
					product: { id: _, seriesId: __, modelId: ___, ...product },
					model,
					series,
					features,
					includedItems,
					faqs,
				} = this.transformJsonToModel(productJson);

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
		} catch (error) {
			console.error('Unable to initialize default products!');
			console.error(error);
		}
	};

	private transformJsonToModel = ({
		_id,
		model: { position, rotation, cameraPosition, ...model },
		series: { model: seriesModel, ...series },
		features,
		includedItems,
		faqs,
		...data
	}: any): {
		product: Product;
		model: Model;
		series: Series;
		features: Array<Feature>;
		includedItems: Array<QuantizedIncludedItem & IncludedItem>;
		faqs: Array<Question>;
	} => {
		return {
			product: {
				...data,
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
		};
	};
}

export default new ProductsRepo();
