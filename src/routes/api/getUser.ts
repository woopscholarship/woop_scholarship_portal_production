import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';

export const GET: RequestHandler = async ({ params }) => {
	const currentUser = await prisma.user.findFirst({
		where: {
			id: {
				equals: params.id
			}
		},
		include: {
			userDetails: {
				include: {
					relationship: true
				}
			}
		}
	});

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { currentUser }
	};
};
