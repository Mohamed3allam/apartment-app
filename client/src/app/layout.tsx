"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import "../app/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="en">
        <Head>
          <title>Apartments</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Apartment Home Page Description" />
          <meta name="keywords" content="Apartments, Properties, Home, Page" />
          <meta name="author" content="Mohamed Abdelrahman" />
          
        </Head>
        <body>
          <Provider store={store}>
            <ToastContainer position="bottom-right" limit={3} />
            <Header />
            <main style={{ paddingTop: 100, minHeight: "70vh" }}>
              {children}
            </main>
            <Footer />
          </Provider>
        </body>
      </html>
    </>
  );
}
