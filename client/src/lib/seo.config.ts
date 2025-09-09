import { DefaultSeoProps } from "next-seo";

const defaultSEO: DefaultSeoProps = {
  titleTemplate: "%s | Apartments",
  defaultTitle: "Apartments",
  description: "Find the best apartments with our listings platform.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    siteName: "Apartments",
  },
  twitter: {
    handle: "@yourhandle",
    site: "@yourhandle",
    cardType: "summary_large_image",
  },
};

export default defaultSEO;
