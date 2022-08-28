<script lang="ts">
	import trcp from '$lib/client/trcp';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let { results, count, limit, offset } = data;
	let element: Element;

	let intersectionObserver: IntersectionObserver;
	onMount(() => {
		intersectionObserver = new IntersectionObserver(async (entries) => {
			if (entries[0].intersectionRatio <= 0) return;
			const {
				count: newCount,
				results: newResults,
				limit: newLimit,
				offset: newOffset
			} = await trcp(fetch).query('results', { limit, offset: offset + 10 });
			results = [...results, ...newResults];
			offset = newOffset;
			limit = newLimit;
			count = newCount;
		});
		intersectionObserver.observe(element);
	});
</script>

<div class="text-slate-600">
	{#each results as p}
		<div class="flex flex-row items-center border-b-slate-400 border-b-[1px] p-4">
			<div class="relative h-64 w-64">
				<img class="w-full" src={p.sprite} alt={p.name} />
				<p class="absolute bottom-0 left-1/2 -translate-x-1/2 capitalize">{p.name}</p>
			</div>
			<p class="text-4xl">
				{((p._count.votesFor / count) * 100).toFixed(2)} %
			</p>
		</div>
	{/each}
	<div class="h-24" bind:this={element} />
</div>
