from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

KNOWLEDGE_PATH = Path(__file__).parent / "knowledge" / "profile.json"


def load_knowledge() -> dict[str, Any]:
    with KNOWLEDGE_PATH.open(encoding="utf-8") as file:
        return json.load(file)


def answer_from_knowledge(question: str) -> str:
    """Return a concise answer only when the local knowledge base supports it."""
    q = question.casefold()
    data = load_knowledge()
    profile = data["profile"]
    skills = data["skills"]
    projects = data["projects"]

    if any(word in q for word in ("quem é", "quem e", "sobre a stefany", "fale da stefany")):
        return (
            "Stefany Barboza é estudante de Engenharia da Computação e Análise e "
            "Desenvolvimento de Sistemas. Tem interesse em desenvolvimento de software, "
            "inteligência artificial, GenAI e automação."
        )
    if any(word in q for word in ("linguagem", "tecnologia", "habilidade", "stack")):
        return (
            "Entre as tecnologias que Stefany estuda e utiliza em projetos estão "
            f"{', '.join(skills['languages'] + skills['frontend'] + skills['backend'] + skills['databases'])}. "
            "Isso não representa uma classificação formal de proficiência."
        )
    if any(word in q for word in ("contato", "linkedin", "github", "email", "e-mail")):
        return (
            f"Você pode encontrar Stefany no GitHub ({profile['links']['github']}) "
            f"e no LinkedIn ({profile['links']['linkedin']})."
        )
    if any(word in q for word in ("experiência", "experiencia", "trabalhou", "cronoanalista", "transze")):
        return (
            "Stefany atuou como Cronoanalista na TransZE entre dezembro de 2018 e agosto "
            "de 2019. Também tem vivência em logística, estoque, expedição e produção."
        )
    if any(word in q for word in ("projeto", "jobfinder", "neurotask", "construtora", "cinema", "explore", "acolhe", "senai")):
        matches = [p for p in projects if p["name"].casefold() in q]
        selected = matches or projects
        return "Projetos cadastrados:\n" + "\n".join(
            f"• {p['name']}: {p['description']} Repositório: {p['url']}" for p in selected
        )
    if any(word in q for word in ("genai", "gen ai", "inteligência artificial", "inteligencia artificial")):
        return data.get("concepts", {}).get(
            "GenAI",
            "Não encontrei uma explicação desse conceito na base de conhecimento."
        )
    if re.search(r"contratar|contrataria|por que.*contrat", q):
        return (
            "Stefany combina formação em tecnologia, experiência com processos operacionais "
            "e iniciativa para transformar problemas em aplicações funcionais. Seus projetos "
            "exploram desenvolvimento web, backend, automação e inteligência artificial."
        )
    return (
        "Não encontrei essa informação na base de conhecimento do portfólio. "
        "Posso falar sobre formação, tecnologias, projetos, experiência ou contato."
    )
