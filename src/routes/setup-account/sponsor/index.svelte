<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte/internal';
	import { goto } from '$app/navigation';
	import { phoneCodeValid } from '$root/stores/authStore';

	import StepOneSponsorRegister from '$root/components/forms/sponsor_register/StepOneSponsorRegister.svelte';
	import StepTwoSponsorRegister from '$root/components/forms/sponsor_register/StepTwoSponsorRegister.svelte';
	import StepThreeSponsorRegister from '$root/components/forms/sponsor_register/StepThreeSponsorRegister.svelte';

	import FormButton from '$root/components/common/FormButton.svelte';
	import ProgressBar from '$root/components/common/ProgressBar.svelte';
	import { getFirestore, setDoc, doc } from 'firebase/firestore';
	import { getAuth } from 'firebase/auth';
	import app from '$lib/initFirebase';

	$: currentStep = 1;
	$: subtitle = steps[currentStep - 1];

	let steps = [
		'Company / Organization Information',
		"Representative's Information",
		'Contact Details'
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
</script>

<form action="/" method="POST">
	<div class="input-group form-title">
		<h2 class="text-2xl font-bold mb-4">Personal Information</h2>
		<p>{steps[currentStep - 1]}</p>
	</div>

	{#if currentStep === 1}
		<StepOneSponsorRegister bind:isProcessDone={isFirstProcessDone} />
		<div class="inline-input-group-wrapper submit-button-group">
			<FormButton onClick={updateProgressValue} disabled={!isFirstProcessDone}>Continue</FormButton>
		</div>
	{:else if currentStep === 2}
		<StepTwoSponsorRegister
			bind:isProcessDone={isSecondProcessDone}
		/>
		<div class="inline-input-group-wrapper submit-button-group">
			<FormButton onClick={updateProgressValue} disabled={!isSecondProcessDone}>Continue</FormButton
			>
		</div>
	{:else if currentStep === 3}
		<StepThreeSponsorRegister
			bind:isProcessDone={isThirdProcessDone}
		/>
		<div class="inline-input-group-wrapper submit-button-group">
			<FormButton type="submit" disabled={!$phoneCodeValid || !isThirdProcessDone}
				>Continue</FormButton
			>
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
