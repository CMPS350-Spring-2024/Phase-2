import ProductService from '@/db/ProductService';

export const GET = async (req: Request) => {
	try {
		const { searchParams } = new URL(req.url);
		const seriesName = searchParams.get('seriesName') || undefined;
		const seriesDescription = searchParams.get('seriesDescription') || undefined;

		return Response.json(await ProductService.getCount({ seriesName, seriesDescription }));
	} catch (error) {
		if (error instanceof Error) return Response.json({ error: error.message });
		return Response.json({ error: 'An unknown error occurred whilst fetching the number of products' });
	}
};
