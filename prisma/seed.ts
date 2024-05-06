//	@ts-nocheck
import ProductService from '../src/db/ProductService';
import UsersService from '../src/db/UserService';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	try {
		UsersService.addDefaultData();
		ProductService.addDefaultData();
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
