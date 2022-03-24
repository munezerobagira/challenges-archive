import { Router } from "express";
import { Authentication, Json, Sample } from "../controllers";
import { isLoggedIn } from "../middlewares";
const router = Router();
router.get("/api", Sample.get);
router.post("/api/login", Authentication.login);
router.patch("/api/patch", isLoggedIn, Json.patch);
router.use("*", Sample.notFound);
export default router;
