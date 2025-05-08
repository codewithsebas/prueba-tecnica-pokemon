import { SearchBarProps } from "../types/types";


const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
    return (
        <input
            type="text"
            placeholder="Buscar Pokémon"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 py-3 text-xl w-full rounded-full ps-4 outline-none bg-white/20 border-2 border-white text-white placeholder:text-white/80 mb-4"
        />
    );
};

export default SearchBar;
