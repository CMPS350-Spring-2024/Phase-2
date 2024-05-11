import ProductService from '@/db/ProductService';

export const GET = async (_: Request, { params }: { params: { id: string } }) => {
	try {
		const id = Number(params.id);
		return Response.json({ message: 'Returned one product from DB', data: await ProductService.getUnique(id) });
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return Response.json({ message: error.message });
		return Response.json({ message: 'An unknown error occurred whilst fetching a product' });
	}
};

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
	try {
		const id = Number(params.id);
		const data = await req.json();
		return Response.json({ message: 'Product updated successfully', data: await ProductService.updateOne(id, data) });
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return Response.json({ message: error.message });
		return Response.json({ message: 'An unknown error occurred whilst updating the product' });
	}
};
