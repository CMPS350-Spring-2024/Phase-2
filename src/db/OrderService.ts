import { Order, PrismaClient } from '@prisma/client';
import path from 'path';
const prisma = new PrismaClient();

type IGetMany = () => Promise<Array<Order> | null | undefined>;
type IGetUnique = (id: number) => Promise<Order | null | undefined>;
type IGetCount = (options: {
	quantity?: number;
	subtotal?: number;
	shippingFee?: number;
	total?: number;
	dateTime?: Date;
	estimatedArrival?: Date;
}) => Promise<number>;

class ProductService {
	_defaultDataPath = path.join(process.cwd(), 'src/data/default_orders.json');

	getMany: IGetMany = async () => prisma.order.findMany();
	getUnique: IGetUnique = async (id) => prisma.order.findUnique({ where: { id } });
	getCount: IGetCount = async (options) =>
		prisma.order.count({
			where: {
				AND: [
					{ quantity: options.quantity },
					{ subtotal: options.subtotal },
					{ shippingFee: options.shippingFee },
					{ total: options.total },
					{ dateTime: options.dateTime },
					{ estimatedArrival: options.estimatedArrival },
				],
			},
		});
}

export default new ProductService();
