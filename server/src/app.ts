import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { NotFoundError } from "./errors/NotFoundError";
import errorHandler from "./middlewares/errorHandler.middleware";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

// IMPORT ROUTES
import apiRouter from "./routes";

const app = express();

// MIDDLEWARES
app.use(morgan("combined"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions: cors.CorsOptions = {
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(mongoSanitize());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTES
app.use("/api", apiRouter);

// NOT FOUND HANDLER
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});

// ERROR HANDLER
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    errorHandler(err, req, res, next);
  }
);

export default app;
