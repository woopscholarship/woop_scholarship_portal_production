import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ params }) => {
	const studentApplication = await prisma.studentApplication.findFirst({
		where: {
			id: Number(params.id)
		},
		include: {
			studentUser: true,
			grantProgram: true,
			scholarshipProgram: true,
		}
	})

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: {
			studentApplication
		}
	};
};

export const POST: RequestHandler = async ({ params, request }) => {
	const form = await request.formData();
	const status = <'APPROVED' | 'REJECTED'>String(form.get('status'));


	await prisma.studentApplication.update({
		where: {
			id: Number(params.id)
		},
		data: {
			status: status
		}
	})

	return {};
};
