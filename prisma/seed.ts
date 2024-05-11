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
async function createRandomOrders(customers: Prisma.CustomerCreateManyInput[]) {
	const orders = [];
	for (const customer of customers) {
		const numOrders = randomNumber(1, 5);
		for (let i = 0; i < numOrders; i++) {
			const quantity = randomNumber(1, 10);
			const subtotal = parseFloat(faker.finance.amount());
			const shippingFee = parseFloat(faker.finance.amount());
			const total = subtotal + shippingFee;
			const estimatedArrival = faker.date.future();

			// Create a new shipping address
			const shippingAddress = await prisma.shippingAddress.create({
				data: {
					label: faker.lorem.words(),
					street: faker.location.streetAddress(),
					city: faker.location.city(),
					country: faker.location.country(),
					url: faker.internet.url(),
					customer: {
						connect: {
							id: customer.id,
						},
					},
				},
			});

			// Get a random product
			const product = await prisma.product.findFirst();

			const order = await prisma.order.create({
				data: {
					quantity,
					subtotal,
					shippingFee,
					total,
					estimatedArrival,
					shippingAddress: {
						connect: {
							id: shippingAddress.id,
						},
					},
					customer: {
						connect: {
							id: customer.id,
						},
					},
					product: {
						connect: {
							id: product.id,
						},
					},
				},
			});

			orders.push(order);
		}
	}

	return orders;
}

async function createRandomTransactions(customers: Prisma.CustomerCreateManyInput[]) {
	const transactions = [];
	for (const customer of customers) {
		const numTransactions = faker.datatype.number({ min: 1, max: 5 });
		for (let i = 0; i < numTransactions; i++) {
			const amount = faker.finance.amount();
			const type = faker.random.arrayElement(['deposit', 'withdrawal']);

			const transaction = await prisma.transaction.create({
				data: {
					amount,
					type,
					customer: {
						connect: {
							id: customer.id,
						},
					},
				},
			});

			transactions.push(transaction);
		}
	}

	return transactions;
}

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
