<script lang="ts">
	import ReviewDetailsTable from '$root/components/admin/review/reviewDetailsTable.svelte';
	import type { OrganizationInfo, User, PersonalInformation, RelationshipInfo } from '@prisma/client';

	interface UserDetails extends PersonalInformation {
		relationship: RelationshipInfo;
	}

	export let user: User;
	export let userDetails: UserDetails;
	export let organization: OrganizationInfo;


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
					value: userDetails.facebookUrl ?? 'N/A'
				}
			]
		},
		{
			sectionTitle: {
				title: 'Organization Information',
				subtitle: 'Organization details and contact'
			},
			items: [
				{
					label: 'Logo',
					value: organization.logo,
					type: 'image'
				},
				{
					label: 'Name',
					value: organization.name
				},
				{
					label: 'Address',
					value: organization.address
				},
				{
					label: 'City',
					value: organization.city
				},
				{
					label: 'State',
					value: organization.state
				},
				{
					label: 'Country',
					value: organization.country
				},
				{
					label: 'Email',
					value: organization.email
				},
				{
					label: 'Phone',
					value: organization.phoneNumber
				},
				{
					label: 'website',
					value: organization.website
				},
				{
					label: 'Description',
					value: organization.description
				}
			]
		},

		{
			sectionTitle: {
				title: 'Reason For Application',
				subtitle: 'Application details'
			},
			items: [
				{
					label: 'Reason For Application',
					value: userDetails.reasonForApplication
				}
			]
		}
	];

	const profileImageUrl = user.profileImageUrl;
</script>

<ReviewDetailsTable {sectionItems} {profileImageUrl} />

