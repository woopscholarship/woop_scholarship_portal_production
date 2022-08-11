<script>
	import { onMount } from 'svelte/internal';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import NavigationItem from '$root/components/sidebar/navigationItem.svelte';

	const activeSidebarStyle =
		'bg-indigo-50 group flex items-center px-3 py-2 text-sm font-medium border-l-4"';
	const defaultSidebarStyle =
		'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium border-l-4';

	let navigationItems = [
		{
			text: 'Review Students',
			href: '/admin/review-students'
		},
		{
			text: 'Review Sponsors',
			href: '/admin/review-sponsors'
		},
		{
			text: 'Review Scholarship Programs',
			href: '/admin/review-scholarship-programs'
		},
		{
			text: 'Review Grant Programs',
			href: '/admin/review-grant-programs'
		},
		{
			text: 'Review Student Applications',
			href: '/admin/review-student-applications'
		}
	];
</script>

<div transition:fade class="flex border w-screen min-h-screen">
	<!-- This example requires Tailwind CSS v2.0+ -->
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
			<nav class="flex-1 pl-6 pr-6 bg-white space-y-1" aria-label="Sidebar">
				{#each navigationItems as item}
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
