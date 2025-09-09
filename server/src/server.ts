import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/database";

const startServer = async () => {
  try {
    const port = process.env.PORT ?? 3001;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    await connectDB();
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
