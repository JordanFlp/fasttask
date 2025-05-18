# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Estrutura de Pasta da Landing Page
fast-task-landing-page/
|-- public/                     # Arquivos estáticos públicos
|   |-- index.html
|   |-- favicon.ico
|   |-- manifest.json
|   |-- robots.txt
|   |-- assets/                 # Imagens, ícones que não são importados diretamente no JS/TS
|       |-- logo-fast-task.png
|       |-- hero-image.png
|       |-- feature-icon-1.svg
|
|-- src/                        # Código fonte da aplicação
|   |-- App.tsx                 # Componente raiz da aplicação, configura rotas se necessário
|   |-- index.tsx               # Ponto de entrada da aplicação React (renderiza o App)
|   |-- react-app-env.d.ts      # (Se usar Create React App) Declarações de tipo
|   |
|   |-- assets/                 # Ativos importados diretamente pelos componentes
|   |   |-- images/             # Imagens específicas de componentes
|   |   |   |-- benefit-image-1.jpg
|   |   |-- icons/              # Ícones SVG como componentes React ou arquivos
|   |   |   |-- CheckIcon.tsx
|   |   |   |-- ArrowRightIcon.tsx
|   |   |-- fonts/              # Arquivos de fontes locais (se não usar CDN)
|   |
|   |-- components/             # Componentes de UI reutilizáveis e genéricos
|   |   |-- common/             # Componentes de UI muito genéricos
|   |   |   |-- Button/
|   |   |   |   |-- Button.tsx
|   |   |   |   |-- Button.module.css  (ou Button.styles.ts para styled-components)
|   |   |   |-- Card/
|   |   |   |   |-- Card.tsx
|   |   |   |   |-- Card.module.css
|   |   |   |-- Input/
|   |   |   |   |-- Input.tsx
|   |   |   |   |-- Input.module.css
|   |   |
|   |   |-- layout/             # Componentes estruturais
|   |   |   |-- Header/
|   |   |   |   |-- Header.tsx
|   |   |   |   |-- Header.module.css
|   |   |   |-- Footer/
|   |   |   |   |-- Footer.tsx
|   |   |   |   |-- Footer.module.css
|   |   |   |-- Container/        # Um componente para centralizar e limitar a largura do conteúdo
|   |   |   |   |-- Container.tsx
|   |   |   |   |-- Container.module.css
|   |
|   |-- sections/               # Componentes que representam as seções da landing page
|   |   |-- HeroSection/
|   |   |   |-- HeroSection.tsx
|   |   |   |-- HeroSection.module.css
|   |   |-- FeaturesSection/
|   |   |   |-- FeaturesSection.tsx
|   |   |   |-- FeaturesSection.module.css
|   |   |-- BenefitsSection/
|   |   |   |-- BenefitsSection.tsx
|   |   |   |-- BenefitsSection.module.css
|   |   |-- HowItWorksSection/    (Opcional)
|   |   |   |-- HowItWorksSection.tsx
|   |   |   |-- HowItWorksSection.module.css
|   |   |-- CallToActionSection/
|   |   |   |-- CallToActionSection.tsx
|   |   |   |-- CallToActionSection.module.css
|   |
|   |-- pages/                  # Componentes que representam páginas completas
|   |   |-- LandingPage/
|   |   |   |-- LandingPage.tsx     # Agrega todas as seções para formar a landing page
|   |   |   |-- LandingPage.module.css
|   |
|   |-- styles/                 # Arquivos de estilo globais
|   |   |-- global.css          # Reset CSS, estilos globais de HTML, body, tipografia base
|   |   |-- theme.ts            # (Opcional) Definições de tema para styled-components (cores, fontes, breakpoints)
|   |   |-- variables.css       # (Opcional) Variáveis CSS globais (cores, espaçamentos)
|   |
|   |-- hooks/                  # Custom Hooks React (ex: useWindowSize, useScroll)
|   |   |-- useAnalytics.ts     # Exemplo
|   |
|   |-- utils/                  # Funções utilitárias genéricas (ex: formatação de datas, validações)
|   |   |-- formatters.ts
|   |   |-- constants.ts        # Constantes usadas na aplicação (ex: URLs de API, chaves)
|   |
|   |-- services/               # (Menos provável para uma landing page simples, mas se houver chamadas de API)
|   |   |-- analyticsService.ts # Exemplo para enviar eventos de analytics
|   |
|   |-- types/                  # Definições de tipo TypeScript globais ou compartilhadas
|       |-- index.d.ts
|       |-- common.types.ts
|
|-- .gitignore
|-- package.json
|-- tsconfig.json
|-- README.md


## 🎨 Paleta de Cores para o Fast Task
| Elemento                 | Cor                     | Código Hex | Uso Sugerido                                |
| ------------------------ | ----------------------- | ---------- | ------------------------------------------- |
| **Primária**             | Teal                    | `#2AB6A5`  | Botões principais, ícones ativos, destaques |
| **Secundária**           | Navy (Azul Escuro)      | `#10375C`  | Cabeçalhos, texto importante, rodapé        |
| **Plano de Fundo Claro** | Cinza Gelo              | `#F4F7F8`  | Background padrão, seções alternadas        |
| **Texto Principal**      | Cinza Grafite           | `#2C2C2C`  | Corpo do texto                              |
| **Texto Suave**          | Cinza Médio             | `#7A7A7A`  | Subtítulos, textos auxiliares               |
| **Ação/Ênfase**          | Azul Claro / Hover Teal | `#3ED0C0`  | Hover em botões, links                      |
| **Alerta/Erro**          | Vermelho Suave          | `#E74C3C`  | Mensagens de erro, campos inválidos         |
| **Sucesso**              | Verde Claro             | `#2ECC71`  | Confirmações, status concluído              |



## 💡 Dicas de Aplicação
Modo Claro: Fundo #F4F7F8, textos em #2C2C2C, botões teal/navy.

Modo Escuro (opcional): Fundo #10375C, textos em #F4F7F8, teal como cor de ação.

Use bordas suaves ou sombras em tons azulados para destacar componentes.

Interações como hover/focus devem clarear ligeiramente a cor primária para resposta visual sutil.