# 🎨 Mentes.ia - Component Showcase

## Design System

### Paleta de Cores Oficial
```
Primary:    #00AEEF (Cyan vibrante)
Background: #0A0F2D (Dark profundo)
Accent:     #14F1FF (Neon cyan)
Neon:       #0066FF (Blue neon)
White Soft: #E6F1FF (Branco suave)
Neutral:    #2F3A4D (Cinza neutro)
```

---

## UI Components

### 1. Button
**Arquivo:** `src/components/ui/Button.tsx`

**Variants:** `primary` | `secondary` | `neon` | `ghost` | `danger`
**Sizes:** `sm` | `md` | `lg`

```tsx
import { Button } from '../components/ui';

// Primary
<Button variant="primary">Salvar</Button>

// Com loading
<Button variant="primary" loading>Salvando...</Button>

// Com ícone
<Button variant="neon" icon={<Star />}>
  Destaque
</Button>

// Full width
<Button variant="primary" fullWidth>
  Continuar
</Button>
```

### 2. Input
**Arquivo:** `src/components/ui/Input.tsx`

```tsx
import { Input } from '../components/ui';
import { Mail } from 'lucide-react';

<Input
  type="email"
  label="E-mail"
  placeholder="seu@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  icon={<Mail size={20} />}
  error="E-mail inválido"
  helper="Usaremos para enviar notificações"
  required
/>
```

### 3. Card
**Arquivo:** `src/components/ui/Card.tsx`

**Variants:** `default` | `glow` | `gradient`
**Padding:** `sm` | `md` | `lg`

```tsx
import { Card } from '../components/ui';

// Default
<Card>Conteúdo</Card>

// Com glow effect
<Card variant="glow" padding="lg">
  Destaque
</Card>

// Gradient background
<Card variant="gradient" hover>
  Premium
</Card>
```

### 4. Modal
**Arquivo:** `src/components/ui/Modal.tsx`

**Sizes:** `sm` | `md` | `lg` | `xl`

```tsx
import { Modal } from '../components/ui';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmação"
  size="md"
>
  <p>Tem certeza que deseja continuar?</p>
  <div className="flex gap-4 mt-6">
    <Button onClick={() => setIsOpen(false)}>
      Cancelar
    </Button>
    <Button variant="primary">
      Confirmar
    </Button>
  </div>
</Modal>
```

### 5. Checkbox
**Arquivo:** `src/components/ui/Checkbox.tsx`

```tsx
import { Checkbox } from '../components/ui';

<Checkbox
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
  label="Aceito os termos de uso"
/>
```

### 6. Select
**Arquivo:** `src/components/ui/Select.tsx`

```tsx
import { Select } from '../components/ui';

<Select
  label="Categoria"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  error={error}
>
  <option value="">Selecione</option>
  <option value="mental">Mental</option>
  <option value="spiritual">Espiritual</option>
</Select>
```

### 7. Textarea
**Arquivo:** `src/components/ui/Textarea.tsx`

```tsx
import { Textarea } from '../components/ui';

<Textarea
  label="Reflexão"
  placeholder="Escreva sua reflexão..."
  value={text}
  onChange={(e) => setText(e.target.value)}
  rows={5}
/>
```

### 8. IconButton
**Arquivo:** `src/components/ui/IconButton.tsx`

```tsx
import { IconButton } from '../components/ui';
import { Settings } from 'lucide-react';

<IconButton
  icon={<Settings />}
  label="Configurações"
  variant="ghost"
  onClick={handleSettings}
/>
```

---

## Layout Components

### 1. MainLayout
**Arquivo:** `src/components/layout/MainLayout.tsx`

```tsx
import { MainLayout } from '../components/layout';

<MainLayout>
  <h1>Conteúdo da página</h1>
</MainLayout>
```

### 2. Header
**Arquivo:** `src/components/layout/Header.tsx`

Features:
- Logo clicável
- Navegação responsiva
- Menu mobile hamburger
- User menu (Perfil, Configurações, Sair)
- Active state nos links

### 3. Footer
**Arquivo:** `src/components/layout/Footer.tsx`

Features:
- Links rápidos
- Informações de contato
- Social links
- Copyright

---

## Gamification Components

### 1. XPBar
**Arquivo:** `src/components/gamification/XPBar.tsx`

```tsx
import { XPBar } from '../components/gamification';

<XPBar
  currentXP={1250}
  showDetails
  animated
  size="md"
/>
```

**Output:**
```
Nível 5                     1250 / 2000 XP
[███████████░░░░░░░░░░░] 62%
                62% para o próximo nível
```

### 2. StreakCounter
**Arquivo:** `src/components/gamification/StreakCounter.tsx`

```tsx
import { StreakCounter } from '../components/gamification';

<StreakCounter
  currentStreak={7}
  longestStreak={30}
  compact={false}
/>
```

Features:
- Animação de fogo
- Destaque para recordes
- Modo compacto para headers

