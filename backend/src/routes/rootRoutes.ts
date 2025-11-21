import { Router } from "express";
import authRoutes from "./authRoutes.js";
import semRoutes from "./semRoutes.js";
import subRoutes from "./subRoutes.js";
import chapRoutes from "./chapRoutes.js";
import noteRoutes from "./noteRoutes.js";

const rootRouter:Router = Router()
rootRouter.use('/auth', authRoutes)
rootRouter.use('/auth', semRoutes)
rootRouter.use('/auth', subRoutes)
rootRouter.use('/auth', chapRoutes)
rootRouter.use('/auth', noteRoutes)

export default rootRouter;