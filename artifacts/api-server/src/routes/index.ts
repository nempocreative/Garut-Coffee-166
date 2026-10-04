import { Router, type IRouter } from "express";
import healthRouter from "./health";
import farmCalendarRouter from "./farm-calendar";
import pointsRouter from "./points";

const router: IRouter = Router();

router.use(healthRouter);
router.use(farmCalendarRouter);
router.use(pointsRouter);

export default router;
