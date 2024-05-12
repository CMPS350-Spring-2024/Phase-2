// @ts-nocheck
import { faker } from '@faker-js/faker';
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

		const shippingAddress = await prisma.shippingAddress.create({
			data: {
				label: faker.lorem.words(),
				street: faker.location.streetAddress(),
				city: faker.location.city(),
				country: faker.location.country(),
				url: faker.internet.url(),
			},
		});

		const customer = await prisma.customer.create({
			data: {
				user: {
					connect: {
						id: user.id,
					},
				},
				shippingAddress: {
					connect: {
						id: shippingAddress.id,
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
		const numOrders = randomNumber(2, 6);
		for (let i = 0; i < numOrders; i++) {
			const quantity = randomNumber(3, 10);
			const subtotal = parseFloat(faker.finance.amount());
			const shippingFee = parseFloat(faker.finance.amount());
			const total = subtotal + shippingFee;
			const estimatedArrival = faker.date.future();

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
							id: customer.shippingAddressId,
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
	let lastCustomerId: number | null = null;

	for (let i = 0; i < customers.length; i++) {
		const numTransactions = randomNumber(2, 6);
		for (let i = 0; i < numTransactions; i++) {
			const amount = parseFloat(faker.finance.amount());
			let type;
			if (numTransactions < 3) type = 'deposit';
			else type = 'withdrawal';

			// Randomly select a customer for this transaction, but ensure it's different from the last one
			let randomCustomer;
			do {
				randomCustomer = customers[Math.floor(Math.random() * customers.length)];
			} while (randomCustomer.id === lastCustomerId);
			lastCustomerId = randomCustomer.id;

			const transaction = await prisma.transaction.create({
				data: {
					amount,
					type,
					customer: {
						connect: {
							id: randomCustomer.id,
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
		// Create series first, as they are required for products
		await UsersService.addDefaultData();
		await ProductService.addDefaultData();

		const numCustomers = 10;
		const customers = await createRandomCustomers(numCustomers);
		await createRandomOrders(customers);
		await createRandomTransactions(customers);

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
