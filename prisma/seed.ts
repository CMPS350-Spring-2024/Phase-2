// @ts-nocheck
import { Prisma, PrismaClient } from '@prisma/client';
import ProductService from '../src/db/ProductService';
import UsersService from '../src/db/UserService';
import { prisma } from '../src/server/db';

const prisma = new PrismaClient();

async function createRandomCustomers(numCustomers: number) {}

async function createRandomOrders(customers: Prisma.CustomerCreateManyInput[]) {}

async function createRandomTransactions(customers: Prisma.CustomerCreateManyInput[]) {}

async function main() {
	try {
		UsersService.addDefaultData();
		ProductService.addDefaultData();

		const numCustomers = 10;
		const customers = await createRandomCustomers(numCustomers);
		const orders = await createRandomOrders(customers);
		const transactions = await createRandomTransactions(customers);

		console.log(`Created ${customers.length} customers, ${orders.length} orders, and ${transactions.length} transactions.`);
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
