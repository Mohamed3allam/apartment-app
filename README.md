Apartment Listing App

A full-stack apartment listing application built with **Next.js**, **Node.js/Express**, and **MongoDB**.  
The app allows users to view apartment listings, see details for each apartment, and supports image uploads (via AWS S3 or local storage).

The entire stack is **containerized with Docker**, so it can be run with **one command**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Requirements](#requirements)
- [Setup & Running](#setup--running)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Docker Notes](#docker-notes)
- [License](#license)

---

## Features

- Apartment listing page with pagination
- Apartment detail page
- Responsive design for mobile and web
- Add new apartments (backend API)
- Image upload support (AWS S3 optional)
- Search and filter functionality (bonus)
- Fully containerized stack (frontend, backend, MongoDB)

---

## Tech Stack

| Layer     | Technology                                        |
| --------- | ------------------------------------------------- |
| Frontend  | Next.js, React, Redux, Bootstrap, react-hook-form |
| Backend   | Node.js, Express, TypeScript, Mongoose            |
| Database  | MongoDB (Docker container)                        |
| Dev Tools | Docker, Docker Compose, Nodemon                   |
| Other     | Axios, Swiper, rc-slider, react-toastify          |

---

## Folder Structure

nawy-task/ ├── backend/ # Node.js/Express backend │ ├── src/ # TypeScript source code │ ├── package.json │ ├── tsconfig.json │ ├── Dockerfile │ ├── .dockerignore │ └── .env.example ├── frontend/ # Next.js frontend │ ├── pages/ │ ├── components/ │ ├── package.json │ ├── tsconfig.json │ ├── Dockerfile │ ├── .dockerignore │ └── .env.example ├── docker-compose.yml # Docker Compose to run full stack ├── README.md └── .gitignore

---

## Requirements

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js & npm (optional, only for local dev without Docker)

---

## Setup & Running

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/nawy-task.git
cd nawy-task
```

2. Configure environment variables

Copy .env.example files to .env in both frontend and backend folders and fill in real values if needed:

# Backend

cd backend
cp .env.example .env

# Frontend

cd ../frontend
cp .env.example .env

3. Run the entire stack with Docker Compose

From the project root:

docker compose up --build

Frontend: http://localhost:3000

Backend API: http://localhost:3001

MongoDB: mongodb://mongodb:27017/apartmentdb (internal network for backend)

Stop the stack:

docker compose down -v

---

# Environment Variables

Backend (backend/.env)

# MongoDB connection

MONGODB_URI=mongodb://mongodb:27017/apartmentdb
PORT=3001

# JWT secret

JWT_SECRET=replace_with_your_secret

# AWS S3 credentials (if used)

AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_BUCKET_NAME=your_bucket_name

Frontend (frontend/.env)

NEXT_PUBLIC_API_URL=http://backend:5000

> ⚠️ Do not commit .env files. Commit only .env.example.

---

# API Endpoints (Backend)

Endpoint Method Description

/api/apartments GET List all apartments
/api/apartments/:id GET Get details of a specific apartment
/api/apartments POST Add a new apartment
/api/upload (optional) POST Upload apartment images

> All POST requests require proper JSON payload. Authentication handled via JWT (if implemented).

---

# Docker Notes

The docker-compose.yml sets up three services:

mongodb → official MongoDB container

backend → Node.js/Express container

frontend → Next.js container

Services communicate using internal Docker network:

backend talks to MongoDB via hostname mongodb.

frontend talks to backend via hostname backend.

Volume mongodb_data persists MongoDB data.

---

# License

MIT License © Mohamed Allam

---

# Notes

Make sure Docker Desktop is running on Windows/Mac. On Linux, ensure Docker daemon is active.

Use docker compose logs -f <service> to see live logs.

For development, you can mount local volumes and use nodemon + next dev for hot reload.

---

🚀 Now you can run the full stack with a single command and the app will be ready for testing or review!

```

```
