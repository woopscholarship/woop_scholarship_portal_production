import type { RequestHandler } from '@sveltejs/kit';
import { scholarship } from '$root/utils/prisma';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ params }) => {
	const program = await scholarship.getProgramDetails(params.id);

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { program }
	};
};

export const POST: RequestHandler = async ({ params, request }) => {
	const form = await request.formData();

	await prisma.scholarshipProgram.update({
		where: {
			id: params.id
		},
		data: {
			description: String(form.get('description')),
			status: <'OPEN' | 'CLOSED'>String(form.get('status')),
		}
	});

	return {};
};
