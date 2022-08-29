<script lang="ts">
	import type { SidebarComponent, RouteData } from '../types/component';
	import { adminRoutes, sponsorRoutes } from '$root/lib/initSidebarNavLinks';

	import { Moon } from 'svelte-loading-spinners';
	import { page } from '$app/stores';
	import { onMount } from 'svelte/internal';

	import Sidebar from '$root/components/dashboard/sidebar.svelte';
	import Container from '$root/components/common/container.svelte';

	let routes: RouteData[];
	let sidebar: SidebarComponent;

	onMount(() => {
		// Check if the user is an admin
		const isAdminRoute = $page.url.pathname.includes('/admin');
		const isSponsorRoute = $page.url.pathname.includes('/sponsor');

		if (isAdminRoute) routes = adminRoutes;
		if (isSponsorRoute) routes = sponsorRoutes;

		// Set Sidebar Properties
		sidebar = {
			displayName: 'Paul Bryan Reyes',
			profileImageURL: 'https://i.ibb.co/fFj4t1s/IMG-6893.jpg',
			routes: routes!
		};
	});
</script>

{#if !routes}
	<Container type="justified">
		<Moon size="60" color="#0fb7a6" unit="px" duration="1s" />
	</Container>
{:else}
	<!-- Layout: default_dashboard -->
	<Container>
		<Sidebar {...sidebar} />
		<main class="min-h-screen w-[80%] border p-12 bg-[#F3F5F8] relative">
			<slot />
		</main>
	</Container>
{/if}
