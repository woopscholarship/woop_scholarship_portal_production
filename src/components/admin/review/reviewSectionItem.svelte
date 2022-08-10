<script lang="ts">
	import StatusBadge from '$root/components/statusBadge.svelte';
	export let label: string;
	export let value: any;
	export let type: 'text' | 'image' | null = null;

	function isStatus(value: string) {
		return (
			value === 'APPROVED' ||
			value === 'PENDING' ||
			value === 'REJECTED' ||
			value === 'OPEN' ||
			value === 'CLOSED'
		);
	}
</script>

<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
	<dt class="text-sm font-medium text-gray-500">{label}</dt>
	<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
		{#if isStatus(value)}
			<StatusBadge className="text-lg px-4 py-2 rounded-none" status={value} />
		{:else if type === 'image'}
			<img src={value} alt="">
		{:else}
			{value}
		{/if}
	</dd>
</div>
