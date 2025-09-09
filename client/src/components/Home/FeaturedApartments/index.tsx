"use client";
import ApartmentCard from "@/components/Apartments/ApartmentCard";
import { fetchApartments } from "@/store/slices/apartmentsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { IApartment } from "@/types";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const FeaturedApartments = ({
  featuredApartments,
}: {
  featuredApartments: IApartment[];
}) => {
  return (
    <Container className="py-5">
      <h2 className="mb-4">Featured Apartments</h2>
      <Row>
        {featuredApartments.map((apartment, index) => (
          <Col md={4} key={index}>
            <ApartmentCard apartment={apartment} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedApartments;
