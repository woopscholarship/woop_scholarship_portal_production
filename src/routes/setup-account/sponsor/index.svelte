<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte/internal';
	import { goto } from '$app/navigation';
	import { phoneCodeValid } from '$root/stores/authStore';

	import StepOneSponsorRegister from '$root/components/forms/sponsor_register/StepOneSponsorRegister.svelte';
	import StepTwoSponsorRegister from '$root/components/forms/sponsor_register/StepTwoSponsorRegister.svelte';
	import StepThreeSponsorRegister from '$root/components/forms/sponsor_register/StepThreeSponsorRegister.svelte';
	import StepFourSponsorRegister from '$root/components/forms/sponsor_register/StepFourSponsorRegister.svelte';

	import FormButton from '$root/components/common/FormButton.svelte';
	import ProgressBar from '$root/components/common/ProgressBar.svelte';
	import { getAuth } from 'firebase/auth';

	$: currentStep = 1;

	let steps = [
		'Company / Organization Information',
		"Representative's Information",
		'Contact Details',
		'Set Appointment'
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

	onMount(() => {
		const auth = getAuth();
		const user = auth.currentUser;

		if (!user) {
			goto('/login');
		}
	});

	$: isFirstProcessDone = false;
	$: isSecondProcessDone = false;
	$: isThirdProcessDone = false;

	$: firstProcessData = {};
	$: secondProcessData = {};
	$: thirdProcessData = {};

	async function setupAccount(): Promise<void> {
		const auth = getAuth();
		const user = auth.currentUser;

		// Session Timeout
		if (!user) goto('/login');

		const id = user!.uid;
		const email = user?.email;
		const accountType = $page.url.pathname.includes('student') ? 'STUDENT' : 'SPONSOR';

		const inputData = {
			id,
			email,
			accountType,
			...firstProcessData,
			...secondProcessData,
			...thirdProcessData
		};

		await fetch('/api/registerSponsor', {
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
		<StepOneSponsorRegister
			bind:processData={firstProcessData}
			bind:isProcessDone={isFirstProcessDone}
		/>
		<div class="inline-input-group-wrapper submit-button-group">
			<FormButton onClick={updateProgressValue} disabled={!isFirstProcessDone}>Continue</FormButton>
		</div>
	{:else if currentStep === 2}
		<StepTwoSponsorRegister
			bind:processData={secondProcessData}
			bind:isProcessDone={isSecondProcessDone}
		/>
		<div class="inline-input-group-wrapper submit-button-group">
			<FormButton onClick={updateProgressValue} disabled={!isSecondProcessDone}>Continue</FormButton
			>
		</div>
	{:else if currentStep === 3}
		<StepThreeSponsorRegister
			bind:processData={thirdProcessData}
			bind:isProcessDone={isThirdProcessDone}
		/>
		<div class="inline-input-group-wrapper submit-button-group">
			<FormButton onClick={updateProgressValue} disabled={!isThirdProcessDone}>Continue</FormButton>
		</div>
	{:else if currentStep === 4}
		<StepFourSponsorRegister />
		<div class="inline-input-group-wrapper submit-button-group">
			<FormButton type="submit">Continue</FormButton>
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
