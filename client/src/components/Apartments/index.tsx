"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApartments } from "@/store/slices/apartmentsSlice";
import { AppDispatch, RootState } from "@/store/store";
import ApartmentCard from "@/components/Apartments/ApartmentCard";
import Pagination from "@/components/Shared/Pagination";
import { IApartment } from "@/types";
import { Container, Row, Col, Form, Button, Offcanvas } from "react-bootstrap";
import Loader from "@/components/Shared/Loader";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const ApartmentsComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { apartments, meta, loading, error } = useSelector(
    (state: RootState) => state.apartments
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  const limit = parseInt(searchParams.get("limit") || "10");
  const page = parseInt(searchParams.get("page") || "1");
  const unitName = searchParams.get("unitName") || "";
  const unitNumber = searchParams.get("unitNumber") || "";
  const project = searchParams.get("project") || "";
  const queryMinPrice = parseInt(searchParams.get("minPrice") || "0");
  const queryMaxPrice = parseInt(searchParams.get("maxPrice") || "50000");

  const [searchMinPrice, setSearchMinPrice] = useState(queryMinPrice);
  const [searchMaxPrice, setSearchMaxPrice] = useState(queryMaxPrice);
  const [showFilters, setShowFilters] = useState(false);
  const [localUnitName, setLocalUnitName] = useState(unitName);
  const [localUnitNumber, setLocalUnitNumber] = useState(unitNumber);
  const [localProject, setLocalProject] = useState(project);

  const updateURL = (
    newPage: number,
    newUnitName?: string,
    newUnitNumber?: string,
    newProject?: string,
    newMinPrice?: number,
    newMaxPrice?: number
  ) => {
    const params = new URLSearchParams();
    params.set("page", String(newPage));
    if (newUnitName) params.set("unitName", newUnitName);
    if (newUnitNumber) params.set("unitNumber", newUnitNumber);
    if (newProject) params.set("project", newProject);
    if (newMinPrice !== undefined) params.set("minPrice", String(newMinPrice));
    if (newMaxPrice !== undefined) params.set("maxPrice", String(newMaxPrice));
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    dispatch(
      fetchApartments({
        page,
        limit,
        unitName,
        unitNumber,
        project,
        minPrice: searchMinPrice,
        maxPrice: searchMaxPrice > 0 ? searchMaxPrice : undefined,
      })
    );
  }, [
    page,
    limit,
    unitName,
    unitNumber,
    project,
    dispatch,
    queryMinPrice,
    queryMaxPrice,
  ]);

  const handleFilterSubmit = () => {
    updateURL(
      1,
      localUnitName,
      localUnitNumber,
      localProject,
      searchMinPrice,
      searchMaxPrice
    );
    setShowFilters(false);
  };

  const handleReset = () => {
    setLocalUnitName("");
    setLocalUnitNumber("");
    setLocalProject("");
    updateURL(1);
    setShowFilters(false);
  };

  const FiltersForm = (
    <Form
      className="mb-3 d-block"
      onSubmit={(e) => {
        e.preventDefault();
        handleFilterSubmit();
      }}
    >
      <div className="position-sticky sticky-top">
        <h4 className="mb-3 d-flex justify-content-between ">
          <span>Filters</span>
          <Button variant="secondary" size="sm" onClick={handleReset}>
            Reset
          </Button>
        </h4>
        <Row className="g-2">
          <Col md={12}>
            <Form.Control
              type="text"
              placeholder="Unit Name"
              value={localUnitName}
              onChange={(e) => setLocalUnitName(e.target.value)}
            />
          </Col>
          <Col md={12}>
            <Form.Control
              type="text"
              placeholder="Unit Number"
              value={localUnitNumber}
              onChange={(e) => setLocalUnitNumber(e.target.value)}
            />
          </Col>
          <Col md={12}>
            <Form.Control
              type="text"
              placeholder="Project"
              value={localProject}
              onChange={(e) => setLocalProject(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Control
              type="number"
              placeholder="Min"
              value={searchMinPrice}
              onChange={(e) => setSearchMinPrice(Number(e.target.value))}
            />
          </Col>
          <Col md={6}>
            <Form.Control
              type="number"
              placeholder="Max"
              value={searchMaxPrice}
              onChange={(e) => setSearchMaxPrice(Number(e.target.value))}
            />
          </Col>
          <Col md={12}>
            <Button type="submit" variant="primary" className="mt-2 w-100">
              Apply Filters
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
  return (
    <section>
      <Container className="py-4">
        <h1 className="mb-5 d-flex justify-content-between">
          <span>Apartment Listings</span>
          <Link
            href="/apartments/add"
            className="btn btn-primary d-flex align-items-center justify-content-center"
          >
            Add New Apartment
          </Link>
        </h1>

        <Row>
          <Col lg={3} className="d-none d-lg-block">
            {FiltersForm}
          </Col>

          <Col lg={9}>
            {error && <p className="text-danger">{error}</p>}

            <Row>
              {loading ? (
                <Loader />
              ) : (
                apartments.length > 0 &&
                apartments.map((apt: IApartment) => (
                  <Col key={apt._id} xl={4} lg={6} className="mb-4">
                    <ApartmentCard apartment={apt} />
                  </Col>
                ))
              )}
              {apartments.length === 0 && !loading && (
                <p>No apartments found</p>
              )}
            </Row>

            {meta && <Pagination meta={meta} />}
          </Col>
        </Row>

        <Button
          variant="primary"
          className="d-lg-none"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            zIndex: 1050,
          }}
          onClick={() => setShowFilters(true)}
        >
          ☰
        </Button>

        <Offcanvas
          show={showFilters}
          onHide={() => setShowFilters(false)}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>{FiltersForm}</Offcanvas.Body>
        </Offcanvas>
      </Container>
    </section>
  );
};

export default ApartmentsComponent;
