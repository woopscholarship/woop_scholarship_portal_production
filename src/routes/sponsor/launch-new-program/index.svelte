<script lang="ts">
  import { page } from '$app/stores';
	import LaunchScholarshipForm from '$root/components/sponsor/launchScholarshipForm.svelte';

	export let scholarshipProgram;

	$: selectedType = 'SCHOLARSHIP';

	function changeType() {
		selectedType = (<HTMLInputElement>document.querySelector('#programType')!).value;
	}

</script>

<form  class="w-full flex flex-col gap-1 bg-white p-10" action={$page.url.pathname} method="POST">
  <div class="pb-5 border-b border-gray-200">
   
    <h3 class="text-3xl mb-5  leading-6 font-bold text-primary">Help us make a difference in someone’s life!</h3>

    <p class="mt-2 max-w-4xl text-sm text-gray-600 font-medi">Your generous donation will help students rekindle their dreams and hopes! Help us make this world a brighter place! Your gift will go towards WOOP Scholars funds, which will be used to generate more scholarships and grants to accept and award more scholars!</p>

    <div class="mt-4 flex flex-col">
      <label for="programType" class="text-md leading-6 font-medium text-gray-600">Select Program Type</label>
      <select class="w-1/3 mt-2 p-2 border" name="programType" id="programType" on:change={changeType}>
        <option value="SCHOLARSHIP">Scholarship Program</option>
        <option value="GRANT">Grant Program</option>
      </select>
    </div>
  </div>

		<LaunchScholarshipForm />
</form>
