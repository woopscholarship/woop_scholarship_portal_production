<script lang='ts'>
import type { ScholarshipProgram } from "@prisma/client";

export let scholarshipProgram;

$: selectedType = "SCHOLARSHIP";
console.log(scholarshipProgram);


function changeType() {
  selectedType =   (<HTMLInputElement>document.querySelector('#programType')!).value
}

</script>

<form class="w-1/2 flex flex-col gap-1" action="/sponsor/launch-new-program" method="POST">



    <div class="flex flex-col gap-2 mb-2">
      <label for="name">Program Type</label>
      <select id='programType' on:change={changeType}>
        <option value="SCHOLARSHIP">Scholarship Program</option>
        <option value="GRANT">Grant Program</option>
      </select>
    </div>




  {#if selectedType === 'SCHOLARSHIP'}

    <div class="flex flex-col gap-2">
      <label for="name">Scholarship Name</label>
      <input type="text" id="name" name='name' >
    </div>

    <div class="flex flex-col gap-2">
      <label for="degreeLevel">Degree Level</label>
      <select name="degreeLevel" id="degreeLevel">
        <option value="UNDERGRADUATE">UNDERGRADUATE</option>
        <option value="GRADUATE">GRADUATE</option>
        <option value="POST_GRADUATE">POST_GRADUATE</option>
      </select>
    </div>


    <div class="flex flex-col gap-2">
      <label for="description">Description</label>
      <textarea name="description" id="description" cols="30" rows="10"></textarea>
    </div>

    <div class="flex flex-col gap-2">
      <label for="description">Max Applicants</label>
      <input type="number" id="maxApplicants" name='maxApplicants' >
    </div>


    <div class="flex flex-col gap-2">
      <label for="scholarshipType">Scholarship Type</label>
      <select name="scholarshipType" id="scholarshipType">
        <option value="ACADEMIC">ACADEMIC</option>
        <option value="SPORTS">SPORTS</option>
        <option value="ESSAY">ESSAY</option>
        <option value="OTHER">OTHER</option>
      </select>
    </div>

    <div class="flex flex-col gap-2">
      <label for="address">Address</label>
      <input type="text" id="address" name='address' >
    </div>

    <div class="flex flex-col gap-2">
      <label for="state">State</label>
      <input type="text" id="state" name='state' >
    </div>

    <div class="flex flex-col gap-2">
      <label for="city">City</label>
      <input type="text" id="city" name='city' >
    </div>

    <div class="flex flex-col gap-2">
      <label for="country">Country</label>
      <input type="text" id="country" name='country' >
    </div>

    
    <div class="flex flex-col gap-2">
      <label for="email">Email</label>
      <input type="text" id="email" name='email' >
    </div>


    <div class="flex flex-col gap-2">
      <label for="phoneNumber">Phone Number</label>
      <input type="text" id="phoneNumber" name='phoneNumber' >
    </div>


    <div class="flex flex-col gap-2">
      <label for="website">Website</label>
      <input type="text" id="website" name='website' >
    </div>

   
    <input type="submit" class="bg-primary text-white rounded mt-2 hover:cursor-pointer">
  {/if}


  {#if selectedType === 'GRANT'}

  <div class="flex flex-col gap-2">
    <label for="name">Scholarship Name</label>
    <input type="text" id="name" name='name' >
  </div>

  <div class="flex flex-col gap-2">
    <label for="degreeLevel">Degree Level</label>
    <select name="degreeLevel" id="degreeLevel">
      <option value="UNDERGRADUATE">UNDERGRADUATE</option>
      <option value="GRADUATE">GRADUATE</option>
      <option value="POST_GRADUATE">POST_GRADUATE</option>
    </select>
  </div>


  <div class="flex flex-col gap-2">
    <label for="description">Description</label>
    <textarea name="description" id="description" cols="30" rows="10"></textarea>
  </div>
  <div class="flex flex-col gap-2">
    <label for="amountOffer">Amount Offer</label>
    <input type="number" id="amountOffer" name='amountOffer' >
  </div>

  <div class="flex flex-col gap-2">
    <label for="description">Max Applicants</label>
    <input type="number" id="maxApplicants" name='maxApplicants' >
  </div>


  <div class="flex flex-col gap-2">
    <label for="scholarshipType">Max Applicants</label>
    <select name="scholarshipType" id="scholarshipType">
      <option value="ACADEMIC">ACADEMIC</option>
      <option value="SPORTS">SPORTS</option>
      <option value="ESSAY">ESSAY</option>
      <option value="OTHER">OTHER</option>
    </select>
  </div>

  <div class="flex flex-col gap-2">
    <label for="address">Address</label>
    <input type="text" id="address" name='address' >
  </div>

  <div class="flex flex-col gap-2">
    <label for="state">State</label>
    <input type="text" id="state" name='state' >
  </div>

  <div class="flex flex-col gap-2">
    <label for="city">City</label>
    <input type="text" id="city" name='city' >
  </div>

  <div class="flex flex-col gap-2">
    <label for="country">Country</label>
    <input type="text" id="country" name='country' >
  </div>

  
  <div class="flex flex-col gap-2">
    <label for="email">Email</label>
    <input type="text" id="email" name='email' >
  </div>


  <div class="flex flex-col gap-2">
    <label for="phoneNumber">Phone Number</label>
    <input type="text" id="phoneNumber" name='phoneNumber' >
  </div>


  <div class="flex flex-col gap-2">
    <label for="website">Website</label>
    <input type="text" id="website" name='website' >
  </div>

 
  <input type="submit" class="bg-primary text-white rounded mt-2 hover:cursor-pointer">
  {/if}



</form>