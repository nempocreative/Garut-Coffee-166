import { Router, type IRouter } from "express";
import { SyncFarmCalendarBody, SyncFarmCalendarResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/farm-calendar/sync", (req, res) => {
  const body = SyncFarmCalendarBody.parse(req.body);
  const data = SyncFarmCalendarResponse.parse({
    acceptedCount: body.activities.length,
    syncedAt: new Date().toISOString(),
  });

  req.log.info({ acceptedCount: data.acceptedCount }, "Farm calendar snapshot synced");
  res.json(data);
});

export default router;