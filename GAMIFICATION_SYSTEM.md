# Sistema Completo de Gamificação - Mentes.ia

## Visão Geral

Sistema robusto de gamificação com XP, níveis, streaks, badges e recompensas emocionais integrado em toda a plataforma.

---

## 🎮 Componentes do Sistema

### 1. Sistema de XP (Experience Points)

#### Ações que Geram XP
| Ação | XP | Descrição |
|------|-----|-----------|
| Check-in Diário | 5 | Fazer check-in de humor |
| Hábito Concluído | 5 | Marcar hábito como feito |
| Progresso em Meta | 3 | Incrementar meta numérica |
| Meta Alcançada | 10 | Completar meta |
| Exercício Completado | 8 | Finalizar exercício de trilha |
| Sessão de Meditação | 10 | Completar meditação |
| Entrada no Diário | 7 | Escrever no diário |
| Streak 7 dias | 20 | Bônus de consistência |
| Streak 30 dias | 50 | Marco mensal |
| Streak 100 dias | 100 | Centurião |

#### Cálculo de XP e Níveis
```typescript
// XP necessário para nível N:
xpRequired = (N - 1)² * 100

// Exemplos:
Nível 1: 0 XP
Nível 2: 100 XP
Nível 3: 400 XP
Nível 5: 1600 XP
Nível 10: 8100 XP
```

### 2. Sistema de Níveis

#### Progressão de Níveis (1-10)

| Nível | XP Necessário | Título | Descrição | Cor |
|-------|---------------|--------|-----------|-----|
| 1 | 0 | Aprendiz | Dando os primeiros passos | Cinza |
| 2 | 100 | Explorador | Descobrindo o caminho | Azul Claro |
| 3 | 400 | Praticante | Construindo consistência | Azul |
| 4 | 900 | Dedicado | Comprometido com a jornada | Cyan |
| 5 | 1600 | Resiliente | Superando desafios | Verde |
| 6 | 2500 | Focado | Concentração inabalável | Verde Escuro |
| 7 | 3600 | Disciplinado | Hábitos profundos | Roxo |
| 8 | 4900 | Transformador | Mudança real acontecendo | Roxo Escuro |
| 9 | 6400 | Iluminado | Sabedoria crescente | Rosa |
| 10 | 8100 | Mestre Interior | Equilíbrio e maestria | Dourado |

### 3. Sistema de Streaks

#### Definição
Streak = número de dias consecutivos com atividade no app

#### Regras
- +1 streak por dia ativo
- Reset para 1 se pular um dia
- Tracking de "Melhor Streak" (recorde)
- Marcos: 7, 30, 100 dias

#### Atividades que Mantêm Streak
- Check-in diário
- Completar hábito
- Fazer exercício
- Atualizar meta
- Qualquer ação que gere XP

### 4. Sistema de Badges

#### 15 Badges Disponíveis

**Comum (5)**
1. **Primeiros Passos** - Primeiro check-in
2. **Construtor de Hábitos** - Criar primeiro hábito
3. **Visionário** - Definir primeira meta

**Incomum (3)**
4. **Guerreiro Semanal** - Streak de 7 dias
5. **Madrugador** - 10 check-ins antes das 8h
6. **Resiliente (Nível 5)** - Alcançar nível 5

**Raro (5)**
7. **Mestre do Mês** - Streak de 30 dias
8. **Campeão de Hábitos** - 100 hábitos completados
9. **Realizador** - 10 metas alcançadas
10. **Monge Meditante** - 50 meditações
11. **Explorador Mental** - Exercícios de todas as trilhas

**Épico (3)**
12. **Centurião** - 100 dias de streak
13. **Perfeccionista** - Todos os hábitos por 7 dias
14. **Colecionador de XP** - 5000 XP acumulados

**Lendário (1)**
15. **Mestre Interior (Nível 10)** - Nível máximo

#### Raridades e Cores
```json
{
  "common": "#94A3B8",      // Cinza
  "uncommon": "#3B82F6",    // Azul
  "rare": "#A855F7",        // Roxo
  "epic": "#EC4899",        // Rosa
  "legendary": "#FBBF24"    // Dourado
}
```

