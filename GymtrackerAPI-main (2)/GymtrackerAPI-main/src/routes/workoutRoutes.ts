import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// GET all workouts
router.get("/", async (_req: Request, res: Response) => {
    const [rows] = await pool.query("SELECT * FROM workouts");
    res.json(rows);
});

// POST a new workout

router.post("/", async (req: Request, res: Response) => {
    try {
        const { user_id, exercise, sets, reps, weight } = req.body;

        //workout already exists or not?
        const [rows]: any = await pool.query(
            "SELECT * FROM workouts WHERE user_id = ? AND exercise = ?",
            [user_id, exercise]
        );

        if (rows.length > 0) {
            return res.status(400).json({
                message: "Workout already exists"
            });
        }

        // Insert the workout
        const [result] = await pool.query(
            `INSERT INTO workouts
            (user_id, exercise, sets, reps, weight)
            VALUES (?, ?, ?, ?, ?)`,
            [user_id, exercise, sets, reps, weight]
        );

        res.status(201).json({
            message: "Workout added successfully",
            result
        });

    } catch (error) {
        console.error("Error adding workout:", error);

        res.status(500).json({
            message: "Error adding workout"
        });
    }
});

export default router;

