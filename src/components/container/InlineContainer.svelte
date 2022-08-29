<script lang="ts">
	export let style : string | null = null;
</script>

<div class="inline-input-group-wrapper" {style}>
	<slot />
</div>

<style>
	.inline-input-group-wrapper {
		display: flex;
		gap: 30px;
		width: 100%;
	}
</style>
