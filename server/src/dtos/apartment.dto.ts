import * as yup from "yup";

export const createApartmentSchema = yup.object({
  unitNumber: yup.string().required("Unit number is required"),
  unitName: yup.string().required("Unit name is required"),
  project: yup.string().required("Project name is required"),
  description: yup.string().required("Description is required"),
  size: yup.number()
           .typeError("Size must be a number")
           .positive("Size must be a positive number")
           .required("Size is required"),
  bedrooms: yup.number()
               .typeError("Bedrooms must be a number")
               .integer("Bedrooms must be an integer")
               .min(0, "Bedrooms must be non-negative")
               .required("Bedrooms are required"),
  bathrooms: yup.number()
                .typeError("Bathrooms must be a number")
                .integer("Bathrooms must be an integer")
                .min(0, "Bathrooms must be non-negative")
                .required("Bathrooms are required"),
  price: yup.number()
            .typeError("Price must be a number")
            .positive("Price must be positive")
            .required("Price is required"),
  images: yup.array()
             .of(yup.string().url("Each image must be a valid URL"))
             .min(1, "At least one image is required")
             .required("Images are required")
}).required();

export const updateApartmentSchema = createApartmentSchema;

export type CreateApartmentInput = yup.InferType<typeof createApartmentSchema>;