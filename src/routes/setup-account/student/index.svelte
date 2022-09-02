<script lang="ts">
	import { page } from '$app/stores';
	import StepOneStudentRegister from '$root/components/forms/student_register/StepOneStudentRegister.svelte';
	import StepTwoStudentRegister from '$root/components/forms/student_register/StepTwoStudentRegister.svelte';
	import StepThreeStudentRegister from '$root/components/forms/student_register/StepThreeStudentRegister.svelte';
	import StepFourStudentRegister from '$root/components/forms/student_register/StepFourStudentRegister.svelte';
	import StepFiveStudentRegister from '$root/components/forms/student_register/StepFiveStudentRegister.svelte';

	import FormButton from '$root/components/common/FormButton.svelte';
	import ProgressBar from '$root/components/common/ProgressBar.svelte';
	import { goto } from '$app/navigation';
	import { phoneCodeValid, userId, accountType } from '$root/stores/authStore';
	import { onMount } from 'svelte/internal';
	import { getAuth } from 'firebase/auth';


	onMount(() => {
		const auth = getAuth();
		const user = auth.currentUser;
		console.log('user', user)
		if (user === null) {
			goto('/login')
		}
	})

	$: currentStep = 1;

	let steps = [
		'Tell us about yourself',
		'Contact Details',
		'Education Details',
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
		if (currentStep === steps.length + 1) {
			goto('/login');
		}
	}

	$: firstProcessData = {};
	$: secondProcessData = {};
	$: thirdProcessData = {};
	$: fourthProcessData = {};
	$: fifthProcessData = {};

	$: isFirstProcessDone = false;
	$: isSecondProcessDone = false;
	$: isThirdProcessDone = false;
	$: isFifthProcessDone = false;

	async function setupAccount(): Promise<void> {
		const auth = getAuth();
		const user = auth.currentUser;

		// Session Timeout
		if(!user) goto('/login')


		const id = user!.uid;
		const email = user?.email;
		const accountType = $page.url.pathname.includes('student') ? 'STUDENT' : 'SPONSOR';

		const inputData = {
			id,
			email,
			accountType,
			...firstProcessData,
			...secondProcessData,
			...thirdProcessData,
			...fourthProcessData,
			...fifthProcessData,
		}

		await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify(inputData),
		});
	}
</script>

<form on:submit={setupAccount} action="/" method="POST">
	<div class="input-group form-title">
		<h2 class="text-2xl font-bold mb-4">Personal Information</h2>
		<p>{steps[currentStep - 1]}</p>
	</div>

	{#if currentStep === 1}
		<StepOneStudentRegister
			bind:processData={firstProcessData}
			bind:isProcessDone={isFirstProcessDone}
		/>

		<div class="inline-input-group-wrapper submit-button-group">
			<!-- TODO: Add a goto redirect directive -->
			<FormButton onClick={updateProgressValue} disabled={!isFirstProcessDone}>Continue</FormButton>
		</div>
	{:else if currentStep === 2}
		<StepTwoStudentRegister
			bind:processData={secondProcessData}
			bind:isProcessDone={isSecondProcessDone}
		/>

		<div class="inline-input-group-wrapper submit-button-group">
			<!-- TODO: Add a goto redirect directive -->
			<FormButton onClick={updateProgressValue} disabled={!$phoneCodeValid || !isSecondProcessDone}
				>Continue</FormButton
			>
		</div>
	{:else if currentStep === 3}
		<StepThreeStudentRegister
			bind:processData={thirdProcessData}
			bind:isProcessDone={isThirdProcessDone}
		/>

		<div class="inline-input-group-wrapper submit-button-group">
			<!-- TODO: Add a goto redirect directive -->
			<FormButton onClick={updateProgressValue} disabled={!isThirdProcessDone}>Continue</FormButton>
		</div>
	{:else if currentStep === 4}
		<StepFourStudentRegister bind:processData={fourthProcessData} />

		<div class="inline-input-group-wrapper submit-button-group">
			<FormButton onClick={updateProgressValue}>Continue</FormButton>
		</div>
	{:else if currentStep === 5}
		<StepFiveStudentRegister
			bind:processData={fifthProcessData}
			bind:isProcessDone={isFifthProcessDone}
		/>

		<div class="inline-input-group-wrapper submit-button-group">
			<FormButton type="submit" disabled={!isFifthProcessDone}>Continue</FormButton>
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
