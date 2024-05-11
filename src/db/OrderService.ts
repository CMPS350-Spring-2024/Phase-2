import { Order, PrismaClient, ShippingAddress } from '@prisma/client';
import path from 'path';
const prisma = new PrismaClient();

type FullOrder = Order & { shippingAddress: ShippingAddress };

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

type IAddOne = (data: any, options?: { upsert?: boolean }) => Promise<Order | null | undefined>;

type IParse = (data: Record<string, any>) => {
	userId: number;
	productId: number;
	order: Omit<Order, 'id' | 'customerId' | 'productId' | 'shippingAddressId'>;
	shippingAddress: Omit<ShippingAddress, 'id' | 'customerId'>;
};
type ITransform = (data: FullOrder | null | undefined) => Record<string, any>;

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
					{ dateTime: { gte: options.dateTime } },
					{ estimatedArrival: { gte: options.estimatedArrival } },
				],
			},
		});

	getOrderHistory: IGetHistory = async (userId, options) => this.getSaleHistory(userId, options);
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

	addOne: IAddOne = async (data, options) => {
		const { upsert = false } = options || {};
		const { userId, productId, order, shippingAddress } = this.parse(data);

		//	Make sure the user and product exist
		const user = await prisma.user.findUnique({ where: { id: userId } });
		const product = await prisma.product.findUnique({ where: { id: productId } });
		if (!user || !product) return null;

		//	Check if there is an existing order
		const existingOrder = await prisma.order.findUnique({
			where: {
				customerId_productId_quantity_dateTime: {
					customerId: userId,
					productId: productId,
					quantity: order.quantity,
					dateTime: order.dateTime,
				},
			},
		});

		//	Format the query to create the order
		const query = {
			...order,
			customer: { connect: { id: userId } },
			product: { connect: { id: productId } },
			shippingAddress: {
				connectOrCreate: {
					where: {
						label_street_city_country: {
							label: shippingAddress.label,
							street: shippingAddress.street,
							city: shippingAddress.city,
							country: shippingAddress.country,
						},
					},
					create: {
						...shippingAddress,
						customer: { connect: { id: userId } },
					},
				},
			},
		};

		//	If there is an existing order and we are upserting, update it
		if (upsert && existingOrder)
			return await prisma.order.update({
				where: { id: existingOrder.id },
				data: query,
			});

		return await prisma.order.create({ data: query });
	};

	parse: IParse = ({
		_id,
		quantity,
		subtotal,
		shippingFee,
		total,
		dateTime,
		estimatedArrival,
		userId,
		productId,
		shippingAddress,
		...data
	}) => ({
		userId: Number(userId),
		productId: Number(productId),
		order: {
			...data,
			quantity: Number(quantity),
			subtotal: Number(subtotal),
			shippingFee: Number(shippingFee),
			total: Number(total),
			dateTime: new Date(Number(dateTime)),
			estimatedArrival: new Date(Number(estimatedArrival)),
		},
		shippingAddress: {
			label: shippingAddress.label,
			url: shippingAddress.url,
			street: shippingAddress.street,
			city: shippingAddress.city,
			country: shippingAddress.country,
		},
	});

	transform: ITransform = (data) => {
		if (!data) return {};
		const { id, customerId, dateTime, estimatedArrival, shippingAddress, ...order } = data;
		return {
			...order,
			_id: id,
			userId: customerId,
			dateTime: dateTime.getTime(),
			estimatedArrival: estimatedArrival.getTime(),
			shippingAddress: {
				label: shippingAddress.label,
				url: shippingAddress.url,
				street: shippingAddress.street,
				city: shippingAddress.city,
				country: shippingAddress.country,
			},
		};
	};
}

export default new ProductService();
