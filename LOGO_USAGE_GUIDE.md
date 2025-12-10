# Guia de Uso da Logo - Mentes.ia

## 📍 Onde a Logo Aparece no App

### 1. Landing Page (/)
**Componente:** `LandingPage.tsx`
**Localização:** Header/Navbar
**Variante:** `full`
**Tamanho:** `md` (40px altura)

```tsx
<nav className="relative z-10 border-b border-titanium/30">
  <Logo size="md" />
</nav>
```

**Visualização:**
- Desktop: Logo completa visível no canto superior esquerdo
- Mobile: Logo completa (pode ser otimizada para ícone)

---

### 2. Login Page (/login)
**Componente:** `LoginPage.tsx`
**Localização:** Centralizada acima do formulário
**Variante:** `full`
**Tamanho:** `lg` (56px altura)

```tsx
<div className="text-center mb-8">
  <Link to="/">
    <Logo size="lg" />
  </Link>
</div>
```

**Visualização:**
- Desktop/Mobile: Logo grande e centralizada
- Clicável (link para home)

---

### 3. Signup Page (/signup)
**Componente:** `SignupPage.tsx`
**Localização:** Centralizada acima do formulário
**Variante:** `full`
**Tamanho:** `lg` (56px altura)

```tsx
<div className="text-center mb-8">
  <Link to="/">
    <Logo size="lg" />
  </Link>
</div>
```

**Visualização:**
- Desktop/Mobile: Logo grande e centralizada
- Clicável (link para home)

---

### 4. App Layout (Dashboard e todas as páginas internas)
**Componente:** `AppLayout.tsx`
**Localização:** Header superior esquerdo
**Variante:** `full`
**Tamanho:** `sm` (32px altura)

```tsx
<nav className="bg-dark-lighter border-b border-titanium/30">
  <Link to="/app">
    <Logo size="sm" />
  </Link>
</nav>
```

**Visualização:**
- Desktop: Logo pequena no header com stats ao lado
- Mobile: Logo pequena no header mobile

---

### 5. Favicon (Todas as páginas)
**Arquivo:** `index.html`
**Localização:** Tab do browser
**Variante:** `icon`
**Arquivo:** `mentes-ia-icon.png`

```html
<link rel="icon" type="image/png" href="/assets/logo/mentes-ia-icon.png" />
```

**Visualização:**
- Desktop/Mobile: Ícone na aba do navegador
- Favoritos: Ícone nos bookmarks

---

### 6. PWA Home Screen Icon
**Arquivo:** `manifest.json`
**Localização:** Home screen (quando instalado como app)
**Variante:** `icon`
**Tamanhos:** 192px, 512px

```json
"icons": [
  {
    "src": "/assets/logo/mentes-ia-icon.png",
    "sizes": "192x192",
    "type": "image/png"
  }
]
```

**Visualização:**
- iOS: Ícone na home screen
- Android: Ícone no app drawer
- Desktop PWA: Ícone no menu iniciar

---

### 7. Social Media Cards (Open Graph)
**Arquivo:** `index.html`
**Localização:** Quando compartilhado em redes sociais
**Variante:** `full`
**Arquivo:** `mentes-ia-full.png`

```html
<meta property="og:image" content="/assets/logo/mentes-ia-full.png">
<meta name="twitter:image" content="/assets/logo/mentes-ia-full.png">
```

**Visualização:**
- Facebook: Preview com logo
- Twitter: Card com logo
- LinkedIn: Preview com logo
- WhatsApp: Thumbnail com logo

---

## 🎨 Variantes e Quando Usar

### Variante: `full` (Logo Completa)
**Quando usar:**
- Headers e navbars
- Landing pages
- Páginas de autenticação
- Social media
- Documentos oficiais

**Não usar quando:**
- Espaço muito limitado (< 100px)
- Favicon/ícones pequenos
- App icons móveis

---

### Variante: `icon` (Apenas Ícone)
**Quando usar:**
- Favicon
- App icons (iOS/Android)
- Avatares de perfil
- Badges pequenos
- Loading spinners
- Notificações

**Não usar quando:**
- Headers principais
- Hero sections
- Primeira impressão
- Marketing materials

---

## 📏 Tamanhos e Contexto

### `size="sm"` (32px altura)
**Contextos:**
- Mobile nav headers
- Sidebar condensada
- Footer
- Inline mentions

---

### `size="md"` (40px altura) - **PADRÃO**
**Contextos:**
- Desktop headers
- Default em componentes
- Cards de features
- Documentação

---

### `size="lg"` (56px altura)
**Contextos:**
- Login/Signup pages
- Hero sections
- Modals importantes
- Onboarding screens

---

### `size="xl"` (80px altura)
**Contextos:**
- Landing page hero
- About page
- Splash screens
- Email headers

---

## 🎯 Responsividade

### Mobile First Approach

