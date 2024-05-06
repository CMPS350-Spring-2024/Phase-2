import { PrismaClient, User } from '@prisma/client';
import fs from 'fs-extra';
import path from 'path';
const prisma = new PrismaClient();

class UserService {
	private _defaultDataPath = path.join(process.cwd(), 'src/data/default_admin.json');

	addDefaultData = async () => {
		const defaultAdmin = await fs.readJson(this._defaultDataPath);
		const createAdmin = this.transformJsonToModel(defaultAdmin);
		const { balance: _, ...updateAdmin } = createAdmin;
		await prisma.user.upsert({
			where: { email: defaultAdmin.email },
			create: createAdmin,
			update: updateAdmin,
		});
	};

	private transformJsonToModel = ({ name, ...data }: any): User => {
		return {
			...data,

			type: 'admin',
			firstName: name.first,
			lastName: name.last,
		};
	};
}

export default new UserService();
