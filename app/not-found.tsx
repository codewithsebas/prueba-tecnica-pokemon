import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <main className="flex items-center justify-center bg-red-400 min-h-screen  overflow-hidden">

      <article className="w-full max-w-2xl min-w-2xl p-5 flex flex-col gap-3 duration-200 relative">
        <Image src="/pokeball.svg" alt='Pokeball' width={100} height={100} className='absolute -top-52 -right-40 sm:-top-48 sm:right-0 w-96 h-96 opacity-20 px-5' />
        <header className="text-white flex flex-col gap-2">
          <h1 className="font-bold text-7xl">404</h1>
          <p className="font-light text-xl">Te acabas de perder entre los <b className='font-bold'>Pokémones</b>.</p>
        </header>

        <Link href="/" className='w-fit text-red-500 p-1.5 px-3 ps-1 rounded-md cursor-pointer flex items-center gap-1 duration-200 bg-white hover:bg-white/95'><ChevronLeft /> Regresar</Link>
      </article>
    </main>
  )
}