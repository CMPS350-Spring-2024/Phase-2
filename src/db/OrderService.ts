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
type IGetHistory = (
	id: number,
	options?: { sorted?: boolean; ongoing?: boolean; past?: boolean },
) => Promise<Array<Order> | null | undefined>;

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

	getSaleHistory: IGetHistory = async (droneId, options) =>
		prisma.order.findMany({
			where: {
				productId: droneId,
				estimatedArrival:
					options?.ongoing ? { gte: new Date() }
					: options?.past ? { lt: new Date() }
					: undefined,
			},
			orderBy: options?.sorted ? { dateTime: 'desc' } : undefined,
		});

	getOrderHistory: IGetHistory = async (userId, options) => this.getSaleHistory(userId, options);
}

export default new ProductService();
