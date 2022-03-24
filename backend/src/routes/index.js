import { Router } from "express";
import { Authentication, Sample } from "../controllers";
import { isLoggedIn } from "../middlewares";
const router = Router();
router.get("/api", Sample.get);
router.post("/api/login", Authentication.login);
router.get("/api/loggedIn", isLoggedIn, Authentication.loggedIn);
router.use("*", Sample.notFound);
export default router;
