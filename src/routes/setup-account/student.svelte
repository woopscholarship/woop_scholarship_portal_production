<script lang="ts">
	import { onMount } from 'svelte/internal';
	import { page } from '$app/stores';
	import app from '$lib/initFirebase';
	import { doc, setDoc, getFirestore } from 'firebase/firestore';
	import { getAuth, updateProfile } from 'firebase/auth';

	import StepOneStudentRegister from '$root/components/forms/student_register/StepOneStudentRegister.svelte';
	import StepTwoStudentRegister from '$root/components/forms/student_register/StepTwoStudentRegister.svelte';
	import StepThreeStudentRegister from '$root/components/forms/student_register/StepThreeStudentRegister.svelte';
	import StepFourStudentRegister from '$root/components/forms/student_register/StepFourStudentRegister.svelte';

	import Button from '$root/components/common/Button.svelte';
	import ProgressBar from '$root/components/common/ProgressBar.svelte';
	import { goto } from '$app/navigation';
	import { phoneCodeValid } from '$root/stores/authStore';
	import { userId } from '../../stores/authStore';

	$: currentStep = 1;

	let steps = [
		'Tell us about yourself',
		'Contact Details',
		'Relationships',
		'Social Media Account'
	];

	const progressFraction = 1 / steps.length;
	$: progressValue = progressFraction;

	const updateProgressValue = () => {
		currentStep += 1;
		progressValue += progressFraction;
	};

	$: {
		if (currentStep === steps.length++) {
			goto('/login');
		}
	}

	$: isFirstProcessDone = false;
	$: isSecondProcessDone = false;
	$: isFourthProcessDone = false;

	$: firstProcessData = {};
	$: secondProcessData = {};
	$: thirdProcessData = {};
	$: fourthProcessData = {};

	onMount(() => {
		const auth = getAuth();
		const user = auth.currentUser;

		if (!user) {
			goto('/login');
		}
	});

	function saveToFirebase() {
		const db = getFirestore(app);
		const auth = getAuth();
		const user = auth.currentUser;

		const data: any = {
			...firstProcessData,
			...secondProcessData,
			...thirdProcessData,
			...fourthProcessData
		};

		const email = <string>user?.email;
		const userType: any = $page.url.pathname.replace(`/setup-account/`, '');

		const userData: User = {
			id: $userId,
			email: email,
			registeredOn: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
			firstName: data.firstName,
			lastName: data.lastName,
			fullName: `${data.firstName} ${data.lastName}`,
			photoUrl:
				'https://ui-avatars.com/api/?name=' + encodeURI(`${data.firstName} ${data.lastName}`),
			userType: userType,
			userStatus: 'pending'
		};

		const userDetails: UserDetails = {
			id: $userId,
			firstName: data.firstName,
			lastName: data.lastName,
			fullName: `${data.firstName} ${data.lastName}`,
			email: email,
			photoUrl:
				'https://ui-avatars.com/api/?name=' + encodeURI(`${data.firstName} ${data.lastName}`),
			maritalStatus: data.maritalStatus,
			gender: data.gender,
			birthDate: data.birthDate,
			addressOne: data.addressOne,
			facebookLink: data.facebookLink,
			addressTwo: data.addressTwo,
			city: data.city,
			province: data.province,
			phone: data.phoneNumber,
			reasonforApplication: data.reason,

			// set to empty string if undefined
			motherFirstName: data.motherFirstName !== undefined ? data.motherFirstName : '',
			motherLastName: data.motherLastName !== undefined ? data.motherLastName : '',
			motherOccupation: data.motherOccupation !== undefined ? data.motherOccupation : '',
			motherPhone: data.motherPhone !== undefined ? data.motherPhone : '',
			fatherFirstName: data.fatherFirstName !== undefined ? data.fatherFirstName : '',
			fatherLastName: data.fatherLastName !== undefined ? data.fatherLastName : '',
			fatherOccupation: data.fatherOccupation !== undefined ? data.fatherOccupation : '',
			fatherPhone: data.fatherPhone !== undefined ? data.fatherPhone : ''
		};

		const educationDetails = {
			id: $userId
		};

		// Save data to firebase
		setDoc(doc(db, 'users', $userId), userData)
			.then(() => {})
			.catch((err) => console.log(err));
		setDoc(doc(db, 'userDetails', $userId), userDetails)
			.then(() => {})
			.catch((err) => console.log(err));
		setDoc(doc(db, 'educationDetails', $userId), educationDetails)
			.then(() => {})
			.catch((err) => console.log(err));

		goto('/login');
	}
</script>

<form on:submit|preventDefault={saveToFirebase} action="/" method="POST">
	<div class="input-group form-title">
		<h2>Personal Information</h2>
		<br />

		<p>{steps[currentStep - 1]}</p>
	</div>

	{#if currentStep === 1}
		<StepOneStudentRegister bind:data={firstProcessData} bind:isProcessDone={isFirstProcessDone} />

		<div class="inline-input-group-wrapper submit-button-group">
			<!-- TODO: Add a goto redirect directive -->
			<Button onClick={updateProgressValue} disabled={!isFirstProcessDone}>Continue</Button>
		</div>
	{:else if currentStep === 2}
		<StepTwoStudentRegister
			bind:data={secondProcessData}
			bind:isProcessDone={isSecondProcessDone}
		/>

		<div class="inline-input-group-wrapper submit-button-group">
			<!-- TODO: Add a goto redirect directive -->
			<Button onClick={updateProgressValue} disabled={!$phoneCodeValid || !isSecondProcessDone}
				>Continue</Button
			>
		</div>
	{:else if currentStep === 3}
		<StepThreeStudentRegister bind:data={thirdProcessData} />

		<div class="inline-input-group-wrapper submit-button-group">
			<!-- TODO: Add a goto redirect directive -->
			<Button onClick={updateProgressValue}>Continue</Button>
		</div>
	{:else if currentStep === 4}
		<StepFourStudentRegister
			bind:data={fourthProcessData}
			bind:isProcessDone={isFourthProcessDone}
		/>

		<div class="inline-input-group-wrapper submit-button-group">
			<!-- TODO: Add a goto redirect directive -->
			<Button type="submit" disabled={!isFourthProcessDone}>Continue</Button>
		</div>
	{/if}

	<div class="inline-input-group-wrapper">
		<ProgressBar bind:value={progressValue} />
	</div>
</form>

<style>
	form {
		min-width: 631px;
	}

	.inline-input-group-wrapper {
		display: flex;
		gap: 30px;
		margin-bottom: 15px;
	}

	.input-group {
		width: 300px;
		height: 70px;
	}

	.form-title {
		margin-bottom: 20px;
	}

	p {
		margin-top: -10px;
		color: #a3adc1;
		font-weight: 700;
	}

	.submit-button-group {
		margin-top: 20px;
	}
</style>
