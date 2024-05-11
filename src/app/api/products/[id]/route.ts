import ProductService from '@/db/ProductService';

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
	try {
		const id = Number(params.id);
		const data = await req.json();
		return Response.json({ message: 'Product updated successfully', data: await ProductService.updateOne(id, data) });
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return Response.json({ error: error.message });
		return Response.json({ error: 'An unknown error occurred whilst updating the product' });
	}
};
