<script lang="ts">
  import TableItem from "$root/components/table/tableItem.svelte";
	export let scholarship: any;
	console.log(scholarship.sponsorUser);
</script>

<div class="flex gap-4 mt-4">
	<div class="w-full bg-white p-6 rounded shadow-sm">
		<h3 class="text-xl font-semibold">Scholarship Details</h3>

		<div class="border-t border-gray-200 py-5 sm:p-0">
			<dl class="sm:divide-y sm:divide-gray-200">
				<TableItem label="" value={''} type='custom'>
          <img class="w-40 h-40 object-cover rounded-full" src={scholarship.sponsorUser.profileImageUrl} alt={scholarship.sponsorUser.displayName}>
        </TableItem>
        
				<TableItem label="Organization Name" value={scholarship.sponsorUser.displayName} />
				<TableItem label="Name" value={scholarship.name} />
				<TableItem label="Description" value={scholarship.description} />
				<TableItem label="Degree Level" value={scholarship.degreeLevel} />
				<TableItem label="Scholarship Type" value={scholarship.scholarshipType} />
				<TableItem label="Max Applicants" value={scholarship.maxApplicants} />
				<TableItem label="Status" value={scholarship.status} />
				<TableItem label="Email" value={scholarship.email} />
				<TableItem label="Phone Number" value={scholarship.phoneNumber} />
				<TableItem label="Address" value={scholarship.address} />
				<TableItem label="City" value={scholarship.city} />
				<TableItem label="State" value={scholarship.state} />
				<TableItem label="Country" value={scholarship.country} />
			</dl>
		</div>
	</div>
</div>


<br>

<form method="POST" action={`./${scholarship.id}`} class="my-4">
  <div class="flex flex-col">
    <label for="reason">Reason For Application</label>
    <textarea class="p-2" name="reason" id="reason" cols="30" rows="10"></textarea>
  </div>

  <input class='bg-primary text-white px-4 py-2 mt-4 hover:cursor-pointer'type="submit">

</form>