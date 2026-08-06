import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
    try {
        const [rows] = await pool.query(
            `SELECT category_id, category_name, description
             FROM categories
             ORDER BY category_id`
        );

        res.status(200).json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error("Error getting categories:", error);

        res.status(500).json({
            success: false,
            message: "Unable to retrieve categories"
        });
    }
});

export default router;