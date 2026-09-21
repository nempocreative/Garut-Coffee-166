import { Router, type IRouter } from "express";
import healthRouter from "./health";
import farmCalendarRouter from "./farm-calendar";

const router: IRouter = Router();

router.use(healthRouter);
router.use(farmCalendarRouter);

export default router;
