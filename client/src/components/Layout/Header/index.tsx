"use client";
import Link from "next/link";
import styles from "./styles/Header.module.scss";
import { Container, Navbar } from "react-bootstrap";
import Image from "next/image";
import logo from "./assets/logo.jpg";

export default function Header() {
  return (
    <Navbar
      expand={"lg"}
      variant="light"
      bg="light"
      className={`shadow-sm fixed-top ${styles.header}`}
    >
      <Container>
        <Link href="/" className="navbar-brand">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="d-inline-block align-text-top"
          />
        </Link>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-2">
            <li className="nav-item">
              <Link href="/apartments" className="nav-link">
                Apartment List
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </Navbar>
  );
}
