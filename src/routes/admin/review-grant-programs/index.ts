import type { RequestHandler } from '@sveltejs/kit';
import { GetGrantPrograms } from '$root/utils/prisma';

export const GET: RequestHandler = async () => {
	const grantPrograms = await GetGrantPrograms()
	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { grantPrograms }
	};
}