**Breakpoints:**
```tsx
// Extra Small (< 640px)
<Logo size="sm" />

// Small (640px - 768px)
<Logo size="sm" /> ou <Logo size="md" />

// Medium (768px - 1024px)
<Logo size="md" />

// Large (> 1024px)
<Logo size="md" /> ou <Logo size="lg" />
```

**Exemplo Responsivo:**
```tsx
<div className="flex items-center">
  {/* Mobile */}
  <div className="block md:hidden">
    <Logo size="sm" />
  </div>

  {/* Desktop */}
  <div className="hidden md:block">
    <Logo size="md" />
  </div>
</div>
```

---

## 💻 Código de Exemplo

### Uso Básico
```tsx
import { Logo } from '@/components/Logo';

function Header() {
  return (
    <header>
      <Logo variant="full" size="md" />
    </header>
  );
}
```

### Com Link
```tsx
import { Logo } from '@/components/Logo';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link to="/">
        <Logo variant="full" size="md" />
      </Link>
    </header>
  );
}
```

### Com Classes Customizadas
```tsx
<Logo
  variant="full"
  size="lg"
  className="hover:opacity-80 transition-opacity"
/>
```

### Responsive
```tsx
<Logo
  variant="full"
  size="sm"
  className="h-8 md:h-10 lg:h-12"
/>
```

---

## 🔍 Testes Visuais

### Checklist de Qualidade:
- [ ] Logo visível em fundo escuro (#0A0F2D)
- [ ] Logo visível em fundo claro (#FFFFFF)
- [ ] Proporções mantidas em todos os tamanhos
- [ ] Sem pixelização ou blur
- [ ] Carregamento rápido (< 1s)
- [ ] Alt text descritivo presente
- [ ] Clicável quando esperado (headers)
- [ ] Hover states funcionando

---

## 📱 Preview em Diferentes Dispositivos

### Desktop (1920x1080)
```
┌──────────────────────────────────────┐
│ [Logo] [Menu] [Login] [Signup]       │ ← Header (md)
├──────────────────────────────────────┤
│                                      │
│         [Logo Grande]                │ ← Hero (xl)
│                                      │
└──────────────────────────────────────┘
```

### Tablet (768x1024)
```
┌────────────────────┐
│ [Logo] [Menu] [≡]  │ ← Header (md)
├────────────────────┤
│                    │
│   [Logo Média]     │ ← Hero (lg)
│                    │
└────────────────────┘
```

### Mobile (375x667)
```
┌──────────────┐
│ [Logo] [≡]   │ ← Header (sm)
├──────────────┤
│              │
│ [Logo Med]   │ ← Content (md)
│              │
└──────────────┘
```

---

## 🎨 Cores e Backgrounds

### Fundo Escuro (Padrão)
```css
background: #0A0F2D;
/* Logo funciona perfeitamente */
```

### Fundo Claro (Alternativo)
```css
background: #FFFFFF;
/* Logo tem contraste suficiente */
```

### Fundo com Gradiente
```css
background: linear-gradient(to bottom, #0A0F2D, #111936);
/* Logo permanece visível */
```

---

## 📊 Especificações Técnicas

### Formato
- **Tipo:** PNG com transparência
- **Resolução:** Alta (859KB)
- **Aspect Ratio:** Preservado automaticamente

### Performance
- **Loading:** Eager (critical images)
- **Lazy:** Disponível para below-fold
- **Object Fit:** Contain (mantém proporções)

### Acessibilidade
- **Alt Text:** "Mentes.ia - Desenvolvimento Mental com IA"
- **Role:** img (implícito)
- **Aria Label:** Herdado do alt text

---

## 🚀 Otimizações Futuras

### Curto Prazo:
1. Gerar tamanhos específicos (192px, 512px, 1024px)
2. Converter para WebP (melhor compressão)
3. Adicionar loading="lazy" onde apropriado

### Longo Prazo:
1. Criar versão SVG (escalabilidade infinita)
2. Implementar dark/light mode variants
3. Adicionar animações sutis (hover, entrance)
4. Criar versão monocromática
5. Desenvolver sistema de sub-marcas

---

## 📞 Dúvidas Frequentes

### Q: Posso usar a logo em fundo colorido?
**A:** Sim, desde que haja contraste suficiente. Teste sempre.

### Q: Preciso solicitar permissão para usar a logo?
**A:** Não para uso interno do app. Para uso externo, seguir brand guidelines.

### Q: Qual tamanho usar no footer?
**A:** Use `size="sm"` (32px) para footers compactos.

### Q: A logo funciona em dark mode?
**A:** Sim, a logo foi desenhada para fundo escuro por padrão.

### Q: Posso customizar as cores da logo?
**A:** Não recomendado. Use a logo original para manter identidade.

---

**Última Atualização:** 10 de Dezembro de 2024
**Versão:** 1.0.0
**Documentação:** Completa e Atualizada
