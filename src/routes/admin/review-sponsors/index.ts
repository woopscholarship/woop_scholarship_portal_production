import type { RequestHandler } from '@sveltejs/kit';
import { user } from '$root/utils/prisma';

export const GET: RequestHandler = async () => {
	const users = await user.getAllUsers('SPONSOR')

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { users }
	};
}


export const POST: RequestHandler = async ({ request }) => {
	const form = await request.formData();
	const status = <'APPROVED' | 'REJECTED' | 'PENDING'>String(form.get('status'));
	const email = String(form.get('email'));

	const users = await user.filterUsers('SPONSOR', status, email);

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		message: 'Success',
		body: { users }
	};
};
