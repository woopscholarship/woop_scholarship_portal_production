<script lang="ts">
  import "../app.css";
</script>


<header class="w-screen h-[15vh] px-64 flex items-center">
<a href="https://woopscholarship.com/">
  <img src="https://woopscholarship.com/wp-content/uploads/2022/06/logotype-wcolor-1.jpg" alt="woop Scholarship" class="w-40 h-auto">
</a>
</header>

<main class="flex justify-center items-center flex-col h-[75vh]">  
  <slot />
</main>
<footer class="w-screen h-[10vh] px-32 flex items-center">
  <p class="w-1/2 text-center">© 2022 woopscholarship.com | All Rights Reserved.</p>
	<p class="w-1/2 text-center"><a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a></p>
</footer>