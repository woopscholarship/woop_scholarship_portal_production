import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';


export const GET: RequestHandler = async () => {
  const studentApplications = await prisma.studentApplication.findMany();


	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { studentApplications }
	};
}


