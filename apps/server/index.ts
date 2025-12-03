import express from "express";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, asc } from "drizzle-orm";
import { Pool } from "pg";
import cors from "cors";
import pino from "pino";
import { categoriesTable, subscriptionsTable } from "./src/db/schema.ts";

import "dotenv/config";

const app = express();
const port = 3000;

// ---------- LOGGER ----------
const transport = pino.transport({
  target: "pino-pretty",
  options: {
    colorize: true,
    translateTime: "SYS:standard",
  },
});

const logger = pino(
  {
    level: "info",
  },
  transport
);

// ---------- DB POOL ----------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle({ client: pool });

// ---------- MIDDLEWARES ----------
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = ["http://localhost:3000"];
      if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"), false);
    },
  })
);

app.use(express.json());

// pino-logger
app.use((req, res, next) => {
  const start = performance.now();

  res.on("finish", () => {
    const duration = performance.now() - start;

    logger.info({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration.toFixed(2)} ms`,
      date: new Date().toISOString(),
    });
  });

  next();
});

// ---------- ROUTES ----------
app.get("/subscriptions", async (req, res) => {
  try {
    const data = await db
      .select()
      .from(subscriptionsTable)
      .orderBy(asc(subscriptionsTable.id));

    return res.json(data);
  } catch (error) {
    logger.error(error, "Error fetching subscriptions");
    return res.status(500).json({ error: "Error obteniendo suscripciones" });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const data = await db
      .select()
      .from(categoriesTable)
      .orderBy(asc(categoriesTable.id));

    return res.json(data);
  } catch (error) {
    logger.error(error, "Error fetching categories");
    return res.status(500).json({ error: "Error obteniendo categorias" });
  }
});

app.post("/subscriptions", async (req, res) => {
  const { title, categoryId, nextRenewal, price, isRenews } = req.body;

  try {
    const created = await db
      .insert(subscriptionsTable)
      .values({ title, price, categoryId, isRenews, nextRenewal })
      .returning();

    return res.status(200).json({
      message: "Suscripción creada correctamente",
      subscription: created[0],
    });
  } catch (error) {
    logger.error(error, "Error creando suscripción");
    return res.status(500).json({ error: "Error creando la suscripción" });
  }
});

app.patch("/subscriptions/:id", async (req, res) => {
  const { id } = req.params;
  const { title, categoryId, nextRenewal, price, isRenews } = req.body;

  try {
    const updated = await db
      .update(subscriptionsTable)
      .set({
        ...(title !== undefined && { title }),
        ...(categoryId !== undefined && { categoryId }),
        ...(nextRenewal !== undefined && { nextRenewal }),
        ...(price !== undefined && { price }),
        ...(isRenews !== undefined && { isRenews }),
      })
      .where(eq(subscriptionsTable.id, Number(id)))
      .returning();

    if (!updated.length) {
      return res.status(404).json({ message: `No existe id ${id}` });
    }

    return res.status(200).json({
      message: "Suscripción actualizada correctamente",
      subscription: updated[0],
    });
  } catch (error) {
    logger.error(error, "Error actualizando suscripción");
    return res.status(500).json({ error: "Error actualizando la suscripción" });
  }
});

app.delete("/subscriptions/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "ID invalido" });
  }

  try {
    const deleted = await db
      .delete(subscriptionsTable)
      .where(eq(subscriptionsTable.id, Number(id)))
      .returning();

    if (!deleted.length) {
      return res.status(404).json({ error: `No existe la suscripción ${id}` });
    }

    return res.status(200).json({
      message: "Suscripción eliminada correctamente",
      subscription: deleted[0],
    });
  } catch (error) {
    logger.error(error, "Error eliminando suscripción");
    return res.status(500).json({ error: "Error eliminando la suscripción" });
  }
});

// ---------- SHUTDOWN LIMPIO ----------
process.on("SIGINT", async () => {
  logger.info("Cerrando conexión a la base de datos...");
  await pool.end();
  logger.info("Conexión cerrada. Bye.");
  process.exit(0);
});

// ---------- START ----------
app.listen(port, () => {
  logger.info(`Server listening on http://localhost:${port}`);
});
