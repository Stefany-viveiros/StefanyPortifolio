import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App.jsx";

describe("StefanyPortifolio", () => {
  it("renders the main portfolio sections", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /ideias ganham/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /curiosidade que vira/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /aprendizado em/i })).toBeInTheDocument();
  });

  it("opens PinkBot and shows its local demo notice", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /abrir assistente pinkbot/i }));
    expect(screen.getByText(/assistente local demonstrativo/i)).toBeInTheDocument();
    expect(screen.getByText(/ainda não conectada a um modelo de ia/i)).toBeInTheDocument();
  });
});
