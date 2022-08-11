<script>
	import { studentRoutes } from '$lib/init/initSidebarNavLinks';
	import { fade } from 'svelte/transition';
	import NavigationItem from '$root/components/sidebar/navigationItem.svelte';
</script>

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
				src="https://i.ibb.co/fFj4t1s/IMG-6893.jpg"
				class="w-24 h-24 object-cover rounded-full"
				alt="Paul Bryan Reyes"
			/>
			<h2 class="mt-4 font-bold text-lg">Paul Bryan Reyes</h2>

			<nav class="flex-1 mt-4 px-6 w-full space-y-1" aria-label="Sidebar">
				{#each studentRoutes.profile as item}
					<NavigationItem text={item.text} href={item.href} />
				{/each}
			</nav>
		</div>

		<!-- Navigation -->
		<div class="mt-5 flex-grow flex flex-col">
			<nav class="flex-1 px-6 bg-white space-y-1" aria-label="Sidebar">
				{#each studentRoutes.main as item}
					<NavigationItem text={item.text} href={item.href} />
				{/each}
			</nav>

			<p class="px-8 py-4"><a class="text-red-500 font-semibold" href="../login">Logout</a></p>
		</div>
	</div>

	<!-- MAIN -->
	<main class="min-h-screen w-[80%] border p-12 ">
		<slot />
	</main>
</div>
