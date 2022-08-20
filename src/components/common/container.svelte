<script lang="ts">
	import { fade } from 'svelte/transition';

  export let type: 'justified' | 'default' = 'default'

  let styles = {
    justified: "flex justify-center items-center w-screen h-screen",
    default: "flex border w-screen min-h-screen"
  }

</script>

<div transition:fade class={styles[type]}>
  <slot />
</div>