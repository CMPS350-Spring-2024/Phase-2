import { PrismaClient, Series } from '@prisma/client';
import path from 'path';
const prisma = new PrismaClient();

type IGetMany = () => Promise<Array<Series> | null | undefined>;
type IGetManyUnique = () => Promise<Array<Series> | null | undefined>;

class ProductService {
	_defaultDataPath = path.join(process.cwd(), 'src/data/product_list.json');

	getMany: IGetMany = async () => prisma.series.findMany();
	getManyUnique: IGetManyUnique = async () =>
		prisma.series.findMany({
			distinct: ['description'],
		});
}

export default new ProductService();
