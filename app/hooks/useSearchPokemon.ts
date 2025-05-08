import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { PokemonDetails } from '../types/types';

const fetchPokemon = async (query: string): Promise<PokemonDetails> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/pokemon/${query.toLowerCase()}`);
    
    if (!res.ok) {
        throw new Error("Pokémon no encontrado");
    }

    const data = await res.json();

    return {
        id: data.id,
        name: data.name,
        abilities: data.abilities,
        types: data.types,
        sprites: data.sprites,
        base_experience: data.base_experience,
        height: data.height,
        weight: data.weight,
        evolutionStage: "BASIC"
    };
};

export const useSearchPokemon = (query: string): UseQueryResult<PokemonDetails, Error> => {
    return useQuery({
        queryKey: ['pokemon', query],
        queryFn: () => fetchPokemon(query),
        enabled: !!query.trim(),
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
};