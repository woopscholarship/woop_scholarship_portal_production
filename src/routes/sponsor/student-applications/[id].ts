import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';

export const GET: RequestHandler = async ({ params }) => {
	const student = await prisma.studentApplication.findFirst({
		where: {
			id: {
				equals: params.id
			}
		},
		include: {
			studentUser: {
				include: {
					userDetails: {
						include: {
							relationship: true,
							academicInformation: true,
						}
					}
				}
			}
		}
	});

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { student }
	};
};
