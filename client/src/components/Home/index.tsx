"use client";
import { fetchApartments } from "@/store/slices/apartmentsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { IApartment } from "@/types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "./Hero";
import FeaturedApartments from "./FeaturedApartments";
import Projects from "./Projects";
import Link from "next/link";
import { Button } from "react-bootstrap";

const HomePageComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { apartments } = useSelector((state: RootState) => state.apartments);
  const [featuredApartments, setFeaturedApartments] = useState<IApartment[]>(
    []
  );
  const [projects, setProjects] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchApartments({ page: 1, limit: 20 }));
  }, [dispatch]);

  useEffect(() => {
    setFeaturedApartments(apartments.slice(0, 3));
    const uniqueProjects = new Set(
      apartments.map((apartment) => apartment.project)
    );
    setProjects(Array.from(uniqueProjects));
  }, [apartments]);

  return (
    <>
      <section>
        <Hero />
      </section>
      <section>
        <FeaturedApartments featuredApartments={featuredApartments} />
      </section>
      <section>
        <Projects projects={projects} />
      </section>
      <section>
        <div className="bg-primary text-white text-center py-5">
          <h2>Ready to find your new home?</h2>
          <Link href="/apartments">
            <Button variant="light" size="lg" className="mt-3">
              Browse Listings
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePageComponent;
