import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';

export const GET: RequestHandler = async ({ params }) => {
	const user = await prisma.user.findFirst({
		where: { id: params.id },
		include: {
			userDetails: true
		}
	});
	const userDetails = await prisma.personalInformation.findFirst({
		where: { userId: params.id },
		include: {
			relationship: true
		}
	});

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { user, userDetails }
	};
};
