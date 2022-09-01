import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

const structureData = (responseData: any) => {
	const data = {
		id: responseData.id,
		email: responseData.email,
		profileImageUrl: `https://ui-avatars.com/api/?background=0fb7a6&color=fff&name=${encodeURI(responseData.firstName + ' ' + responseData.lastName)}`,
		userType: responseData.accountType,
		displayName: `${responseData.firstName} ${responseData.lastName}`,
		userDetails: {
			create: {
				firstName: responseData.firstName,
				middleName: responseData.middleName,
				lastName: responseData.lastName,
				gender: responseData.gender.toUpperCase(),
				dateOfBirth: responseData.birthDate,
				nationality: responseData.nationality,
				phoneNumber: responseData.phoneNumber,
        reasonForApplication: responseData.reason,
        facebookUrl: responseData.facebookLink,
        validIdUrl: responseData.validIdUrl,

				currentAddress: responseData.currentAddress,
				currentCity: responseData.currentCity,
				currentState: responseData.currentState,
				currentCountry: responseData.currentCountry,
				currentPostalCode: responseData.currentPostalCode,
				permanentAddress: responseData.permanentAddress,
				permanentCity: responseData.permanentCity,
				permanentState: responseData.permanentState,
				permanentCountry: responseData.permanentCountry,
				permanentPostalCode: responseData.permanentPostalCode,

				relationship: {
					create: {
						motherFirstName: responseData.motherFirstName,
						motherLastName: responseData.motherLastName,
						motherOccupation: responseData.motherOccupation,
						motherPhone: responseData.motherPhone,
						fatherFirstName: responseData.fatherFirstName,
						fatherLastName: responseData.fatherLastName,
						fatherOccupation: responseData.fatherOccupation,
						fatherPhone: responseData.fatherPhone
					}
				},
				
        academicInformation: {
          create: {
            currentSchool: responseData.currentSchool,
            currentSchoolAddress: responseData.currentSchoolAddress,
            currentEducationLevel: responseData.currentEducationLevel,
            currentCourse: responseData.currentCourse,
            previousEducationLevel: responseData.previousEducationLevel,
            previousSchoolAddress: responseData.previousSchoolAddress,
            previousSchoolAttended: responseData.previousSchoolAttended,
            desiredCourse: responseData.desiredCourse,
          }
        },
			}
		}
	};

  return data;
};

export const POST: RequestHandler = async ({ request }) => {
	const responseData = await request.json();
	const data = structureData(responseData)

	const user = await prisma.user.create({
		data: data
	});

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		message: 'Success',
		body: { user }
	};
};
