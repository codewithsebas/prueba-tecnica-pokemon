"use client";
import { useEffect, useState } from "react";
import { fetchPokemonList } from "./services/pokeApi";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import { Ban } from "lucide-react";
import { PokemonListItem } from "./types/types";
import PokemonList from "./components/PokeList";
import { StarBackground } from "./components/StarBackground";
import PokemonLoader from "./components/PokemonLoader";
import Image from "next/image";

export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const data = await fetchPokemonList(20, (currentPage - 1) * 20);
      setPokemonList(data);
      setError(null);
    } catch {
      setError("Hubo un error al cargar los Pokémon. Intenta nuevamente.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const filteredList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className={`flex items-start justify-center h-full`}>
      <StarBackground />
      <article className="w-full max-w-7xl min-w-2xl p-5 flex flex-col gap-3 min-h-screen duration-200">
        <header className="text-white">
          <Image src="/pokemon.png" alt="Logo Pokémon" className="w-48 h-20 xl:w-80 xl:h-36 object-contain" width={1000} height={1000} priority />
        </header>



        <section className="flex flex-col gap-3">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {error ? (
            <div className="w-full flex flex-col gap-2 items-center justify-center text-white mt-5">
              <p className="text-lg">{error}</p>
              <Ban />
            </div>
          ) : pokemonList.length === 0 ? (
            <PokemonLoader />
          ) : (
            <PokemonList pokemonList={filteredList} />
          )}
        </section>

        {!error && pokemonList.length > 1 && (
          <footer className="pb-5">
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total={100} />
          </footer>
        )}
      </article>
    </main>

  );
}
