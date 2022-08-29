<script lang="ts">
	import { accountType } from '$root/stores/authStore';
	import { goto } from '$app/navigation';
	import Input from '$root/components/common/Input.svelte';
	import FormButton from '$root/components/common/FormButton.svelte';

	import {
		getAuth,
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword,
		onAuthStateChanged
	} from 'firebase/auth';

	import { isLoggedIn, userId } from '$root/stores/authStore';

	const inputItems = [
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

	let passwordInvalid = false;
	let emailInvalid = false;

	function register() {
		const auth = getAuth();

		const email = (<HTMLInputElement>document.querySelector('#email'))!.value;
		const password = (<HTMLInputElement>document.querySelector('#password'))!.value;
		const confirmPassword = (<HTMLInputElement>document.querySelector('#confirmPassword'))!.value;

		emailInvalid = false;
		passwordInvalid = false;

		if (password !== confirmPassword) {
			passwordInvalid = true;
			return;
		}

		console.log('creating account...');

		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				signInWithEmailAndPassword(auth, email, password)
					.then((userCredential) => {
						const user = userCredential.user;
						isLoggedIn.update(() => true);
						userId.update(() => user.uid);
						localStorage.setItem('userId', user.uid);
						goto('/setup-account');
					})
					.catch((error) => {
						console.error(error);
					});

					
				goto(`setup-account/${$accountType === 'student' ? 'student' : 'sponsor'}`)

			})
			.catch((error) => {
				if (error.code === 'auth/email-already-in-use') {
					emailInvalid = true;
				}

				console.log(error)
			});
	}
</script>

<form on:submit|preventDefault={register} method="POST">
	{#if passwordInvalid}
		<span class="invalid-prompt"> Password do not match. Please try again </span>
	{/if}

	{#if emailInvalid}
		<span class="invalid-prompt">
			Email Already in use. Please <a href="/login">login</a> to your account to continue the account
			process</span
		>
	{/if}

	{#each inputItems as items}
		<Input {...items} />
	{/each}

	<button type="submit" class="bg-primary p-2 py-3 my-2 rounded text-white font-semibold text-lg hover:scale-105 transition-transform"
		>Register</button
	>
	<p>
		Already have an account? <a href="/login">Log in</a>
	</p>
</form>

<style lang="scss">
	@use '../../styles/mixin';
	@import '../../styles/colors';

	form {
		@include mixin.flex-col;
		min-width: 373px;
	}

	p {
		color: $register-form-subtitle-color;
		font-weight: 600;
		margin: 0;
		margin-bottom: 30px;
	}
</style>
