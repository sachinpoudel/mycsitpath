import { Router } from "express";
import authRoutes from "./authRoutes.js";
import semRoutes from "./semRoutes.js";

const rootRouter:Router = Router()
rootRouter.use('/auth', authRoutes)
rootRouter.use('/auth', semRoutes)
rootRouter.use('/auth', semRoutes)

export default rootRouter;