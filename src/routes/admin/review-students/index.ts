import type { RequestHandler } from '@sveltejs/kit';
import { filterUserTable, GetUsers } from '$root/utils/prisma';

export const GET: RequestHandler = async () => {
	const users = await GetUsers('STUDENT')
	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { users }
	};
}

export const POST: RequestHandler = async ({ request }) => {
	const form = await request.formData();
	const status = <'APPROVED' | 'REJECTED' | 'PENDING'>String(form.get('status'));
	const date = String(form.get('date'));
	const email = String(form.get('email'));

	const users = await filterUserTable('STUDENT', status, date, email);

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		message: 'Success',
		body: { users }
	};
};
