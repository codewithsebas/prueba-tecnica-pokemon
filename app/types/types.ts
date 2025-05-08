export interface Ability {
    ability: {
        name: string;
    };
}

export interface Type {
    type: {
        name: string;
    };
}

export interface Sprite {
    front_default: string;
}

export interface BackButtonProps {
    title: string;
    link: string;
}

export interface PaginationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    total: number;
}

export interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}

export interface Pokemon {
    id: number;
    name: string;
    image: string;
}

export interface PokemonListItem {
    id: number;
    name: string;
    url?: string;
    image?: string;
}

export interface PokemonDetails extends PokemonListItem {
    abilities: Ability[];
    types: Type[];
    sprites: Sprite;
    base_experience: number;
    height: number;
    weight: number;
    evolutionStage?: string;
}

export interface PokeProps {
    pokemon: PokemonListItem;
}

export interface PokeListProps {
    pokemonList: PokemonListItem[];
    singleResult?: boolean;
}