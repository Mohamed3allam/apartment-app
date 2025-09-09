import HomePageComponent from "@/components/Home";
import Head from "next/head";

export const metadata = {
  title: "Apartments",
  description: "Find the best apartments with our listings platform.",
  keywords: "Apartments, Properties, Home, Page",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};
export default function HomePage() {
  return (
    <>
      <HomePageComponent />
    </>
  );
}
