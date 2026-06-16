import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Login from "./Login";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate
}));

jest.mock("../firebase", () => ({
  auth: { name: "auth" },
  db: { name: "db" }
}));

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn()
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn()
}));

describe("Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
    window.alert = jest.fn();
    window.console.error = jest.fn();
    window.console.warn = jest.fn();
    doc.mockReturnValue({ path: "users/user-1" });
    getDoc.mockResolvedValue({ exists: () => true });
    setDoc.mockResolvedValue(undefined);
  });

  test("alterna a visibilidade da senha", () => {
    render(<Login />);

    const password = screen.getByPlaceholderText("Sua senha");
    expect(password).toHaveAttribute("type", "password");

    fireEvent.click(screen.getByLabelText("Mostrar senha"));
    expect(password).toHaveAttribute("type", "text");

    fireEvent.click(screen.getByLabelText("Ocultar senha"));
    expect(password).toHaveAttribute("type", "password");
  });

  test("faz login, cria documento ausente do usuario e navega para dashboard", async () => {
    signInWithEmailAndPassword.mockResolvedValue({
      user: {
        uid: "user-1",
        email: "usuario@banzeiro.com",
        displayName: "Usuario",
        photoURL: ""
      }
    });
    getDoc.mockResolvedValue({ exists: () => false });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Seu e-mail"), {
      target: { value: "usuario@banzeiro.com" }
    });
    fireEvent.change(screen.getByPlaceholderText("Sua senha"), {
      target: { value: "123456" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        { name: "auth" },
        "usuario@banzeiro.com",
        "123456"
      );
    });

    expect(doc).toHaveBeenCalledWith({ name: "db" }, "users", "user-1");
    expect(setDoc).toHaveBeenCalledWith(
      { path: "users/user-1" },
      expect.objectContaining({
        uid: "user-1",
        nome: "Usuario",
        email: "usuario@banzeiro.com",
        location: { city: "Itacoatiara-AM" }
      })
    );
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  test("mostra alerta quando o login falha", async () => {
    signInWithEmailAndPassword.mockRejectedValue(new Error("Credenciais invalidas"));

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Seu e-mail"), {
      target: { value: "erro@banzeiro.com" }
    });
    fireEvent.change(screen.getByPlaceholderText("Sua senha"), {
      target: { value: "123456" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Erro ao fazer login: Credenciais invalidas"
      );
    });
  });
});



