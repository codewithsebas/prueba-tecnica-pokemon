import { ErrorScreen } from "@/app/components/ErrorScreen";
import FlipCard from "@/app/components/FlipCard";
import { StarBackground } from "@/app/components/StarBackground";
import { fetchPokemonDetails } from "@/app/services/pokeApi";
import { PokemonDetails } from "@/app/types/types";

const PokemonPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    try {
        const pokemonDetails: PokemonDetails = await fetchPokemonDetails(id);

        return (
            <main className="flex items-center justify-center min-h-screen h-screen p-5 relative">
                <StarBackground />
                <FlipCard pokemon={pokemonDetails} />
            </main>
        );
    } catch (error) {
        console.error("Error al obtener detalles del Pokémon:", error);
        return <ErrorScreen message="No se pudo obtener los detalles del Pokémon." />;
    }
};

export default PokemonPage;