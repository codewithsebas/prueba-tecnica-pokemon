import { render, screen } from "@testing-library/react";
import PokeList from "../PokeList";

const mockPokemonList = [
  { name: "charizad", image: "/charizad.png" },
  { name: "charmander", image: "/charmander.png" },
];

describe("PokeList Component", () => {
  it("Muestra la lista de Pokemones", () => {
    render(<PokeList pokemonList={mockPokemonList} />);
    expect(screen.getByText(/charizad/i)).toBeInTheDocument();
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });

  it("Muestra el estado vacio cuando no hay Pokemones", () => {
    render(<PokeList pokemonList={[]} />);
    expect(screen.getByText(/No hay Pokemones/i)).toBeInTheDocument();
  });
});
