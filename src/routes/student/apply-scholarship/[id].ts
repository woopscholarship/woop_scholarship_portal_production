import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';

export const GET: RequestHandler = async ({params}) => {
	const scholarship = await prisma.scholarshipProgram.findFirst({
		where: {
			id: {
				equals: params.id
			},
		},
		include: {
			sponsorUser: {
				include: {
					userDetails: true
				},
			}
		}
	});

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { scholarship }
	};
};


export const POST: RequestHandler = async ({ params, request }) => {
	const form = await request.formData();
	const reason = <string>form.get('reason');

	const studentUser = await prisma.user.findFirst();


	await prisma.studentApplication.create({
		data: {
			reason,
			studentUserId: studentUser!.id,
		},
	})

	console.log('successful')

	return {};
};