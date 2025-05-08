import { render, screen } from "@testing-library/react";
import PokeCard from "../PokeCard";

const mockPokemon = { name: "charizad", image: "/charizad.png" };

describe("PokeCard Component", () => {
  it("Muestra el nombre del Pokemon", () => {
    render(<PokeCard pokemon={mockPokemon} />);
    expect(screen.getByText(/charizad/i)).toBeInTheDocument();
  });

  it("Muestra el Skeleton cuando carga la imagen", () => {
    render(<PokeCard pokemon={{ ...mockPokemon, image: "" }} />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("Renderiza la imagen cuando se carga", () => {
    render(<PokeCard pokemon={mockPokemon} />);
    expect(screen.getByAltText(/charizad/i)).toBeInTheDocument();
  });
});
