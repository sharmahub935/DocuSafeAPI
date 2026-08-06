import { Router, Request, Response } from "express";
import { ResultSetHeader } from "mysql2";
import pool from "../db";

const router = Router();

// Retrieve all juice reports
router.get("/", async (_req: Request, res: Response) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM juicereports"
        );

        return res.status(200).json(rows);
    } catch (error) {
        console.error("GET juice reports error:", error);

        return res.status(500).json({
            message: "Failed to retrieve juice reports"
        });
    }
});


// Update an existing juice report
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const reportId = Number(req.params.id);
        const { user_id, report_date, report_name, summary } = req.body;

        if (!Number.isInteger(reportId) || reportId <= 0) {
            return res.status(400).json({
                message: "A valid report ID is required"
            });
        }

        if (!user_id || !report_date || !report_name || !summary) {
            return res.status(400).json({
                message:
                    "user_id, report_date, report_name, and summary are required"
            });
        }

        const [result] = await pool.execute<ResultSetHeader>(
            `UPDATE juicereports
             SET user_id = ?,
                 report_date = ?,
                 report_name = ?,
                 summary = ?
             WHERE report_id = ?`,
            [
                user_id,
                report_date,
                report_name,
                summary,
                reportId
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `Juice report with ID ${reportId} was not found`
            });
        }

        return res.status(200).json({
            message: "Juice report updated successfully",
            report_id: reportId
        });
    } catch (error) {
        console.error("UPDATE juice report error:", error);

        return res.status(500).json({
            message: "Failed to update juice report"
        });
    }
});

// Delete an existing juice report
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const reportId = Number(req.params.id);

        if (!Number.isInteger(reportId) || reportId <= 0) {
            return res.status(400).json({
                message: "A valid report ID is required"
            });
        }

        const [result] = await pool.execute<ResultSetHeader>(
            "DELETE FROM juicereports WHERE report_id = ?",
            [reportId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `Juice report with ID ${reportId} was not found`
            });
        }

        return res.status(200).json({
            message: "Juice report deleted successfully",
            report_id: reportId
        });
    } catch (error) {
        console.error("DELETE juice report error:", error);

        return res.status(500).json({
            message: "Failed to delete juice report"
        });
    }
});

export default router;