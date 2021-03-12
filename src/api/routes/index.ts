import { Router } from "express";
import userRouter from "./UserRoute";
import vehicleRouter from "./VehicleRoute";

const router = Router();

router.use("/users", userRouter);
router.use("/vehicles", vehicleRouter);

export default router;