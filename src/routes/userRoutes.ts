import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
});

export default router;