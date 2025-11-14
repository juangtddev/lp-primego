
# Template de Landing Page Dinâmica (Data-Driven)

Um template de landing page de alta performance construído com **Next.js (App Router)**, **Tailwind v4** e **shadcn/ui**. O conteúdo, tema, layout e seções são 100% controlados por um único arquivo `landing-page.json`, permitindo criar novas páginas sem modificar o código React.

Este projeto foi desenhado para ser um **motor de landing pages**, ideal para freelancers e agências que precisam entregar projetos de alta qualidade em tempo recorde.

## Conceito Principal
A filosofia deste template é a separação total entre conteúdo e código. O React é agnóstico ao conteúdo — toda personalização vem do JSON em `config/landing-page.json`, que atua como um “Headless CMS local”, definindo:

- **O quê:** Texto, imagens e dados de cada seção.
- **A ordem:** Sequência das seções na página.
- **O tema:** Cores, fontes e bordas globais.
- **O estilo:** Padding, cores específicas e IDs para o menu.
- **A navegação:** Quais seções aparecem no menu principal.

Para um novo cliente, basta duplicar o projeto e editar o `landing-page.json`.

## Tech Stack
- **Framework:** Next.js 15+ (App Router, Server Components)
- **CSS:** Tailwind v4 (arquitetura “CSS-first” via `app/globals.css`)
- **Componentes:** shadcn/ui (Button, Card, Avatar, Accordion – controlados via CSS vars)
- **Ícones:** Lucide React
- **Tipagem:** TypeScript
- **Fonte de dados:** `config/landing-page.json`

## Features
- **Renderização dinâmica de seções** – altere a ordem ou adicione novas pelo JSON.
- **Menu dinâmico** – links do header são gerados automaticamente.
- **Motor de tema global** – personalize cores, fontes e bordas via objeto `settings`.
- **Estilização por seção** – controle padding, cores e overlays individualmente.
- **Tipagem forte** – o arquivo `lib/types.ts` usa Discriminated Unions para autocompletar e validação.
- **Arquitetura limpa**:
  - `app/layout.tsx`: injeta o tema global e gera o menu.
  - `app/page.tsx`: renderiza seções de forma dinâmica e tipada.
  - `app/globals.css`: define variáveis de tema e fontes no Tailwind.
  - `components/sections/`: componentes isolados para cada seção (Hero, Features, etc.).

## Começando
Clone o repositório:
```bash
git clone https://seu-repositorio-url/landing-page-template.git
cd landing-page-template
```

Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Como Usar: Manual de Customização
A única fonte da verdade é o arquivo `config/landing-page.json`.

### 1. Configurações Globais (`settings`)
Define identidade visual e SEO do site.

```json
{
  "settings": {
    "theme": {
      "primaryColor": "#0F172A",
      "secondaryColor": "#F8FAFC",
      "backgroundColor": "#FFFFFF",
      "textColor": "#0F172A",
      "borderRadius": "0.75rem"
    },
    "typography": {
      "fontPrimary": "Poppins",
      "fontBody": "Inter"
    },
    "seo": {
      "title": "Minha Landing Page",
      "description": "Descrição para motores de busca."
    }
  }
}
```

**Nota:** As fontes são configuradas em `app/layout.tsx` e registradas em `app/globals.css`.

### 2. Header (`header`)
Controla logo e botão CTA fixo no topo. Links são gerados automaticamente.

```json
{
  "header": {
    "logo": "SuaMarca",
    "ctaButton": {
      "text": "Fale Conosco",
      "href": "/contact"
    }
  }
}
```

### 3. Seções (`sections`)
Um array de objetos, onde cada objeto representa uma seção. A ordem define a exibição.

Exemplo:
```json
{
  "component": "Features",
  "settings": {
    "paddingTop": "lg",
    "backgroundColor": "#F8FAFC",
    "id": "recursos",
    "menuTitle": "Recursos"
  },
  "data": {
    "title": "Título da Seção",
    "subtitle": "Subtítulo da Seção"
  }
}
```

### Tipos de Componentes Disponíveis
- Hero
- Features
- HowItWorks
- Testimonials
- Logos
- Guarantee
- Pricing
- Faq
- AboutUs
- Footer

Para aparecer no menu, o `settings` precisa ter `id` e `menuTitle`.

## Estrutura do Projeto
```
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── sections/
│   └── ui/
│
├── config/
│   └── landing-page.json
│
├── lib/
│   ├── types.ts
│   └── utils.ts
│
└── public/
```

## Adicionando Nova Seção
1. **Defina Tipos** em `lib/types.ts`
2. **Crie o Componente** em `components/sections/`
3. **Registre** em `app/page.tsx`
4. **Adicione ao JSON** (`config/landing-page.json`)

## Configuração do Next.js
Autorize domínios externos no `next.config.mjs`:
```js
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'placehold.co' },
      { hostname: 'images.unsplash.com' }
    ]
  }
}
export default nextConfig
```

## Licença
Projeto licenciado sob a Licença MIT.