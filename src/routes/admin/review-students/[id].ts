import type { RequestHandler } from '@sveltejs/kit';
import { user } from '$root/utils/prisma';
import type { UserDetails } from '$root/types/data';

export const GET: RequestHandler = async ({ params }) => {
  const data: UserDetails = await user.getUserDetails(params.id);

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: data
	};
};

export const POST: RequestHandler = async ({ params, request }) => {
	const form = await request.formData();
	const status = <'APPROVED' | 'REJECTED'>String(form.get('status'));
	await user.updateUserStatus(params.id, status);
	return {};
};