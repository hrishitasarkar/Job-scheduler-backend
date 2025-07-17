# 🛠️ Backend - Distributed Job Scheduler

This is the backend API server for the Distributed Job Scheduler project. It allows users to define, manage, and execute scheduled jobs with priorities, dependencies, and retry logic.

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- node-cron (for scheduling)

## 🚀 Features

- Create jobs with cron-style scheduling
- Set job priority: High, Medium, Low
- Retry jobs on failure (with retry count)
- Job dependency support (wait for other jobs to complete)
- REST API for CRUD operations
- Simple in-memory worker simulation

## 📡 API Endpoints

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| POST   | `/api/jobs`         | Create a new job         |
| GET    | `/api/jobs`         | List all jobs            |
| GET    | `/api/jobs/:id`     |
