import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination Component", () => {
  const mockSetCurrentPage = jest.fn();

  it("Muestra la pagina actual y el total de paginas", () => {
    render(<Pagination currentPage={1} setCurrentPage={mockSetCurrentPage} total={40} />);
    expect(screen.getByText("1 of 2")).toBeInTheDocument();
  });

  it("Desactiva el boton 'Anterior' en la primera pagina", () => {
    render(<Pagination currentPage={1} setCurrentPage={mockSetCurrentPage} total={40} />);
    expect(screen.getByText("Anterior").closest("button")).toBeDisabled();
  });

  it("Llama a a la funcion cuando se pulsa 'Siguiente'", () => {
    render(<Pagination currentPage={1} setCurrentPage={mockSetCurrentPage} total={40} />);
    fireEvent.click(screen.getByText("Siguiente"));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it("Desactiva el boton 'Siguiente' en la ultima pagina", () => {
    render(<Pagination currentPage={2} setCurrentPage={mockSetCurrentPage} total={40} />);
    expect(screen.getByText("Siguiente").closest("button")).toBeDisabled();
  });
});
