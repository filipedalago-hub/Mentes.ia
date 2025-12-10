# Mentes.ia Logo Assets

## Arquivos de Logo

### Logo Principal
- **mentes-ia-full.png** - Logo completa com texto "Mentes.ia"
  - Uso: Landing page, headers, splash screens
  - Formato: PNG com transparência
  - Tamanho: 859KB

### Logo Ícone
- **mentes-ia-icon.png** - Versão ícone/marca da logo
  - Uso: Favicon, app icons, avatares
  - Formato: PNG com transparência
  - Tamanho: 859KB

## Implementação

### Componente React
```tsx
import { Logo } from '@/components/Logo';

// Logo completa
<Logo variant="full" size="md" />

// Apenas ícone
<Logo variant="icon" size="sm" />
```

### Tamanhos Disponíveis
- **sm**: 32px altura (mobile nav, favicon)
- **md**: 40px altura (padrão, headers)
- **lg**: 56px altura (login/signup)
- **xl**: 80px altura (landing hero)

### Variantes
- **full**: Logo completa com texto (padrão)
- **icon**: Apenas ícone/marca

## Uso em HTML
```html
<!-- Favicon -->
<link rel="icon" type="image/png" href="/assets/logo/mentes-ia-icon.png" />

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" href="/assets/logo/mentes-ia-icon.png" />

<!-- Open Graph -->
<meta property="og:image" content="/assets/logo/mentes-ia-full.png">
```

## PWA Manifest
O arquivo `/manifest.json` já está configurado com os ícones corretos para Progressive Web App.

## Notas Técnicas
- Todas as imagens têm transparência
- Formato PNG otimizado
- Loading eager para critical images
- Aspect ratio preservado com object-contain
- Totalmente responsivo

## Cores da Marca
- Fundo: #0A0F2D (Navy escuro)
- Accent: #14F1FF (Cyan neon)
- Texto: #E6F1FF (Branco suave)

## Atualizações
Última atualização: Dezembro 2024
Versão: 1.0
