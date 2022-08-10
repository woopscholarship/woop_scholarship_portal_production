import type { RequestHandler } from '@sveltejs/kit';
import { GetUserDetails, UpdateUserStatus } from '$root/utils/prisma';
import type { UserDetails } from '$root/utils/prisma';

export const GET: RequestHandler = async ({ params }) => {
  const data: UserDetails = await GetUserDetails(params.id);
	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: data
	};
};

export const POST: RequestHandler = async ({ params, request }) => {
	const form = await request.formData();
	const status = <'APPROVED' | 'REJECTED'>String(form.get('status'));
	await UpdateUserStatus(params.id, status);
	return {};
};