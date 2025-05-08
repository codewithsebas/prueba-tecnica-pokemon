import Image from 'next/image';

const PokemonNotFound = ({ message = "Pokémon no encontrado", description = true }: { message?: string, description?: boolean }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center text-white mt-10">
            <Image src="/pikachu.png" alt='Not found Pikachu' width={200} height={200} />
            <h3 className="text-xl md:text-3xl font-semibold text-center">{message}</h3>
            {
                description && (<p className="text-sm md:text-lg text-gray-200 mt-2 text-center">Verifica el nombre o número e inténtalo nuevamente.</p>)
            }

        </div>
    );
};

export default PokemonNotFound;