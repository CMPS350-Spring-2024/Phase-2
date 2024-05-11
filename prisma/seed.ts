// @ts-nocheck
import { Prisma, PrismaClient } from '@prisma/client';
import ProductService from '../src/db/ProductService';
import UsersService from '../src/db/UserService';
import { prisma } from '../src/server/db';

const prisma = new PrismaClient();

async function createRandomCustomers(numCustomers: number) {
	const customers = [];
	for (let i = 0; i < numCustomers; i++) {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const email = faker.internet.email({ firstName: firstName, lastName: lastName });
		const phone = faker.phone.number('+974 55## ####');
		const password = faker.internet.password();
		const avatarColor = faker.internet.color();
		const balance = parseFloat(faker.finance.amount());

		const user = await prisma.user.create({
			data: {
				firstName,
				lastName,
				email,
				phone,
				password,
				avatarColor,
				balance,
			},
		});

		const customer = await prisma.customer.create({
			data: {
				user: {
					connect: {
						id: user.id,
					},
				},
			},
		});

		customers.push(customer);
	}

	return customers;
}
function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
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
