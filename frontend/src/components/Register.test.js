import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Register from "./Register";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate
}));

jest.mock("../firebase", () => ({
  auth: { name: "auth" },
  db: { name: "db" }
}));

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  sendEmailVerification: jest.fn(),
  updateProfile: jest.fn()
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  setDoc: jest.fn()
}));

describe("Register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
    window.alert = jest.fn();
    doc.mockReturnValue({ path: "users/user-2" });
    setDoc.mockResolvedValue(undefined);
    sendEmailVerification.mockResolvedValue(undefined);
    updateProfile.mockResolvedValue(undefined);
  });

  test("bloqueia cadastro sem cidade selecionada", () => {
    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText("Inserir Email"), {
      target: { value: "novo@banzeiro.com" }
    });
    fireEvent.change(screen.getByPlaceholderText("Criar Senha"), {
      target: { value: "123456" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Confirmar Conta" }));

    expect(window.alert).toHaveBeenCalledWith("Escolha sua cidade.");
    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
  });

  test("cria usuario, salva perfil e volta para a home", async () => {
    createUserWithEmailAndPassword.mockResolvedValue({
      user: {
        uid: "user-2",
        email: "novo@banzeiro.com"
      }
    });

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText("Nome completo"), {
      target: { value: "Novo Usuario" }
    });
    fireEvent.change(screen.getByPlaceholderText("Inserir Email"), {
      target: { value: "novo@banzeiro.com" }
    });
    fireEvent.change(screen.getByPlaceholderText("Criar Senha"), {
      target: { value: "123456" }
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Itacoatiara-AM" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Confirmar Conta" }));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        { name: "auth" },
        "novo@banzeiro.com",
        "123456"
      );
    });

    expect(updateProfile).toHaveBeenCalledWith(
      { uid: "user-2", email: "novo@banzeiro.com" },
      { displayName: "Novo Usuario" }
    );
    expect(sendEmailVerification).toHaveBeenCalledWith({
      uid: "user-2",
      email: "novo@banzeiro.com"
    });
    expect(setDoc).toHaveBeenCalledWith(
      { path: "users/user-2" },
      expect.objectContaining({
        uid: "user-2",
        email: "novo@banzeiro.com",
        nome: "Novo Usuario",
        location: { city: "Itacoatiara-AM" }
      })
    );
    expect(window.alert).toHaveBeenCalledWith(
      "Conta criada! Verifique seu e-mail para ativar o acesso."
    );
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
