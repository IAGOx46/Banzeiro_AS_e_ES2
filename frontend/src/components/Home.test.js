import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./Home";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate
}));

describe("Home", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("exibe os textos principais da tela inicial", () => {
    render(<Home />);

    expect(screen.getByText("Seja Bem Vindo ao Banzeiro")).toBeInTheDocument();
    expect(screen.getByText("O seu site de Monitoramento Climatico")).toBeInTheDocument();
    expect(screen.getByAltText("Banzeiro Logo")).toBeInTheDocument();
  });

  test("navega para cadastro e login pelos botoes", () => {
    render(<Home />);

    fireEvent.click(screen.getByRole("button", { name: "Cadastro" }));
    expect(mockNavigate).toHaveBeenCalledWith("/register");

    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    expect(mockNavigate).toHaveBeenCalledWith("/login");

    fireEvent.click(screen.getByText("Entrar"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
