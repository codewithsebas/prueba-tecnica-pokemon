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
import PokemonNotFound from "./components/PokemonNotFound";

export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [allPokemon, setAllPokemon] = useState<PokemonListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("paginationPage");
      return saved ? parseInt(saved, 10) : 1;
    }
    return 1;
  });
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoadingList, setIsLoadingList] = useState(false);

  const hasSearched = !!searchQuery.trim();

  const filteredPokemon = allPokemon.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showingPaginatedList = !hasSearched && pokemonList.length > 0 && !isLoadingList;
  const showingEmptyState = !hasSearched && !isLoadingList && pokemonList.length === 0;

  const fetchPaginatedData = async () => {
    setIsLoadingList(true);
    try {
      const data = await fetchPokemonList(20, (currentPage - 1) * 20);
      setPokemonList(data);
      setFetchError(null);
    } catch {
      setFetchError("Hubo un error al cargar los Pokémon. Intenta nuevamente.");
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    if (!hasSearched) {
      fetchPaginatedData();
    }
  }, [currentPage, hasSearched]);

  useEffect(() => {
    const loadAllPokemon = async () => {
      try {
        const data = await fetchPokemonList(1000, 0);
        setAllPokemon(data);
      } catch (error) {
        console.error("Error al cargar todos los Pokémon", error);
      }
    };
    loadAllPokemon();
  }, []);

  return (
    <main className="flex items-start justify-center h-full">
      <StarBackground />
      <article className="w-full max-w-7xl min-w-2xl p-5 flex flex-col gap-3 min-h-screen duration-200">
        <header className="text-white">
          <Image
            src="/pokemon.png"
            alt="Logo Pokémon"
            className="w-48 h-20 xl:w-80 xl:h-36 object-contain"
            width={1000}
            height={1000}
            priority
          />
        </header>

        <section className="flex flex-col gap-3">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {hasSearched && filteredPokemon.length > 0 && (
            <PokemonList pokemonList={filteredPokemon} />
          )}

          {hasSearched && filteredPokemon.length === 0 && (
            <PokemonNotFound message="No se encontró ningún Pokémon que coincida con tu búsqueda." />
          )}

          {!hasSearched && !fetchError && !isLoadingList && (
            <footer className="pb-5">
              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total={1000} />
            </footer>
          )}

          {!hasSearched && fetchError && (
            <div className="w-full flex flex-col gap-2 items-center justify-center text-white mt-5">
              <p className="text-lg">{fetchError}</p>
              <Ban />
            </div>
          )}

          {!hasSearched && isLoadingList && <PokemonLoader />}
          {showingPaginatedList && <PokemonList pokemonList={pokemonList} />}
          {showingEmptyState && <PokemonNotFound message="No hay Pokémon disponibles" />}
        </section>

        {!hasSearched && !fetchError && !isLoadingList && (
          <footer className="pb-5">
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total={1000} />
          </footer>
        )}
      </article>
    </main>
  );
}
