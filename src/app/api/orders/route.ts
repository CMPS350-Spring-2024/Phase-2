import OrderService from '@/db/OrderService';

export const GET = async (req: Request) => {
	try {
		const { searchParams } = new URL(req.url);
		const id = Number(searchParams.get('id')) || undefined;

		if (id) return Response.json({ message: 'Returned one order from DB', data: await OrderService.getUnique(id) });
		return Response.json({
			message: 'Returned many orders from DB',
			data: await OrderService.getMany(),
		});
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return Response.json({ message: error.message });
		return Response.json({ message: 'An unknown error occurred whilst fetching the orders' });
	}
};

// export const POST = async (req: Request) => {
// 	try {
// 		const data = await req.json();
// 		return Response.json({ message: 'Order added successfully', data: await OrderService.addOne(data) });
// 	} catch (error) {
// 		console.error(error);
// 		if (error instanceof Error) return Response.json({ message: error.message });
// 		return Response.json({ message: 'An unknown error occurred whilst adding the order' });
// 	}
// };
