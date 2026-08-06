import { Router } from "express";
import pool from "../db";

const router = Router();

router.get("/", async (_req, res) => {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
});

router.post("/", async (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400).json({ error: "name is required" });
        return;
    }

    const [result]: any = await pool.query(
        "INSERT INTO users (name) VALUES (?)",
        [name]
    );

    res.status(201).json({ id: result.insertId, name });
});

export default router;