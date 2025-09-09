import { lazy, Suspense } from "react";
const ApartmentsComponent = lazy(() => import("@/components/Apartments"));
export const metadata = {
  title: "All Apartments",
  description: "Find the best apartments with our listings platform.",
  keywords: "Apartments, Properties, Home, Page",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function ApartmentsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApartmentsComponent />
    </Suspense>
  );
}
