import React from 'react'
import PokemonNotFound from './components/PokemonNotFound'
import BackButton from './components/BackButton'

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-red-400 min-h-screen">
      <article className="w-full max-w-2xl min-w-2xl p-5 pt-0 flex flex-col gap-3 duration-200">
        <PokemonNotFound message='Te perdiste entre Pokémones' description={false} />
      </article>
      <BackButton title='Regresar' link='/' />
    </main>
  )
}