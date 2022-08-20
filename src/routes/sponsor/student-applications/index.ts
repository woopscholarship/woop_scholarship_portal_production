import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';
import { scholarship, grant } from '$root/utils/prisma';

export const GET: RequestHandler = async () => {
	
	const sponsorUser = await prisma.user.findFirst({
		where: {
			userType: {
				equals: 'SPONSOR'
			},
			email: {
				equals: 'Mackenzie_Kuhic1@gmail.com'
			}
		}
	});

	const scholarshipPrograms = await scholarship.getProgramBySponsor(sponsorUser!.id);
	const grantPrograms = await grant.getProgramBySponsor(sponsorUser!.id);


	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { sponsorUser, scholarshipPrograms, grantPrograms }
	};
};
