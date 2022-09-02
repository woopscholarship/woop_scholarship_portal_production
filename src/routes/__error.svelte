<script context="module">
  export function load({ error, status }) {
      return {
          props: {
              message: error.message,
              status // same as status: status
          }
      };
  }
</script>

<script lang="ts">
  export let message: string;
  export let status: string;
</script>


<h1 class="text-2xl font-bold mb-2">Error Loading Page.</h1>
<p class="mb-2"> Please Login Again</p>


<p class="text-lg text-red-500 font-semibold mb-4">{status}</p>

<a href="/login" class="text-lg bg-primary text-white px-4 py-2 rounded">
  Go back to login
</a>
