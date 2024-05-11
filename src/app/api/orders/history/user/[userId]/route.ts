import OrderService from '@/db/OrderService';

export const GET = async (req: Request, { params }: { params: { userId: string } }) => {
	try {
		const { searchParams } = new URL(req.url);
		const sorted = Boolean(searchParams.get('sorted')) || false;
		const ongoing = Boolean(searchParams.get('ongoing')) || false;
		const past = Boolean(searchParams.get('past')) || false;
		const userId = Number(params.userId);

		return Response.json({
			message: 'Returned order history for given user from DB',
			data: await OrderService.getOrderHistory(userId, { sorted, ongoing, past }),
		});
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return Response.json({ message: error.message });
		return Response.json({ message: 'An unknown error occurred whilst fetching the order history' });
	}
};
