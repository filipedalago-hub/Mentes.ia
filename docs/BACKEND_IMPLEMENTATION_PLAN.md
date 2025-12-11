# Backend Implementation Plan - Mentes.ia

## 📋 Visão Geral

Implementação de backend robusto em NestJS com PostgreSQL (Supabase) para suportar:
- Autenticação JWT
- Gamificação completa
- APIs RESTful
- Sistema de notificações
- Ligas semanais com cron jobs

## 🏗️ Arquitetura

```
backend/
├── src/
│   ├── main.ts                    # Bootstrap
│   ├── app.module.ts              # Root module
│   ├── common/                    # Shared utilities
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── pipes/
│   ├── config/                    # Configuration
│   │   ├── database.config.ts
│   │   ├── jwt.config.ts
│   │   └── app.config.ts
│   ├── auth/                      # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── jwt-refresh.strategy.ts
│   │   └── dto/
│   ├── users/                     # Users module
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   └── dto/
│   ├── gamification/              # Gamification module
│   │   ├── xp/
│   │   │   ├── xp.controller.ts
│   │   │   ├── xp.service.ts
│   │   │   └── dto/
│   │   ├── streaks/
│   │   ├── lives/
│   │   ├── levels/
│   │   └── badges/
│   ├── missions/                  # Missions module
│   ├── habits/                    # Habits & Goals module
│   ├── leagues/                   # Weekly leagues module
│   │   ├── leagues.controller.ts
│   │   ├── leagues.service.ts
│   │   ├── leagues.cron.ts
│   │   └── dto/
│   ├── notifications/             # Notifications module
│   └── admin/                     # Admin endpoints
├── prisma/
│   ├── schema.prisma              # Database schema
│   ├── migrations/                # SQL migrations
│   └── seed.ts                    # Seed data
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── nest-cli.json
├── tsconfig.json
├── package.json
└── README.md
```

## 🗄️ Database Schema (Prisma)

### Core Tables

