import ProductService from '@/db/ProductService';

export const GET = async (req: Request) => {
	try {
		const { searchParams } = new URL(req.url);
		const seriesName = searchParams.get('seriesName') || undefined;
		const seriesDescription = searchParams.get('seriesDescription') || undefined;

		return Response.json({
			message: 'Returned product count from DB',
			data: await ProductService.getCount({ seriesName, seriesDescription }),
		});
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return Response.json({ message: error.message });
		return Response.json({ message: 'An unknown error occurred whilst fetching the number of products' });
	}
};
