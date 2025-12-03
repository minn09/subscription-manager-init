import express from "express";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, asc } from "drizzle-orm";
import { Pool } from "pg";
import { categoriesTable, subscriptionsTable } from "./src/db/schema.ts";
const app = express();
const port = 3000;
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

const db = drizzle({ client: pool });
const subscriptions = await db.execute("select * from subscriptions;");
const categories = await db.execute("select * from categories");

app.get("/subscriptions", async (req, res) => {
  try {
    const subscriptions = await db
      .select()
      .from(subscriptionsTable)
      .orderBy(asc(subscriptionsTable.id));

    return res.json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return res.status(500).json({ error: "Error obteniendo suscripciones" });
  }
});

app.get("/subscriptions", (req, res) => {
  return res.json(subscriptions.rows);
});

app.get("/categories", (req, res) => {
  return res.json(categories.rows);
});

app.post("/subscriptions", async (req, res) => {
  const { title, categoryId, nextRenewal, price, isRenews } = req.body;

  try {
    const created = await db
      .insert(subscriptionsTable)
      .values({ title, price, categoryId, isRenews, nextRenewal })
      .returning();

    if (created.length === 0) {
      return res.status(404).json({ error: `Faltan campos (ln:41)` });
    }

    return res.status(200).json({
      message: "Suscripción creada correctamente",
      deleted: created[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creando la suscripción" });
  }
});

app.patch("/subscriptions/:id", async (req, res) => {
  const { id } = req.params; // Similar a la peticion DELETE
  const { title, categoryId, nextRenewal, price, isRenews } = req.body; // Similar a la peticion POST

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

    if (updated.length === 0) {
      return res.status(404).json({ message: `No existe id ${id}` });
    }

    return res.status(200).json({
      message: "Suscripción actualizada correctamente",
      updated: updated[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error actualizando la suscripción" });
  }
});

app.delete("/subscriptions/:id", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "ID invalido" });
  }

  try {
    const deleted = await db
      .delete(subscriptionsTable)
      .where(eq(subscriptionsTable.id, Number(id)))
      .returning(); // opcional: devuelve el registro eliminado

    if (deleted.length === 0) {
      return res.status(404).json({ error: `No existe la suscripción ${id}` });
    }

    return res.status(200).json({
      message: "Suscripción eliminada correctamente",
      deleted: deleted[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error eliminando la suscripción" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
