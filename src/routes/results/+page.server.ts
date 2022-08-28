import trcp from '$lib/client/trcp';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { results, count, limit, offset } = await trcp().query('results', {});
	return { results, count, limit, offset };
};
