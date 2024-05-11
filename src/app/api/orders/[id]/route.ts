import OrderService from '@/db/OrderService';

export const GET = async (_: Request, { params }: { params: { id: string } }) => {
	try {
		const id = Number(params.id);
		return Response.json({ message: 'Returned one order from DB', data: await OrderService.getUnique(id) });
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return Response.json({ message: error.message });
		return Response.json({ message: 'An unknown error occurred whilst fetching a order' });
	}
};
