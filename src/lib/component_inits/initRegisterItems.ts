export const personalInfoItems = [
	[
		{
			type: 'text',
			id: 'firstName',
			name: 'firstName',
			placeholder: 'Enter First Name',
			label: 'First Name',
			required: true
		},
		{
			type: 'text',
			id: 'middleName',
			name: 'middleName',
			placeholder: 'Enter Middle Name',
			label: 'Middle Name'
		}
	],
	[
		{
			type: 'text',
			id: 'lastName',
			name: 'lastName',
			placeholder: 'Enter Last Name',
			label: 'Last Name',
			required: true
		},
		{
			type: 'select',
			id: 'gender',
			name: 'gender',
			label: 'Gender',
			required: true,
			options: [
				{
					label: 'Male',
					value: 'male'
				},
				{
					label: 'Female',
					value: 'female'
				}
			]
		}
	],
	[
		{
			type: 'select',
			id: 'maritalStatus',
			name: 'maritalStatus',
			label: 'Marital Status',
			required: true,
			options: [
				{
					label: 'Single',
					value: 'Single'
				},
				{
					label: 'Married',
					value: 'Married'
				},
				{
					label: 'Divorced',
					value: 'Divorced'
				}
			]
		},
		{
			type: 'date',
			id: 'birthDate',
			name: 'birthDate',
			label: 'Birthdate',
			max: '2004-12-01',
			required: true
		}
	]
];

export const registerItems = [
	{
		type: 'email',
		name: 'email',
		id: 'email',
		placeholder: 'Enter Email Address',
		label: 'Email Address'
	},
	{
		type: 'password',
		name: 'password',
		id: 'password',
		placeholder: 'Enter Password',
		label: 'Password'
	},
	{
		type: 'password',
		name: 'confirmPassword',
		id: 'confirmPassword',
		placeholder: 'Confirm Password',
		label: 'Confirm Password'
	}
];