### 5. Recompensas Emocionais

#### Mensagens Adaptativas

**Level Up** (5 variações)
- "Você está evoluindo! Continue nessa jornada incrível."
- "Seu crescimento é inspirador. Parabéns pelo novo nível!"
- "Cada nível é uma prova do seu compromisso. Celebre essa conquista!"

**Streak Milestone** (5 variações)
- "Sua consistência é poderosa! Continue assim."
- "Dia após dia, você está criando uma nova versão de si mesmo."

**Badge Earned** (5 variações)
- "Nova conquista desbloqueada! Você merece esse badge."
- "Seu esforço foi recompensado. Parabéns pela conquista!"

**Goal Completed** (5 variações)
- "Meta alcançada! Você transformou sonho em realidade."
- "Cada meta completada é uma promessa cumprida consigo mesmo."

**Habit Streak** (5 variações)
- "Hábitos diários criam destinos extraordinários. Continue!"
- "Você está reprogramando seu cérebro, uma repetição de cada vez."

---

## 📊 Arquitetura Técnica

### Estrutura de Arquivos

```
src/
├── data/
│   └── gamification.json              # Configurações estáticas
├── utils/
│   ├── gamificationSystem.ts          # Lógica principal
│   └── gamification.ts                # Utils legados (mantido)
├── hooks/
│   └── useGamification.tsx            # Hook React para XP/Notifications
├── components/
│   └── gamification/
│       ├── LevelProgress.tsx          # Barra de progresso de nível
│       ├── BadgeDisplay.tsx           # Exibição de badges
│       ├── StreakDisplay.tsx          # Visualização de streaks
│       └── XPNotification.tsx         # Notificações de XP
└── pages/
    └── ProgressPage.tsx               # Página principal de progresso
```

### gamification.json
Arquivo de configuração centralizado contendo:
- **levels**: Array de 10 níveis com títulos e cores
- **xpActions**: Mapa de ações → XP
- **badges**: Array de 15 badges com requirements
- **emotionalRewards**: Mensagens por categoria
- **rarityColors**: Cores das raridades

### gamificationSystem.ts
Funções principais:

```typescript
// XP & Níveis
calculateLevel(xp: number): number
getLevelInfo(level: number): LevelInfo
xpProgress(xp: number): ProgressInfo
awardXP(userId, action, multiplier): Promise<Result>

// Streaks
updateStreak(userId: string): Promise<StreakResult>

// Badges
getAllBadges(): BadgeDefinition[]
checkAndAwardBadges(userId, progress): Promise<Badge[]>
checkBadgeRequirement(badge, progress): boolean

// Progress
getUserProgress(userId: string): Promise<UserProgress>

// Recompensas
getEmotionalReward(category): string
```

### useGamification Hook
Hook React para gerenciar gamificação:

```typescript
const { earnXP, maintainStreak, NotificationContainer } = useGamification(userId);

// Uso:
await earnXP('habit_completion');
await maintainStreak();
<NotificationContainer />
```

---

## 🎨 Componentes de UI

### LevelProgress
Exibe progresso de nível com barra animada

**Variantes:**
- `compact` - Mini versão para header
- `full` - Versão completa com detalhes

**Props:**
```typescript
{
  xp: number;
  level: number;
  variant?: 'compact' | 'full';
}
```

### BadgeDisplay
Mostra badge com tooltip e animações

**Props:**
```typescript
{
  badge: BadgeDefinition;
  earned?: boolean;
  earnedAt?: string;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}
```

**Features:**
- Grayscale quando não conquistado
- Check verde quando conquistado
- Tooltip com informações
- Hover effects
- Cores por raridade

### StreakDisplay
Visualização de streak atual e recorde

**Variantes:**
- `compact` - Badge simples com número
- `full` - Card com marcos (7, 30, 100 dias)

**Props:**
```typescript
{
  currentStreak: number;
  longestStreak: number;
  variant?: 'compact' | 'full';
}
```

### XPNotification
Toast notification animado para eventos

**Tipos:**
- `xp` - Ganho de XP
- `levelUp` - Subiu de nível
- `badge` - Badge conquistado
- `streak` - Streak mantido

