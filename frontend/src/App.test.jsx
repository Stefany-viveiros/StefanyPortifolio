import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App.jsx";

describe("StefanyPortifolio", () => {
  it("renders the main portfolio sections", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /ideias ganham/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /curiosidade que vira/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /aprendizado em/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /para recrutadores/i })).toBeInTheDocument();
  });

  it("opens PinkBot with an honest initial status", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /abrir assistente pinkbot/i }));
    expect(screen.getByText(/assistente pronto/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /mensagem para pinkbot/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /falar com pinkbot/i })).toBeInTheDocument();
  });

  it("exposes the recruiter mode and social links", () => {
    render(<App />);
    expect(screen.getByText(/resumo profissional/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /perfil profissional/i })).toHaveAttribute("href", "https://linkedin.com/in/stefanybarboza-dev");
  });

  it("toggles the theme", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /ativar tema claro/i }));
    expect(document.documentElement.dataset.theme).toBe("light");
  });
});
