<script lang="ts">
	import ReviewDetailsTable from '$root/components/admin/review/reviewDetailsTable.svelte';
	import type { User, PersonalInformation, RelationshipInfo } from '@prisma/client';

	interface UserDetails extends PersonalInformation {
		relationship: RelationshipInfo;
	}

	export let user: User;
	export let userDetails: UserDetails;

	const sectionItems = [
		{
			sectionTitle: {
				title: 'User Details',
				subtitle: 'Primary account details '
			},
			items: [
				{
					label: 'Full Name',
					value: user.displayName
				},
				{
					label: 'Email',
					value: user.email
				},
				{
					label: 'Application Date',
					value: user.registeredOn
				},
				{
					label: 'Status',
					value: user.approvalStatus
				}
			]
		},
		{
			sectionTitle: {
				title: 'Personal Information',
				subtitle: 'Personal details and application.'
			},
			items: [
				{
					label: 'First Name',
					value: userDetails.firstName
				},
				{
					label: 'Middle Name',
					value: userDetails.middleName ?? 'N/A'
				},
				{
					label: 'Last Name',
					value: userDetails.lastName
				},
				{
					label: 'Birth Date',
					value: userDetails.dateOfBirth!
				},
				{
					label: 'Marital Status',
					value: userDetails.maritalStatus
				},
				{
					label: 'Gender',
					value: userDetails.gender
				},
				{
					label: 'Degree Level',
					value: userDetails.degreeLevel!
				},
				{
					label: 'Degree Program',
					value: userDetails.degreeProgram!
				}
			]
		},
		{
			sectionTitle: {
				title: 'Contact Information',
				subtitle: 'Contact details'
			},
			items: [
				{
					label: 'Address One',
					value: userDetails.addressOne
				},
				{
					label: 'Address Two',
					value: userDetails.addressTwo ?? 'N/A'
				},
				{
					label: 'City',
					value: userDetails.city
				},
				{
					label: 'State',
					value: userDetails.state
				},
				{
					label: 'Country',
					value: userDetails.country
				},
				{
					label: 'Phone Number',
					value: userDetails.phoneNumber
				},
				{
					label: 'Email',
					value: user.email
				},
				{
					label: 'Facebook Url',
					value: userDetails.facebookUrl
				}
			]
		},
		{
			sectionTitle: {
				title: 'Parent Basic Information',
				subtitle: 'Parents basic information'
			},
			items: [
				{
					label: 'Mother First Name',
					value: userDetails.relationship.motherFirstName ?? 'N/A'
				},
				{
					label: 'Mother Last Name',
					value: userDetails.relationship.motherLastName ?? 'N/A'
				},
				{
					label: 'Mother Occupation',
					value: userDetails.relationship.motherOccupation ?? 'N/A'
				},
				{
					label: 'Mother Phone',
					value: userDetails.relationship.motherPhone ?? 'N/A'
				},
				{
					label: 'Father First Name',
					value: userDetails.relationship.fatherFirstName ?? 'N/A'
				},
				{
					label: 'Father Last Name',
					value: userDetails.relationship.fatherLastName ?? 'N/A'
				},
				{
					label: 'Father Occupation',
					value: userDetails.relationship.fatherPhone ?? 'N/A'
				},
				{
					label: 'Father Phone',
					value: userDetails.relationship.fatherOccupation ?? 'N/A'
				}
			]
		},
		{
			sectionTitle: {
				title: 'Application Details',
				subtitle: ''
			},
			items: [
				{
					label: 'Reason For Application',
					value: userDetails.reasonForApplication
				},
				{
					label: 'Valid ID / Student ID',
					value: userDetails.validIdUrl,
					type: 'image',
				},
			]
		}
	];
	const profileImageUrl = user.profileImageUrl;
</script>

<ReviewDetailsTable {sectionItems} {profileImageUrl} />
