import { useEffect, useState } from "react";
import { PokemonListItem } from "../types/types";
import { fetchPokemonList } from "../services/pokeApi";

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
    const [, setPokemonList] = useState<PokemonListItem[]>([]);

    useEffect(() => {
        const loadPokemon = async () => {
            try {
                const pokemons = await fetchPokemonList(1000, 0);
                setPokemonList(pokemons);
            } catch (error) {
                console.error("Error al cargar Pokémon", error);
            }
        };
        loadPokemon();
    }, []);

    return (
        <div className="relative w-full mb-4">
            <input
                type="text"
                placeholder="Buscar Pokémon"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 py-3 text-xl w-full rounded-full ps-4 pr-16 outline-none bg-white/20 border-2 border-white text-white placeholder:text-white/80"
            />
            {searchQuery && (
                <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition"
                >
                    Limpiar
                </button>
            )}
        </div>
    );
};

export default SearchBar;
