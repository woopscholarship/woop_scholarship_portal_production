import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';
import { isLoggedIn, accountType, userId } from '$root/stores/authStore';

export const GET: RequestHandler = async ({ params }) => {
	const scholarship = await prisma.scholarshipProgram.findFirst({
		where: {
			id: {
				equals: params.id
			}
		},
		include: {
			sponsorUser: {
				include: {
					userDetails: true
				}
			}
		}
	});

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { scholarship }
	};
};