<script>
	import { adminRoutes } from '$lib/init/initSidebarNavLinks';
	import { fade } from 'svelte/transition';
	import NavigationItem from '$root/components/sidebar/navigationItem.svelte';
</script>

<div transition:fade class="flex border w-screen min-h-screen">
	<!-- BRAND LOGO -->
	<div class="flex flex-col flex-grow w-[20%] pt-5 pb-4 bg-white ">
		<div class="flex justify-center flex-shrink-0 px-4 space-y-5">
			<img
				src="https://woopscholarship.com/wp-content/uploads/2022/06/logotype-wcolor-1.jpg"
				alt="woop Scholarship"
				class="w-32 h-auto"
				loading="lazy"
			/>
		</div>
		<div class="mt-5 flex-grow flex flex-col">
			<!-- NAVIGATION ELEMENT -->
			<nav class="flex-1 pl-6 pr-6 bg-white space-y-1" aria-label="Sidebar">
				{#each adminRoutes as item}
					<NavigationItem text={item.text} href={item.href} />
				{/each}
			</nav>

			<p class="px-8 py-4"><a class="text-red-500 font-semibold" href="../login">Logout</a></p>
		</div>
	</div>

	<main class="min-h-screen w-[80%] border p-12 ">
		<slot />
	</main>
</div>
