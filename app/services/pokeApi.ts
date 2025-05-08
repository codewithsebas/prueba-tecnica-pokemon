import { PokemonListItem, PokemonDetails } from "../types/types";

export const fetchPokemonList = async (limit: number, offset: number): Promise<PokemonListItem[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!res.ok) throw new Error("Error fetching Pokémon list");
    const data = await res.json();

    return data.results.map((item: PokemonListItem, index: number) => ({
        id: offset + index + 1,
        name: item.name,
        url: item.url,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + index + 1}.png`
    }));
};

export const fetchPokemonDetails = async (name: string): Promise<PokemonDetails> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/pokemon/${name}`);
    if (!res.ok) throw new Error("Error fetching Pokémon details");

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