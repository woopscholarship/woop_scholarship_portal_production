<script>
	function tinymceloaded() {
		//set up the tinymceloaded variable as a function here
		// @ts-ignore
		window.tinymce.init({
			selector: 'textarea',
			plugins: 'emoticons',
			toolbar: 'emoticons'
		});
	}



</script>

<svelte:head>
	<script
		src="https://cdn.tiny.cloud/1/xv5mx0q28wyeuvp13rpix7ddpv33n7x5t8172tlxv5syt175/tinymce/5/tinymce.min.js"
		referrerpolicy="origin"
		on:load={tinymceloaded}></script>
</svelte:head>

<div class="flex gap-10">
	<div class="w-1/2 space-y-2">
		<div class="flex flex-col gap-2">
			<label for="name">Program Name</label>
			<input
				class="border p-1 focus:outline-none focus:ring-primary focus:border-primary"
				type="text"
				id="name"
				name="name"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label for="degreeLevel">Degree Level</label>
			<select class="border p-1" name="degreeLevel" id="degreeLevel">
				<option value="ASSOCIATE">Associate</option>
				<option value="BACHELORS">Bachelors</option>
				<option value="MASTERS">Masters</option>
				<option value="DOCTORAL">Doctoral</option>
			</select>
		</div>

		<div class="flex flex-col gap-2">
			<label for="scholarshipType">Scholarship Type</label>
			<select class="border p-1" name="scholarshipType" id="scholarshipType">
				<option value="ACADEMIC" selected>Academic</option>
				<option value="SPORTS">Sports</option>
				<option value="ESSAY">Essay</option>
				<option value="OTHER">Other</option>
			</select>
		</div>

		<div class="flex flex-col gap-2">
			<label for="description">Max Applicants</label>
			<input
				class="border p-1 focus:outline-none focus:ring-primary focus:border-primary"
				type="number"
				id="maxApplicants"
				name="maxApplicants"
				value="100"
			/>
		</div>
		<div class="flex flex-col gap-2">
			<label for="email">Email</label>
			<input
				class="border p-1 focus:outline-none focus:ring-primary focus:border-primary"
				type="text"
				id="email"
				name="email"
			/>
		</div>
	</div>
	<div class="w-1/2 space-y-2">
		<div class="flex flex-col gap-2">
			<label for="address focus:outline-none focus:ring-primary focus:border-primary">Address</label
			>
			<input class="border p-1" type="text" id="address" name="address" />
		</div>

		<div class="flex flex-col gap-2">
			<label for="state">State</label>
			<input
				class="border p-1 focus:outline-none focus:ring-primary focus:border-primary"
				type="text"
				id="state"
				name="state"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label for="city">City</label>
			<input
				class="border p-1 focus:outline-none focus:ring-primary focus:border-primary"
				type="text"
				id="city"
				name="city"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label for="country">Country</label>
			<input
				class="border p-1 focus:outline-none focus:ring-primary focus:border-primary"
				type="text"
				id="country"
				name="country"
			/>
		</div>
		<div class="flex flex-col gap-2">
			<label for="phoneNumber">Phone Number</label>
			<input
				class="border p-1 focus:outline-none focus:ring-primary focus:border-primary"
				type="text"
				id="phoneNumber"
				name="phoneNumber"
			/>
		</div>
	</div>
</div>

<div class="flex flex-col gap-2">
	<label for="website">Website</label>
	<input
		class="border p-1 focus:outline-none focus:ring-primary focus:border-primary"
		type="text"
		id="website"
		name="website"
		value="https://www.prisma.io/docs/concepts/components/prisma-client/crud#create"
	/>
</div>

<div class="flex flex-col gap-2 mt-10">
	<label for="description">Description</label>
	<textarea
		class="border p-1 focus:outline-none focus:ring-primary focus:border-primary"
		name="description"
		id="description"
		cols="30"
		rows="10"
		value="This is a description of the program."
	/>
</div>

<input
	type="submit"
	class="w-1/4 py-2 bg-primary text-white rounded mt-2 hover:cursor-pointer hover:scale-105 transition-transform"
/>
