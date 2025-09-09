"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { IApartment, IResponse } from "@/types";
import Loader from "@/components/Shared/Loader";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Container, Button, Row, Col } from "react-bootstrap";
import Image from "next/image";
import styles from "./styles/style.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { NextSeo } from "next-seo";

export default function ApartmentDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [apartment, setApartment] = useState<IApartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .get<IResponse<IApartment>>(`/apartments/${id}`)
      .then((res) => {
        if (!res.data.success || !res.data.data) {
          setError("Apartment not found");
          return;
        }
        setApartment(res.data.data);
      })
      .catch(() => setError("Failed to fetch apartment"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="container py-5 text-center">
        <h3>{error}</h3>
        <Link href="/apartments" className="btn btn-secondary mt-3">
          Back to Listings
        </Link>
      </div>
    );

  return (
    <>
      <NextSeo
        title={apartment?.unitName || "Apartment Details"}
        description={apartment?.description || "Check out this apartment"}
        openGraph={{
          title: apartment?.unitName,
          description: apartment?.description,
          images: apartment?.images.map((img: string) => ({ url: img })),
          site_name: "My Apartments",
        }}
      />
      <section>
        <Container className="py-5">
          <Row>
            <Col md={7}>
              <h2 className={styles.unitName}>{apartment?.unitName}</h2>
              <p className={styles.project}>{apartment?.project}</p>

              {apartment?.images.length ? (
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  slidesPerView={1}
                  className={styles.imageGallery}
                >
                  {apartment.images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <div className={styles.imageContainer}>
                        <Image
                          src={img}
                          alt={`${apartment.unitName} image ${idx + 1}`}
                          className="d-block w-100"
                          style={{ maxHeight: 400, objectFit: "cover" }}
                          width={1200}
                          height={800}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : null}

              <div className={styles.details}>
                <Row>
                  <Col md={6}>
                    <p>
                      <strong>Unit Number:</strong> {apartment?.unitNumber}
                    </p>
                    <p>
                      <strong>Bedrooms:</strong> {apartment?.bedrooms}
                    </p>
                    <p>
                      <strong>Bathrooms:</strong> {apartment?.bathrooms}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Size:</strong> {apartment?.size} m²
                    </p>
                    <p>
                      <strong>Price:</strong> ${apartment?.price}
                    </p>
                  </Col>
                </Row>
              </div>

              <div className={styles.description}>
                <h5>Description</h5>
                <p>{apartment?.description}</p>
              </div>
            </Col>
            <Col md={5} className={styles.sidebar}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d6907.29098331467!2d31.2346908!3d30.0470268!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1757379176466!5m2!1sen!2seg"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
              <Button
                variant="primary"
                size="lg"
                className="w-100"
                onClick={() => router.push("/contact")}
              >
                Contact Agent
              </Button>
            </Col>
          </Row>

          <Link href="/apartments" className="btn btn-secondary mt-4">
            Back to Listings
          </Link>
        </Container>
      </section>
    </>
  );
}
