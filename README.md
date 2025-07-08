# Paylinkd Backend

Paylinkd Backend is a robust and scalable payment service provider platform designed to securely process, manage, and monitor financial transactions. Built with industry best practices, this backend system supports seamless integration with multiple payment gateways, user management, transaction monitoring, and more.

**Note:** Features such as advanced API performance monitoring, centralized logging, and Prometheus integration are **not currently implemented** in this project.

## Features

- Secure payment processing
- User and merchant management
- Integration with multiple payment gateways with the base being Nibss currently.
- Transaction monitoring and reporting
- Background job processing (e.g., settlements, notifications)
- API documentation and validation

## Folder Structure

The project follows a modular and scalable folder structure to ensure maintainability and clarity:



/paylinkdbackend
│
├── src/
│   ├── config/           # Configuration files (env, db, etc.)
│   ├── controllers/      # Route controllers (business logic)
│   ├── models/           # Database models/schemas
│   ├── routes/           # API route definitions
│   ├── services/         # Business logic/services (e.g., payment, user, notification)
│   ├── middlewares/      # Express middlewares (auth, error handling, etc.)
│   ├── utils/            # Utility/helper functions
│   ├── jobs/             # Scheduled/background jobs (e.g., settlements, notifications)
│   ├── validations/      # Request/response validation schemas
│   ├── integrations/     # Third-party integrations (e.g., payment gateways, email, SMS)
│   ├── docs/             # API documentation (Swagger, Postman collections)
│   └── app.js            # Main app entry point
│
├── tests/                # Unit and integration tests
├── scripts/              # Deployment, migration, or utility scripts
├── .env                  # Environment variables  
├── .gitignore
├── package.json
└── README.md



### Folder Descriptions

- **src/config/**: Application and environment configuration files.
- **src/controllers/**: Handles incoming requests and orchestrates business logic.
- **src/models/**: Database schemas and ORM models.
- **src/routes/**: API endpoint definitions and route handlers.
- **src/services/**: Core business logic and reusable services.
- **src/middlewares/**: Express middleware for authentication, logging, error handling, etc.
- **src/utils/**: Utility functions and helpers.
- **src/jobs/**: Background and scheduled jobs.
- **src/validations/**: Request and response validation schemas.
- **src/integrations/**: Third-party service integrations (e.g., payment gateways).
- **src/docs/**: API documentation and related resources.
- **tests/**: Automated unit and integration tests.
- **scripts/**: Deployment, migration, and utility scripts.

---

Feel free to explore each folder for more details on its purpose and contents.