import * as yup from "yup";

export const registerAdminSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export const updateAdminSchema = registerAdminSchema;

export type RegisterAdminSchema = yup.InferType<typeof registerAdminSchema>;
