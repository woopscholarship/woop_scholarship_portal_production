<script lang="ts">
	import { page } from '$app/stores';

	export let text: string;
	export let href: string;

	const activeSidebarStyle =
		'bg-indigo-50 group flex items-center px-3 py-2 text-l font-medium border-l-4"';
	const defaultSidebarStyle =
		'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-l font-medium border-l-4';
</script>

<a
	{href}
	class={$page.url.pathname.includes(href) ? activeSidebarStyle : defaultSidebarStyle}
	sveltekit:prefetch
>
	{text}
</a>
