import { Router } from "express";
import authRoutes from "./authRoutes.js";
import semRoutes from "./semRoutes.js";
import subRoutes from "./subRoutes.js";
import chapRoutes from "./chapRoutes.js";
import noteRoutes from "./noteRoutes.js";

const rootRouter:Router = Router()
rootRouter.use('/auth', authRoutes)

rootRouter.use('/semesters', semRoutes);
rootRouter.use('/subjects', subRoutes);
rootRouter.use('/chapters', chapRoutes);
rootRouter.use('/notes', noteRoutes);

export default rootRouter;