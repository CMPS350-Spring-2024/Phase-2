import { PrismaClient, User } from '@prisma/client';
import fs from 'fs-extra';
import path from 'path';
const prisma = new PrismaClient();

type IGetMany = () => Promise<Array<User> | null | undefined>;
type IGetUnique = (id: number) => Promise<User | null | undefined>;
type IGetCount = () => Promise<number>;

type IParse = (data: Record<string, any>) => User;

class UserService {
	private _defaultDataPath = path.join(process.cwd(), 'src/data/default_admin.json');

	getMany: IGetMany = async () => prisma.user.findMany({ include: { customer: true } });
	getUnique: IGetUnique = async (id) => prisma.user.findUnique({ where: { id }, include: { customer: true } });
	getCount: IGetCount = async () => prisma.user.count();

	addDefaultData = async () => {
		const defaultAdmin = await fs.readJson(this._defaultDataPath);
		const createAdmin = this.parse(defaultAdmin);
		const { balance: _, ...updateAdmin } = createAdmin;
		await prisma.user.upsert({
			where: { email: defaultAdmin.email },
			create: createAdmin,
			update: updateAdmin,
		});
	};

	parse: IParse = ({ name, ...data }: any): User => {
		return {
			...data,

			type: 'admin',
			firstName: name.first,
			lastName: name.last,
		};
	};
}

export default new UserService();
