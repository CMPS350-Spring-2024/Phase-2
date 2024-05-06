import ProductService from '@/db/ProductService';

export const GET = async (req: Request) => {
	const { searchParams } = new URL(req.url);
	const id = Number(searchParams.get('id')) || undefined;
	const seriesName = searchParams.get('seriesName') || undefined;
	const seriesDescription = searchParams.get('seriesDescription') || undefined;

	const products = await ProductService.getMany({ id, seriesName, seriesDescription });

	return Response.json(products);
};
