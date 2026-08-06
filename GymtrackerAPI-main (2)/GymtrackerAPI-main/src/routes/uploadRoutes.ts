import { Router, Response } from "express";
import pool from "../db";
import upload from "../middleware/uploadMiddleware";
import {
  AuthenticatedRequest,
  requireAuth,
} from "../middleware/authMiddleware";

const router = Router();

router.post(
  "/",
  requireAuth,
  upload.single("document"),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "A document file is required",
        });
      }

      const { title, description, categoryId } = req.body;

      if (!title || !categoryId) {
        return res.status(400).json({
          success: false,
          message: "Title and categoryId are required",
        });
      }

      const [result]: any = await pool.query(
        `INSERT INTO documents
        (
          user_id,
          category_id,
          title,
          description,
          original_filename,
          stored_filename,
          mime_type,
          file_size
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          req.user!.userId,
          Number(categoryId),
          title,
          description || null,
          req.file.originalname,
          req.file.filename,
          req.file.mimetype,
          req.file.size,
        ]
      );

      await pool.query(
        `INSERT INTO security_logs
        (user_id, event_type, ip_address, details)
        VALUES (?, ?, ?, ?)`,
        [
          req.user!.userId,
          "DOCUMENT_UPLOAD",
          req.ip,
          `Uploaded document: ${req.file.originalname}`,
        ]
      );

      return res.status(201).json({
        success: true,
        message: "Document uploaded successfully",
        documentId: result.insertId,
      });
    } catch (error) {
      console.error("Upload error:", error);

      return res.status(500).json({
        success: false,
        message: "Document upload failed",
      });
    }
  }
);

export default router;