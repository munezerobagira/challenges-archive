import { Router } from "express";
import { Sample } from "../controllers";
const router = Router();
router.get("/api", Sample.get);
router.use("*", Sample.notFound);
export default router;
