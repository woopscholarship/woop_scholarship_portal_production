<script lang="ts">
	export let disabled: boolean | null = null;
	export let style: string | null = null;
	export let type: 'submit' | 'button' | 'reset' = 'button';
	export let onClick: any = null;
	export let href: string | null = null;


</script>

{#if href}
	<a {href} on:click={onClick} class={disabled ? 'disabled' : null}>
			<slot />
	</a>
{:else}
	<button {type} {style} {disabled} class={disabled ? 'disabled' : null} on:click={onClick}>
		<slot />
	</button>
{/if}

<style>
	button, a {
		border: none;
		width: 100%;
		border-radius: 5px;
		background: var(--primarycolor-dark);
		color: white;
		cursor: pointer;
		padding: 10px 0;

		transition: 0.3s;
	}

	a {
		text-align: center;
		font-weight: 600;
	}

	button:hover, a:hover{
		transform: scale(1.05);
	}

	.disabled, a.disabled{
		background: #c6c6c6;
		pointer-events: none;
	}
	.disabled:hover {
		transform: none;
		cursor: default;
	}
</style>
