import UserService from '@/db/UserService';

export const GET = async (_: Request, { params }: { params: { id: string } }) => {
	try {
		const id = Number(params.id);
		return Response.json({ message: 'Returned one user from DB', data: await UserService.getUnique({ id }) });
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return Response.json({ message: error.message });
		return Response.json({ message: 'An unknown error occurred whilst fetching a user' });
	}
};
