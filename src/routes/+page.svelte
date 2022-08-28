<script lang="ts">
	import Button from '$lib/button.svelte';
	import trcp from '$lib/client/trcp';
	import Pokemon from '$lib/pokemon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let { firstId, secondId } = data;
	let voteAgainst: number | undefined;
	let voteFor: number | undefined;

	const vote = async () => {
		if (!voteAgainst || !voteFor) return;
		const { ok } = await trcp(fetch).mutation('vote-pokemon', {
			voteForPokemonId: voteFor,
			voteAgainstPokemonId: voteAgainst
		});
		if (ok === false) return;
		const { firstId: first, secondId: second } = await trcp(fetch).query('random-pokemons');
		voteAgainst = undefined;
		voteFor = undefined;
		if (!first || !second) return;
		firstId = first;
		secondId = second;
	};
</script>

<div class="flex flex-col items-center p-4 rounded-xl bg-slate-400 shadow-xl shadow-slate-600">
	<div class="flex flex-row items-center">
		<Pokemon
			id={firstId}
			on:click={() => {
				voteFor = firstId;
				voteAgainst = secondId;
			}}
			bind:selected={voteFor}
		/>
		VS
		<Pokemon
			id={secondId}
			on:click={() => {
				voteFor = secondId;
				voteAgainst = firstId;
			}}
			bind:selected={voteFor}
		/>
	</div>
	<Button disabled={!voteFor} on:click={vote}>VOTE!</Button>
</div>
