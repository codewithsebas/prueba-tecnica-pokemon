import { Search } from "lucide-react";
import PokeCard from "./PokeCard";
import { PokeListProps } from "../types/types";

const PokeList = ({ pokemonList, singleResult = false }: PokeListProps) => {
  return (
    <>
      {pokemonList.length > 0 ? (
        <div
          className={`grid gap-4 gap-y-10 ${singleResult
            ? "grid-cols-1 justify-center"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            }`}
        >
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