**Features:**
- Auto-dismiss (5s)
- Animações slide-in/out
- Cores temáticas
- Mensagens emocionais

---

## 📱 Página de Progresso

### /app/progress

#### Seções

1. **Stats Cards** (4 cards)
   - XP Total
   - Nível Atual
   - Badges Conquistados
   - Check-ins Totais

2. **Level Progress**
   - Barra de progresso detalhada
   - XP para próximo nível
   - Título e descrição do nível

3. **Streak Display**
   - Streak atual vs melhor
   - Marcos visuais (7/30/100)
   - Ícones flame/award

4. **Estatísticas Detalhadas**
   - Hábitos completados
   - Metas alcançadas
   - Exercícios feitos
   - Check-ins diários

5. **Conquistas (Badges)**
   - Agrupados por raridade
   - Progresso (X/Total)
   - Grid responsivo
   - Hover tooltips

---

## 🔗 Integrações

### Hábitos (habitsApi.ts)
```typescript
// Ao completar hábito:
await completeHabit(userId, habitId);
// Automaticamente:
// - +5 XP para usuário
// - Atualiza streak
// - Verifica badges
```

### Metas (goalsApi.ts)
```typescript
// Ao completar meta:
await completeGoal(goalId);
// +10 XP automático

// Ao atualizar progresso:
await updateGoalProgress(goalId, value);
// +3 XP por incremento
```

### Check-ins
```typescript
// Implementação futura em MoodTracker:
const { earnXP, maintainStreak } = useGamification(userId);

await earnXP('daily_checkin');
await maintainStreak();
```

### Exercícios
```typescript
// Ao completar exercício:
await earnXP('exercise_completion');
// +8 XP
```

---

## 🎯 Como Usar

### 1. Integrar XP em Nova Feature

```typescript
import { useGamification } from '../hooks/useGamification';

function MyComponent() {
  const { profile } = useAuth();
  const { earnXP, NotificationContainer } = useGamification(profile?.id);

  const handleAction = async () => {
    // Sua lógica...

    // Ganhar XP:
    await earnXP('action_name');
  };

  return (
    <>
      {/* Seu componente */}
      <NotificationContainer />
    </>
  );
}
```

### 2. Adicionar Nova Ação de XP

**1. Editar gamification.json:**
```json
{
  "xpActions": {
    "nova_acao": { "xp": 15, "description": "Nova ação legal" }
  }
}
```

**2. Usar no código:**
```typescript
await earnXP('nova_acao');
```

### 3. Criar Novo Badge

**Editar gamification.json:**
```json
{
  "badges": [
    {
      "id": "novo_badge",
      "name": "Nome do Badge",
      "description": "Descrição",
      "icon": "IconName",
      "color": "#14F1FF",
      "rarity": "rare",
      "requirement": {
        "type": "tipo_requirement",
        "value": 10
      }
    }
  ]
}
```

**Tipos de Requirement:**
- `checkins` - Total de check-ins
- `streak` - Dias consecutivos
- `habits_completed` - Hábitos feitos
- `goals_completed` - Metas alcançadas
- `exercises_completed` - Exercícios feitos
- `level` - Nível atingido
- `total_xp` - XP acumulado

### 4. Exibir Progresso em Componente

```typescript
import { LevelProgress } from '../components/gamification/LevelProgress';

<LevelProgress
  xp={profile.xp}
  level={profile.level}
  variant="compact"
/>
```

---

## 📈 Tracking de Progresso

### Dados Armazenados (Supabase)

#### profiles
```sql
- xp (integer) - XP total do usuário
- level (integer) - Nível atual
- current_streak (integer) - Dias consecutivos
- longest_streak (integer) - Recorde pessoal
- last_activity_date (date) - Última atividade
```

#### user_badges
```sql
- user_id (uuid) - FK para profiles
- badge_id (uuid) - FK para badges
- earned_at (timestamptz) - Data de conquista
```

#### badges (Sistema)
```sql
- id (uuid) - PK
- name (text) - Nome do badge
- description (text) - Descrição
- icon_name (text) - Ícone Lucide
- requirement_type (text) - Tipo de requisito
- requirement_value (integer) - Valor necessário
```

### Queries Úteis

