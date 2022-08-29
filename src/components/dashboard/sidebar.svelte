<script lang="ts">
	import NavigationItem from '$root/components/sidebar/navigationItem.svelte';
	import Logo from '$root/components/common/Logo.svelte';

	interface Route {
		text: string;
		href: string;
	}

	export let displayName: string;
	export let profileImageURL: string;
	export let routes: Route[];

	console.log(routes);
</script>

<!-- https://i.ibb.co/fFj4t1s/IMG-6893.jpg -->

<div class="flex flex-col justify-between flex-grow w-[20%] pt-10 pb-4 bg-white">
	<div>
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
				src={profileImageURL}
				class="w-24 h-24 object-cover rounded-full"
				alt="Paul Bryan Reyes"
			/>

			<h2 class="mt-4 font-bold text-lg">{displayName}</h2>

			<nav class="w-full flex-1 mt-4 px-6 bg-white space-y-1" aria-label="Sidebar">
				{#each routes as item}
					<NavigationItem text={item.text} href={item.href} />
				{/each}
			</nav>
		</div>
	</div>

	<p class="px-8 py-4"><a class="text-red-500 font-semibold" href="/login">Logout</a></p>
</div>
