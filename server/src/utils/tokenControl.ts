import { UnauthenticatedError } from "../errors/UnauthenticatedError";
import jwt from "jsonwebtoken";

const createToken = (_id: string, name: string, email: string) => {
  return jwt.sign(
    { id: _id, name: name, email: email },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
};
const verifyToken = (token: string) => {
  if (!token) {
    throw new UnauthenticatedError("You must login to access");
  }
  const destructedToken = jwt.verify(token, process.env.JWT_SECRET as string);
  if (!destructedToken) {
    throw new UnauthenticatedError("Error with authentication");
  }
  return destructedToken;
};
export { createToken, verifyToken };