### 3. LevelBadge
**Arquivo:** `src/components/gamification/LevelBadge.tsx`

```tsx
import { LevelBadge } from '../components/gamification';

<LevelBadge
  level={5}
  size="lg"
  showTitle
/>
```

### 4. BadgeShowcase
**Arquivo:** `src/components/gamification/BadgeShowcase.tsx`

```tsx
import { BadgeShowcase } from '../components/gamification';

<BadgeShowcase
  badges={allBadges}
  earnedBadgeIds={['badge1', 'badge2']}
  maxDisplay={12}
/>
```

Features:
- Grid responsivo
- Estados earned/locked
- Cores por raridade (common, uncommon, rare, epic, legendary)
- Hover effects

---

## Logo Component

**Arquivo:** `src/components/Logo.tsx`

**Variants:** `full` | `icon`
**Sizes:** `sm` (64px) | `md` (80px) | `lg` (112px) | `xl` (160px)

```tsx
import { Logo } from '../components/Logo';

// Logo completo
<Logo variant="full" size="lg" />

// Apenas ícone
<Logo variant="icon" size="md" />
```

---

## Color System

### Tailwind Classes

**Background:**
```tsx
bg-dark          // #0A0F2D
bg-dark-lighter  // #111936
bg-titanium      // #2F3A4D
```

**Text:**
```tsx
text-soft-white  // #E6F1FF
text-soft-gray   // #A9B9D6
text-soft-muted  // #6B7A9F
text-primary     // #00AEEF
text-neon-cyan   // #14F1FF
```

**Gradients:**
```tsx
bg-gradient-primary  // Primary → Neon Blue
bg-gradient-accent   // Accent → Primary
bg-gradient-dark     // Dark → Dark Lighter
bg-gradient-neon     // Neon Blue → Accent
```

**Shadows:**
```tsx
shadow-glow-sm       // Glow pequeno
shadow-glow-md       // Glow médio
shadow-glow-lg       // Glow grande
shadow-glow-primary  // Glow primary
shadow-glow-accent   // Glow accent
```

---

## Animations

### CSS Classes

```tsx
// Fade in
animate-scaleIn

// Slide from right
animate-slideIn

// Float
animate-float

// Pulse slow
animate-pulse-slow

// Glow pulse
animate-pulse-glow
```

### Custom Animations
```css
/* Float */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Glow */
@keyframes glow {
  0% { box-shadow: 0 0 5px rgba(20, 241, 255, 0.2); }
  100% { box-shadow: 0 0 20px rgba(20, 241, 255, 0.6); }
}
```

---

## Responsive Design

### Breakpoints
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### Mobile-First Examples

```tsx
// Responsive padding
<div className="px-4 md:px-6 lg:px-8">

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Responsive text
<h1 className="text-2xl md:text-4xl lg:text-6xl">

// Hide on mobile
<div className="hidden md:block">

// Show only mobile
<div className="md:hidden">
```

---

## Best Practices

### 1. Sempre use componentes UI
```tsx
// ✅ Correto
<Button variant="primary">Salvar</Button>

// ❌ Incorreto
<button className="px-6 py-3 bg-primary...">Salvar</button>
```

### 2. Use design tokens
```tsx
// ✅ Correto
<div className="text-soft-white bg-dark-lighter">

// ❌ Incorreto
<div className="text-white bg-gray-800">
```

### 3. Mobile-first
```tsx
// ✅ Correto
<div className="text-sm md:text-base lg:text-lg">

// ❌ Incorreto (desktop-first)
<div className="text-lg md:text-base sm:text-sm">
```

### 4. Componha com Card
```tsx
// ✅ Correto
<Card variant="glow" padding="lg">
  <h2>Título</h2>
  <p>Conteúdo</p>
</Card>

// ❌ Incorreto
<div className="bg-dark-lighter border...">
  <h2>Título</h2>
  <p>Conteúdo</p>
</div>
```

---

## Quick Reference

### Component Import Map
```tsx
// UI
import {
  Button,
  Input,
  Card,
  Modal,
  Checkbox,
  Select,
  Textarea,
  IconButton
} from '../components/ui';

// Layout
import {
  Header,
  Footer,
  MainLayout
} from '../components/layout';

// Gamification
import {
  XPBar,
  StreakCounter,
  LevelBadge,
  BadgeShowcase
} from '../components/gamification';

// Logo
import { Logo } from '../components/Logo';
```

---

## Testing Components

### Visual Regression Testing
```bash
npm run dev
# Acesse http://localhost:5173
# Teste cada componente manualmente
```

### Component Checklist
- [ ] Estados: default, hover, active, disabled
- [ ] Responsivo: mobile, tablet, desktop
- [ ] Acessibilidade: keyboard nav, screen reader
- [ ] Loading states
- [ ] Error states
- [ ] Dark theme compatible

---

**Última atualização:** Dezembro 2024
**Versão:** 1.0.0
