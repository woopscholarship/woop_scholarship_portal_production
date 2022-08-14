<script lang="ts">
  import Icon from 'svelte-awesome';
  import Badge from './badge.svelte';
  import bellO from 'svelte-awesome/icons/bellO';
  export let title: string;
  export let username: string;
  export let userImageAddress: string;
</script>

<div class="flex justify-between items-center">
  <h1 class="font-bold text-2xl">{title}</h1>
  <div class="flex items-center">
    <div class='relative mr-4'>
      <Icon data={bellO}/>
      <Badge value={'3'} />
    </div>
    <p class="mr-10 text-lg font-semibold">{username}</p>
    <img class="w-10 h-10 object-cover rounded-full" src={userImageAddress} alt={username}>
  </div>
</div>