import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getCurrentAdmin,
} from "../../controllers/adminAuth.controller";
import { requireAdmin } from "../../middlewares/requireAdmin.middleware";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);
router.get("/getCurrentAdmin", requireAdmin, getCurrentAdmin);

export default router;
