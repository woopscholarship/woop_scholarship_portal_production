import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';


export const GET: RequestHandler = async () => {
  const studentApplications = await prisma.studentApplication.findMany({
		include: {
			studentUser: true
		}
	});


	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { studentApplications }
	};
}


export const POST: RequestHandler = async ({ request }) => {
	const form = await request.formData();
	const status = <'APPROVED' | 'REJECTED' | 'PENDING'>String(form.get('status'));

	const studentApplications = await prisma.studentApplication.findMany({
		where: {
			status: {
				equals: status
			}
		},
		include: {
			studentUser: true
		}
	})

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { studentApplications }
	};
};

