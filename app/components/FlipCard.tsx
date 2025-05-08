"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PokemonDetails } from "@/app/types/types";
import confetti from 'canvas-confetti';
import { typeColors } from "../svgs/typeColors";
import { typeBgColors } from "../svgs/typeBgColors";
import { typeIcons } from "../svgs/typeIcons";

export default function FlipCard({ pokemon }: { pokemon: PokemonDetails }) {
    const [flipped, setFlipped] = useState(false);
    const { id, name, abilities, types, base_experience, height, weight } = pokemon;

    const mainType = types[0]?.type?.name;
    const { gradient, bgColor } = typeColors[mainType] || { gradient: "from-gray-200 to-gray-400 border-gray-400", bgColor: "bg-gray-400" };

    const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ['FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF']
    };

    function shoot() {
        confetti({
            ...defaults,
            particleCount: 100,
            scalar: 1.2,
            shapes: ['star']
        });

        confetti({
            ...defaults,
            particleCount: 10,
            scalar: 0.75,
            shapes: ['circle']
        });
    }

    function flippedShoot() {
        setFlipped(!flipped);

        setTimeout(() => {
            if (flipped) {
                return;
            } else {
                shoot()
            }
        }, 300)
    };

    useEffect(() => {
        setTimeout(() => {
            setFlipped(true)
            setTimeout(() => {
                shoot()
            }, 300)
        }, 200)
    }, [shoot])

    return (
        <div className="w-[380px] h-auto xl:w-[390px] xl:h-[620px] 2xl:w-[480px] 2xl:h-[720px] [perspective:1000px]">
            <div
                onClick={flippedShoot}
                className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
            >
                <div className="absolute w-full h-full [backface-visibility:hidden] rounded-3xl overflow-hidden">
                    <Image
                        src="/cardPokemon.jpg"
                        alt="Reverso Pokémon"
                        className="w-full h-full rounded-3xl"
                        width={400}
                        height={520}
                        priority
                    />
                </div>

                <div
                    className={`relative w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] ${bgColor} rounded-xl p-4 flex flex-col justify-between shadow-[0_0_20px_rgba(255,255,255,10)] text-gray-800 font-sans overflow-hidden`}
                >
                    <div className="absolute inset-0 border-2 bg-gradient-to-br from-white/50 via-transparent to-white/00 pointer-events-none rounded-xl" />
                    <div className={`bg-gradient-to-b ${gradient} relative z-40 h-full border border-gray-400 rounded-xl rounded-tl-3xl`}>
                        <div className="flex items-start gap-2 justify-between pt-2 pe-4">
                            <div className="flex items-center">
                                <div style={{
                                    WebkitTextStroke: '0.5px white',
                                    color: 'black',
                                }} className="relative italic font-sans font-black -top-[14px] -left-2 text-[16px] w-fit flex justify-center items-center gap-4 rounded-tl-3xl rounded-bl-lg rounded-b-3xl rounded-tr-lg bg-gradient-to-b from-gray-200 via-gray-100 to-gray-400 border border-gray-400 px-4 py-0.5 shadow-sm">

                                    {pokemon.evolutionStage || "BASIC"}
                                </div>
                                <h2 className="capitalize text-2xl xl:text-3xl 2xl:text-4xl font-bold ">{name}</h2>
                            </div>

                            <div className="flex justify-between items-center relative   font-bold text-lg z-20">

                                <span className="flex gap-1 items-center text-2xl xl:text-3xl 2xl:text-4xl">
                                    <p className="text-[10px] font-extrabold relative left-1 top-[9px]">HP</p> {base_experience}
                                    <div className={`border p-[1px] rounded-full ${typeBgColors[mainType] || "bg-gray-600"}`}>
                                        {typeIcons[mainType] || typeIcons["normal"]}
                                    </div>

                                </span>
                            </div>
                        </div>

                        <div
                            className="relative  w-full  xl:h-[21rem] 2xl:h-96 flex flex-col items-center justify-center py-2 rounded-lg gap-2 mb-5 mt-2"
                        >
                            <div className="w-full px-1 flex flex-col h-full items-center justify-center">
                                <div className="relative h-full w-full p-[4px] max-w-[25rem]">
                                    <div
                                        className="absolute h-full px-2 max-w-[25rem] inset-0 border border-gray-400 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 rounded-sm pointer-events-none"
                                        style={{
                                            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                            maskComposite: 'exclude',
                                            WebkitMaskComposite: 'xor',
                                            padding: '3px',
                                            borderRadius: '0.1rem'
                                        }}
                                    ></div>
                                    <Image
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                                        alt={name}
                                        width={200}
                                        height={250}
                                        priority
                                        className="object-contain w-full xl:h-72 2xl:h-80 border border-gray-400 p-2 rounded-sm transition-transform relative z-10"
                                        style={{
                                            filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))",
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                </div>
                                <div className="text-xs xl:text-sm 2xl:text-md w-full relative -top-3 xl:-top-2 2xl:-top-5 z-20 flex justify-center items-center gap-4 rounded-tl-3xl rounded-bl-lg rounded-b-3xl rounded-tr-2xl bg-gradient-to-b from-gray-200 via-gray-100 to-gray-400 border border-gray-400 px-4 py-1 xl:py-0.5 shadow-sm">
                                    <p>NO. 000{id} <span className="capitalize">{types[0]?.type.name}</span> Pokémon</p>
                                    <div className="flex items-center gap-1">
                                        <p className="font-semibold text-gray-700">HT:</p>
                                        <p className="font-normal">{height}</p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <p className="font-semibold text-gray-700">WT:</p>
                                        <p className="font-normal">{weight} lbs</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-3 relative -top-7 z-30">
                            <div className="space-y-1">
                                <h2 className="flex items-center gap-2">
                                    <div
                                        className={`rounded-full border capitalize ${typeBgColors[mainType] || "bg-gray-600"
                                            }`}
                                    >
                                        {typeIcons[mainType] || typeIcons["normal"]}
                                    </div>
                                    <div className={`rounded-full border capitalize ${typeBgColors[mainType] || "bg-gray-600"
                                        }`}>
                                        <svg width="30px" height="30px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M181 181c15 0 60-60 30-105 15-15 15-30 45-30s60 45 60 75-30 60-75 90-120 90-120 165c0 60 45 120 120 120s150-30 150-120c0-60-60-90-90-90-45 0-75 30-90 75 45-60 135-60 135 15 0 45-45 75-105 75-30 0-60-30-60-75s45-90 90-120 90-75 90-120c0-60-45-120-105-120-30 0-60 30-75 45s-45 15-45 60c0 15 30 60 45 60z"></path></g></svg>
                                    </div>
                                </h2>
                            </div>



                            <div className="flex flex-col gap-1 text-md xl:text-md 2xl:text-lg mt-4 bg-black/5 border border-black/10 p-2 rounded-lg">
                                <p className="font-semibold text-md xl:text-md 2xl:text-xl">Habilidades:</p>
                                <ul className="grid grid-cols-3 gap-4 list-none">
                                    {abilities.map((a) => (
                                        <li key={a.ability.name} className="capitalize font-lg">
                                            {a.ability.name}
                                        </li>
                                    ))}
                                </ul>


                            </div>

                            <p className="font-semibold mt-2 text-md xl:text-md 2xl:text-xl">Tipos:</p>
                            <div className="flex gap-1 flex-wrap mt-2">
                                {types.map((t) => (
                                    <span
                                        key={t.type.name}
                                        className="px-3 py-0.5 pb-1 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-400  rounded-full capitalize text-md xl:text-md font-medium"
                                    >
                                        {t.type.name}
                                    </span>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
