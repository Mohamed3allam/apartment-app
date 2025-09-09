import { NextFunction, Request, Response } from "express";
import { createToken } from "../utils/tokenControl";
import adminAuthService from "../services/adminAuth.service";
import { ValidationError } from "../errors/ValidationError";
import { AuthenticatedRequest } from "../middlewares/requireAdmin.middleware";
import { UnauthenticatedError } from "../errors/UnauthenticatedError";
import { sendResponse } from "../utils/responseHandler";

export const registerAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new ValidationError("All fields must be filled");
    }

    const admin = await adminAuthService.createAdmin({
      name,
      email,
      password,
    });

    res.status(200).json({
      success: true,
      message: "Admin registered successfully",
      admin,
    });
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ValidationError("Email and Password are required");
    }
    const admin = await adminAuthService.loginAdmin({ email, password });
    const token = createToken(admin._id as string, admin.name, admin.email);
    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      admin,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const admin = req.admin;

    if (!admin) {
      throw new UnauthenticatedError("You Must Login to access");
    }
    sendResponse(res, {
      message: "Admin retrieved successfully",
      data: admin,
      success: true,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
