<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>
<nav class="bg-gray-800 text-white p-4">
	<a href="/home">Home</a>
	|
	<a href="/about">About</a>
	|
	<a href="/contact">Contact</a>
</nav>
{@render children()}
