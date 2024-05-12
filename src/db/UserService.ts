import { UserCreate } from '@/types/User';
import { PrismaClient, ShippingAddress, User } from '@prisma/client';
import fs from 'fs-extra';
import path from 'path';
const prisma = new PrismaClient();

type IGetMany = () => Promise<Array<User> | null | undefined>;
type IGetUnique = (key: { id?: number; email?: string }) => Promise<User | null | undefined>;
type IGetCount = () => Promise<number>;

type IAddOne = (data: UserCreate, options?: { upsert?: boolean }) => Promise<User | null | undefined>;

type IParse = (data: Record<string, any>) => {
	user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
	shippingAddress: ShippingAddress;
};

class UserService {
	private _defaultDataPath = path.join(process.cwd(), 'src/data/default_admin.json');

	getMany: IGetMany = async () => prisma.user.findMany({ include: { customer: true } });
	getUnique: IGetUnique = async (key) => prisma.user.findUnique({ where: key as any, include: { customer: true } });
	getCount: IGetCount = async () => prisma.user.count();

	addOne: IAddOne = async (data, options) => {
		const { upsert = false } = options || {};
		const { user, shippingAddress } = this.parse(data);
		const isCustomer = user.email !== 'admin@dji.com';

		// Check if there is an existing user with the same email
		const existingUser = await prisma.user.findUnique({ where: { email: user.email } });

		// If the user already exists and upsert is not allowed, throw an error
		if (existingUser && !upsert) {
			throw new Error(`User with email ${user.email} already exists.`);
		}

		const repo = (isCustomer ? prisma.customer : prisma.user) as any;
		const query = {
			...(!isCustomer && user),
			...(isCustomer && {
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
						create: shippingAddress,
					},
				},
				user: {
					connectOrCreate: {
						where: { email: user.email },
						create: user,
					},
				},
			}),
		};

		// If there is an existing user and upsert is allowed, update it
		if (upsert && existingUser) {
			return await repo.update({
				where: { email: user.email },
				data: query,
			});
		}

		// Otherwise, create a new user
		return await repo.create({ data: query });
	};

	addDefaultData = async () => {
		const defaultAdmin = await fs.readJson(this._defaultDataPath);
		return await this.addOne(defaultAdmin);
	};

	parse: IParse = ({ name, shippingAddress, ...data }) => ({
		shippingAddress,
		user: {
			...(data as any),
			type: data.email === 'admin@dji.com' ? 'admin' : 'customer',
			firstName: name.first,
			lastName: name.last,
			balance: Number(data.balance) || 0,
		},
	});
}

export default new UserService();
