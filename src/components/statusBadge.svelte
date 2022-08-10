<script lang="ts">
	export let status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'OPEN' | 'CLOSED';
	export let className: string | null = null;
	export let style: string | null = null;
</script>

{#if status === 'APPROVED' || status === 'OPEN'}
	<span
		class={'inline-flex rounded-full bg-green-100 py px-2 text-xs font-semibold leading-5 text-green-800 ' +
			className}
		{style}>{status === 'APPROVED' ? 'Approved' : 'Open'}</span
	>
{/if}

{#if status === 'PENDING'}
	<span
		class={'inline-flex rounded-full bg-orange-100 px-2 text-xs font-semibold leading-5 text-orange-800 ' +
			className}
		{style}>Pending</span
	>
{/if}

{#if status === 'REJECTED' || status === 'CLOSED'}
	<span
		class={'inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800 ' +
			className}
		{style}>{status === 'REJECTED' ? 'Rejected' : 'Closed'}</span
	>
{/if}