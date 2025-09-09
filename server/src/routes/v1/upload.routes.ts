import AWS from "aws-sdk";
import fs from "fs";
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

const ENV = process.env.NODE_ENV || "development";
let isProd = ENV === "production";

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (
    ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = isProd
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "../../uploads");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        cb(null, `file-${Date.now()}${path.extname(file.originalname)}`);
      },
    });

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  isProd = false;
  console.warn("⚠️ No AWS credentials found. Falling back to local storage.");
}

const router: Router = express.Router();

router.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

async function uploadFile(
  file: Express.Multer.File,
  req: Request
): Promise<string> {
  const serverBaseUrl = `${req.protocol}://${req
    .get("host")
    ?.replace("localhost", "127.0.0.1")}`;

  if (isProd) {
    try {
      const params: AWS.S3.PutObjectRequest = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: `images/${file.filename || `file-${Date.now()}`}${path.extname(
          file.originalname
        )}`,
        Body: file.buffer,
        ACL: "public-read",
        ContentType: file.mimetype,
      };
      const data = await s3.upload(params).promise();
      return data.Location; // full S3 URL
    } catch (err) {
      console.error("⚠️ AWS upload failed, falling back to local:", err);
      const localPath = path.join(__dirname, "../../uploads");
      if (!fs.existsSync(localPath)) {
        fs.mkdirSync(localPath, { recursive: true });
      }
      const filename = `file-${Date.now()}${path.extname(file.originalname)}`;
      fs.writeFileSync(path.join(localPath, filename), file.buffer);
      return `${serverBaseUrl}/api/v1/upload/uploads/${filename}`;
    }
  }

  return `${serverBaseUrl}/api/v1/upload/uploads/${file.filename}`;
}

router.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const file = req.file;
      if (!file) throw new ValidationError("You must upload an image");

      const location = await uploadFile(file, req);

      sendResponse(res, {
        message: "File uploaded successfully",
        success: true,
        data: location,
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
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        throw new ValidationError("No files uploaded");
      }

      const locations: string[] = [];
      for (const file of files) {
        const loc = await uploadFile(file, req);
        locations.push(loc);
      }

      sendResponse(res, {
        message: "Files uploaded successfully",
        success: true,
        data: locations,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
