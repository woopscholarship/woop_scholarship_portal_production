<script lang="ts">
	import type { User } from '@prisma/client';
	import { goto } from '$app/navigation';
	import { Moon } from 'svelte-loading-spinners';
	import Container from '$root/components/common/container.svelte';

	import app from '$lib/initFirebase';
	import { onMount } from 'svelte/internal';
	import { studentRoutes } from '$root/lib/initSidebarNavLinks';
	import { fade } from 'svelte/transition';
	import NavigationItem from '$root/components/sidebar/navigationItem.svelte';
	import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
	import { isLoggedIn, accountType, userId } from '$root/stores/authStore';

	let currentUser: any;
	let promiseData = getUserData();

	onMount(async () => {
		const auth = getAuth();
		currentUser = auth.currentUser;

		if (!currentUser) {
			goto('/login');
		}

		onAuthStateChanged(auth, (user) => {
			if (!user) {
				isLoggedIn.update(() => false);
				accountType.update(() => '');
				userId.update(() => '');
				goto('/login');
			}
		});
	});

	async function getUserData(): Promise<any> {
		const auth = getAuth();
		currentUser = auth.currentUser;

		if (currentUser) {
			const response = await fetch('/api/getUserData/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: currentUser.email
				})
			});

			const user = await response.json();

			console.log($isLoggedIn);
			console.log($accountType);
			console.log($userId);

			return user;
		}
	}

	function logout() {
		const auth = getAuth();

		signOut(auth)
			.then(() => {
				isLoggedIn.update(() => false);
				accountType.update(() => '');
				userId.update(() => '');
				goto('/login');
			})
			.catch((error) => {
				console.log('Code:', error.code);
				console.log('Message:', error.message);
			});
	}
</script>

{#if currentUser !== null && currentUser !== undefined && promiseData !== null && promiseData !== undefined}
	{#await promiseData}
		<div class="flex justify-center items-center w-screen h-screen">
			<Moon size="60" color="#0fb7a6" unit="px" duration="1s" />
		</div>
	{:then { user }}
		<!-- Layout: student_dashboard -->
		<div transition:fade class="flex border w-screen min-h-screen">
			<!-- Sidebar -->
			<div class="flex flex-col flex-grow w-[20%] pt-10 pb-4 bg-white">
				<!-- Brand Logo -->
				<div class="flex justify-center flex-shrink-0 px-4 space-y-5">
					<img
						src="https://woopscholarship.com/wp-content/uploads/2022/06/logotype-wcolor-1.jpg"
						alt="woop Scholarship"
						class="w-32 h-auto"
						loading="lazy"
					/>
				</div>

				<div class="pt-11 mb-10 flex items-center flex-col">
					<img
						src={user.profileImageUrl}
						class="w-24 h-24 object-cover rounded-full"
						alt={user.displayName}
					/>
					<h2 class="mt-4 font-bold text-lg">{user.displayName}</h2>

					<!-- <nav class="flex-1 mt-4 px-6 w-full space-y-1" aria-label="Sidebar">
					
				</nav> -->
				</div>

				<!-- Navigation -->
				<div class="flex-grow flex flex-col gap-10">
					<nav class="flex-1 px-6 bg-white space-y-1" aria-label="Sidebar">
						{#each studentRoutes.profile as item}
							<NavigationItem text={item.text} href={item.href} />
						{/each}
						{#each studentRoutes.main as item}
							{#if item.text === 'Applied Scholarships'}
								<NavigationItem text={item.text} href={item.href + '/' + $userId} />
							{:else}
								<NavigationItem text={item.text} href={item.href} />
							{/if}
						{/each}

						<br />
						<!-- {#each studentRoutes.integrated as item}
					<NavigationItem text={item.text} href={item.href} />
				{/each} -->
					</nav>

					<p class="px-8 py-4">
						<button class="text-red-500 font-semibold" on:click={logout}>Logout</button>
					</p>
				</div>
			</div>

			<!-- MAIN -->
			<main class="min-h-screen w-[80%] border px-6 py-4 bg-[#e5e7eb]">
				<slot />
			</main>
		</div>
	{/await}
{:else}
	<div class="flex justify-center items-center w-screen h-screen">
		<Moon size="60" color="#0fb7a6" unit="px" duration="1s" />
	</div>
{/if}
