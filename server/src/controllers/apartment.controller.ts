import { NextFunction, Request, Response } from "express";
import apartmentService from "../services/apartment.service";
import { sendResponse } from "../utils/responseHandler";
import {
  createApartmentSchema,
  updateApartmentSchema,
} from "../dtos/apartment.dto";
import { ValidationError } from "../errors/ValidationError";
import AppError from "../errors/BaseError";

export const createApartment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsedData = await createApartmentSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    const apartment = await apartmentService.createApartment(parsedData);

    sendResponse(res, {
      message: "Apartment created successfully",
      data: apartment,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const formattedErrors: Record<string, string> = {};
      error.inner.forEach((err: any) => {
        if (err.path) formattedErrors[err.path] = err.message;
      });

      return next(new ValidationError("Validation failed", formattedErrors));
    }
    next(error);
  }
};

export const getApartments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      unitName,
      unitNumber,
      project,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    const pageNumber = Math.max(1, parseInt(page as string));
    const pageSize = Math.min(100, parseInt(limit as string));

    const apartments = await apartmentService.getApartments({
      unitName: unitName as string | undefined,
      unitNumber: unitNumber as string | undefined,
      project: project as string | undefined,
      minPrice: minPrice ? parseInt(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice as string) : undefined,
      page: pageNumber,
      limit: pageSize,
    });

    sendResponse(res, {
      message: "Apartments fetched successfully",
      data: apartments,
      success: true,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const getApartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const apartment = await apartmentService.getApartmentById(id);
    sendResponse(res, {
      message: "Apartment Retrieved successfully",
      data: apartment,
      success: true,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const updateApartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const parsedData = await updateApartmentSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    const apartment = await apartmentService.updateApartment(id, parsedData);
    sendResponse(res, {
      message: "Apartment Updated successfully",
      data: apartment,
      success: true,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteApartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const apartment = await apartmentService.deleteApartment(id);
    sendResponse(res, {
      message: "Apartment Deleted successfully",
      data: apartment,
      success: true,
      statusCode: 204,
    });
  } catch (error) {
    next(error);
  }
};