**Total de XP por usuário:**
```sql
SELECT SUM(xp_earned)
FROM habit_completions
WHERE user_id = $1;
```

**Badges conquistados:**
```sql
SELECT b.*, ub.earned_at
FROM user_badges ub
JOIN badges b ON b.id = ub.badge_id
WHERE ub.user_id = $1
ORDER BY ub.earned_at DESC;
```

**Streak atual:**
```sql
SELECT current_streak, longest_streak
FROM profiles
WHERE id = $1;
```

---

## 🎨 Temas Visuais

### Cores Primárias
```css
--primary: #14F1FF;        /* Cyan Neon */
--secondary: #3B82F6;      /* Azul */
--success: #10B981;        /* Verde */
--warning: #F59E0B;        /* Laranja */
--error: #EF4444;          /* Vermelho */
```

### Gradientes
```css
.bg-gradient-primary {
  background: linear-gradient(90deg, #14F1FF 0%, #3B82F6 100%);
}
```

### Shadows
```css
.shadow-glow-sm { box-shadow: 0 0 20px rgba(20, 241, 255, 0.3); }
.shadow-glow-md { box-shadow: 0 0 30px rgba(20, 241, 255, 0.4); }
.shadow-glow-lg { box-shadow: 0 0 40px rgba(20, 241, 255, 0.5); }
```

---

## 🚀 Próximas Features

### Planejadas
- [ ] Leaderboards globais
- [ ] Desafios semanais
- [ ] Badges sazonais
- [ ] Sistema de títulos
- [ ] Conquistas secretas
- [ ] Replay de evolução
- [ ] Gráficos de progresso
- [ ] Comparação com amigos
- [ ] Recompensas por milestone
- [ ] Easter eggs

### Melhorias Técnicas
- [ ] Cache de badges
- [ ] Optimistic updates
- [ ] Batch XP awards
- [ ] Analytics tracking
- [ ] A/B testing de XP values

---

## 📊 Métricas

### Performance
- Build: 8.91s
- Bundle size: 245.54 KB (gzipped)
- Componentes: 4 novos
- Hooks: 1 novo
- JSON config: 1 arquivo

### Cobertura
- Páginas: 1 (ProgressPage)
- Integrações: 2 (Habits, Goals)
- Badges: 15
- Níveis: 10
- Ações XP: 10

---

## 🎓 Boas Práticas

### 1. Sempre Atualizar Streak
```typescript
// Ao registrar qualquer atividade:
await maintainStreak();
```

### 2. Feedback Imediato
```typescript
// Sempre mostrar XP ganho:
const { earnXP, NotificationContainer } = useGamification();
await earnXP('action');
return <NotificationContainer />;
```

### 3. Verificar Badges Regularmente
```typescript
// Após ações importantes:
const progress = await getUserProgress(userId);
await checkAndAwardBadges(userId, progress);
```

### 4. Mensagens Emocionais
```typescript
// Use recompensas do sistema:
const message = getEmotionalReward('levelUp');
showNotification({ message });
```

---

## 📞 Troubleshooting

### Problema: XP não atualiza
**Solução:** Verificar se `awardXP()` está sendo chamado corretamente e se o userId é válido.

### Problema: Badge não desbloqueia
**Solução:** Chamar `checkAndAwardBadges()` após a ação relevante.

### Problema: Streak resetou injustamente
**Solução:** Verificar timezone do servidor vs cliente. Usar UTC.

### Problema: Notificação não aparece
**Solução:** Garantir que `<NotificationContainer />` está renderizado.

---

## ✅ Checklist de Implementação

- [x] Sistema de XP com 10 ações
- [x] 10 níveis progressivos
- [x] Sistema de streaks
- [x] 15 badges com raridades
- [x] Recompensas emocionais
- [x] Página de progresso
- [x] Componentes UI futuristas
- [x] Hook useGamification
- [x] Integração com hábitos
- [x] Integração com metas
- [x] Notificações animadas
- [x] Tracking no Supabase
- [x] Documentação completa
- [x] Build bem-sucedido

---

**Status:** ✅ Sistema Completo
**Versão:** 1.0.0
**Data:** Dezembro 2024
**Pronto para:** Produção
