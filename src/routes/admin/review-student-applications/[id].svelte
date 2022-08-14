<script lang="ts">
	import ReviewDetailsTable from '$root/components/admin/review/reviewDetailsTable.svelte';
	import type { StudentApplication, User, ScholarshipProgram, GrantProgram } from '@prisma/client';

	interface StudentApplications extends StudentApplication {
		studentUser: User;
		grantProgram: GrantProgram;
		scholarshipProgram: ScholarshipProgram;
	}

	export let studentApplication: StudentApplications;

	const sectionItems = [
		{
			sectionTitle: {
				title: 'Applicant Details',
				subtitle: 'Primary account details '
			},
			items: [
				{
					label: 'Name',
					value: studentApplication.studentUser.displayName
				},
				{
					label: 'Email',
					value: studentApplication.studentUser.email
				},
				{
					label: 'Registered On',
					value: studentApplication.studentUser.registeredOn
				}
			]
		},
	];

	if (studentApplication.grantProgram || studentApplication.scholarshipProgram) {
		sectionItems.push({
			sectionTitle: {
				title: 'Program Details',
				subtitle: studentApplication.grantProgram
					? 'Grant Program Details'
					: 'Scholarship Program Deatils'
			},
			items: [
				{
					label: 'Name',
					value: studentApplication.grantProgram.name
				},
				{
					label: 'Email',
					value: studentApplication.grantProgram.email!
				},
				{
					label: 'Phone Number',
					value: studentApplication.grantProgram.phoneNumber!
				},
				{
					label: 'Description',
					value: studentApplication.grantProgram.description!
				},
				{
					label: 'Degree Level',
					value: studentApplication.grantProgram.degreeLevel!
				},
				{
					label: 'Max Applicants',
					value: String(studentApplication.grantProgram.maxApplicants)!
				},
				{
					label: 'Address',
					value: studentApplication.grantProgram.address!
				},
				{
					label: 'City',
					value: studentApplication.grantProgram.city
				},
				{
					label: 'State',
					value: studentApplication.grantProgram.state
				},
				{
					label: 'Country',
					value: studentApplication.grantProgram.country
				},
				{
					label: 'Website',
					value: studentApplication.grantProgram.website!
				}
			]
		});
	}

	sectionItems.push({
		sectionTitle: {
			title: 'Application Details',
			subtitle: 'Application Details'
		},
		items: [
			{
				label: 'Applied On',
				value: studentApplication.appliedOn
			},
			{
				label: 'Reason For Application',
				value: studentApplication.reason
			},
			{
				label: 'Application Status',
				value: studentApplication.status
			},
		]
	});

	const profileImageUrl = studentApplication.studentUser.profileImageUrl;
</script>

<ReviewDetailsTable {sectionItems} {profileImageUrl} />
