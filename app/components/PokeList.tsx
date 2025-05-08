import { Search } from "lucide-react";
import PokeCard from "./PokeCard";
import { PokeListProps } from "../types/types";

const PokeList = ({ pokemonList }: PokeListProps) => {
  return (
    <>
      {pokemonList.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {pokemonList.map((pokemon) => (
            <PokeCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2 items-center justify-center text-white mt-5">
          <p className="text-lg">No hay Pokemones.</p>
          <Search />
        </div>
      )}
    </>
  );
};

export default PokeList;