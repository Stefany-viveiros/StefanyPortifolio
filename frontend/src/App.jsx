import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Bot, Code2, Github, Linkedin,
  Mail, Menu, MessageCircle, Moon, Send, Sparkles, X, Zap
} from "lucide-react";
import { profile, projects, skillGroups, experience, principles } from "./data/portfolio.js";

const navItems = [
  ["sobre", "Sobre"], ["habilidades", "Habilidades"], ["projetos", "Projetos"],
  ["trajetoria", "Trajetória"], ["contato", "Contato"]
];

function PinkBot({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("Oi! Eu sou o PinkBot. Posso apresentar os projetos, habilidades ou trajetória da Stefany.");
  const suggestions = [
    ["Projetos", "A Stefany tem projetos como JobFinder AI, BS Construtora, NeuroTask e Cinema Web App. Você pode explorar todos na seção de projetos."],
    ["Habilidades", "Ela estuda e desenvolve com Python, JavaScript, React, FastAPI, APIs REST, bancos de dados e ferramentas de IA."],
    ["Contato", "Você pode encontrar a Stefany pelo LinkedIn ou GitHub. Os links estão na seção de contato."]
  ];
  const send = (value = message) => {
    const normalized = value.toLowerCase();
    let answer = "Ainda estou aprendendo a responder isso. Experimente perguntar sobre projetos, habilidades ou contato.";
    if (/projeto|jobfinder|neurotask|construtora|cinema/.test(normalized)) answer = suggestions[0][1];
    else if (/habilidade|tecnologia|stack|linguagem/.test(normalized)) answer = suggestions[1][1];
    else if (/contato|linkedin|github|email/.test(normalized)) answer = suggestions[2][1];
    else if (/quem|sobre|stefany/.test(normalized)) answer = "Stefany é estudante de Engenharia da Computação e ADS, interessada em desenvolvimento de software, IA e automação.";
    setReply(answer);
    setMessage("");
  };

  return (
    <div className="bot-widget">
      <AnimatePresence>
        {open && (
          <motion.div className="bot-panel" initial={{ opacity: 0, y: 18, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: .96 }}>
            <div className="bot-panel-head">
              <div className="bot-avatar small"><Bot size={19} /></div>
              <div><strong>PinkBot</strong><span><i /> Assistente local demonstrativo</span></div>
              <button className="icon-button" onClick={() => setOpen(false)} aria-label="Fechar PinkBot"><X size={18} /></button>
            </div>
            <div className="bot-conversation">
              <div className="bot-bubble">{reply}</div>
              <div className="bot-suggestions">
                {suggestions.map(([label, value]) => <button key={label} onClick={() => setReply(value)}>{label}</button>)}
              </div>
            </div>
            <form className="bot-input" onSubmit={(event) => { event.preventDefault(); if (message.trim()) send(); }}>
              <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Pergunte sobre a Stefany..." aria-label="Mensagem para PinkBot" />
              <button aria-label="Enviar mensagem" type="submit"><Send size={17} /></button>
            </form>
            <p className="bot-disclaimer">Versão local. Ainda não conectada a um modelo de IA.</p>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="bot-launcher" onClick={() => setOpen(!open)} aria-label={open ? "Fechar assistente PinkBot" : "Abrir assistente PinkBot"}>
        <span className="bot-launcher-face"><Bot size={25} /></span><span className="bot-launcher-label">Fale com PinkBot</span><span className="bot-online" />
      </button>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header">
    <a className="brand" href="#inicio" aria-label="Stefany — início"><span className="brand-mark">S<span>.</span></span><span>STEFANY<span className="brand-muted">.DEV</span></span></a>
    <button className="mobile-menu icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Alternar menu">{menuOpen ? <X /> : <Menu />}</button>
    <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Navegação principal">
      {navItems.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
      <a className="nav-cta" href="#contato">Vamos conversar <ArrowUpRight size={15} /></a>
    </nav>
  </header>;
}

function SectionHeading({ eyebrow, title, text }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function Hero() {
  return <section className="hero section-wrap" id="inicio">
    <div className="hero-copy">
      <div className="availability"><span /> EM CONSTANTE CONSTRUÇÃO E APRENDIZADO</div>
      <p className="hero-kicker">OLÁ, EU SOU A STEFANY <span>✳</span></p>
      <h1>Ideias ganham<br />vida através de<br /><span className="gradient-text">código & criatividade.</span></h1>
      <p className="hero-description">Estudante de Engenharia da Computação e ADS, explorando desenvolvimento de software, inteligência artificial e automação para criar soluções que fazem sentido no mundo real.</p>
      <div className="hero-actions"><a className="button-primary" href="#projetos">Explorar projetos <ArrowUpRight size={17} /></a><a className="button-ghost" href="#sobre">Conhecer minha jornada <ArrowDown size={16} /></a></div>
      <div className="hero-socials"><a href={profile.links.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a><a href={profile.links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a></div>
    </div>
    <div className="hero-art" aria-label="Ilustração abstrata de um núcleo digital rosa">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
      <div className="hero-core"><div className="core-glow" /><div className="core-face"><span className="core-eye" /><span className="core-eye" /><span className="core-smile" /></div><span className="core-spark">✦</span></div>
      <span className="float-tag tag-code"><Code2 size={15} /> BUILDING IDEAS</span><span className="float-tag tag-ai"><Sparkles size={15} /> EXPLORING AI</span><span className="float-tag tag-react">{"{ }"} REACT / PYTHON</span>
      <div className="hero-art-caption"><span className="pulse-dot" /> PINKBOT SYSTEM // ONLINE DEMO</div>
    </div>
    <div className="hero-scroll">SCROLL PARA EXPLORAR <span /></div>
  </section>;
}

function About() {
  return <section className="section-wrap section-block" id="sobre">
    <SectionHeading eyebrow="01 / SOBRE MIM" title={<>Curiosidade que vira<br /><span className="gradient-text">construção.</span></>} text="Mais do que escrever código, gosto de entender o contexto e descobrir como a tecnologia pode ajudar." />
    <div className="about-grid"><div className="about-card about-main"><span className="card-index">UM POUCO DA MINHA HISTÓRIA</span><h3>Eu gosto de resolver problemas — e aprender no caminho.</h3><p>Minha formação une Engenharia da Computação e Análise e Desenvolvimento de Sistemas. Essa combinação alimenta meu interesse por software, dados e inteligência artificial.</p><p>Tenho um perfil curioso e prático: observo processos, identifico oportunidades de melhoria e transformo ideias em projetos para aprender fazendo.</p><div className="about-signature">Stefany Barboza <span>✳</span></div></div>
      <div className="about-side"><div className="mini-stat"><span className="stat-icon"><Code2 /></span><strong>Software</strong><p>Construindo aplicações web e explorando arquitetura full stack.</p></div><div className="mini-stat"><span className="stat-icon"><Sparkles /></span><strong>IA & automação</strong><p>Investigando como IA pode tornar tarefas e experiências mais inteligentes.</p></div></div>
    </div>
  </section>;
}

function Skills() {
  return <section className="section-wrap section-block" id="habilidades"><SectionHeading eyebrow="02 / TECNOLOGIAS" title={<>Ferramentas para<br /><span className="gradient-text">tirar ideias do papel.</span></>} text="Tecnologias que venho estudando e aplicando em projetos. A profundidade de experiência varia conforme a ferramenta." />
    <div className="skills-grid">{skillGroups.map((group, index) => <motion.article className="skill-card" key={group.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><div className="skill-card-top"><span>0{index + 1}</span><Zap size={17} /></div><h3>{group.title}</h3><div className="skill-tags">{group.items.map(item => <span key={item}>{item}</span>)}</div></motion.article>)}</div>
  </section>;
}

function Projects() {
  const [filter, setFilter] = useState("Todos");
  const categories = ["Todos", "IA · Full Stack", "Full Stack", "Frontend", "Aplicação web", "Produtividade · Aplicação web", "Projeto acadêmico"];
  const visible = useMemo(() => filter === "Todos" ? projects : projects.filter(project => project.category === filter), [filter]);
  return <section className="section-wrap section-block" id="projetos"><SectionHeading eyebrow="03 / PROJETOS" title={<>Aprendizado em<br /><span className="gradient-text">movimento.</span></>} text="Projetos pessoais e acadêmicos: cada um representa uma oportunidade de experimentar, construir e evoluir." />
    <div className="project-toolbar"><span>{String(visible.length).padStart(2, "0")} PROJETOS</span><div className="filter-list" aria-label="Filtrar projetos">{categories.map(category => <button key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>{category}</button>)}</div></div>
    <div className="projects-grid">{visible.map((project, index) => <motion.article layout className={project.featured ? "project-card featured" : "project-card"} key={project.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .04 }}>
      <div className="project-visual"><span className="project-number">PROJECT / {String(projects.indexOf(project) + 1).padStart(2, "0")}</span><div className="project-symbol">{project.featured ? <Sparkles size={42} /> : <Code2 size={39} />}</div><span className="project-status">{project.status}</span></div>
      <div className="project-content"><span className="project-category">{project.category}</span><h3>{project.name}</h3><p>{project.description}</p><div className="project-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div><a className="project-link" href={project.url} target="_blank" rel="noreferrer">Ver repositório <ArrowUpRight size={16} /></a></div>
    </motion.article>)}</div>
  </section>;
}

function Philosophy() {
  return <section className="section-wrap section-block philosophy" id="filosofia"><SectionHeading eyebrow="04 / COMO EU PENSO" title={<>Construir é também<br /><span className="gradient-text">saber por quê.</span></>} text="Alguns princípios que orientam a forma como estudo e desenvolvo." />
    <div className="principles-list">{principles.map(([number, title, description]) => <div className="principle" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p><ArrowUpRight size={18} /></div>)}</div>
  </section>;
}

function Experience() {
  return <section className="section-wrap section-block" id="trajetoria"><SectionHeading eyebrow="05 / TRAJETÓRIA" title={<>Experiência que vai<br /><span className="gradient-text">além do código.</span></>} text="Minha vivência profissional também trouxe repertório para observar processos, trabalhar com informação e entender necessidades operacionais." />
    <div className="timeline">{experience.map((item, index) => <article className="timeline-item" key={item.role}><div className="timeline-marker">{String(index + 1).padStart(2, "0")}</div><div><span className="timeline-period">{item.period}</span><h3>{item.role}</h3><h4>{item.company}</h4><p>{item.description}</p></div></article>)}</div>
    <div className="education-note"><span className="stat-icon"><Sparkles /></span><div><strong>Formação em andamento</strong><p>Engenharia da Computação + Análise e Desenvolvimento de Sistemas</p></div></div>
  </section>;
}

function Contact() {
  return <section className="section-wrap contact-section" id="contato"><div className="contact-glow" /><span className="eyebrow">06 / CONTATO</span><h2>Vamos construir<br /><span className="gradient-text">algo interessante?</span></h2><p>Estou aberta a oportunidades de estágio e posições júnior, projetos e conversas sobre tecnologia, desenvolvimento e IA.</p><div className="contact-actions"><a className="button-primary" href={profile.links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> Conectar no LinkedIn</a><a className="button-ghost" href={profile.links.github} target="_blank" rel="noreferrer"><Github size={17} /> Ver GitHub</a></div><div className="contact-foot"><span><span className="pulse-dot" /> DISPONÍVEL PARA NOVAS CONEXÕES</span><span>BRASIL · REMOTO / HÍBRIDO</span></div></section>;
}

export default function App() {
  return <div className="app-shell"><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header /><main id="conteudo"><Hero /><div className="section-divider" /><About /><Skills /><Projects /><Philosophy /><Experience /><Contact /></main><footer className="site-footer"><a className="brand" href="#inicio"><span className="brand-mark">S<span>.</span></span><span>STEFANY<span className="brand-muted">.DEV</span></span></a><span>Feito com curiosidade, código e um toque de rosa. <span className="pink">♥</span></span><span>© {new Date().getFullYear()} STEFANY BARBOZA</span></footer><PinkBot /><button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Voltar ao topo"><ArrowUpRight size={18} /></button></div>;
}
