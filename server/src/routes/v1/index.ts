import { Router } from "express";

import apartmentsRouter from "./apartments.routes";
import uploadRouter from "./upload.routes";
import authenticationRouter from "./adminAuth.routes";

const v1Router = Router();

v1Router.use("/apartments", apartmentsRouter);
v1Router.use("/upload", uploadRouter);
v1Router.use("/auth", authenticationRouter);

v1Router.get("/health", (req, res) => {
  res.json({ status: "ok", version: "v1" });
});

export default v1Router;
