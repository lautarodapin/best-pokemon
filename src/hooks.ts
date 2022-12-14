// src/hooks.ts or src/hooks/index.ts
import type { Handle } from '@sveltejs/kit';
import { createContext, responseMeta, router } from '$lib/server';
import { createTRPCHandle } from 'trpc-sveltekit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await createTRPCHandle({
		url: '/trpc', // optional; defaults to '/trpc'
		router,
		createContext, // optional
		responseMeta, // optional
		event,
		resolve
	});

	return response;
};
