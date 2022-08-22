import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';

type ProgramType = 'GRANT' | 'SCHOLARSHIP';
type DegreeLevel = 'ASSOCIATE' | 'BACHELORS' | 'MASTERS' | 'DOCTORAL';
type ScholarshipType = 'ACADEMIC' | 'SPORTS' | 'ESSAY' | 'OTHER';

export const POST: RequestHandler = async ({ request }) => {
	
	const sponsorUser = await prisma.user.findFirst({
		where: {
			userType: {
				equals: 'SPONSOR'
			}
		}
	});

	const form = await request.formData();

	const name = String(form.get('name'));
	const degreeLevel = <DegreeLevel>String(form.get('degreeLevel'));
	const maxApplicants = String(form.get('maxApplicants'));
	const scholarshipType = <ScholarshipType>String(form.get('scholarshipType'));
	const description = String(form.get('description'));
	const address = String(form.get('address'));
	const state = String(form.get('state'));
	const city = String(form.get('city'));
	const country = String(form.get('country'));
	const email = String(form.get('email'));
	const phoneNumber = String(form.get('phoneNumber'));
	const website = String(form.get('website'));
	const programType = <ProgramType>String(form.get('programType'));


	const scholarshipProgram = await prisma.scholarshipProgram.create({
		data: {
			status: 'OPEN',
			programType: programType,
			name: name,
			degreeLevel: degreeLevel,
			maxApplicants: Number(maxApplicants),
			scholarshipType: scholarshipType,
			description: description,
			address: address,
			state: state,
			city: city,
			country: country,
			email: email,
			phoneNumber: phoneNumber,
			website: website,
			sponsorUser: {
				connect: {
					id: sponsorUser!.id
				}
			}
		}
	});

	console.log(scholarshipProgram);

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { scholarshipProgram }
	};
};
