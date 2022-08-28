import trcp from '$lib/client/trcp';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { firstId, secondId } = await trcp().query('random-pokemons');
	if (!firstId || !secondId) throw error(404, 'Not found');
	return { firstId, secondId };
};
