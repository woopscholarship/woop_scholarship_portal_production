<script lang="ts">
  export let name: string;
  export let label: string;
</script>

<div>
  <label for={name} class="block text-sm font-medium text-gray-700">{label}</label>
  <select id={name} name={name} class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-primary focus:ring-primary focus:border-primary sm:text-sm rounded-md">
    <slot />
  </select>
</div>