<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { afterUpdate } from 'svelte/internal';

	export let value: number;

	afterUpdate(() => {
		progress.set(value);
	});

	const progress = tweened(value, {
		duration: 400,
		easing: cubicOut
	});
</script>

<progress value={$progress} />

<style>
	/* For Chrome or Safari */
	progress::-webkit-progress-bar {
		background-color: #eeeeee;
	}

	progress::-webkit-progress-value {
		background-color: var(--primarycolor-dark) !important;
	}

	/* For Firefox */
	progress {
		background-color: #eee;
	}

	progress::-moz-progress-bar {
		background-color: var(--primarycolor-dark) !important;
	}

	/* For IE10 */
	progress {
		background-color: #eee;
		width: 100%;
		height: 5px;
	}

	progress {
		background-color: var(--primarycolor-dark);
	}
</style>
