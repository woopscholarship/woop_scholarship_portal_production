<script lang="ts">
	import { onMount } from 'svelte/internal';
	import Icon from 'svelte-awesome';
	import google from 'svelte-awesome/icons/google';
	import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
	import { isLoggedIn, accountType, userId, currentUser } from '$root/stores/authStore';
	import { goto } from '$app/navigation';

	const auth = getAuth();


	$:errorMessage = '';


	async function login() {
		const email = (<HTMLInputElement>document.querySelector('#email'))!.value;
		const password = (<HTMLInputElement>document.querySelector('#password'))!.value;
		const auth = getAuth();

		// Clear error message after every login attempt
		errorMessage = '';

		try {
			const userCred = await signInWithEmailAndPassword(auth, email, password)

			// GET USER DATA
			const response = await fetch('./api/getUserData', {
				method: 'POST',
				body: JSON.stringify({email: email})
			});
			const data = await response.json();

			currentUser.set(data);

			// IF USER DATA IS NOT SET REDIRECT USER TO SETUP ACCOUNT PAGE
			if(data.user === null || data.user === undefined) {
				goto('/setup-account')
			}

			// IF USER DATA IS SET REDIRECT USER TO HOME PAGE
			else if(data.user !== null && data.user !== undefined && data.user.accountType === 'admin') {
				goto('/admin')
			}

			else {
				goto('/'+ data.user.userType.toLowerCase())
			}

		}
		catch(err: any) {
			if(err) {
				errorMessage = 'Error Occured. Please Try Logging in again.'
			}
		}

	
	}

	
</script>

<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
	<div class="bg-white py-8 px-4 sm:px-10">
		<form on:submit|preventDefault={login} class="space-y-6" action="#" method="POST">
			{#if errorMessage !== ''}
				<p class="text-red-500">{errorMessage}</p>
			{/if}
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700"> Email Address </label>
				<div class="mt-1">
					<input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
					/>
				</div>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
				<div class="mt-1">
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
					/>
				</div>
			</div>

			<div class="flex items-center justify-between">
				<div class="flex items-center">
					<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						class="h-4 w-4 border-gray-300 rounded"
					/>
					<label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
				</div>

				<div class="text-sm">
					<a href="#" class="font-medium"> Forgot your password? </a>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="w-full transition-all hover:scale-105 hover:bg-primary flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring-primary"
					>Sign in</button
				>
			</div>
		</form>

		<div class="mt-6">
			<div class="relative">
				<!-- <div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-gray-300" />
				</div> -->
				<!-- <div class="relative flex justify-center text-sm">
					<span class="px-2 bg-white text-gray-500"> Or continue with </span>
				</div> -->
			</div>

			<!-- <div class="mt-6 grid grid-cols-2 gap-3">
				<div>
					<a
						href="#"
						class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
					>
						<span class="sr-only">Sign in with Facebook</span>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
				</div>

				<div>
					<a
						href="#"
						class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
					>
						<Icon data={google} scale={1.3} />
					</a>
				</div>
			</div> -->
		</div>
	</div>
</div>

<p class="not-registered-section">
	Not registered yet? <span><a href="/register">Register now</a></span>
</p>
