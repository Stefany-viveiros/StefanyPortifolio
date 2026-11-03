import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Bot, Code2, Github, Linkedin,
  Mail, Menu, MessageCircle, Moon, Send, Sparkles, X, Zap, Mic, Volume2, RotateCcw, Briefcase
} from "lucide-react";
import { sendPinkBotMessage } from "./services/chat.js";
import PinkBotCharacter from "./components/PinkBotCharacter.jsx";
import { profile, projects, skillGroups, experience, principles } from "./data/portfolio.js";

const navItems = [
  ["sobre", "Sobre"], ["habilidades", "Habilidades"], ["projetos", "Projetos"],
  ["trajetoria", "Trajetória"], ["contato", "Contato"]
];

function PinkBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", content: "Oi! Eu sou o PinkBot. Posso apresentar a formação, os projetos e as tecnologias da Stefany." }]);
  const [mode, setMode] = useState("knowledge");
  const [thinking, setThinking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [listening, setListening] = useState(false);
  const [botState, setBotState] = useState("idle");
  const [apiAvailable, setApiAvailable] = useState(null);
  const recognitionRef = useRef(null);
  const conversationRef = useRef(null);

  useEffect(() => {
    if (conversationRef.current) conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
  }, [messages, thinking]);

  useEffect(() => {
    if (!open) return undefined;
    setBotState("greeting");
    const timer = window.setTimeout(() => setBotState("idle"), 1800);
    return () => window.clearTimeout(timer);
  }, [open]);

  const speak = (text) => {
    if (!voiceEnabled || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.volume = volume;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find((voice) => voice.lang?.toLowerCase().startsWith("pt-br") && /female|feminina|luciana|fernanda/i.test(voice.name))
      || voices.find((voice) => voice.lang?.toLowerCase().startsWith("pt-br"));
    if (preferred) utterance.voice = preferred;
    utterance.onstart = () => setBotState("talking");
    utterance.onend = () => setBotState("happy");
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!open || thinking) return undefined;
    const timer = window.setTimeout(() => setBotState("sleeping"), 45000);
    return () => window.clearTimeout(timer);
  }, [open, messages, thinking]);

  const send = async (value = message) => {
    const question = value.trim();
    if (!question || thinking) return;
    const nextMessages = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setMessage("");
    setThinking(true);
    setBotState(/[!?]/.test(question) ? "surprised" : "thinking");
    try {
      const result = await sendPinkBotMessage(question, messages.slice(-10));
      setMode(result.mode);
      setApiAvailable(true);
      const answer = result.reply;
      setMessages((current) => [...current, { role: "assistant", content: answer }]);
      speak(answer);
      if (!voiceEnabled) setBotState("happy");
    } catch {
      setApiAvailable(false);
      const q = question.toLowerCase();
      let answer = "Não consegui acessar o servidor agora. Você ainda pode navegar pelo portfólio e consultar os repositórios da Stefany.";
      if (/projeto|jobfinder|neurotask|construtora|cinema/.test(q)) answer = "A Stefany apresenta projetos como JobFinder AI, NeuroTask, BS Construtora, Explore Now e Cinema Web App. Os detalhes e códigos estão disponíveis nos repositórios do GitHub.";
      else if (/habilidade|tecnologia|stack|linguagem/.test(q)) answer = "Entre as tecnologias que ela estuda e utiliza em projetos estão Python, JavaScript, PHP, React, FastAPI, APIs REST, SQLite, PostgreSQL e SQLAlchemy.";
      else if (/contato|linkedin|github/.test(q)) answer = "Você pode encontrar a Stefany no GitHub e no LinkedIn, pelos links disponíveis na página.";
      else if (/quem|sobre|stefany/.test(q)) answer = "Stefany é estudante de Engenharia da Computação e Análise e Desenvolvimento de Sistemas, interessada em software, IA e automação.";
      setMode("knowledge");
      setMessages((current) => [...current, { role: "assistant", content: answer }]);
      setBotState("sad");
      speak(answer);
    } finally {
      setThinking(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessages((current) => [...current, { role: "assistant", content: "Este navegador não oferece reconhecimento de voz. Você pode digitar sua pergunta normalmente." }]);
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setListening(false);
      setMessage(transcript);
      send(transcript);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const reset = () => {
    window.speechSynthesis?.cancel?.();
    recognitionRef.current?.stop?.();
    setMessages([{ role: "assistant", content: "Conversa reiniciada! O que você gostaria de conhecer sobre a Stefany?" }]);
    setBotState("greeting");
  };

  return (
    <div className="bot-widget">
      <AnimatePresence>
        {open && (
          <motion.div className="bot-panel" initial={{ opacity: 0, y: 18, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: .96 }}>
            <div className="bot-panel-head">
              <PinkBotCharacter className="pinkbot-avatar" state={botState} />
              <div><strong>PinkBot</strong><span><i /> {apiAvailable === null ? "Assistente pronto" : apiAvailable ? (mode === "llm" ? "IA conectada" : "Base de conhecimento") : "Modo local de contingência"}</span></div>
              <button className="icon-button" onClick={reset} aria-label="Reiniciar conversa"><RotateCcw size={16} /></button>
              <button className="icon-button" onClick={() => { setBotState("goodbye"); window.speechSynthesis?.cancel?.(); recognitionRef.current?.stop?.(); setListening(false); window.setTimeout(() => setOpen(false), 550); }} aria-label="Fechar PinkBot"><X size={18} /></button>
            </div>
            <div className="bot-conversation" ref={conversationRef} aria-live="polite">
              {messages.map((item, index) => <div key={index} className={item.role === "user" ? "bot-bubble user-bubble" : "bot-bubble"}>{item.content}</div>)}
              {thinking && <div className="bot-bubble thinking-bubble">PinkBot está pensando<span>...</span></div>}
              <div className="bot-suggestions">
                {["Quem é a Stefany?", "Projetos", "Tecnologias", "Modo recrutador"].map((label) => <button key={label} onClick={() => label === "Modo recrutador" ? document.getElementById("recrutadores")?.scrollIntoView({ behavior: "smooth" }) : send(label)}>{label}</button>)}
              </div>
            </div>
            <form className="bot-input" onSubmit={(event) => { event.preventDefault(); send(); }}>
              <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Pergunte sobre a Stefany..." aria-label="Mensagem para PinkBot" />
              <button type="button" className={listening ? "voice-active" : ""} onClick={startListening} aria-label={listening ? "Parar reconhecimento de voz" : "Falar com PinkBot"}><Mic size={16} /></button>
              <button aria-label="Enviar mensagem" type="submit" disabled={thinking}><Send size={17} /></button>
            </form>
            <div className="bot-controls">
              <button onClick={() => { setVoiceEnabled((value) => { if (value) window.speechSynthesis?.cancel?.(); return !value; }); }} aria-pressed={voiceEnabled}><Volume2 size={14} /> Voz {voiceEnabled ? "ativada" : "desativada"}</button>
              <span>{mode === "llm" ? "Resposta gerada por IA" : "Resposta baseada em conhecimento"}</span>
            </div>
            <p className="bot-disclaimer">{apiAvailable === null ? "Envie uma pergunta para iniciar. O modo utilizado será identificado na resposta." : apiAvailable ? "Conversa processada pela API; sem chave configurada, usa a base de conhecimento." : "Servidor indisponível: respostas locais de contingência."} O microfone depende do suporte e da permissão do navegador.</p>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="bot-launcher" onClick={() => setOpen(!open)} aria-label={open ? "Fechar assistente PinkBot" : "Abrir assistente PinkBot"}>
        <span className="bot-launcher-face"><PinkBotCharacter className="launcher-bot-art" state={botState} /></span><span className="bot-launcher-label">Fale com PinkBot</span><span className="bot-online" />
      </button>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  useEffect(() => { document.documentElement.dataset.theme = lightTheme ? "light" : "dark"; }, [lightTheme]);
  return <header className="site-header">
    <a className="brand" href="#inicio" aria-label="Stefany — início"><span className="brand-mark">S<span>.</span></span><span>STEFANY<span className="brand-muted">.DEV</span></span></a>
    <div className="header-tools"><button className="theme-toggle icon-button" onClick={() => setLightTheme((value) => !value)} aria-label={lightTheme ? "Ativar tema escuro" : "Ativar tema claro"}><Moon size={17} /></button><button className="mobile-menu icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Alternar menu">{menuOpen ? <X /> : <Menu />}</button></div>
    <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Navegação principal">
      {navItems.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
      <a href="#recrutadores" onClick={() => setMenuOpen(false)}>Recrutadores</a><a className="nav-cta" href="#contato">Vamos conversar <ArrowUpRight size={15} /></a>
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
      <p className="hero-description">No 8º período de Engenharia da Computação e no 2º período de Análise e Desenvolvimento de Sistemas, exploro desenvolvimento de software, inteligência artificial e automação para criar soluções que fazem sentido no mundo real.</p>
      <div className="hero-actions"><a className="button-primary" href="#projetos">Explorar projetos <ArrowUpRight size={17} /></a><a className="button-ghost" href="#sobre">Conhecer minha jornada <ArrowDown size={16} /></a></div>
      <div className="hero-socials"><a href={profile.links.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a><a href={profile.links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a></div>
    </div>
    <div className="hero-art hero-character-stage" aria-label="PinkBot, assistente virtual do portfólio">
      <div className="hero-orbit hero-orbit-a" /><div className="hero-orbit hero-orbit-b" />
      <div className="hero-grid-glow" />
      <div className="hero-character-aura" />
      <div className="hero-character-label"><span className="pulse-dot" /> YOUR AI COMPANION <b>PK—01</b></div>
      <PinkBotCharacter className="hero-pinkbot hero-pinkbot-free" state="idle" />
      <div className="hero-character-name"><strong>PinkBot</strong><span>curiosa por natureza. feita para explorar.</span></div>
      <span className="float-tag tag-code"><Code2 size={15} /> BUILDING IDEAS</span>
      <span className="float-tag tag-ai"><Sparkles size={15} /> EXPLORING AI</span>
      <span className="float-tag tag-react">{"{ }"} REACT / PYTHON</span>
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
    <div className="skills-grid">{skillGroups.map((group, index) => <motion.article className="skill-card" key={group.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><div className="skill-card-top"><span>0{index + 1}</span><Zap size={17} /></div><h3>{group.title}</h3><p className="skill-note">{group.note}</p><div className="skill-tags">{group.items.map(item => <span key={item}>{item}</span>)}</div></motion.article>)}</div>
  </section>;
}

function Projects() {
  const [filter, setFilter] = useState("Todos");
  const categories = ["Todos", "IA · Full Stack", "Full Stack", "Frontend", "Aplicação web", "Produtividade · Aplicação web", "Projeto acadêmico"];
  const visible = useMemo(() => filter === "Todos" ? projects : projects.filter(project => project.category === filter), [filter]);
  return <section className="section-wrap section-block" id="projetos"><SectionHeading eyebrow="03 / PROJETOS" title={<>Aprendizado em<br /><span className="gradient-text">movimento.</span></>} text="Projetos pessoais e acadêmicos: cada um representa uma oportunidade de experimentar, construir e evoluir." />
    <div className="project-toolbar"><span>{String(visible.length).padStart(2, "0")} PROJETOS</span><div className="filter-list" aria-label="Filtrar projetos">{categories.map(category => <button key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>{category}</button>)}</div></div>
    <div className="projects-grid">{visible.map((project, index) => <motion.article layout className={project.featured ? "project-card featured" : "project-card"} key={project.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .04 }}>
      <div className="project-visual"><span className="project-number">PROJECT / {String(projects.indexOf(project) + 1).padStart(2, "0")}</span>{project.image ? <img className="project-cover" src={project.image} alt={`Tela do projeto ${project.name}`} loading="lazy" /> : <div className="project-preview"><div className="preview-window"><div className="preview-top"><i /><i /><i /><span>{project.name}</span></div><div className="preview-content"><div className="preview-sidebar" /><div className="preview-main"><b>{project.featured ? "AI / CAREER" : project.category.toUpperCase()}</b><span /><span /><span /></div></div></div><div className="project-symbol">{project.featured ? <Sparkles size={25} /> : <Code2 size={24} />}</div></div>}<span className="project-status">{project.status}</span></div>
      <div className="project-content"><span className="project-category">{project.category}</span><h3>{project.name}</h3><p>{project.description}</p><div className="project-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div>{project.problem && <details className="project-details"><summary>Problema, solução e arquitetura</summary><p><strong>Problema:</strong> {project.problem}</p><p><strong>Solução:</strong> {project.solution}</p><p><strong>Arquitetura:</strong> {project.architecture}</p></details>}<a className="project-link" href={project.url} target="_blank" rel="noreferrer">Ver repositório <ArrowUpRight size={16} /></a></div>
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
    <div className="education-note"><span className="stat-icon"><Sparkles /></span><div><strong>Formação acadêmica</strong><p>Engenharia da Computação — 8º período</p><p>Análise e Desenvolvimento de Sistemas — 2º período</p></div></div>
  </section>;
}

function RecruiterMode() {
  return <section className="section-wrap section-block recruiter-section" id="recrutadores">
    <SectionHeading eyebrow="06 / RECRUITER MODE" title={<>Uma visão direta<br /><span className="gradient-text">para recrutadores.</span></>} text="Um resumo objetivo da formação, das tecnologias e dos projetos que representam minha trajetória atual." />
    <div className="recruiter-grid">
      <article className="recruiter-card recruiter-summary"><Briefcase size={22} /><span className="card-index">RESUMO PROFISSIONAL</span><h3>Formação em tecnologia, experiência operacional e iniciativa para construir soluções.</h3><p>Stefany está no 8º período de Engenharia da Computação e no 2º período de Análise e Desenvolvimento de Sistemas, além de trazer vivência em processos, logística e produção. Seus projetos exploram desenvolvimento web, backend, automação e aplicações com IA.</p><a className="project-link" href={profile.links.linkedin} target="_blank" rel="noreferrer">Perfil profissional <ArrowUpRight size={16} /></a></article>
      <article className="recruiter-card"><span className="card-index">FORMAÇÃO</span><h3>Em andamento</h3><p>Engenharia da Computação</p><p>Análise e Desenvolvimento de Sistemas</p><span className="card-index">ÁREAS DE INTERESSE</span><div className="skill-tags"><span>Desenvolvimento</span><span>GenAI</span><span>Automação</span><span>Dados</span></div></article>
      <article className="recruiter-card"><span className="card-index">PROJETOS EM DESTAQUE</span><h3>JobFinder AI</h3><p>Automação de busca e organização de oportunidades, leitura de currículo e análise de compatibilidade.</p><a className="project-link" href="https://github.com/Stefany-viveiros/JobFinderAI" target="_blank" rel="noreferrer">Ver projeto <ArrowUpRight size={16} /></a><h3>BS Construtora</h3><p>Fluxo de orçamentos com frontend React, API FastAPI e persistência SQLite.</p><a className="project-link" href="https://github.com/Stefany-viveiros/BS-Construtora" target="_blank" rel="noreferrer">Ver projeto <ArrowUpRight size={16} /></a></article>
    </div>
    <div className="recruiter-actions"><a className="button-primary" href={profile.links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> Conversar no LinkedIn</a><a className="button-ghost" href={profile.links.github} target="_blank" rel="noreferrer"><Github size={16} /> Analisar GitHub</a><span>Currículo PDF: será disponibilizado quando o arquivo final for adicionado.</span></div>
  </section>;
}

function Contact() {
  const email = import.meta.env.VITE_CONTACT_EMAIL || profile.email;
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    if (!email || !navigator.clipboard?.writeText) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  return <section className="section-wrap contact-section" id="contato"><div className="contact-glow" /><span className="eyebrow">07 / CONTATO</span><h2>Vamos construir<br /><span className="gradient-text">algo interessante?</span></h2><p>Estou aberta a oportunidades de estágio e posições júnior, projetos e conversas sobre tecnologia, desenvolvimento e IA.</p><div className="contact-actions"><a className="button-primary" href={profile.links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> Conectar no LinkedIn</a><a className="button-ghost" href={profile.links.github} target="_blank" rel="noreferrer"><Github size={17} /> Ver GitHub</a>{email && <button className="button-ghost" type="button" onClick={copyEmail}><Mail size={17} /> {copied ? "E-mail copiado" : "Copiar e-mail"}</button>}</div><div className="contact-foot"><span><span className="pulse-dot" /> DISPONÍVEL PARA NOVAS CONEXÕES</span><span>BRASIL · REMOTO / HÍBRIDO</span></div></section>;
}

export default function App() {
  const [booting, setBooting] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 1450);
    return () => window.clearTimeout(timer);
  }, []);
  return <div className="app-shell"><AnimatePresence>{booting && <motion.div className="boot-screen" role="status" aria-live="polite" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}><div className="boot-mark">S<span>.</span></div><strong>STEFANY.EXE</strong><span className="boot-line">SYSTEM INITIALIZED...</span><span className="boot-line">IDENTIFICANDO VISITANTE...</span><span className="boot-line boot-pink">PINKBOT ONLINE.</span><div className="boot-progress"><i /></div><small>WELCOME TO MY DIGITAL WORLD.</small></motion.div>}</AnimatePresence><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header /><main id="conteudo"><Hero /><div className="section-divider" /><About /><Skills /><Projects /><Philosophy /><Experience /><RecruiterMode /><Contact /></main><footer className="site-footer"><a className="brand" href="#inicio"><span className="brand-mark">S<span>.</span></span><span>STEFANY<span className="brand-muted">.DEV</span></span></a><span>Feito com curiosidade, código e um toque de rosa. <span className="pink">♥</span></span><span>© {new Date().getFullYear()} STEFANY BARBOZA</span></footer><PinkBot /><button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Voltar ao topo"><ArrowUpRight size={18} /></button></div>;
}
