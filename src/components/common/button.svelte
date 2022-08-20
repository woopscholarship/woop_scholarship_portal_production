<script lang="ts">
	export let buttonType: 'anchor' | 'default' | 'submit' | null = null;
	export let href: string | null = null;
	export let value: string | null = null;
</script>


<!-- anchor tag button -->
{#if buttonType === 'anchor'}
	<a class="p-4 py-2 bg-primary text-white" {href}><slot /></a>
{/if}


<!-- input submit button -->
{#if buttonType === 'submit'}
	<input
	type="submit"
	class="flex-2  cursor-pointer h-auto px-10 py-2 bg-primary text-white "
	{value}
/>
{/if}
