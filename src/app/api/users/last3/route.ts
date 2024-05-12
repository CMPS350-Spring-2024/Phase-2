import UserService from '@/db/UserService';

// return the top selling products.
export const GET = async () => {
	const last5 = await UserService.last3RegisteredUsers();
	return Response.json(last5);
};
