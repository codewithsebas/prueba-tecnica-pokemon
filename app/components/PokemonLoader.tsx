"use client";
import Image from "next/image";

export default function PokemonLoader() {
    return (
        <div className="w-full flex flex-col items-center justify-center text-center gap-4 py-10">
            <div className="animate-pulse">
                <Image src="pokeball.svg" alt="Pokeball" className="animate-spin" width={200} height={200} />
            </div>

            {/* Texto de carga con puntos animados */}
            <p className="text-xl md:text-2xl font-bold text-white tracking-wide">
                <span className="inline-block animate-pulse">Cargando Pokemones</span>
                <span className="inline-block animate-blink">...</span>
            </p>
        </div>
    );
}