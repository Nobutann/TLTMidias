# TLT Mídias - Jornal do Commercio

## Introdução

O **TLT Mídias** é um projeto voltado para aumentar a retenção de usuários no portal online do Jornal do Commercio. O projeto propõe uma repaginação da plataforma, focando na:

- Priorização eficiente de informações: conteúdo organizado de forma clara para facilitar a navegação e o acesso às notícias mais relevantes.
- Destaque visual para notícias: uso estratégico de cores e formas para chamar a atenção dos leitores para os conteúdos principais.
- Maior interação entre usuários: implementação de funcionalidades que promovem engajamento e participação ativa.
- Remodelagem da interface: design moderno e intuitivo, que proporciona uma experiência de leitura agradável e fluida.

O objetivo central dessas melhorias é aperfeiçoar a experiência do usuário, aumentando a fidelidade e engajamento dos leitores da plataforma.

## Funcionalidades

Pretendemos alcançar esse objetivo por meio das seguintes funcionalidades:

**Menu de Categorias Organizadas**  
Permite que o usuário acesse categorias e subcategorias organizadas por áreas de interesse (Esportes, Política, Economia, Cultura, Tecnologia) ao clicar na aba de menu da página inicial.

**Recomendações de Conteúdo e Anúncios Relacionados**  
Exibe, ao final de cada notícia, recomendações de matérias e anúncios personalizados com base no tema do conteúdo acessado.

**Notificações de Breaking News**  
Envia notificações imediatas sobre notícias urgentes (breaking news) aos leitores cadastrados, com possibilidade de personalização por categoria.

**Sistema de Busca**  
Permite buscar notícias por palavra-chave, data ou categoria, exibindo apenas os resultados correspondentes aos filtros aplicados.

**Seção de Comentários**  
Inclui uma área de comentários ao final de cada notícia, permitindo que usuários logados interajam entre si e compartilhem opiniões sobre o conteúdo.

**Compartilhamento em Redes Sociais**  
Oferece botões para compartilhamento direto das matérias em plataformas como Twitter, Instagram Stories e WhatsApp, com geração automática de links.

**Destaque de Matérias Relevantes na Página Inicial**  
Exibe as notícias mais importantes no topo da página inicial, facilitando o acesso do usuário aos conteúdos de maior interesse.

**Gerenciamento de Artigos pelos Funcionários**  
Permite que funcionários publiquem, editem e deletem artigos, garantindo que o conteúdo disponível seja sempre atualizado e legível para os leitores.

## Ambiente de Desenvolvimento (Windows - PowerShell)

Siga estes passos para montar o ambiente, executar a aplicação Django e rodar os testes E2E com Cypress.

Pré-requisitos
- Python 3.11+ instalado e disponível no PATH
- Node.js (v16+) e `npm` instalados
- Git (para clonar o repositório quando necessário)

1) Criar e ativar um virtualenv (PowerShell)

```powershell
cd C:\caminho\para\TLTMidias
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2) Instalar dependências Python

```powershell
pip install --upgrade pip
pip install -r requirements.txt
```

3) Aplicar migrações e preparar o banco (SQLite por padrão)

```powershell
python manage.py migrate --noinput
# opcional: criar superusuário
python manage.py createsuperuser
```

4) Instalar dependências Node (Cypress)

```powershell
npm ci
# se não usar ci (sem package-lock), use:
# npm install
```

5) Rodar o servidor de desenvolvimento

```powershell
python manage.py runserver 8000
# aplicação estará disponível em http://127.0.0.1:8000
```

6) Rodar testes Cypress (headless)

Abra outro terminal (ainda com o virtualenv ativo) e execute um dos comandos abaixo.

Rodar toda a suíte (usa `baseUrl` configurado):
```powershell
npx cypress run --headless --config baseUrl=http://127.0.0.1:8000
```

Rodar um spec específico (ex.: `acessar_artigo.cy.js`):
```powershell
npx cypress run --headless --spec cypress/e2e/acessar_artigo.cy.js --config baseUrl=http://127.0.0.1:8000
```

Orquestrar servidor + testes em um único comando (start-server-and-test):
```powershell
npx start-server-and-test "python manage.py runserver 8000" http://127.0.0.1:8000 "npx cypress run --headless --config baseUrl=http://127.0.0.1:8000"
```

7) Execução interativa do Cypress (UI)

```powershell
npx cypress open --config baseUrl=http://127.0.0.1:8000
```

Executar testes Django (unitários)

```powershell
python manage.py test
```

## Entregas

[Histórias do usuário](https://docs.google.com/document/d/1B55Cy02mlvmEyRBUyu2h5Y5slspZt34zP3P5U8Sm4WE/edit?usp=sharing)

[Testes automatizados](https://youtu.be/UTVZEfI3OXU)

[Screencast do CI/CD com build e deployment automatizado e integração dos testes automatizados](https://youtu.be/90TVAFrj5HU)

