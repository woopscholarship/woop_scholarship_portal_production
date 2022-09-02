<script lang="ts">
	import type { SidebarComponent, RouteData } from '../types/component';
	import { adminRoutes, sponsorRoutes } from '$root/lib/initSidebarNavLinks';

	import { Moon } from 'svelte-loading-spinners';
	import { page } from '$app/stores';
	import { onMount } from 'svelte/internal';
	import { getAuth } from 'firebase/auth';
	import { goto } from '$app/navigation';

	import app from '$lib/initFirebase';
	import Sidebar from '$root/components/dashboard/sidebar.svelte';
	import Container from '$root/components/common/container.svelte';

	let routes: RouteData[];
	let sidebar: SidebarComponent;

	let currentUser: any;
	const auth = getAuth();

	onMount(async () => {
		currentUser = auth.currentUser;

		if (currentUser === null || currentUser === undefined) {
			goto('/login');
		}

		// Check if the user is an admin
		const isAdminRoute = $page.url.pathname.includes('/admin');
		const isSponsorRoute = $page.url.pathname.includes('/sponsor');

		if (currentUser) {
			if (isAdminRoute) {
				routes = adminRoutes;

				sidebar = {
					displayName: 'ADMIN',
					profileImageURL: 'https://ui-avatars.com/api/?background=0fb7a6&color=fff&name=ADMIN',
					routes: routes
				};

				// Get the user's account type
				const response = await fetch('./api/getUserData', {
					method: 'POST',
					body: JSON.stringify({ email: currentUser.email })
				});

				const { user } = await response.json();

				// seorockettools@gmail.com
				// FORCE USER TO LOGIN AS ADMIN TO ACCESS ADMIN PAGES
				console.log('user.accountType',user.accountType !== 'ADMIN');
				// if(user.accountType !== 'ADMIN') {
				// 	goto('/login');
				// }
			}

			if (isSponsorRoute) {
				routes = sponsorRoutes;

				sidebar = {
					displayName: 'ADMIN',
					profileImageURL: 'https://ui-avatars.com/api/?background=0fb7a6&color=fff&name=ADMIN',
					routes: routes
				};
			}

			
		}

		
		
	});
</script>

{#if routes !== undefined}
	<!-- Layout: default_dashboard -->
	<Container>
		<Sidebar {...sidebar} />
		<main class="min-h-screen w-[80%] border p-12 bg-[#F3F5F8] relative">
			<slot />
		</main>
	</Container>
{:else}
	<Container type="justified">
		<Moon size="60" color="#0fb7a6" unit="px" duration="1s" />
	</Container>
{/if}
