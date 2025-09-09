"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button, Container, Form } from "react-bootstrap";

const Hero = () => {
  const navigate = useRouter();
  const [search, setSearch] = React.useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate.push("/apartments?unitName=" + search);
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <h1 className="text-white mb-4">Find Your Dream Apartment</h1>
        <Form
          onSubmit={onSubmit}
          className="d-flex bg-white p-3 rounded shadow"
        >
          <Form.Control
            type="text"
            placeholder="Search by unit name"
            className="me-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="primary">Search</Button>
        </Form>
      </Container>
    </div>
  );
};

export default Hero;
