# StefanyPortifolio — STEFANY.EXE

Portfólio pessoal de Stefany Barboza, com experiência interativa e o assistente virtual PinkBot.

## Arquitetura

- **Frontend:** React 18, Vite, JavaScript, Framer Motion e Lucide.
- **Backend:** Python, FastAPI e HTTPX.
- **Base de conhecimento:** arquivo JSON versionado no repositório.
- **Inteligência artificial opcional:** integração com API compatível com Chat Completions, acessada exclusivamente pelo backend.
- **Testes:** Vitest, Testing Library e Pytest.
- **Publicação:** configuração de serviços preparada para Render.

## Requisitos

- Node.js 20 ou superior e npm.
- Python 3.12 ou superior.
- Git para clonar o repositório.

## Executar localmente

### 1. Backend

No terminal:

```bash
cd backend
python -m venv .venv
```

Ative o ambiente virtual:

```powershell
# Windows PowerShell
.venv\Scripts\Activate.ps1
```

```bash
# macOS, Linux ou Git Bash
source .venv/bin/activate
```

Instale as dependências e prepare as variáveis de ambiente:

```bash
pip install -r requirements.txt
cp .env.example .env
```

Inicie a API:

```bash
uvicorn app.main:app --reload --port 8000
```

- API: http://localhost:8000
- Documentação interativa: http://localhost:8000/docs
- Verificação de saúde: http://localhost:8000/api/health

### 2. Frontend

Em outro terminal, na raiz do repositório:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

A aplicação ficará disponível em http://localhost:5173.

Variáveis do frontend:

| Variável | Finalidade |
| --- | --- |
| `VITE_API_URL` | Endereço da API. Localmente, use `http://localhost:8000`. |
| `VITE_CONTACT_EMAIL` | E-mail público opcional exibido na área de contato. Deixe vazio para não publicar um endereço. |

As variáveis com prefixo `VITE_` são incorporadas ao código disponibilizado no navegador. Não coloque segredos nelas.

## PinkBot

O PinkBot possui dois modos de resposta:

1. **Base de conhecimento:** respostas estruturadas a partir de `backend/app/knowledge/profile.json`.
2. **Modelo de linguagem (LLM):** quando `OPENAI_API_KEY` está configurada no ambiente do backend, o servidor encaminha a conversa ao endpoint compatível configurado.

A chave de API é utilizada somente no servidor e nunca deve ser incluída no frontend ou versionada no Git.

Variáveis do backend:

| Variável | Finalidade |
| --- | --- |
| `APP_ENV` | Ambiente de execução. |
| `CORS_ORIGINS` | Origens autorizadas, separadas por vírgula. |
| `OPENAI_API_KEY` | Chave secreta opcional para habilitar respostas via LLM. |
| `OPENAI_BASE_URL` | Endereço-base da API compatível. Padrão: `https://api.openai.com/v1`. |
| `OPENAI_MODEL` | Modelo utilizado. Padrão: `gpt-4o-mini`. |

Sem chave, o PinkBot continua respondendo com a base de conhecimento. Se a API estiver indisponível, a interface apresenta respostas locais de contingência e identifica esse modo, sem afirmar que existe uma conexão ativa com IA.

O histórico da conversa permanece no estado da interface e é enviado à API quando necessário. A API não persiste conversas em banco de dados.

### Voz

A síntese e o reconhecimento de fala utilizam a Web Speech API quando disponíveis no navegador. A pessoa visitante pode continuar digitando; o uso do microfone depende da permissão e do suporte do navegador. A disponibilidade de vozes em português e de vozes femininas depende do dispositivo.

## API

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/health` | Verifica se a API está respondendo. |
| `GET` | `/api/knowledge` | Retorna a base pública de conhecimento do portfólio. |
| `POST` | `/api/chat` | Envia uma pergunta ao PinkBot. |

Exemplo de requisição para `POST /api/chat`:

```json
{
  "message": "Quais são os projetos da Stefany?",
  "history": []
}
```

A resposta contém `reply`, `mode` e `assistant`. Os valores de `mode` identificam se a resposta veio da base de conhecimento (`knowledge`) ou do modelo de linguagem (`llm`). Esses nomes fazem parte do contrato da API e permanecem no formato original.

## Testes e validação

Backend:

```bash
cd backend
pip install -r requirements.txt
pytest -q
```

Frontend:

```bash
cd frontend
npm install
npm test
npm run build
```

O fluxo de integração contínua em `.github/workflows/ci.yml` está configurado para executar testes e compilação em eventos de push e pull request direcionados à branch `main`. A existência dessa configuração não substitui a conferência do resultado das execuções no GitHub Actions.

## Publicação no Render

O arquivo `render.yaml` descreve a API FastAPI e o site estático. Ao configurar o Blueprint no Render:

1. Confira os nomes e os endereços públicos finais dos dois serviços.
2. Se desejar habilitar respostas via LLM, configure `OPENAI_API_KEY` como variável secreta somente no serviço da API.
3. Ajuste `CORS_ORIGINS` para incluir a origem pública exata do frontend.
4. Confira `VITE_API_URL` com o endereço público da API.
5. Após alterar variáveis incorporadas ao frontend, gere uma nova publicação do site.

O estado da publicação deve ser confirmado no painel do Render; este README não presume que um deploy esteja ativo ou validado.

## Organização do projeto

- Perfil, habilidades, experiências e projetos exibidos: `frontend/src/data/portfolio.js`.
- Base de conhecimento do PinkBot: `backend/app/knowledge/profile.json`.
- Regras de resposta da base: `backend/app/knowledge.py`.
- API e integração opcional com LLM: `backend/app/main.py`.
- Componentes e interface: `frontend/src/`.
- Estilos: `frontend/src/styles.css`.

## Precisão das informações e privacidade

As descrições do portfólio e as respostas do PinkBot devem refletir somente informações confirmadas. Projetos pessoais e acadêmicos não devem ser apresentados como experiências profissionais. Funcionalidades planejadas devem ser identificadas como planejadas, e não como recursos já entregues.

O currículo original, telefone, e-mail pessoal e endereço não são disponibilizados pela API pública. Para contato profissional, utilize os links públicos de LinkedIn e GitHub apresentados no portfólio.

Antes de publicar novas informações, confira a consistência entre `frontend/src/data/portfolio.js` e `backend/app/knowledge/profile.json`.
