import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PokemonDetails, PokeProps } from "../types/types";
import { fetchPokemonDetails } from "../services/pokeApi";
import { typeColors } from "../svgs/typeColors";

const PokeCard = ({ pokemon }: PokeProps) => {
    const [details, setDetails] = useState<PokemonDetails>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getDetails = async () => {
            try {
                const data = await fetchPokemonDetails(pokemon.name);
                setDetails(data);
            } catch (error) {
                console.error("Error fetching details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getDetails();
    }, [pokemon.name]);

    if (isLoading || !details) return null;

    const { id, name, types } = details;
    const mainType = types[0]?.type?.name || "normal";
    const { gradient, bgColor } = typeColors[mainType] || {
        gradient: "from-gray-200 to-gray-400 border-gray-400",
        bgColor: "bg-gray-400"
    };

    return (
        <Link href={`/pokemon/${id}`} className="w-[380px] h-[520px] ">
            <div className={`relative w-full h-full ${bgColor} rounded-xl p-4 flex flex-col justify-between shadow-[0_0_20px_rgba(255,255,255,10)] text-gray-800 font-sans overflow-hidden`}>
                <div className="absolute inset-0 border-2 bg-gradient-to-br from-white/50 via-transparent to-white/00 pointer-events-none rounded-xl" />
                <div className={`bg-gradient-to-b ${gradient} relative z-40  flex flex-col justify-between h-full border border-gray-400 rounded-xl rounded-tl-3xl`}>
                    <Image src="/pokemon.png" alt="Logo Pokémon" className="ps-2 pt-2" width={200} height={200} />


                    <div className="relative w-full h-60 flex flex-col items-center justify-center py-2 rounded-lg gap-2">
                        <Image
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                            alt={name}
                            width={500}
                            height={500}
                            priority
                            className="object-contain w-full h-64 transition-transform relative z-10"
                        />
                    </div>

                    <div className="flex items-center gap-2  justify-between p-3 pb-4">
                        <h2 className="capitalize text-2xl font-bold ">{name}</h2>

                        <div className={`${bgColor} rounded-full p-1 w-8 h-8 flex items-center justify-center border-2 border-white text-gray-600 font-bold`}>
                            {id}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PokeCard;