```prisma
model User {
  id                String   @id @default(uuid())
  email             String   @unique
  passwordHash      String   @map("password_hash")
  name              String?
  timezone          String   @default("UTC")
  avatarUrl         String?  @map("avatar_url")
  lastActiveAt      DateTime? @map("last_active_at")
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")

  // Relations
  missions          UserMission[]
  habits            Habit[]
  xpEvents          XpEvent[]
  badges            UserBadge[]
  streak            Streak?
  lives             Lives?
  sessions          Session[]
  leagueHistory     UserLeagueHistory[]
  weeklyPoints      WeeklyPoints[]
  notifications     Notification[]

  @@map("users")
}

model Mission {
  id          String   @id @default(uuid())
  title       String
  description String
  xpReward    Int      @map("xp_reward")
  difficulty  String
  type        String
  metadata    Json?
  createdAt   DateTime @default(now()) @map("created_at")

  userMissions UserMission[]

  @@map("missions")
}

model UserMission {
  id          String   @id @default(uuid())
  userId      String   @map("user_id")
  missionId   String   @map("mission_id")
  status      String   @default("pending")
  completedAt DateTime? @map("completed_at")
  xpAwarded   Boolean  @default(false) @map("xp_awarded")
  txId        String?  @unique @map("tx_id")
  createdAt   DateTime @default(now()) @map("created_at")

  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  mission Mission @relation(fields: [missionId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([missionId])
  @@map("user_missions")
}

model Habit {
  id            String   @id @default(uuid())
  userId        String   @map("user_id")
  title         String
  frequency     Json
  streakCount   Int      @default(0) @map("streak_count")
  longestStreak Int      @default(0) @map("longest_streak")
  lastDoneDate  DateTime? @map("last_done_date")
  createdAt     DateTime @default(now()) @map("created_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("habits")
}

model XpEvent {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  amount    Int
  reason    String
  refId     String?  @map("ref_id")
  createdAt DateTime @default(now()) @map("created_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([createdAt])
  @@map("xp_events")
}

model Level {
  id         String @id @default(uuid())
  level      Int    @unique
  name       String
  xpRequired Int    @map("xp_required")

  @@map("levels")
}

model Badge {
  id          String @id @default(uuid())
  slug        String @unique
  title       String
  description String
  iconUrl     String? @map("icon_url")

  userBadges UserBadge[]

  @@map("badges")
}

model UserBadge {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  badgeId   String   @map("badge_id")
  awardedAt DateTime @default(now()) @map("awarded_at")

  user  User  @relation(fields: [userId], references: [id], onDelete: Cascade)
  badge Badge @relation(fields: [badgeId], references: [id], onDelete: Cascade)

  @@unique([userId, badgeId])
  @@index([userId])
  @@map("user_badges")
}

model Streak {
  id               String   @id @default(uuid())
  userId           String   @unique @map("user_id")
  currentStreak    Int      @default(0) @map("current_streak")
  lastDateRecorded DateTime? @map("last_date_recorded")
  freezeUsed       Boolean  @default(false) @map("freeze_used")
  freezesAvailable Int      @default(0) @map("freezes_available")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("streaks")
}

model Lives {
  id                    String   @id @default(uuid())
  userId                String   @unique @map("user_id")
  currentLives          Int      @default(5) @map("current_lives")
  maxLives              Int      @default(5) @map("max_lives")
  nextLifeAt            DateTime? @map("next_life_at")
  regenIntervalSeconds  Int      @default(1800) @map("regen_interval_seconds")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("lives")
}

model League {
  id          String @id @default(uuid())
  name        String @unique
  rankFloor   Int    @map("rank_floor")
  rankCeiling Int    @map("rank_ceiling")
  tier        Int    @unique

  userHistory UserLeagueHistory[]

  @@map("leagues")
}

model UserLeagueHistory {
  id            String   @id @default(uuid())
  userId        String   @map("user_id")
  leagueId      String   @map("league_id")
  weekStartDate DateTime @map("week_start_date")
  rank          Int?
  points        Int      @default(0)
  promoted      Boolean  @default(false)
  demoted       Boolean  @default(false)
  createdAt     DateTime @default(now()) @map("created_at")

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  league League @relation(fields: [leagueId], references: [id], onDelete: Cascade)

  @@unique([userId, weekStartDate])
  @@index([weekStartDate])
  @@map("user_league_history")
}

model WeeklyPoints {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  weekStart DateTime @map("week_start")
  points    Int      @default(0)
  createdAt DateTime @default(now()) @map("created_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, weekStart])
  @@index([weekStart])
  @@map("weekly_points")
}

model Notification {
  id           String    @id @default(uuid())
  userId       String    @map("user_id")
  type         String
  payload      Json
  scheduledFor DateTime  @map("scheduled_for")
  sentAt       DateTime? @map("sent_at")
  status       String    @default("pending")
  createdAt    DateTime  @default(now()) @map("created_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([scheduledFor, status])
  @@map("notifications")
}

model Session {
  id         String   @id @default(uuid())
  userId     String   @map("user_id")
  tokenHash  String   @map("token_hash")
  expiresAt  DateTime @map("expires_at")
  deviceInfo Json?    @map("device_info")
  createdAt  DateTime @default(now()) @map("created_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([expiresAt])
  @@map("sessions")
}
```

## 🔐 Authentication Flow

### Endpoints

