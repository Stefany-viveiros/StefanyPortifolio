export const profile = {
  name: "Stefany Barboza",
  role: "Desenvolvimento de Software & Inteligência Artificial",
  headline: "Transformo ideias e problemas reais em soluções digitais.",
  intro:
    "Sou estudante de Engenharia da Computação e Análise e Desenvolvimento de Sistemas. Gosto de entender desafios, conectar tecnologia e construir aplicações que tenham utilidade de verdade.",
  location: "Brasil",
  email: "",
  links: {
    github: "https://github.com/Stefany-viveiros",
    linkedin: "https://linkedin.com/in/stefanybarboza-dev"
  }
};

export const projects = [
  {
    name: "JobFinder AI",
    category: "IA · Full Stack",
    description:
      "Plataforma em evolução para apoiar a busca por oportunidades de estágio e posições júnior, com leitura de currículo, organização de vagas e análise de compatibilidade.",
    stack: ["React", "Python", "FastAPI", "PostgreSQL"],
    status: "Em evolução",
    url: "https://github.com/Stefany-viveiros/JobFinderAI",
    featured: true,
    problem: "A busca por oportunidades de estágio e nível júnior pode exigir consultar diferentes fontes, comparar requisitos e acompanhar candidaturas manualmente.",
    solution: "Centralizar oportunidades, importar o currículo e apoiar a análise de compatibilidade para organizar a busca. A automação de envio deve respeitar as configurações e aprovações definidas pela pessoa usuária.",
    architecture: "Frontend React + Vite, API Python/FastAPI e PostgreSQL hospedado no Neon; aplicação publicada com Render. A integração com IA é mantida no backend."
  },
  {
    name: "NeuroTask",
    category: "Produtividade · Aplicação web",
    description:
      "Projeto de aplicação voltada à organização de tarefas e produtividade. Consulte o repositório para acompanhar funcionalidades e evolução.",
    stack: ["JavaScript", "Web"],
    status: "Projeto pessoal",
    url: "https://github.com/Stefany-viveiros/neurotask"
  },
  {
    name: "BS Construtora",
    category: "Full Stack",
    description:
      "Site institucional com fluxo de solicitação de orçamento, API em FastAPI e persistência de dados com SQLite e SQLAlchemy.",
    stack: ["React", "Vite", "FastAPI", "SQLite"],
    status: "Projeto pessoal",
    problem: "Organizar o recebimento de solicitações de orçamento em um fluxo digital.",
    solution: "Site com formulário de orçamento que envia os dados para uma API e persiste as solicitações.",
    architecture: "React + JavaScript + Vite no frontend; FastAPI no backend; SQLite e SQLAlchemy para persistência; endpoint REST para recebimento de orçamentos.",
    url: "https://github.com/Stefany-viveiros/BS-Construtora"
  },
  {
    name: "Cinema Web App",
    category: "Aplicação web",
    description:
      "Aplicação temática de cinema com exploração de filmes e fluxo de seleção de assentos, ingressos e bomboniere.",
    stack: ["JavaScript", "Web"],
    status: "Projeto",
    url: "https://github.com/Stefany-viveiros/cinema-web-app"
  },
  {
    name: "Explore Now",
    category: "Frontend",
    description:
      "Projeto web de exploração e experimentação de interface. Veja o código e os detalhes no GitHub.",
    stack: ["HTML", "CSS", "JavaScript"],
    status: "Projeto",
    url: "https://github.com/Stefany-viveiros/explore-now"
  },
  {
    name: "ONG Acolhe+",
    category: "Aplicação web",
    description:
      "Projeto acadêmico voltado ao contexto de uma organização social. Detalhes técnicos e evolução disponíveis no repositório.",
    stack: ["Web", "JavaScript"],
    status: "Projeto acadêmico",
    url: "https://github.com/Stefany-viveiros/ong-acolhe-plus"
  },
  {
    name: "SENAI Alunos",
    category: "Projeto acadêmico",
    description:
      "Projeto desenvolvido no contexto de estudos e atividades acadêmicas do SENAI.",
    stack: ["Web"],
    status: "Projeto acadêmico",
    url: "https://github.com/Stefany-viveiros/projeto-senai-alunos"
  }
];

export const skillGroups = [
  { title: "Linguagens", items: ["Python", "JavaScript", "PHP", "HTML5", "CSS3"], note: "Estudadas e utilizadas em projetos, conforme a tecnologia." },
  { title: "Frontend", items: ["React", "Vite", "Interfaces responsivas"], note: "Aplicadas em interfaces e projetos web." },
  { title: "Backend & APIs", items: ["FastAPI", "APIs REST", "SQLAlchemy"], note: "Aplicadas na construção de APIs e fluxos de dados." },
  { title: "Dados", items: ["SQLite", "PostgreSQL", "Modelagem de dados"], note: "Tecnologias utilizadas em projetos; profundidade varia por ferramenta." },
  { title: "Ferramentas", items: ["Git", "GitHub", "VS Code"], note: "Ferramentas usadas no fluxo de desenvolvimento." },
  { title: "IA & automação", items: ["Integração com LLMs", "Prompt engineering", "Automação"], note: "Área de estudo e experimentação em aplicações; sem nível formal de proficiência declarado." }
];

export const experience = [
  {
    role: "Cronoanalista",
    company: "TransZE",
    period: "Dez/2018 — Ago/2019",
    description:
      "Atuação com análise de processos e tempos, acompanhamento operacional e organização de informações para apoiar a rotina logística."
  },
  {
    role: "Experiências em logística e produção",
    company: "Operações e processos",
    period: "Experiência profissional",
    description:
      "Vivência com estoque, expedição, controle de produção, Excel, acompanhamento de indicadores e rotinas relacionadas ao PCP."
  }
];

export const principles = [
  ["01", "Problema antes da ferramenta", "Entender a necessidade vem antes de escolher tecnologia."],
  ["02", "Aprender construindo", "Transformar estudo em experimentos, aplicações e evolução contínua."],
  ["03", "Tecnologia com propósito", "Buscar soluções claras, úteis, acessíveis e sustentáveis."]
];
