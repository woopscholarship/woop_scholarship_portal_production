<script lang="ts">
	import '../app.css';
	import app from '$lib/initFirebase';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isLoggedIn, accountType, userId } from '../stores/authStore';

	onMount(async () => {
		const auth = getAuth();
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const response = await fetch('/api/getUserData/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: user.email
					})
				});

				const data = await response.json();

				isLoggedIn.update(() => true);
				accountType.update(() => data.user.userType);
				userId.update(() => user.uid);
			} else {
				isLoggedIn.update(() => false);
				accountType.update(() => '');
				userId.update(() => '');
				goto('/login');
			}
		});
	});
</script>

<header class="w-screen h-[15vh] px-64 flex items-center">
	<a href="https://woopscholarship.com/">
		<img
			src="https://woopscholarship.com/wp-content/uploads/2022/06/logotype-wcolor-1.jpg"
			alt="woop Scholarship"
			class="w-40 h-auto"
		/>
	</a>
</header>

<main class="flex justify-center items-center flex-col h-[75vh]">
	<slot />
</main>
<footer class="w-screen h-[10vh] px-32 flex items-center">
	<p class="w-1/2 text-center">© 2022 woopscholarship.com | All Rights Reserved.</p>
	<p class="w-1/2 text-center"><a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a></p>
</footer>

<style>
	:global(:root) {
		--primarycolor-dark: #0fb7a6;
		--primarycolor-light: #00e8d7;
		--neutral: #fafafa;
		--custom-dark--lighter: #293e72;
		--custom-dark: #0c1c44;

		--input-background-color: #f7f7f7;
		--input-background-color-secondary: #e6e6e6;
		--input-placeholder-color: #ddd;

		--dashboard-sidebar-color: #11264b;
	}
</style>
