from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_chat_uses_knowledge_without_api_key(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    response = client.post("/api/chat", json={"message": "Quem é a Stefany?"})
    assert response.status_code == 200
    body = response.json()
    assert body["mode"] == "knowledge"
    assert "Engenharia da Computação" in body["reply"]


def test_chat_rejects_empty_message():
    response = client.post("/api/chat", json={"message": "   "})
    assert response.status_code == 422


def test_chat_rejects_oversized_message():
    response = client.post("/api/chat", json={"message": "x" * 2001})
    assert response.status_code == 422


def test_project_question_uses_known_projects(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    response = client.post("/api/chat", json={"message": "Como funciona o JobFinder AI?"})
    assert response.status_code == 200
    assert "JobFinder AI" in response.json()["reply"]


def test_genai_question_has_a_grounded_definition(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    response = client.post("/api/chat", json={"message": "O que é GenAI?"})
    assert response.status_code == 200
    assert "inteligência artificial generativa" in response.json()["reply"]



def test_education_question_returns_academic_background(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    response = client.post("/api/chat", json={"message": "Qual é a formação acadêmica da Stefany?"})
    assert response.status_code == 200
    reply = response.json()["reply"]
    assert "Engenharia da Computação" in reply
    assert "Análise e Desenvolvimento de Sistemas" in reply


def test_experience_question_returns_recorded_employers(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    response = client.post("/api/chat", json={"message": "Quais experiências profissionais ela possui?"})
    assert response.status_code == 200
    reply = response.json()["reply"]
    assert "TransZE" in reply
    assert "Medical Burs" in reply


def test_technology_question_does_not_claim_formal_proficiency(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    response = client.post("/api/chat", json={"message": "Qual a experiência dela com Python?"})
    assert response.status_code == 200
    reply = response.json()["reply"]
    assert "Python" in reply
    assert "nível formal de proficiência" in reply
