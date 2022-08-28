<script lang="ts">
	import Button from '$lib/button.svelte';
	import trcp from '$lib/client/trcp';
	import SpinnerSquare from '$lib/loading/spinner-square.svelte';

	export let id: number;
	export let selected: number | undefined;
</script>

<div class="flex flex-col items-center space-y-2 text-slate-600">
	{#await trcp(fetch).query('pokemon-by-id', { id })}
		<div class="w-64 h-64 flex items-center justify-center">
			<SpinnerSquare class="w-32 h-32" fillClass="fill-slate-600" />
		</div>
	{:then value}
		<div class="relative w-64 h-64">
			<img class="w-full" src={value.sprite} alt={value.name} />
			<p class="absolute bottom-0 left-1/2 -translate-x-1/2 capitalize">{value.name}</p>
		</div>
	{/await}
	<Button on:click class={(selected === id && 'bg-slate-600 shadow-xl ') || ''}>Select</Button>
</div>
