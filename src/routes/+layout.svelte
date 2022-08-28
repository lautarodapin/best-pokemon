<script lang="ts">
	import '../app.css';
</script>

<main
	class="bg-slate-300 h-screen max-h-screen w-screen flex flex-col items-center py-4 overflow-scroll"
>
	<span class="text-4xl text-slate-700 font-mono">Best pokemon</span>
	<slot><!-- optional fallback --></slot>
	<div class="absolute bottom-0 bg-slate-400 w-full h-16 flex items-center justify-center">
		<div class="text-slate-800 text-xl">
			<a href="/" class="hover:underline px-2">Vote!</a>
			|
			<a href="/results" class="hover:underline px-2">Results</a>
		</div>
	</div>
</main>
