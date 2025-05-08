// PokeCard.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import PokeCard from "../PokeCard";
import { fetchPokemonDetails } from "../../services/pokeApi";

jest.mock("../../services/pokeApi");

const mockDetails = {
  id: 6,
  name: "charizad",
  types: [{ type: { name: "fire" } }],
  abilities: [],
  base_experience: 240,
  height: 17,
  weight: 905,
  sprites: {
    front_default: "",
    other: {
      dream_world: {
        front_default: "",
      },
    },
  },
};

describe("PokeCard Component", () => {
  beforeEach(() => {
    (fetchPokemonDetails as jest.Mock).mockResolvedValue(mockDetails);
  });

  it("Muestra el nombre del Pokemon", async () => {
    render(<PokeCard pokemon={{ id: 1, name: "charizad", image: "/charizad.png" }} />);
    await waitFor(() => {
      expect(screen.getByText(/charizad/i)).toBeInTheDocument();
    });
  });

  it("Renderiza la imagen cuando se carga", async () => {
    render(<PokeCard pokemon={{ id: 1, name: "charizad", image: "/charizad.png" }} />);
    await waitFor(() => {
      expect(screen.getByAltText(/charizad/i)).toBeInTheDocument();
    });
  });
});
