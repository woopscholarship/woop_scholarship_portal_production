<script lang="ts">
	import { capitalizeFirstLetter } from '$root/helper/capitalizeFirstLetter';
	import ReviewStudentTableContainer from '$root/components/sponsor/ReviewStudentTableContainer.svelte';
	import ReviewStudentTableItem from '$root/components/sponsor/ReviewStudentTableItem.svelte';
	import type {
		StudentApplication,
		User,
		PersonalInformation,
		RelationshipInfo,
		AcademicInformation
	} from '@prisma/client';

	interface _StudentApplication extends StudentApplication {
		studentUser: _User;
	}

	interface _User extends User {
		userDetails: _PersonalInformation;
	}

	interface _PersonalInformation extends PersonalInformation {
		relationship: RelationshipInfo;
		academicInformation: AcademicInformation;
	}
	export let student: _StudentApplication;

	const { studentUser } = student;
	const { userDetails } = studentUser;
	const { relationship } = userDetails;

	console.log(student);

</script>

<img
	class="w-full h-60 object-fill "
	src="https://i.ibb.co/zftT3jh/photo-1553095066-5014bc7b7f2d.jpg"
	alt=""
/>

<div class="relative z-40 bg-red mb-48">
	<div class="absolute -top-20 left-10 z-40 bg-white rounded shadow-md">
		<img class="m-2 h-52 w-48 object-cover" src={studentUser.profileImageUrl} alt="" />
	</div>

	<div class="absolute left-72 top-6">
		<h2 class="text-2xl font-bold">{studentUser.displayName}</h2>
		<p class="mt-4 text-lg font-bold text-primary">{capitalizeFirstLetter(userDetails.academicInformation.currentEducationLevel)}</p>
		<p class="text-md font-bol">{capitalizeFirstLetter(userDetails.academicInformation.currentCourse)}</p>
		<p class="mt-4">Date Applied: {student.appliedOn}</p>
	</div>
</div>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="bg-white shadow overflow-hidden sm:rounded-lg p-10">
	<div class="px-4 py-5 sm:px-6">
		<h3 class="text-lg leading-6 font-medium text-gray-900">Reasons For Application</h3>
		<p class="mt-2 text-sm text-gray-500">{student.reason}</p>
	</div>


	<div class="flex flex-wrap">
		<!-- SECTION -->
		<ReviewStudentTableContainer>
			<ReviewStudentTableItem label='First Name' value={userDetails.firstName} />
			<ReviewStudentTableItem label='Middle Name' value={userDetails.middleName ?? 'N/A'} />
			<ReviewStudentTableItem label='Last Name' value={userDetails.lastName} />
			<ReviewStudentTableItem label='Gender' value={capitalizeFirstLetter(userDetails.gender)} />
			<ReviewStudentTableItem label='Marital Status' value={capitalizeFirstLetter(userDetails.maritalStatus)} />
			<ReviewStudentTableItem label='Birth Date' value={String(userDetails.dateOfBirth)} />
		</ReviewStudentTableContainer>


		<!-- SECTION -->
		<ReviewStudentTableContainer>
			<ReviewStudentTableItem label='Email' value={studentUser.email} />
			<ReviewStudentTableItem label='Phone Number' value={userDetails.phoneNumber} />
			<ReviewStudentTableItem label='Current School Address' value={userDetails.academicInformation.currentSchoolAddress} />
			<ReviewStudentTableItem label='Current Education Level' value={userDetails.academicInformation.currentSchool} />
			<ReviewStudentTableItem label='Current Course' value={userDetails.academicInformation.currentEducationLevel} />
		</ReviewStudentTableContainer>
	</div>

	<div class="px-4 py-5 sm:px-6">
		<h3 class="text-lg leading-6 font-medium text-gray-900">Address Details</h3>
	</div>


	<div class="flex flex-wrap">
		<!-- SECTION -->
		<ReviewStudentTableContainer>
			<ReviewStudentTableItem label='Current Address' value={userDetails.currentAddress} />
			<ReviewStudentTableItem label='Current City' value={userDetails.currentCity} />
			<ReviewStudentTableItem label='Current State' value={userDetails.currentState} />
			<ReviewStudentTableItem label='Current Country' value={userDetails.currentCountry} />
			<ReviewStudentTableItem label='Current Postal Code' value={userDetails.currentPostalCode} />
		</ReviewStudentTableContainer>


		<!-- SECTION -->
		<ReviewStudentTableContainer>
			<ReviewStudentTableItem label='Permanent Address' value={userDetails.permanentAddress} />
			<ReviewStudentTableItem label='Permanent City' value={userDetails.permanentCity} />
			<ReviewStudentTableItem label='Permanent State' value={userDetails.permanentState} />
			<ReviewStudentTableItem label='Permanent Country' value={userDetails.permanentCountry} />
			<ReviewStudentTableItem label='Permanent Postal Code' value={userDetails.permanentPostalCode} />
		</ReviewStudentTableContainer>
	</div>

	<div class="px-4 py-5 sm:px-6 mt-10">
		<h3 class="text-lg leading-6 font-medium text-gray-900">Student Relationships</h3>
	</div>


	<div class="flex flex-wrap mt-4">
		<!-- SECTION -->
		<ReviewStudentTableContainer>
			<ReviewStudentTableItem label='Mother First Name' value={relationship.motherFirstName ?? 'N/A'} />
			<ReviewStudentTableItem label='Mother Last Name' value={relationship.motherLastName ?? 'N/A'} />
			<ReviewStudentTableItem label='Mother Occupation' value={relationship.motherOccupation ?? 'N/A'} />
			<ReviewStudentTableItem label='Mother Phone' value={relationship.motherPhone ?? 'N/A'} />
		</ReviewStudentTableContainer>


		<!-- SECTION -->
		<ReviewStudentTableContainer>
			<ReviewStudentTableItem label='Father First Name' value={relationship.fatherFirstName ?? 'N/A'} />
			<ReviewStudentTableItem label='Father Last Name' value={relationship.fatherLastName ?? 'N/A'} />
			<ReviewStudentTableItem label='Father Occupation' value={relationship.fatherOccupation ?? 'N/A'} />
			<ReviewStudentTableItem label='Father Phone' value={relationship.fatherPhone ?? 'N/A'} />
		</ReviewStudentTableContainer>
	</div>
</div>
