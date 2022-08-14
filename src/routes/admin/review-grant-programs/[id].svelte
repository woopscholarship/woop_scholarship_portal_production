<script lang="ts">
	import ReviewDetailsTable from '$root/components/admin/review/reviewDetailsTable.svelte';
	import type { GrantProgram, User } from '@prisma/client';
	
	interface GrantPrograms extends GrantProgram {
		sponsorUser: User;
	}

	
	export let grantProgram: GrantPrograms;
	const profileImageUrl = grantProgram.sponsorUser.profileImageUrl;


	const sectionItems = [
		{
			sectionTitle: {
				title: 'Sponsorship Details',
				subtitle: 'Primary account details '
			},
			items: [
				{
					label: 'Name',
					value: grantProgram.name,
				},
				{
					label: 'Email',
					value: grantProgram.name,
				},
				{
					label: 'Description',
					value: grantProgram.description,
				},
				{
					label: 'Degree Level',
					value: grantProgram.degreeLevel,
				},
				{
					label: 'Max Applicants',
					value: grantProgram.maxApplicants,
				},
				{
					label: 'Address',
					value: grantProgram.address,
				},
				{
					label: 'City',
					value: grantProgram.city,
				},
				{
					label: 'State',
					value: grantProgram.state,
				},
				{
					label: 'Country',
					value: grantProgram.country,
				},
				{
					label: 'Email',
					value: grantProgram.email,
				},
				{
					label: 'Phone Number',
					value: grantProgram.phoneNumber,
				},
				{
					label: 'Website',
					value: grantProgram.website,
				},
				{
					label: 'Review Status',
					value: grantProgram.reviewStatus,
				},
			]
		},
		{
			sectionTitle: {
				title: 'Sponsor Details',
				subtitle: 'Scholarship Program Details'
			},
			items: [
				{
					label: 'Name',
					value: grantProgram.sponsorUser.displayName,
				},
				{
					label: 'Email',
					value: grantProgram.sponsorUser.email,
				},
				{
					label: 'Registered On',
					value: grantProgram.sponsorUser.registeredOn,
				},
			]
		}
	];






</script>

<ReviewDetailsTable {sectionItems} {profileImageUrl} />
