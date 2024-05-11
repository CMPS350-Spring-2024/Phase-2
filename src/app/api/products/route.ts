import ProductService from '@/db/ProductService';

export const GET = async (req: Request) => {
	try {
		const { searchParams } = new URL(req.url);
		const id = Number(searchParams.get('id')) || undefined;
		const seriesName = searchParams.get('seriesName') || undefined;
		const seriesDescription = searchParams.get('seriesDescription') || undefined;

		if (id) return Response.json(await ProductService.getUnique({ id }));
		return Response.json(await ProductService.getMany({ seriesName, seriesDescription }));
	} catch (error) {
		if (error instanceof Error) return Response.json({ error: error.message });
		return Response.json({ error: 'An unknown error occurred whilst fetching the products' });
	}
};

export const POST = async (req: Request) => {
	try {
		const data = await req.json();
		await ProductService.addOne(data);
		return Response.json({ message: 'Product added successfully' });
	} catch (error) {
		if (error instanceof Error) return Response.json({ error: error.message });
		return Response.json({ error: 'An unknown error occurred whilst adding the product' });
	}
};
