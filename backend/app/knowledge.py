from __future__ import annotations

import json
from pathlib import Path
from typing import Any

KNOWLEDGE_PATH = Path(__file__).parent / "knowledge" / "profile.json"


def load_knowledge() -> dict[str, Any]:
    with KNOWLEDGE_PATH.open(encoding="utf-8") as file:
        return json.load(file)


def _items(values: list[str]) -> str:
    return ", ".join(values)


def answer_from_knowledge(question: str) -> str:
    """Answer recruiter questions using only the curated, public CV knowledge."""
    q = question.casefold()
    data = load_knowledge()
    profile = data["profile"]

    if any(term in q for term in ("telefone", "celular", "whatsapp", "email", "e-mail", "cpf", "endereço", "endereco")):
        return (
            "Esses dados pessoais não são disponibilizados pelo PinkBot. "
            "Para contato profissional, use o LinkedIn ou GitHub da Stefany: "
            f"{profile['links']['linkedin']} | {profile['links']['github']}"
        )

    if any(term in q for term in ("formação", "formacao", "faculdade", "graduação", "graduacao", "estuda", "curso superior", "universidade")):
        lines = [
            f"• {item['course']} — {item['institution']} ({item.get('period', 'período não informado')}). Status: {item['status']}."
            for item in data["education"]
        ]
        return "Formação acadêmica de Stefany:\n" + "\n".join(lines)

    if any(term in q for term in ("experiência", "experiencia", "trabalhou", "emprego", "carreira", "cronoanalista", "transze", "medical burs", "logística", "logistica", "expedição", "expedicao")):
        blocks = []
        for item in data["experience"]:
            activities = "\n".join(f"  - {activity}" for activity in item["activities"])
            blocks.append(
                f"{item['role']} — {item['company']} ({item['period']})\n{activities}"
            )
        return "Experiência profissional registrada no currículo:\n" + "\n\n".join(blocks)

    if any(term in q for term in ("curso", "certificação", "certificacao", "capacitação", "capacitacao")):
        completed = "\n".join(f"• {course}" for course in data["courses"]["completed"])
        ongoing = "\n".join(f"• {course}" for course in data["courses"]["in_progress"])
        return f"Cursos concluídos:\n{completed}\n\nCursos em andamento:\n{ongoing}"

    if any(term in q for term in ("idioma", "inglês", "ingles", "português", "portugues", "fala inglês", "fala ingles")):
        return "Idiomas:\n" + "\n".join(
            f"• {item['language']}: {item['level']}."
            + (f" Estudos: {_items(item['learning'])}." if item.get("learning") else "")
            for item in data["languages"]
        )

    if any(term in q for term in ("linguagem", "tecnologia", "habilidade", "stack", "ferramenta", "programação", "programacao", "banco de dados", "backend", "frontend")):
        skills = data["skills"]
        return (
            "Competências técnicas listadas no currículo:\n"
            f"• Frontend: {_items(skills['frontend'])}\n"
            f"• Backend: {_items(skills['backend'])}\n"
            f"• Banco de dados: {_items(skills['databases'])}\n"
            f"• APIs e IA: {_items(skills['apis_and_ai'])}\n"
            f"• Ferramentas: {_items(skills['tools'])}\n"
            "O currículo não informa níveis formais de proficiência por tecnologia."
        )

    if any(term in q for term in ("projeto", "jobfinder", "neurotask", "construtora", "cinema", "explore", "senai alunos")):
        projects = data["projects"]
        matches = [project for project in projects if project["name"].casefold() in q]
        selected = matches or projects
        return "Projetos descritos no currículo:\n" + "\n\n".join(
            f"• {project['name']} — {project['description']}\n"
            f"  Tecnologias: {_items(project['technologies'])}.\n"
            f"  Repositório: {project['url']}"
            for project in selected
        )

    if any(term in q for term in ("objetivo", "oportunidade", "vaga", "busca", "pretensão", "pretensao", "interesse profissional")):
        return (
            f"{profile['objective']} Áreas de interesse: {_items(profile['interests'])}. "
            "O currículo registra busca por estágio ou posição de Desenvolvedora Júnior."
        )

    if any(term in q for term in ("quem é", "quem e", "sobre a stefany", "fale da stefany", "resumo profissional", "apresente a stefany")):
        return (
            f"{profile['name']} atua na área de estudos de {profile['professional_title']}. "
            "Está cursando Engenharia da Computação e Análise e Desenvolvimento de Sistemas, "
            "tem experiência anterior em cronoanálise e logística e desenvolve projetos "
            "de software com tecnologias frontend, backend e IA Generativa."
        )

    if any(term in q for term in ("contato", "linkedin", "github", "portfólio", "portfolio")):
        return (
            f"LinkedIn: {profile['links']['linkedin']}\n"
            f"GitHub: {profile['links']['github']}"
        )

    return (
        "Não encontrei essa informação no currículo cadastrado. "
        "Posso responder sobre formação, experiência profissional, projetos, "
        "tecnologias, cursos, idiomas e objetivos profissionais."
    )
