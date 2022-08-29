<script lang="ts">
	import Icon from 'svelte-awesome';
	import Badge from '$root/components/dashboard/badge.svelte';
	import bellO from 'svelte-awesome/icons/bellO';
	export let title: string;
	export let userImageAddress: string;
</script>

<div class="bg-white flex justify-between items-center rounded px-6 py-4">
	<h1 class="font-bold text-lg">{title}</h1>
	<div class="flex justify-end items-center gap-2 w-1/6">
		<div class="relative mr-4">
			<Icon data={bellO} scale={1.5} />
			<Badge value={'3'} />
		</div>
		<img class="w-9 h-19 object-cover rounded-full" src={userImageAddress} alt=''/>
	</div>
</div>
