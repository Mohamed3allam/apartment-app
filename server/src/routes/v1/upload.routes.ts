import AWS from "aws-sdk";
import path from "path";
import express, { NextFunction, Request, Response, Router } from "express";
import multer, { FileFilterCallback } from "multer";
import { ValidationError } from "../../errors/ValidationError";
import { sendResponse } from "../../utils/responseHandler";

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.memoryStorage();
const upload = multer({
  storage,
//   fileFilter,
  dest: "uploads",
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET!,
});

const router: Router = express.Router();

router.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const file = req.file;
      if (!file) {
        throw new ValidationError("You must upload an image");
      }

      const MAX_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        throw new ValidationError("File too large. Max size is 5MB.");
      }

      const params: AWS.S3.PutObjectRequest = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: `images/file-${Date.now()}${path.extname(file.originalname)}`,
        Body: file.buffer,
        ACL: "public-read-write",
        ContentType: file.mimetype,
      };

      const data = await s3.upload(params).promise();

      sendResponse(res, {
        message: "File uploaded successfully",
        success: true,
        data: data.Location,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/multiple",
  upload.array("images", 10),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const files = req.files as Express.Multer.File[] | undefined;
      if (!files || files.length === 0) {
        res.status(400).json({ message: "No files uploaded" });
        return;
      }

      const locations: string[] = [];

      for (const file of files) {
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
          throw new ValidationError(
            `File ${file.originalname} too large. Max size is 5MB.`
          );
        }
        const params: AWS.S3.PutObjectRequest = {
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: `images/file-${Date.now()}${path.extname(file.originalname)}`,
          Body: file.buffer,
          ACL: "public-read-write",
          ContentType: file.mimetype,
        };

        const result = await s3.upload(params).promise();
        locations.push(result.Location);
      }
      sendResponse(res, {
        message: "Files uploaded successfully",
        success: true,
        data: locations,
      });
    } catch (error) {
      console.error("Upload error:", error);
      let message = "One or more files failed to upload.";
      if (error instanceof Error) {
        message = error.message;
      }
      next(error);
    }
  }
);

export default router;
