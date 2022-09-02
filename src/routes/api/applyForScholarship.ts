import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	const studentApplication = await prisma.studentApplication.findFirst({
		where: {
			scholarshipProgramId: {
				equals: data.scholarshipId
			},
			studentUserId: {
				equals: data.id
			}
		}
	});


	console.log(studentApplication)
  
  if (!studentApplication) {
    await prisma.studentApplication.create({
			data: {
				reason: data.reason,
				studentUser: {
					connect: {
						id: data.id!
					}
				},
				scholarshipProgram: {
					connect: {
						id: data.scholarshipId!
					}
				}
			}
		});

		const user = await prisma.user.findFirst({
			where: {
				id: {
					equals: data.id
				}
			},
			include: {
				scholarshipApplications: true
			}
		});

		console.log(user);

		return {
			headers: { 'Content-Type': 'application/json' },
			status: 200,
			message: 'Success',
			body: { data }
		};
  } 

  console.log('student application exists')
	return {};
};
