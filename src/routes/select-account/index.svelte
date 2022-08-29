<script lang="ts">
	import { accountType } from '$root/stores/authStore';
	import FormButton from '$root/components/common/FormButton.svelte';
	import { onMount } from 'svelte/internal';

	let isAccountTypeSelected = false;

	onMount(() => {
		const studentLabel = <HTMLInputElement>document.querySelector('label[for="student"]');
		const sponsorLabel = <HTMLInputElement>document.querySelector('label[for="sponsor"]');
		const studentOption = <HTMLInputElement>document.querySelector('#studentOption');
		const sponsorOption = <HTMLInputElement>document.querySelector('#sponsorOption');

		studentLabel.onclick = () => {
			$accountType = 'student';
			studentOption.checked = true;
			sponsorOption.checked = false;
		};

		sponsorLabel.onclick = () => {
			$accountType = 'sponsor';
			sponsorOption.checked = true;
			studentOption.checked = false;
		};
	});
</script>

<form action="/register" method="POST" title="How should woop Identify you?">
	<label for="student" class="account-option">
		<input type="radio" id="studentOption" name="accountType" bind:value={$accountType} />
		<span>I am a Student</span>
	</label>

	<label for="sponsor" class="account-option">
		<input type="radio" id="sponsorOption" name="accountType" bind:value={$accountType} />
		<span>I am a Sponsor</span>
	</label>

	<FormButton
		type="button"
		style="padding: 15px; font-weight: 700; font-size: 15px;"
		href="/register"
		disabled={$accountType === '' ? true : false}
		onClick={() => (isAccountTypeSelected = !isAccountTypeSelected)}>Continue</FormButton
	>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		min-width: 373px;
	}

	p {
		color: #a3adc1;
		font-weight: 700;
		margin: 0;
		margin-bottom: 30px;
	}

	h2 {
		margin-bottom: 15px;
	}

	p {
		margin-top: 15px;
	}

	/* Label Styles */
	label.account-option {
		display: flex;
		justify-content: flex-start;
		background: #fff;
		margin-bottom: 20px;
		padding: 15px;
		font-weight: 400;

		font-size: 16px;
		border: 1px solid #062c35;
		border-radius: 5px;

		&:hover {
			cursor: pointer;
		}
	}

	/* Input Styles */

	input[type='radio'] {
		width: 20px;
		margin-right: 15px;
	}

	input[type='radio']:focus,
	input[type='radio']:active {
		outline: none;
	}

	input[type='radio']:after {
		width: 15px;
		height: 15px;
		border-radius: 15px;
		top: -2px;
		left: -1px;
		position: relative;
		content: '';
		display: inline-block;
		visibility: visible;
	}

	input[type='radio']:checked:after {
		width: 10px;
		height: 10px;

		border-radius: 15px;
		top: -1px;
		left: 5px;
		position: relative;
		background-color: var(--primarycolor-dark);
		content: '';
		display: inline-block;
		visibility: visible;
		outline: var(--primarycolor-dark);
	}
</style>
