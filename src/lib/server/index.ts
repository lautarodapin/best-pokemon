import trcp from '$lib/client/trcp';
import type { IPokemon } from '$lib/models';
import prismaClient from '$lib/prismaClient';
import type { inferAsyncReturnType } from '@trpc/server';
import * as trpc from '@trpc/server';
import trpcTransformer from 'trpc-transformer';
import { z } from 'zod';

export const createContext = async () => ({});

// optional
export const responseMeta = () => ({});

const getRandomInt = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
};

export const router = trpc
	.router<inferAsyncReturnType<typeof createContext>>()
	.transformer(trpcTransformer)
	.query('random-pokemons', {
		resolve: async () => {
			const count = 493;
			let firstId: number | undefined = undefined,
				secondId: number | undefined = undefined;
			while ((!firstId || !secondId) && firstId === secondId) {
				if (!firstId) {
					firstId = getRandomInt(0, count);
				}
				if (firstId === secondId || !secondId) {
					secondId = getRandomInt(0, count);
				}
			}
			return { firstId, secondId };
		}
	})
	.query('pokemon-by-id', {
		input: z.object({ id: z.number() }),
		resolve: async ({ input: { id: _id } }) => {
			let dbPokemon = await prismaClient.pokemon.findFirst({ where: { pokemonId: _id } });
			if (dbPokemon) {
				return dbPokemon;
			}
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${_id}`);
			const pokemon = (await response.json()) as IPokemon;
			dbPokemon = await prismaClient.pokemon.create({
				data: { pokemonId: pokemon.id, name: pokemon.name, sprite: pokemon.sprites.front_default }
			});
			if (!dbPokemon) throw new Error('TODO error');
			return dbPokemon;
		}
	})
	.mutation('vote-pokemon', {
		input: z.object({ voteForPokemonId: z.number(), voteAgainstPokemonId: z.number() }),
		resolve: async ({ input }) => {
			const voteAgainstPokemon = await trcp().query('pokemon-by-id', {
				id: input.voteAgainstPokemonId
			});
			const voteForPokemon = await trcp().query('pokemon-by-id', { id: input.voteForPokemonId });
			const vote = await prismaClient.vote.create({
				data: { voteAgainstId: voteAgainstPokemon.id, voteForId: voteForPokemon.id }
			});
			if (!vote) return { ok: false };
			return { ok: true };
		}
	})
	.query('results', {
		input: z.object({
			offset: z.number().default(0),
			limit: z.number().default(5)
		}),
		resolve: async ({ input: { limit, offset } }) => {
			const results = await prismaClient.pokemon.findMany({
				include: {
					_count: { select: { votesAgainst: true, votesFor: true } }
				},
				orderBy: [{ votesFor: { _count: 'desc' } }],
				skip: offset,
				take: limit
			});
			const count = await prismaClient.vote.count();
			return {
				results,
				count,
				limit,
				offset
			};
		}
	});

export type Router = typeof router;
