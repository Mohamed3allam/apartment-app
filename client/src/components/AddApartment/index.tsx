"use client";
import { useForm, FormProvider, Controller } from "react-hook-form";
import MultiImageUploader, {
  ImageData,
} from "@/components/Shared/MultiImageUploader";
import { IApartment } from "@/types";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { createApartment } from "@/store/slices/apartmentsSlice";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  FormControl,
  FormLabel,
  FormGroup,
} from "react-bootstrap";
import styles from "./styles/style.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function AddApartmentComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const methods = useForm<IApartment>({
    defaultValues: {
      images: [],
      unitName: "",
      unitNumber: "",
      project: "",
      description: "",
      size: 0,
      bedrooms: 0,
      bathrooms: 0,
      price: 0,
    },
    mode: "onChange",
  });
  const [selectedImages, setSelectedImages] = useState<ImageData[]>([]);

  const onSubmit = (data: IApartment) => {
    console.log(selectedImages);
    data.images = selectedImages.map((image) => image.image);
    console.log("Submitting data:", data);
    dispatch(createApartment({ apartment: data, navigate: router }));
  };

  return (
    <>
      <section>
        <FormProvider {...methods}>
          <Container className={styles["add-apartment"]}>
            <h1>Create New Apartment</h1>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <FormGroup className="mb-3">
                <FormLabel>Images</FormLabel>

                <MultiImageUploader
                  images={selectedImages}
                  setImages={setSelectedImages}
                />
              </FormGroup>

              <Row className="mb-3">
                <Col md={6}>
                  <Controller
                    name="unitName"
                    control={methods.control}
                    rules={{ required: "Unit Name is required" }}
                    render={({ field, fieldState }) => (
                      <FormGroup>
                        <FormLabel htmlFor="unitName">Unit Name</FormLabel>
                        <FormControl
                          id="unitName"
                          {...field}
                          isInvalid={!!fieldState.error}
                        />
                        {fieldState.error && (
                          <FormControl.Feedback type="invalid">
                            {fieldState.error.message}
                          </FormControl.Feedback>
                        )}
                      </FormGroup>
                    )}
                  />
                </Col>
                <Col md={6}>
                  <Controller
                    name="unitNumber"
                    control={methods.control}
                    rules={{ required: "Unit Number is required" }}
                    render={({ field, fieldState }) => (
                      <FormGroup>
                        <FormLabel htmlFor="unitNumber">Unit Number</FormLabel>
                        <FormControl
                          id="unitNumber"
                          {...field}
                          isInvalid={!!fieldState.error}
                        />
                        {fieldState.error && (
                          <FormControl.Feedback type="invalid">
                            {fieldState.error.message}
                          </FormControl.Feedback>
                        )}
                      </FormGroup>
                    )}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Controller
                    name="project"
                    control={methods.control}
                    rules={{ required: "Project is required" }}
                    render={({ field, fieldState }) => (
                      <FormGroup>
                        <FormLabel htmlFor="project">Project</FormLabel>
                        <FormControl
                          id="project"
                          {...field}
                          isInvalid={!!fieldState.error}
                        />
                        {fieldState.error && (
                          <FormControl.Feedback type="invalid">
                            {fieldState.error.message}
                          </FormControl.Feedback>
                        )}
                      </FormGroup>
                    )}
                  />
                </Col>
                <Col md={6}>
                  <Controller
                    name="price"
                    control={methods.control}
                    rules={{
                      required: "Price is required",
                      min: {
                        value: 1,
                        message: "Price must be greater than 0",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <FormGroup>
                        <FormLabel htmlFor="price">Price</FormLabel>
                        <FormControl
                          id="price"
                          type="number"
                          {...field}
                          isInvalid={!!fieldState.error}
                        />
                        {fieldState.error && (
                          <FormControl.Feedback type="invalid">
                            {fieldState.error.message}
                          </FormControl.Feedback>
                        )}
                      </FormGroup>
                    )}
                  />
                </Col>
              </Row>

              <FormGroup className="mb-3">
                <FormLabel htmlFor="description">Description</FormLabel>
                <Controller
                  name="description"
                  control={methods.control}
                  render={({ field }) => (
                    <FormControl
                      as="textarea"
                      id="description"
                      rows={3}
                      {...field}
                    />
                  )}
                />
              </FormGroup>

              <Row className="mb-3">
                <Col md={4}>
                  <Controller
                    name="size"
                    control={methods.control}
                    rules={{
                      required: "Size is required",
                      min: { value: 1, message: "Size must be greater than 0" },
                    }}
                    render={({ field, fieldState }) => (
                      <FormGroup>
                        <FormLabel htmlFor="size">Size</FormLabel>
                        <FormControl
                          id="size"
                          type="number"
                          {...field}
                          isInvalid={!!fieldState.error}
                        />
                        {fieldState.error && (
                          <FormControl.Feedback type="invalid">
                            {fieldState.error.message}
                          </FormControl.Feedback>
                        )}
                      </FormGroup>
                    )}
                  />
                </Col>
                <Col md={4}>
                  <Controller
                    name="bedrooms"
                    control={methods.control}
                    rules={{
                      required: "Bedrooms is required",
                      min: { value: 0, message: "Bedrooms cannot be negative" },
                    }}
                    render={({ field, fieldState }) => (
                      <FormGroup>
                        <FormLabel htmlFor="bedrooms">Bedrooms</FormLabel>
                        <FormControl
                          id="bedrooms"
                          type="number"
                          {...field}
                          isInvalid={!!fieldState.error}
                        />
                        {fieldState.error && (
                          <FormControl.Feedback type="invalid">
                            {fieldState.error.message}
                          </FormControl.Feedback>
                        )}
                      </FormGroup>
                    )}
                  />
                </Col>
                <Col md={4}>
                  <Controller
                    name="bathrooms"
                    control={methods.control}
                    rules={{
                      required: "Bathrooms is required",
                      min: {
                        value: 0,
                        message: "Bathrooms cannot be negative",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <FormGroup>
                        <FormLabel htmlFor="bathrooms">Bathrooms</FormLabel>
                        <FormControl
                          id="bathrooms"
                          type="number"
                          {...field}
                          isInvalid={!!fieldState.error}
                        />
                        {fieldState.error && (
                          <FormControl.Feedback type="invalid">
                            {fieldState.error.message}
                          </FormControl.Feedback>
                        )}
                      </FormGroup>
                    )}
                  />
                </Col>
              </Row>

              <Button
                type="submit"
                variant="primary"
                disabled={methods.formState.isSubmitting}
              >
                {methods.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          </Container>
        </FormProvider>
      </section>
    </>
  );
}
