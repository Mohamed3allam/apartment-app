import AppError from "./BaseError";

export class ValidationError extends AppError {
    data?: Record<string, string>;

    constructor(message: string = "Validation failed", data?: Record<string, string>) {
        super(message, 400);
        this.data = data;
    }
}