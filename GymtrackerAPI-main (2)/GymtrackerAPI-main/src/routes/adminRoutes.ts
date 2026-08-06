import { Router, Response } from "express";
import pool from "../db";
import {
  AuthenticatedRequest,
  requireAuth,
  requireRole,
} from "../middleware/authMiddleware";

const router = Router();

router.get(
  "/pending-documents",
  requireAuth,
  requireRole("ADMIN"),
  async (_req: AuthenticatedRequest, res: Response) => {
    try {
      const [rows] = await pool.query(`
        SELECT
          d.document_id,
          d.title,
          d.original_filename,
          d.status,
          d.submitted_at,
          u.full_name AS student_name,
          c.category_name
        FROM documents d
        JOIN users u ON d.user_id = u.user_id
        JOIN categories c ON d.category_id = c.category_id
        WHERE d.status = 'PENDING'
        ORDER BY d.submitted_at DESC
      `);

      res.json({
        success: true,
        documents: rows,
      });
    } catch (error) {
      console.error("Admin document query error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to retrieve pending documents",
      });
    }
  }
);

export default router;