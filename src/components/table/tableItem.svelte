<script lang="ts">
  export let label: string;
  export let value: string;
  export let type: 'default' | 'custom' = 'default'
</script>

{#if type === 'default'}
  <div class="py-4 sm:grid sm:grid-cols-3 gap-4">
    <dt class="text-sm font-medium text-gray-500">{label}</dt>
    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
  </div>
{/if}


{#if type === 'custom'}
  <div class="py-4 sm:grid sm:grid-cols-3 gap-4">
    <dt class="text-sm font-medium text-gray-500">{label}</dt>
    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"><slot /></dd>
  </div>
{/if}