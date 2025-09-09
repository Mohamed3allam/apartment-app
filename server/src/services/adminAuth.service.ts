import { ValidationError } from "../errors/ValidationError";

import adminModel from "../models/admin.model";
import bcrypt from "bcrypt";
import validator from "validator";

class adminAuthService {
  async createAdmin({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    if (!validator.isEmail(email)) {
      throw new ValidationError("Invalid email");
    }
    const emailExists = await adminModel.findOne({ email: email });
    if (emailExists) {
      throw new ValidationError("Email already exists");
    }
    if (!validator.isStrongPassword(password)) {
      throw new ValidationError("Password not strong enough");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await adminModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return admin;
  }
  async loginAdmin({ email, password }: { email: string; password: string }) {
    const admin = await adminModel.findOne({ email }).lean();
    if (!admin) {
      throw new ValidationError("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new ValidationError("Invalid email or password");
    }
    const { password: _, ...adminWithoutPassword } = admin;

    return adminWithoutPassword;
  }
}

export default new adminAuthService();
