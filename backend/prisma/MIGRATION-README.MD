# Prisma + Supabase Quickstart

## 1. Install Prisma

```bash
npm install prisma @prisma/client
```

## 2. Ensure Your Prisma Schema Exists

Your Prisma schema file should be at one of these locations (default is recommended):

```
./prisma/schema.prisma
```

If your schema is elsewhere, use the `--schema` flag, e.g.:

```bash
npx prisma migrate dev --name init --schema=backend/prisma/schema.prisma
```

## 3. Set Up Your `.env` File

Make sure your `.env` file contains your Supabase database URL:

```
SUPABASE_DB_URL=postgresql://username:password@host:port/database
```

## 4. Run Your First Migration

From your project root, run:

```bash
npx prisma migrate dev --name init --schema=backend/prisma/schema.prisma
```

- If your schema is at schema.prisma, you can omit the `--schema` flag.

**If you see:**
```
Error: Could not find Prisma Schema that is required for this command.
```
- Make sure your schema file exists at the path you provided.
- Use the `--schema` flag to specify the correct path.

## 5. Generate the Prisma Client

```bash
npx prisma generate --schema=backend/prisma/schema.prisma
```

## 6. Use Prisma Client in Your Code

```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const teams = await prisma.team.findMany();
  console.log(teams);
}

main();
```

---

## Troubleshooting

- **Schema not found:**  
  Use the `--schema` flag with the correct path to your schema.prisma file.
- **Environment variables not loaded:**  
  Ensure `.env` is in your project root and contains the correct `SUPABASE_DB_URL`.

---

**Summary:**  
- Place your schema at schema.prisma or use `--schema`.
- Run `npx prisma migrate dev --name init --schema=backend/prisma/schema.prisma`.
- Run `npx prisma generate --schema=backend/prisma/schema.prisma`.
- Use the generated client in your TypeScript code.