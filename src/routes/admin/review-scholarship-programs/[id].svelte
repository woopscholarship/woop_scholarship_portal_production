<script lang="ts">
	import ReviewDetailsTable from '$root/components/admin/review/reviewDetailsTable.svelte';
	import type { ScholarshipProgram, User } from '@prisma/client';

	interface ScholarshipPrograms extends ScholarshipProgram {
		sponsorUser: User;
	}

	export let scholarshipProgram: ScholarshipPrograms;
	console.log(scholarshipProgram);

	const tableData = [
		{
			title: {
				title: 'Sponsorship Details',
				subtitle: 'Primary account details '
			},
			items: [
				{
					label: 'Name',
					value: scholarshipProgram.name,
				},
				{
					label: 'Email',
					value: scholarshipProgram.email,
				},
				{
					label: 'Description',
					value: scholarshipProgram.description,
				},
				{
					label: 'Degree Level',
					value: scholarshipProgram.degreeLevel,
				},
				{
					label: 'Max Applicants',
					value: scholarshipProgram.maxApplicants,
				},
				{
					label: 'Address',
					value: scholarshipProgram.address,
				},
				{
					label: 'City',
					value: scholarshipProgram.city,
				},
				{
					label: 'State',
					value: scholarshipProgram.state,
				},
				{
					label: 'Country',
					value: scholarshipProgram.country,
				},
				{
					label: 'Email',
					value: scholarshipProgram.email,
				},
				{
					label: 'Phone Number',
					value: scholarshipProgram.phoneNumber,
				},
				{
					label: 'Website',
					value: scholarshipProgram.website,
				},
				{
					label: 'Review Status',
					value: scholarshipProgram.reviewStatus,
				},
			]
		},
		{
			title: {
				title: 'Sponsor Details',
				subtitle: 'Scholarship Program Details'
			},
			items: [
				{
					label: 'Name',
					value: scholarshipProgram.sponsorUser.displayName,
				},
				{
					label: 'Email',
					value: scholarshipProgram.sponsorUser.email,
				},
				{
					label: 'Registered On',
					value: scholarshipProgram.sponsorUser.registeredOn,
				},
			]
		}
	];

	const profileImageUrl = scholarshipProgram.sponsorUser.profileImageUrl;
</script>

<ReviewDetailsTable {tableData} {profileImageUrl} />
