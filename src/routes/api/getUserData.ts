import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';



export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const email = data.email;

  
  const user = await prisma.user.findFirst({
    where: {
      email: {
        contains: email,
      }
    },
    include: {
      userDetails: {
        include: {
          academicInformation: true,
          relationship: true,
        }
      }
    }
  })

  return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		message: 'Success',
		body: { user }
	};
};