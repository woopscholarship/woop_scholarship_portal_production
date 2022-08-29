<script context='module'>
	// @ts-ignore
	export async function load({fetch, params}) {
		const response = await fetch(`/api/getUser?id=${params.id}`)
		const data = await response.json();

		return {
			props: {
				user: data.currentUser
			}
		}
	}
</script>


<script lang="ts">
	import { Moon } from 'svelte-loading-spinners';
	import Container from '$root/components/common/container.svelte';

	import type { User, PersonalInformation } from '@prisma/client';
	import { onMount } from 'svelte/internal';
	import { studentRoutes } from '$root/lib/initSidebarNavLinks';
	import { fade } from 'svelte/transition';
	import NavigationItem from '$root/components/sidebar/navigationItem.svelte';
	import { currentUser } from '$root/stores/authStore';
	

	interface _User extends User{
		UserDetails: PersonalInformation;
	}

	export let user: _User;

	// Set Current Logged In User
	onMount(() => {
		currentUser.update(() => user)
	})
</script>

{#if !$currentUser || !$currentUser.userDetails}
	<Container type="justified">
		<Moon size="60" color="#0fb7a6" unit="px" duration="1s" />
	</Container>
{:else}
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
						<NavigationItem text={item.text} href={item.href} />
					{/each}

					<br>
					{#each studentRoutes.integrated as item}
						<NavigationItem text={item.text} href={item.href} />
					{/each}
				</nav>

				<p class="px-8 py-4"><a class="text-red-500 font-semibold" href="../login">Logout</a></p>
			</div>
		</div>

		<!-- MAIN -->
		<main class="min-h-screen w-[80%] border px-6 py-4 bg-[#e5e7eb]">
			<slot />
		</main>
	</div>

{/if}

