import { AddApartmentComponent } from "@/components/AddApartment";
import React from "react";

export const metadata = {
  title: "Add Apartment",
  description: "Find the best apartments with our listings platform",
  keywords: "Apartments, Properties, Home, Page",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

const AddApartmentPage = () => {
  return <AddApartmentComponent />;
};

export default AddApartmentPage;
