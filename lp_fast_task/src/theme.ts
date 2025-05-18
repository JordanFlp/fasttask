export const theme = {
  colors: {
    primary: '#2AB6A5',      // Teal - Botões principais, ícones ativos, destaques
    secondary: '#10375C',    // Navy (Azul Escuro) - Cabeçalhos, texto importante, rodapé
    backgroundLight: '#F4F7F8', // Cinza Gelo - Background padrão, seções alternadas
    textMain: '#2C2C2C',      // Cinza Grafite - Corpo do texto
    textSoft: '#7A7A7A',      // Cinza Médio - Subtítulos, textos auxiliares
    actionEmphasis: '#3ED0C0',// Azul Claro / Hover Teal - Hover em botões, links
    alertError: '#E74C3C',   // Vermelho Suave - Mensagens de erro, campos inválidos
    success: '#2ECC71',       // Verde Claro - Confirmações, status concluído
    white: '#FFFFFF',
  },
  breakpoints: {
    tablet: '768px',
    desktop: '1024px',
  },
};

export type ThemeType = typeof theme;