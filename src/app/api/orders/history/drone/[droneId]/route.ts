import OrderService from '@/db/OrderService';

export const GET = async (req: Request, { params }: { params: { droneId: string } }) => {
	try {
		const { searchParams } = new URL(req.url);
		const sorted = Boolean(searchParams.get('sorted')) || false;
		const ongoing = Boolean(searchParams.get('ongoing')) || false;
		const past = Boolean(searchParams.get('past')) || false;
		const droneId = Number(params.droneId);

		return Response.json({
			message: 'Returned sale history for given drone from DB',
			data: await OrderService.getSaleHistory(droneId, { sorted, ongoing, past }),
		});
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return Response.json({ message: error.message });
		return Response.json({ message: 'An unknown error occurred whilst fetching the sale history' });
	}
};
