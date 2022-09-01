import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();

	await prisma.studentApplication.create({
		data: {
			reason: data.reason,
      studentUser: {
        connect: {
          id: data.id!
        },
      },
      scholarshipProgram: {
        connect: {
          id: data.scholarshipId!
        },
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
};
