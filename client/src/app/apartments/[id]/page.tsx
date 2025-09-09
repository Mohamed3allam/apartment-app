import AddApartment from "@/components/ApartmentDetails";
import React from "react";

export const metadata = {
  title: "Apartment Details",
  description: "Find the best apartments with our listings platform.",
  keywords: "Apartments, Properties, Home, Page",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};
const ApartmentDetailsPage = () => {
  return <AddApartment />;
};

export default ApartmentDetailsPage;
