import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

import {associate, bachelor, masters, doctors} from './degreeProgram';



export const USERS: any[] = [];
export const SCHOLARSHIP_PROGRAM: any[] = [];
export const GRANT_PROGRAM: any[] = [];

function createRandomUser(userType: 'STUDENT' | 'SPONSOR' | undefined = undefined): any {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
  const currentEducationLevel = faker.helpers.arrayElement(['ASSOCIATE', 'BACHELORS', 'MASTERS', 'DOCTORAL'])

  const generateDegreeProgram = (degreeLevel: string) => {
    
		if(degreeLevel === 'ASSOCIATE') {
			return faker.helpers.arrayElement(associate)
		}

		if(degreeLevel === 'BACHELORS') {
			return faker.helpers.arrayElement(bachelor)
		}
		if(degreeLevel === 'MASTERS') {
			return faker.helpers.arrayElement(masters)
		}

		if(degreeLevel === 'DOCTORAL') {
			return faker.helpers.arrayElement(doctors)
		}
  }

	const user: any = {
		id: faker.datatype.uuid(),
		email: faker.internet.email(),
		profileImageUrl: faker.image.avatar(),
		userType: userType ? userType : faker.helpers.arrayElement(['STUDENT', 'SPONSOR']),
		registeredOn: faker.date.past(),
		approvalStatus: faker.helpers.arrayElement(['PENDING', 'APPROVED', 'REJECTED']),
		displayName: `${firstName} ${lastName}`
	};

	if (user.userType === 'STUDENT') {
		user.userDetails = {
			create: {
				firstName: firstName,
				lastName: lastName,
				maritalStatus: faker.helpers.arrayElement(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']),
				gender: faker.helpers.arrayElement(['FEMALE', 'MALE']),
				dateOfBirth: faker.date.past(),
				nationality: 'Filipino',

				currentAddress: faker.address.streetAddress(),
				currentCity: faker.address.cityName(),
				currentState: faker.address.state(),
				currentCountry: faker.address.country(),
				currentPostalCode: faker.address.zipCode(),
				permanentAddress: faker.address.streetAddress(),
				permanentCity: faker.address.cityName(),
				permanentState: faker.address.state(),
				permanentCountry: faker.address.country(),
				permanentPostalCode: faker.address.zipCode(),

				phoneNumber: faker.phone.number(),
				relationship: {
					create: {
						motherPhotoUrl: faker.image.avatar(),
						motherFirstName: faker.name.firstName(),
						motherLastName: faker.name.lastName(),
						motherOccupation: faker.name.jobTitle(),
						motherPhone: faker.phone.number(),
						fatherPhotoUrl: faker.image.avatar(),
						fatherFirstName: faker.name.firstName(),
						fatherLastName: faker.name.lastName(),
						fatherOccupation: faker.name.jobTitle(),
						fatherPhone: faker.phone.number()
					}
				},
        academicInformation: {
          create: {
            currentSchool: faker.company.companyName(),
            currentSchoolAddress: faker.address.streetAddress(),
            currentEducationLevel: currentEducationLevel,
            currentCourse: generateDegreeProgram(currentEducationLevel)
          }
        },

				reasonForApplication: faker.lorem.paragraph(),
				facebookUrl: faker.internet.url(),
				validIdUrl: faker.image.abstract()
			}
		};


	}

	if (user.userType === 'SPONSOR') {
		user.userDetails = {
			create: {
				firstName: firstName,
				lastName: lastName,
				maritalStatus: faker.helpers.arrayElement(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']),
				gender: faker.helpers.arrayElement(['FEMALE', 'MALE']),
				dateOfBirth: faker.date.past(),
				nationality: 'Filipino',

			
        currentAddress: faker.address.streetAddress(),
				currentCity: faker.address.cityName(),
				currentState: faker.address.state(),
				currentCountry: faker.address.country(),
				currentPostalCode: faker.address.zipCode(),
				permanentAddress: faker.address.streetAddress(),
				permanentCity: faker.address.cityName(),
				permanentState: faker.address.state(),
				permanentCountry: faker.address.country(),
				permanentPostalCode: faker.address.zipCode(),

				reasonForApplication: faker.lorem.paragraph(),
				phoneNumber: faker.phone.number()
			}
		};
	}

	return user;
}

function createRandomUsers(count: number, userType: 'STUDENT' | 'SPONSOR' | undefined = undefined) {
	const users: any[] = [];

	Array.from({ length: count }).forEach(() => {
		users.push(createRandomUser(userType ? userType : undefined));
	});

	return users;
}

function createScholarshipProgram(programType: 'SCHOLARSHIP' | 'GRANT') {
	const scholarshipProgram = {
		name: faker.company.companyName() + ' Scholarship Program',
		description: faker.lorem.paragraph(),
		postedOn: faker.date.past(),
		degreeLevel: faker.helpers.arrayElement(['ASSOCIATE', 'BACHELORS', 'MASTERS', 'DOCTORAL']),
		maxApplicants: +faker.random.numeric(3),
		scholarshipType: faker.helpers.arrayElement(['ACADEMIC', 'SPORTS', 'ESSAY', 'OTHER']),
		programType: faker.helpers.arrayElement(['GRANT', 'SCHOLARSHIP']),
		status: faker.helpers.arrayElement(['OPEN', 'CLOSED']),
		reviewStatus: faker.helpers.arrayElement(['PENDING', 'APPROVED', 'REJECTED']),

		address: faker.address.streetAddress(),
		city: faker.address.cityName(),
		state: faker.address.state(),
		country: faker.address.country(),
		phoneNumber: faker.phone.number(),
		email: faker.internet.email(),
		website: faker.internet.url()
	};

	return scholarshipProgram;
}

function createStudentApplications(count: number) {
	const applications: any[] = [];


	Array.from({ length: count }).forEach(() => {
	const studentUser = createRandomUser('STUDENT');

		applications.push({
			reason: faker.lorem.paragraph(),
			studentUser: {
				create: studentUser
			}
		});
	});

	return applications;
}

Array.from({ length: 20 }).forEach(() => {
	USERS.push(createRandomUser());
	SCHOLARSHIP_PROGRAM.push(createScholarshipProgram('SCHOLARSHIP'));
	GRANT_PROGRAM.push(createScholarshipProgram('GRANT'));
});

async function main() {
	USERS.forEach(async (userData) => {
		const user = await prisma.user.create({
			data: userData
		});
	});

	SCHOLARSHIP_PROGRAM.forEach(async (scholarshipProgramData) => {
		const data = await prisma.scholarshipProgram.create({
			data: {
				...scholarshipProgramData,
				sponsorUser: {
					create: createRandomUser('SPONSOR')
				},
				applicants: {
					create: createStudentApplications(50)
				}
			}
		});
	});

	GRANT_PROGRAM.forEach(async (grantProgramData) => {
		const data = await prisma.scholarshipProgram.create({
			data: {
				...grantProgramData,
				sponsorUser: {
					create: createRandomUser('SPONSOR')
				},
				applicants: {
					create: createStudentApplications(10)
				}
			}
		});
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
