<div align='center'>

<h1>Stadium Go</h1>
<p>Stadium Booking App</p>

<h4> <span> · </span> <a href="https://github.com/ibrahimhabibeg/stadium-go-server/blob/main/README.md"> Documentation </a> <span> · </span> <a href="https://github.com/ibrahimhabibeg/stadium-go-server/issues"> Report Bug </a> <span> · </span> <a href="https://github.com/ibrahimhabibeg/stadium-go-server/issues"> Request Feature </a> </h4>


</div>

## 📙 Table of Contents

- [Overview](#🔭-overview)
- [Technologies](#🧑‍💻-technologies)
- [Features](#⭐-features)
- [Getting Started](#🏁-getting-started)
- [API Documentation](#📕-api-documentation)
- [Contributing](#✍-contributing)
- [Contact](#🤝-contact)
- [Acknowledgements](#💎-acknowledgements)

## 🔭 Overview

This repository contains the server-side code for a stadium booking application: Stadium Go. It provides a robust backend for managing user authentication, stadium data, bookings, and GraphQL API for seamless integration with the mobile app.

## 🧑‍💻 Technologies

- Node.js
- TypeScript
- MySQL
- Prisma
- Apollo Server
- JSON Web Tokens (JWT)

## ⭐ Features

- Authentication & Authorization: Secure user registration, login, and role-based access control.

- Stadiums Management: Search and create stadiums with comprehensive details.

- Booking System: Efficient reservation of stadiums with time-based availability checks.

- GraphQL API: Flexible and efficient data interactions for the mobile app.

- TypeScript: Enhanced code quality, maintainability, and type safety.

## 🏁 Getting Started

### 1. Prerequisites

- Install Node JS on your computer <a href="https://nodejs.org/en"> Here</a>
- Install npm

### 2. Clone the repository:

```bash
git clone https://github.com/ibrahimhabibeg/stadium-go-server
```

### 3. Install dependencies:

```bash
cd stadium-go-server
npm install
```

### 4. Set up environment variables:
- Create a .env file in the project root and configure the following variables:
```
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your-secret
SALT_ROUNDS=number-of-salt-round-used-by-bcrypt
```

### 5. Run migrations:
```bash
npx prisma migrate dev
```

### 6. Start the server:
```bash
npm run dev
```

## 📕 API Documentation

GraphQL Playground: Access the interactive GraphQL API documentation at http://localhost:4000/.

## ✍ Contributing

We welcome contributions! Please follow these guidelines:

- Fork the repository.
- Create a new branch for your changes.
- Make your changes and commit them with clear messages.
- Open a pull request.

## 🤝 Contact

Ibrahim Habib - - ibrahimhabib.eg@gmail.com  - - [LinkedIn](https://www.linkedin.com/in/ibrahim-habib-a2948b286/)

Project Link: [Github](https://github.com/ibrahimhabibeg/stadium-go-server)

## 💎 Acknowledgements

- https://hotpot.ai/  for Images and Splash Screen Creation