"use client";

import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-white text-center py-3 mt-4 border-top">
      <Container>
        <small className="text-muted">
          © {new Date().getFullYear()} Apartments
        </small>
      </Container>
    </footer>
  );
}
