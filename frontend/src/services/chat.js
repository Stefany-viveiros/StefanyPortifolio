const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");

export async function sendPinkBotMessage(message, history = []) {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`PinkBot API indisponível (${response.status}). ${detail}`);
  }
  return response.json();
}
