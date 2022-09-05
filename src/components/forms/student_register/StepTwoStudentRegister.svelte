<script lang="ts">
	// @ts-nocheck

	import { getAuth } from 'firebase/auth';
	import { onMount } from 'svelte/internal';
	import Input from '$root/components/common/Input.svelte';
	import InlineContainer from '$root/components/container/InlineContainer.svelte';

	// Component Data
	const inputItems = [
		[
			{
				type: 'text',
				id: 'currentAddress',
				name: 'currentAddress',
				placeholder: 'Enter Current Address',
				label: 'Address',
				required: true
			},
			{
				type: 'text',
				id: 'permanentAddress',
				name: 'permanentAddress',
				placeholder: 'Enter Permanent Address',
				label: 'Address'
			}
		],
		[
			{
				type: 'text',
				id: 'currentCity',
				name: 'currentCity',
				placeholder: 'Enter City',
				label: 'City',
				required: true
			},
			{
				type: 'text',
				id: 'permanentCity',
				name: 'permanentCity',
				placeholder: 'Enter Permanent City',
				label: 'City',
				required: true
			}
		],
		[
			{
				type: 'text',
				id: 'currentState',
				name: 'currentState',
				placeholder: 'Enter Current State',
				label: 'State',
				required: true
			},
			{
				type: 'text',
				id: 'permanentState',
				name: 'permanentState',
				placeholder: 'Enter Permanent State',
				label: 'State',
				required: true
			}
		],
		[
			{
				type: 'text',
				id: 'currentCountry',
				name: 'currentCountry',
				placeholder: 'Enter Current Country',
				label: 'Country',
				required: true
			},
			{
				type: 'text',
				id: 'permanentCountry',
				name: 'permanentCountry',
				placeholder: 'Enter Permanent Country',
				label: 'Country',
				required: true
			}
		],
		[
			{
				type: 'text',
				id: 'currentPostalCode',
				name: 'currentPostalCode',
				placeholder: 'Enter Current Postal Code',
				label: 'Postal Code / Zip Code',
				required: true
			},
			{
				type: 'text',
				id: 'permanentPostalCode',
				name: 'permanentPostalCode',
				placeholder: 'Enter Current Permanent Code',
				label: 'Postal Code / Zip Code',
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
			}
			// {
			// 	type: 'text',
			// 	id: 'phoneCode',
			// 	name: 'phoneCode',
			// 	placeholder: 'Enter Phone Code',
			// 	label: 'Verify Phone Code'
			// }
		]
	];

	const auth = getAuth();

	export let isProcessDone = false;
	export let processData: any = {};

	let inputElementIds = [
		'#currentAddress',
		'#currentCity',
		'#currentState',
		'#currentCountry',
		'#currentPostalCode',
		'#permanentAddress',
		'#permanentCity',
		'#permanentState',
		'#permanentCountry',
		'#permanentPostalCode',
		'#phoneNumber'
	];

	onMount(() => {
		inputElementIds.forEach((inputItemId) => {
			document.querySelector(inputItemId)?.addEventListener('change', () => {
				const currentAddress = (<HTMLInputElement>document.querySelector('#currentAddress'))!.value;
				const currentCity = (<HTMLInputElement>document.querySelector('#currentCity'))!.value;
				const currentState = (<HTMLInputElement>document.querySelector('#currentState'))!.value;
				const currentCountry = (<HTMLInputElement>document.querySelector('#currentPostalCode'))!
					.value;
				const currentPostalCode = (<HTMLInputElement>document.querySelector('#currentPostalCode'))!
					.value;
				const permanentAddress = (<HTMLInputElement>document.querySelector('#permanentAddress'))!
					.value;
				const permanentCity = (<HTMLInputElement>document.querySelector('#permanentCity'))!.value;
				const permanentState = (<HTMLInputElement>document.querySelector('#permanentState'))!.value;
				const permanentCountry = (<HTMLInputElement>document.querySelector('#permanentCountry'))!
					.value;
				const permanentPostalCode = (<HTMLInputElement>(
					document.querySelector('#permanentPostalCode')
				))!.value;
				const phoneNumber = (<HTMLInputElement>document.querySelector('#phoneNumber'))!.value;

				if (
					currentAddress !== '' &&
					currentCity !== '' &&
					currentState !== '' &&
					currentCountry !== '' &&
					currentPostalCode !== '' &&
					permanentAddress !== '' &&
					permanentCity !== '' &&
					permanentState !== '' &&
					permanentCountry !== '' &&
					permanentPostalCode !== '' &&
					phoneNumber !== ''
				) {
					processData = {
						currentAddress,
						currentCity,
						currentState,
						currentCountry,
						currentPostalCode,
						permanentAddress,
						permanentCity,
						permanentState,
						permanentCountry,
						permanentPostalCode,
						phoneNumber
					};

					isProcessDone = true;
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
			<!-- {#if x === inputItems.length - 1} -->
			<!-- <Input {...item} inputStyle="inline">
					{#if y === 0} -->
			<!-- <Button id="sendPhoneCode" style="height:39px;" onClick={sendPhoneSMS}>Send SMS</Button> -->
			<!-- {/if} -->
			<!-- VERIFY PHONE CODE -->
			<!-- {#if y === 1}
						<div>
							<div id="g-recaptcha" />
							<Button
								id="verifyPhoneCode"
								style="height:39px;"
								onClick={verifyPhoneCode}
								disabled={verificationSent !== undefined && !verificationSent}>Verify Code</Button
							>
						</div>
					{/if} -->
			<!-- </Input> -->
			<!-- {:else}
				<Input {...item} />
			{/if} -->

			<Input {...item} />
		{/each}
	</InlineContainer>
{/each}

<style lang="scss">
	@import '../../../styles/colors';

	.verification-prompt {
		color: $primary-color;
		font-weight: 600;
	}

	.error-prompt {
		color: red;
		font-weight: 600;
		font-size: 15px;
	}
</style>
