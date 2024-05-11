import ProductService from '@/db/ProductService';

export const GET = async (req: Request) => {
	try {
		const { searchParams } = new URL(req.url);
		const id = Number(searchParams.get('id')) || undefined;
		const seriesName = searchParams.get('seriesName') || undefined;
		const seriesDescription = searchParams.get('seriesDescription') || undefined;

		if (id) return Response.json({ message: 'Returned one product from DB', data: await ProductService.getUnique({ id }) });
		return Response.json({
			message: 'Returned many products from DB',
			data: await ProductService.getMany({ seriesName, seriesDescription }),
		});
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return Response.json({ error: error.message });
		return Response.json({ error: 'An unknown error occurred whilst fetching the products' });
	}
};

export const POST = async (req: Request) => {
	try {
		const data = await req.json();
		return Response.json({ message: 'Product added successfully', data: await ProductService.addOne(data) });
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return Response.json({ error: error.message });
		return Response.json({ error: 'An unknown error occurred whilst adding the product' });
	}
};
