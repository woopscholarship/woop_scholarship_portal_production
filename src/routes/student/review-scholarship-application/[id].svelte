<script lang="ts">
	import TableItem from "$root/components/table/tableItem.svelte";
	export let studentApplication: any;
</script>


<div class="flex gap-4 mt-4">
	<div class="w-full bg-white p-6 rounded shadow-sm">
		<h3 class="text-xl font-semibold">Scholarship Program Details</h3>

		<div class="border-t border-gray-200 py-5 sm:p-0">
			<dl class="sm:divide-y sm:divide-gray-200">
				<TableItem label="" value={''} type='custom'>
          <img class="w-40 h-40 object-cover rounded-full" src={studentApplication.scholarshipProgram.sponsorUser.profileImageUrl} alt={studentApplication.scholarshipProgram.sponsorUser.displayName}>
        </TableItem>
        
				 <TableItem label="Organization Name" value={studentApplication.scholarshipProgram.sponsorUser.displayName} />
				 <TableItem label="Name" value={studentApplication.scholarshipProgram.name} />
				 <TableItem label="Description" value={studentApplication.scholarshipProgram.description} />
				 <TableItem label="Degree Level" value={studentApplication.scholarshipProgram.degreeLevel} />
				 <TableItem label="Scholarship Type" value={studentApplication.scholarshipProgram.scholarshipType} />
				 <TableItem label="Max Applicants" value={studentApplication.scholarshipProgram.maxApplicants} />
				 <TableItem label="Status" value={studentApplication.scholarshipProgram.status} />
				 <TableItem label="Email" value={studentApplication.scholarshipProgram.email} />
				 <TableItem label="Phone Number" value={studentApplication.scholarshipProgram.phoneNumber} />
				 <TableItem label="Address" value={studentApplication.scholarshipProgram.address} />
				 <TableItem label="City" value={studentApplication.scholarshipProgram.city} />
				 <TableItem label="State" value={studentApplication.scholarshipProgram.state} />
				 <TableItem label="Country" value={studentApplication.scholarshipProgram.country} />
			</dl>
		</div>
	</div>
</div>

<div class="flex gap-4 mt-4">
	<div class="w-full bg-white p-6 rounded shadow-sm">
		<h3 class="text-xl font-semibold">Application Details</h3>

		<div class="border-t border-gray-200 py-5 sm:p-0">
			<dl class="sm:divide-y sm:divide-gray-200">
				 <TableItem label="Status" value={studentApplication.status} />
				 <TableItem label="Application Date" value={studentApplication.appliedOn} />
				 <TableItem label="Reason For Application" value={studentApplication.reason} />
			</dl>
		</div>
	</div>
</div>