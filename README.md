# StefanyPortifolio — STEFANY.EXE

Portfólio pessoal de Stefany Barboza, com experiência interativa e assistente PinkBot.

## Arquitetura

- **Frontend:** React 18, Vite, JavaScript, Framer Motion e Lucide.
- **Backend:** Python, FastAPI e HTTPX.
- **Conhecimento:** JSON versionado no repositório.
- **IA opcional:** endpoint compatível com Chat Completions, chamado exclusivamente pelo backend.
- **Testes:** Vitest/Testing Library e Pytest.
- **Deploy:** blueprint preparado para Render.

## Executar localmente

### Backend

```bash
cd backend
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

API: `http://localhost:8000`; documentação interativa: `/docs`.

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend: `http://localhost:5173`.

- `VITE_CONTACT_EMAIL`: e-mail público opcional exibido no contato; deixe vazio se não quiser publicar um endereço.

- `VITE_API_URL`: URL pública da API; localmente, `http://localhost:8000`.

## PinkBot

O PinkBot possui dois modos explícitos:

1. **Base de conhecimento:** respostas estruturadas a partir de `backend/app/knowledge/profile.json`.
2. **LLM:** quando `OPENAI_API_KEY` está configurada no ambiente do backend, o servidor encaminha a conversa para o endpoint compatível configurado. A chave nunca é enviada ao navegador.

Variáveis do backend:

- `OPENAI_API_KEY`: segredo opcional, configurado somente no servidor. No Render, adicione manualmente em Environment no serviço da API se decidir ativar respostas com LLM; não é necessário para publicar a versão baseada em conhecimento.
- `OPENAI_BASE_URL`: padrão `https://api.openai.com/v1`.
- `OPENAI_MODEL`: padrão `gpt-4o-mini`.
- `CORS_ORIGINS`: origens permitidas separadas por vírgula.

Sem chave, o assistente continua funcionando pela base de conhecimento. Se o servidor estiver indisponível, a interface informa que entrou em contingência local. Não apresenta o modo local como IA conectada. O histórico existe somente no estado da conversa no navegador e é enviado na requisição quando necessário; a API não grava conversas em banco de dados.

### Voz

A síntese e o reconhecimento de fala utilizam Web Speech API quando disponíveis no navegador. O visitante pode continuar digitando; microfone depende de permissão e suporte do browser. A disponibilidade de voz feminina depende das vozes instaladas no dispositivo.

## Testes

```bash
# Backend
cd backend
pip install -r requirements.txt
pytest -q

# Frontend
cd frontend
npm install
npm test
npm run build
```

O workflow em `.github/workflows/ci.yml` executa os testes e o build em pushes e pull requests para `main`.

## Deploy no Render

O arquivo `render.yaml` descreve o serviço FastAPI e o site estático. Ao criar o Blueprint no Render:

1. Confira os nomes e URLs finais dos dois serviços.
2. Configure `OPENAI_API_KEY` como variável secreta somente no serviço da API (opcional).
3. Ajuste `CORS_ORIGINS` para a URL pública exata do frontend.
4. Confirme `VITE_API_URL` com a URL pública da API e faça novo deploy do frontend após alterá-la.

O deploy ainda precisa ser criado e validado na conta Render.

## Conteúdo e honestidade

- Perfil, habilidades e projetos: `frontend/src/data/portfolio.js`.
- Base de conhecimento do PinkBot: `backend/app/knowledge/profile.json`.
- Estilos: `frontend/src/styles.css`.

As descrições são deliberadamente conservadoras. Não há currículo PDF cadastrado, e-mail profissional publicado ou demonstrações online adicionadas. Projetos acadêmicos e pessoais não são apresentados como emprego. Revise a base antes de publicar qualquer nova alegação técnica.

## Status

A estrutura inicial, API de conhecimento, integração opcional com LLM, controles de voz, modo recrutador, tema claro/escuro e workflow de CI foram adicionados. A execução local de testes/build e o deploy público ainda precisam ser confirmados.
