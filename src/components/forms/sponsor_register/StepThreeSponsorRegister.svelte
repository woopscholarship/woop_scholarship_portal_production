<script lang="ts">
	// @ts-nocheck
	import { onMount } from 'svelte/internal';
	import { phoneCodeValid } from '$root/stores/authStore';
	import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
	import validatePhoneNumber from '$lib/validation/validatePhoneNumber';

	import Input from '$root/components/common/Input.svelte';
	import InlineContainer from '$root/components/container/InlineContainer.svelte';

	// Component Data
	const inputItems = [
		[
			{
				type: 'text',
				id: 'addressOne',
				name: 'addressOne',
				placeholder: 'Enter Address Line 1',
				label: 'Address 1',
				required: true
			},
			{
				type: 'text',
				id: 'addressTwo',
				name: 'addressTwo',
				placeholder: 'Enter Address Line 2',
				label: 'Address 2'
			}
		],
		[
			{
				type: 'text',
				id: 'city',
				name: 'city',
				placeholder: 'Enter City',
				label: 'City',
				required: true
			},
			{
				type: 'text',
				id: 'province',
				name: 'province',
				placeholder: 'Enter Province',
				label: 'Province',
				required: true
			}
		],
		[
			{
				type: 'text',
				id: 'country',
				name: 'country',
				placeholder: 'Enter Country',
				label: 'Country',
				required: true
			},
			{
				type: 'text',
				id: 'postalCode',
				name: 'postalCode',
				placeholder: 'Enter Postal Code',
				label: 'Postal Code',
				required: true
			}
		],
		[
			{
				type: 'text',
				id: 'phoneNumber',
				name: 'phoneNumber',
				placeholder: '+639669257362',
				label: 'Phone Number',
				required: true
			},
			// {
			// 	type: 'text',
			// 	id: 'phoneCode',
			// 	name: 'phoneCode',
			// 	placeholder: 'Enter Phone Code',
			// 	label: 'Verify Phone Code'
			// }
		]
	];


	export let isProcessDone = false;
	export let processData = {};

	let inputElementIds = [
		'#addressOne',
		'#city',
		'#province',
		'#country',
		'#postalCode',
		'#phoneNumber'
	];

	onMount(() => {
		inputElementIds.forEach((inputItemId) => {
			document.querySelector(inputItemId)?.addEventListener('change', () => {
				const addressOne = (<HTMLInputElement>document.querySelector('#addressOne'))!.value;
				const addressTwo = (<HTMLInputElement>document.querySelector('#addressTwo'))!.value;
				const province = (<HTMLInputElement>document.querySelector('#province'))!.value;
				const city = (<HTMLInputElement>document.querySelector('#city'))!.value;
				const country = (<HTMLInputElement>document.querySelector('#country'))!.value;
				const postalCode = (<HTMLInputElement>document.querySelector('#postalCode'))!.value;
				const phoneNumber = (<HTMLInputElement>document.querySelector('#phoneNumber'))!.value;

				if (
					addressOne !== '' &&
					city !== '' &&
					province !== '' &&
					country !== '' &&
					postalCode !== '' &&
					phoneNumber !== ''
				) {
					processData = {
						addressOne,
						addressTwo,
						city,
						province,
						country,
						postalCode,
						phoneNumber
					};

					isProcessDone = true;
					console.log($phoneCodeValid, isProcessDone);
				}
			});
		});
	});
</script>

<!-- Invalid Phone Number Prompt -->
<!-- {#if invalidPhoneNumber}
	<div class="error-prompt">
		Invalid Phone Number, Please follow the format example: +639669257362
	</div>
{/if} -->

<!-- {#if invalidPhoneCode}
	<div style="color: red; font-weight: 600; font-size: 15px;">
		Invalid Phone Code. Please try again.
	</div>
{/if} -->

<!-- Check Verification Code On Phone Number -->
<!-- {#if verificationSent}
	<div class="verification-prompt">
		Sent a verification code on your Phone Number. Please enter the code below.
	</div>
{/if} -->

<!-- {#if $phoneCodeValid}
	<div class="verification-prompt">Phone Code Validated. Please Continue!</div>
{/if} -->

{#each inputItems as inputItem, x}
	<InlineContainer>
		{#each inputItem as item, y}
			<!--
				{#if x === inputItems.length - 1}
				<Input {...item} inputStyle="inline">
					{#if y === 0}
						<Button id="sendPhoneCode" style="height:39px;" onClick={sendPhoneSMS}>Send SMS</Button>
					{/if}
					{#if y === 1}
						<div>
							<div id="g-recaptcha" />
							<Button
								id="verifyPhoneCode"
								style="height:39px;"
								onClick={verifyPhoneCode}
								disabled={verificationSent !== undefined && !verificationSent}>Verify Code</Button
							>
						</div>
					{/if}
				</Input>
			{:else}
				<Input {...item} />
			{/if}
			-->

			<Input {...item} />
		{/each}
	</InlineContainer>
{/each}

<style lang="scss">
	@import '../../../styles/colors';

	.error-prompt {
		color: red;
		font-weight: 600;
		font-size: 15px;
	}
</style>
