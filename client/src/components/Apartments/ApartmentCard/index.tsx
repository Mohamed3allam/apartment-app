"use client";
import Link from "next/link";
import { IApartment } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "@/styles/Apartment.module.scss";
import Image from "next/image";

export default function ApartmentCard({
  apartment,
}: {
  apartment: IApartment;
}) {
  return (
    <Link
      href={`/apartments/${apartment._id}`}
      className={`card ${styles.card} text-decoration-none text-dark`}
    >
      {/* Swiper for images */}
      <Swiper
        style={{ width: "100%" }}
        className={styles.swiper}
        spaceBetween={10}
        slidesPerView={1}
      >
        {apartment.images?.length ? (
          apartment.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div
                style={{
                  width: "100%",
                  height: "300px",
                }}
              >
                <Image
                  src={img}
                  alt={`${apartment.unitName} image ${idx + 1}`}
                  className="img-fluid rounded-top"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  width={1200}
                  height={300}
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img
              src="/placeholder.png"
              alt="Placeholder"
              className="img-fluid rounded-top"
              style={{ height: 200, width: "100%", objectFit: "cover" }}
            />
          </SwiperSlide>
        )}
      </Swiper>

      {/* Card Body */}
      <div className="card-body">
        <h5 className="card-title">
          {apartment.unitName}{" "}
          <small className="text-muted">#{apartment.unitNumber}</small>
        </h5>
        <p className="mb-1">{apartment.project}</p>
        <p className="mb-1">
          {apartment.bedrooms} bd • {apartment.bathrooms} ba • {apartment.size}{" "}
          m²
        </p>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="fw-bold">{apartment.price} EGP</div>
        </div>
      </div>
    </Link>
  );
}
