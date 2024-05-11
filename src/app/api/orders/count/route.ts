import OrderService from '@/db/OrderService';

export const GET = async (req: Request) => {
	try {
		const { searchParams } = new URL(req.url);
		const quantity = Number(searchParams.get('quantity')) || undefined;
		const subtotal = Number(searchParams.get('subtotal')) || undefined;
		const shippingFee = Number(searchParams.get('shippingFee')) || undefined;
		const total = Number(searchParams.get('total')) || undefined;
		const dateTime = new Date(searchParams.get('dateTime') || 0);
		const estimatedArrival = new Date(searchParams.get('estimatedArrival') || 0);

		return Response.json({
			message: 'Returned order count from DB',
			data: await OrderService.getCount({
				quantity,
				subtotal,
				shippingFee,
				total,
				dateTime,
				estimatedArrival,
			}),
		});
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return Response.json({ message: error.message });
		return Response.json({ message: 'An unknown error occurred whilst fetching the number of orders' });
	}
};
