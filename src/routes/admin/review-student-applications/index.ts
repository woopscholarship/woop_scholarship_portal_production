import type { RequestHandler } from '@sveltejs/kit';
import { studentApplication } from '$root/utils/prisma';


export const GET: RequestHandler = async () => {
  const studentApplications = await studentApplication.getAllApplications();
	
	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { studentApplications }
	};
}


export const POST: RequestHandler = async ({ request }) => {
	const form = await request.formData();
	const status = <'APPROVED' | 'REJECTED' | 'PENDING'>String(form.get('status'));
	const studentApplications = await studentApplication.filterApplications(status);

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { studentApplications }
	};
};

