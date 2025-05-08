import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";


describe("SearchBar Component", () => {
  const mockSetSearchQuery = jest.fn();

  it("Muestra la entrada del buscador", () => {
    render(<SearchBar searchQuery="" setSearchQuery={mockSetSearchQuery} />);
    expect(screen.getByPlaceholderText("Buscar Pokémon")).toBeInTheDocument();
  });

  it("Actualiza el valor al cambiar", () => {
    render(<SearchBar searchQuery="" setSearchQuery={mockSetSearchQuery} />);
    const input = screen.getByPlaceholderText("Buscar Pokémon");
    fireEvent.change(input, { target: { value: "pikachu" } });
    expect(mockSetSearchQuery).toHaveBeenCalledWith("pikachu");
  });

  it("Muestra la consulta de busqueda actual", () => {
    render(<SearchBar searchQuery="charmander" setSearchQuery={mockSetSearchQuery} />);
    expect(screen.getByDisplayValue("charmander")).toBeInTheDocument();
  });
});