**POST /auth/signup**
```typescript
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}

Response:
{
  "accessToken": "jwt...",
  "refreshToken": "jwt...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**POST /auth/login**
```typescript
{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: Same as signup
```

**POST /auth/refresh**
```typescript
{
  "refreshToken": "jwt..."
}

Response:
{
  "accessToken": "new_jwt...",
  "refreshToken": "new_refresh_jwt..."
}
```

**POST /auth/logout**
```typescript
Headers: Authorization: Bearer <accessToken>

Response: 204 No Content
```

### Security Measures

1. **Password Hashing**: bcrypt with 10 rounds
2. **JWT**: RS256 or HS256
   - Access Token: 15 minutes
   - Refresh Token: 7 days (stored in DB, can be revoked)
3. **Rate Limiting**:
   - Login: 5 attempts per 15 min
   - Signup: 3 per hour per IP
4. **Input Validation**: class-validator on all DTOs
5. **Session Management**: Track active sessions, revoke on logout

## 🎮 Gamification APIs

### XP System

**POST /xp/award**
```typescript
Headers: Authorization: Bearer <token>
Body:
{
  "amount": 50,
  "reason": "complete_mission",
  "refId": "mission_uuid",
  "txId": "unique_transaction_id" // Para idempotência
}

Response:
{
  "totalXp": 1250,
  "leveledUp": true,
  "newLevel": 5,
  "xpEvent": { ... }
}
```

**GET /xp/me**
```typescript
Response:
{
  "totalXp": 1250,
  "currentLevel": 5,
  "xpForNextLevel": 1500,
  "xpNeeded": 250,
  "recentEvents": [...]
}
```

### Streaks

**GET /streaks/me**
```typescript
Response:
{
  "currentStreak": 7,
  "lastDateRecorded": "2024-12-11",
  "freezesAvailable": 2,
  "isAtRisk": false
}
```

**POST /streaks/freeze**
```typescript
Response:
{
  "success": true,
  "freezesRemaining": 1,
  "message": "Streak protected for today"
}
```

**POST /streaks/check-in**
```typescript
Response:
{
  "currentStreak": 8,
  "isNewRecord": false,
  "xpAwarded": 10
}
```

### Lives

**GET /lives/me**
```typescript
Response:
{
  "currentLives": 4,
  "maxLives": 5,
  "nextLifeAt": "2024-12-11T16:30:00Z",
  "minutesUntilNextLife": 15
}
```

**POST /lives/use**
```typescript
Response:
{
  "currentLives": 3,
  "nextLifeAt": "2024-12-11T16:30:00Z"
}
```

**POST /lives/refill** (premium/admin)
```typescript
Response:
{
  "currentLives": 5,
  "message": "Lives refilled"
}
```

### Leagues

**GET /leagues/current**
```typescript
Response:
{
  "league": {
    "id": "uuid",
    "name": "Gold",
    "tier": 3
  },
  "rank": 15,
  "weekPoints": 450,
  "weekStart": "2024-12-09",
  "status": "safe" // or "promotion_zone" or "relegation_zone"
}
```

**GET /leagues/:leagueId/leaderboard**
```typescript
Response:
{
  "leaderboard": [
    {
      "rank": 1,
      "userId": "uuid",
      "name": "Player 1",
      "points": 1200
    },
    ...
  ],
  "userRank": 15,
  "totalPlayers": 50
}
```

### Missions

**GET /missions**
```typescript
Query: ?status=available&limit=10

Response:
{
  "missions": [
    {
      "id": "uuid",
      "title": "Complete 3 exercises",
      "description": "...",
      "xpReward": 50,
      "difficulty": "easy",
      "progress": {
        "status": "in_progress",
        "current": 1,
        "required": 3
      }
    }
  ]
}
```

**POST /missions/:id/complete**
```typescript
Response:
{
  "mission": { ... },
  "xpAwarded": 50,
  "completed": true
}
```

## 🔔 Notifications System

### Tipos de Notificação

```typescript
enum NotificationType {
  STREAK_WARNING = 'streak_warning',
  LIVES_FULL = 'lives_full',
  LEAGUE_PROMOTION = 'league_promotion',
  LEAGUE_RELEGATION_RISK = 'league_relegation_risk',
  DAILY_MISSION = 'daily_mission',
  WEEKLY_SUMMARY = 'weekly_summary',
  BADGE_EARNED = 'badge_earned',
}
```

### Agendamento

```typescript
// Service interno para agendar notificações
async scheduleNotification(
  userId: string,
  type: NotificationType,
  payload: any,
  scheduledFor: Date
): Promise<Notification>
```

### Cron Jobs

**Streak Warnings** (22:00 diário):
```typescript
@Cron('0 22 * * *')
async sendStreakWarnings() {
  // Buscar usuários sem atividade hoje e streak > 0
  // Agendar notificação: "Seu streak de X dias está em risco!"
}
```

**Lives Full** (quando regenerar última vida):
```typescript
async onLivesRefilled(userId: string) {
  // Notificar: "Suas vidas estão cheias! Hora de praticar!"
}
```

**Weekly Summary** (Domingo 20:00):
```typescript
@Cron('0 20 * * 0')
async sendWeeklySummary() {
  // Resumo: XP ganho, exercícios completos, posição na liga
}
```

## 📊 Admin Endpoints

**GET /admin/metrics**
```typescript
Headers: Admin auth token

Response:
{
  "users": {
    "total": 10000,
    "activeToday": 5000,
    "activeThisWeek": 7500
  },
  "retention": {
    "d1": 0.85,
    "d7": 0.65,
    "d30": 0.45
  },
  "gamification": {
    "avgXpPerUser": 450,
    "avgStreakLength": 12,
    "livesUsedToday": 15000
  },
  "leagues": {
    "distribution": {
      "bronze": 30,
      "silver": 25,
      "gold": 20,
      ...
    }
  }
}
```

## 🔄 Cron Jobs (Weekly Leagues)

```typescript
// leagues.cron.ts
@Injectable()
export class LeaguesCronService {
  @Cron('0 0 * * 1') // Every Monday at 00:00
  async resetWeeklyLeagues() {
    // 1. Calculate final rankings from last week
    // 2. Promote top 10 users
    // 3. Relegate bottom 10 users
    // 4. Reset weekly points to 0
    // 5. Send promotion/demotion notifications
  }
}
```

## 🧪 Testing Strategy

### Unit Tests
```typescript
describe('XpService', () => {
  it('should award XP and create event', async () => {
    // Test XP awarding logic
  });

  it('should prevent duplicate XP for same txId', async () => {
    // Test idempotency
  });

  it('should trigger level up when threshold reached', async () => {
    // Test level progression
  });
});
```

### Integration Tests
```typescript
describe('Auth Flow (e2e)', () => {
  it('should signup, login, refresh, logout', async () => {
    // Full auth flow test
  });
});
```

### Load Tests (optional)
- Artillery or k6 for endpoint stress testing
- Target: 1000 req/s on /xp/award

## 🔒 Security Checklist

- [x] Password hashing (bcrypt)
- [x] JWT with expiration
- [x] Refresh token rotation
- [x] Rate limiting (ThrottlerModule)
- [x] Input validation (class-validator)
- [x] SQL injection prevention (Prisma)
- [x] XSS prevention (sanitization)
- [x] CORS configuration
- [x] Helmet for security headers
- [x] Environment variables for secrets
- [x] Session revocation on logout
- [x] Audit logs for admin actions

## 🚀 Deployment

### Environment Variables
```bash
DATABASE_URL="postgresql://user:pass@host:5432/db"
SUPABASE_URL="https://xxx.supabase.co"
SUPABASE_SERVICE_KEY="service_role_key"
JWT_SECRET="random_secret_256_bits"
JWT_REFRESH_SECRET="another_random_secret"
PORT=3000
NODE_ENV="production"
CORS_ORIGIN="https://mentes.ia,https://app.mentes.ia"
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

### CI/CD (GitHub Actions)
```yaml
name: Backend CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

## 📈 Performance Considerations

1. **Database Indexes**: All foreign keys and frequently queried fields
2. **Caching**: Redis for leaderboards (optional)
3. **Query Optimization**: Use Prisma select to fetch only needed fields
4. **Pagination**: All list endpoints support limit/offset
5. **Background Jobs**: Use Bull queue for heavy tasks (optional)

## 📝 API Documentation

- Swagger/OpenAPI auto-generated via @nestjs/swagger
- Available at: http://localhost:3000/api/docs
- Postman collection exportable

---

**Status**: 🚧 Implementation in progress
**Next Steps**:
1. Create Prisma schema
2. Generate migrations
3. Implement auth module
4. Implement gamification modules
5. Add cron jobs
6. Write tests
