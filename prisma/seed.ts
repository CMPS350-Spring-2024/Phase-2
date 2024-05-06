//	@ts-nocheck

import fs from 'fs-extra';
import path from 'path';

import ProductRepo from '../src/repo/ProductRepo';
import UsersRepo from '../src/repo/UsersRepo';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const defaultOrdersPath = path.join(process.cwd(), 'src/data/default_orders.json');
const defaultTransactionsPath = path.join(process.cwd(), 'src/data/default_transactions.json');
const productListPath = path.join(process.cwd(), 'src/data/product_list.json');

async function main() {
	try {
		const defaultOrders = await fs.readJson(defaultOrdersPath);
		const defaultTransactions = await fs.readJson(defaultTransactionsPath);
		const productList = await fs.readJson(productListPath);

		UsersRepo.addDefaultAdmin();
		ProductRepo.addProductList();

		// defaultOrders.forEach((order) => prisma.order.create({ data: order }));
		// defaultTransactions.forEach((transaction) => prisma.transaction.create({ data: transaction }));
		// productList.forEach((product) => prisma.product.create({ data: product }));
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
