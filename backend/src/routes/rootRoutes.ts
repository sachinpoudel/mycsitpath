import { Router } from "express";
import authRoutes from "./authRoutes.js";
import semRoutes from "./semRoutes.js";
import subRoutes from "./subRoutes.js";

const rootRouter:Router = Router()
rootRouter.use('/auth', authRoutes)
rootRouter.use('/auth', semRoutes)
rootRouter.use('/auth', subRoutes)

export default rootRouter;