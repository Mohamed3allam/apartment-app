import jwt from "jsonwebtoken";
import adminModel, { IAdmin } from "../models/admin.model";
import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors/UnauthenticatedError";

export interface AuthenticatedRequest extends Request {
  admin?: IAdmin;
}

const requireAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UnauthenticatedError("You must be authenticated");
    }
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      name: string;
      email: string;
    };
    req.admin = (await adminModel.findById(decoded.id)) as IAdmin;

    next();
  } catch (error) {
    console.log("requireAdmin error: ", error);
    next(error);
  }
};

export { requireAdmin };
