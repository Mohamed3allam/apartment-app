"use client";
import Link from "next/link";
import { Container } from "react-bootstrap";

export default function Custom404() {
  return (
    <section>
      <Container className=" py-5 text-center">
        <h1 className="display-4">404</h1>
        <p className="lead">
          Oops! The page you are looking for does not exist.
        </p>
        <Link href="/" className="btn btn-primary mt-3">
          Go Home
        </Link>
      </Container>
    </section>
  );
}
