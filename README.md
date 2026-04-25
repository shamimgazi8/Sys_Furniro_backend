# Furniro Backend

A NestJS microservices backend for the Furniro e-commerce platform with CQRS pattern.

## 🏗️ Architecture Overview

```
furniro/
├── apps/
│   ├── api-gateway/           # API Gateway (Port 3000)
│   │   └── src/
│   │       └── proxy/         # Proxies to microservices
│   ├── auth-service/          # Auth Service (Port 3001)
│   │   └── src/
│   │       ├── auth/          # Authentication with CQRS
│   │       └── users/         # User management with CQRS
│   ├── product-service/       # Product Service (Port 3002)
│   │   └── src/
│   │       └── products/      # Products with CQRS
│   ├── order-service/         # Order Service (Port 3003)
│   │   └── src/
│   │       └── orders/        # Orders with CQRS
│   └── api/                   # Legacy monolith (to be deprecated)
├── libs/
│   └── common/                # Shared library
│       └── src/
│           ├── database/     # Database module
│           ├── dto/          # Data Transfer Objects
│           ├── filters/      # Global filters & interceptors
│           └── interfaces/   # TypeScript interfaces
├── docker-compose.yml        # Docker services
├── pnpm-workspace.yaml       # pnpm workspace
└── package.json              # Root package
```

## 🔄 Microservices

| Service             | Port | Description                      | Pattern       |
| ------------------- | ---- | -------------------------------- | ------------- |
| **API Gateway**     | 3000 | Routes requests to microservices | Proxy Pattern |
| **Auth Service**    | 3001 | Authentication & user management | CQRS          |
| **Product Service** | 3002 | Product catalog management       | CQRS          |
| **Order Service**   | 3003 | Order processing                 | CQRS          |

## 📦 CQRS Pattern

Each microservice implements CQRS (Command Query Responsibility Segregation):

```
src/
├── commands/                 # Write operations
│   ├── index.ts             # Command definitions
│   └── handlers/            # Command handlers
│       ├── create-product.handler.ts
│       ├── update-product.handler.ts
│       └── delete-product.handler.ts
└── queries/                  # Read operations
    ├── index.ts             # Query definitions
    └── handlers/            # Query handlers
        ├── get-all-products.handler.ts
        ├── get-product-by-id.handler.ts
        └── get-products-by-category.handler.ts
```

### Commands (Write)

- `CreateXCommand` - Create new entity
- `UpdateXCommand` - Update existing entity
- `DeleteXCommand` - Delete entity

### Queries (Read)

- `GetAllXQuery` - Get all entities
- `GetXByIdQuery` - Get entity by ID
- `GetXByCategoryQuery` - Get entities by filter

## 🛠️ Shared Library (`libs/common`)

### Database Module

```typescript
// Reusable database configuration
DatabaseModule.forRoot();
DatabaseModule.forFeature([Entity1, Entity2]);
```

### Global Filters

```typescript
// Exception handling
AllExceptionsFilter;

// HTTP logging
LoggingInterceptor;
```

### DTOs

```typescript
// User DTOs
(CreateUserDto, UpdateUserDto, LoginDto);

// Product DTOs
(CreateProductDto, UpdateProductDto);

// Order DTOs
(CreateOrderDto, UpdateOrderDto, OrderItemDto);
```

### Interfaces

```typescript
// Entity interfaces
(IUser, IProduct, IOrder);

// Payload interfaces
(IAuthPayload, IJwtPayload);
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+
- Docker & Docker Compose

### Installation

```bash
# Install all dependencies
pnpm install
```

### Running Services

```bash
# Start all services
pnpm run start:all

# Or start individually
pnpm run start:auth      # Auth Service (3001)
pnpm run start:product   # Product Service (3002)
pnpm run start:order     # Order Service (3003)
pnpm run start:gateway   # API Gateway (3000)
```

### Docker Services

```bash
# Start PostgreSQL & RabbitMQ
docker-compose up -d
```

## 📡 API Endpoints

### API Gateway (Port 3000)

| Method | Endpoint                           | Service | Description        |
| ------ | ---------------------------------- | ------- | ------------------ |
| POST   | `/api/auth/login`                  | Auth    | User login         |
| POST   | `/api/auth/register`               | Auth    | User registration  |
| GET    | `/api/auth/profile`                | Auth    | Get user profile   |
| GET    | `/api/products`                    | Product | Get all products   |
| GET    | `/api/products/:id`                | Product | Get product by ID  |
| GET    | `/api/products/category/:category` | Product | Get by category    |
| POST   | `/api/products`                    | Product | Create product     |
| PATCH  | `/api/products/:id`                | Product | Update product     |
| DELETE | `/api/products/:id`                | Product | Delete product     |
| GET    | `/api/orders`                      | Order   | Get all orders     |
| GET    | `/api/orders/:id`                  | Order   | Get order by ID    |
| GET    | `/api/orders/user/:userId`         | Order   | Get orders by user |
| POST   | `/api/orders`                      | Order   | Create order       |
| PATCH  | `/api/orders/:id`                  | Order   | Update order       |
| DELETE | `/api/orders/:id`                  | Order   | Delete order       |

## 🔧 Environment Variables

Create `.env` files in each service:

### auth-service/.env

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=furniro
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

### product-service/.env

```env
PORT=3002
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=furniro
```

### order-service/.env

```env
PORT=3003
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=furniro
```

### api-gateway/.env

```env
PORT=3000
AUTH_SERVICE_URL=http://localhost:3001
PRODUCT_SERVICE_URL=http://localhost:3002
ORDER_SERVICE_URL=http://localhost:3003
FRONTEND_URL=http://localhost:3000
```

## 🐳 Docker Services

| Service             | Port  | Description      |
| ------------------- | ----- | ---------------- |
| PostgreSQL          | 5432  | Primary database |
| RabbitMQ            | 5672  | Message broker   |
| RabbitMQ Management | 15672 | Admin UI         |

## 📚 Technology Stack

- **Framework**: NestJS 10
- **Database**: PostgreSQL 15
- **ORM**: TypeORM
- **CQRS**: @nestjs/cqrs
- **API Gateway**: @nestjs/axios
- **Authentication**: Passport (JWT)
- **API Documentation**: Swagger/OpenAPI
- **Package Manager**: pnpm
- **Message Queue**: RabbitMQ

## 🔐 Security Features

- JWT Authentication
- Role-based access control
- Global exception filtering
- Request/Response logging
- CORS configuration
- Input validation with class-validator

## 📄 License

ISC
│ │ └── index.ts
│ └── tsconfig.lib.json
├── docker-componse.yml # Docker services (PostgreSQL, RabbitMQ)
├── pnpm-workspace.yaml # pnpm workspace configuration
├── nest-cli.json # NestJS CLI configuration
└── package.json # Root package.json

````

## 📦 Modules Overview

### 1. Auth Module (`/src/auth/`)

Handles user authentication and authorization.

| File                           | Description                                    |
| ------------------------------ | ---------------------------------------------- |
| `auth.module.ts`               | Auth module configuration                      |
| `auth.service.ts`              | Business logic for login, register, validation |
| `auth.controller.ts`           | REST endpoints for auth operations             |
| `strategies/jwt.strategy.ts`   | JWT passport strategy                          |
| `strategies/local.strategy.ts` | Local passport strategy                        |
| `guards/jwt-auth.guard.ts`     | JWT authentication guard                       |
| `guards/local-auth.guard.ts`   | Local authentication guard                     |

### 2. Users Module (`/src/users/`)

Manages user data and profiles.

| File                      | Description                        |
| ------------------------- | ---------------------------------- |
| `users.module.ts`         | Users module configuration         |
| `users.service.ts`        | CRUD operations for users          |
| `users.controller.ts`     | REST endpoints for user operations |
| `entities/user.entity.ts` | TypeORM entity for users           |

### 3. Products Module (`/src/products/`)

Manages product catalog and inventory.

| File                         | Description                           |
| ---------------------------- | ------------------------------------- |
| `products.module.ts`         | Products module configuration         |
| `products.service.ts`        | CRUD operations for products          |
| `products.controller.ts`     | REST endpoints for product operations |
| `entities/product.entity.ts` | TypeORM entity for products           |

### 4. Orders Module (`/src/orders/`)

Handles order processing and management.

| File                       | Description                         |
| -------------------------- | ----------------------------------- |
| `orders.module.ts`         | Orders module configuration         |
| `orders.service.ts`        | CRUD operations for orders          |
| `orders.controller.ts`     | REST endpoints for order operations |
| `entities/order.entity.ts` | TypeORM entity for orders           |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+
- Docker & Docker Compose

### Installation

```bash
# Install dependencies
pnpm install
````

### Running the Application

```bash
# Start Docker services (PostgreSQL, RabbitMQ)
docker-compose up -d

# Start development server
cd apps/api
pnpm run start:dev
```

The API will be available at `http://localhost:3001`

### API Documentation

Swagger documentation is available at `http://localhost:3001/api/docs`

## 📡 API Endpoints

### Authentication

| Method | Endpoint             | Description       | Auth |
| ------ | -------------------- | ----------------- | ---- |
| POST   | `/api/auth/login`    | User login        | No   |
| POST   | `/api/auth/register` | User registration | No   |
| GET    | `/api/auth/profile`  | Get current user  | Yes  |

### Users

| Method | Endpoint         | Description    | Auth |
| ------ | ---------------- | -------------- | ---- |
| GET    | `/api/users`     | Get all users  | Yes  |
| GET    | `/api/users/:id` | Get user by ID | Yes  |
| PATCH  | `/api/users/:id` | Update user    | Yes  |
| DELETE | `/api/users/:id` | Delete user    | Yes  |

### Products

| Method | Endpoint                           | Description              | Auth |
| ------ | ---------------------------------- | ------------------------ | ---- |
| GET    | `/api/products`                    | Get all products         | No   |
| GET    | `/api/products/:id`                | Get product by ID        | No   |
| GET    | `/api/products/category/:category` | Get products by category | No   |
| POST   | `/api/products`                    | Create product           | Yes  |
| PATCH  | `/api/products/:id`                | Update product           | Yes  |
| DELETE | `/api/products/:id`                | Delete product           | Yes  |

### Orders

| Method | Endpoint                   | Description        | Auth |
| ------ | -------------------------- | ------------------ | ---- |
| GET    | `/api/orders`              | Get all orders     | Yes  |
| GET    | `/api/orders/:id`          | Get order by ID    | Yes  |
| GET    | `/api/orders/user/:userId` | Get orders by user | Yes  |
| POST   | `/api/orders`              | Create order       | Yes  |
| PATCH  | `/api/orders/:id`          | Update order       | Yes  |
| DELETE | `/api/orders/:id`          | Delete order       | Yes  |

## 🔧 Environment Variables

Create a `.env` file in `apps/api/` directory:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=furniro

# JWT
JWT_SECRET=your-secret-key

# App
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 🛠️ Available Scripts

```bash
# Build the application
pnpm run build

# Start in development mode
pnpm run start:dev

# Start in production mode
pnpm run start:prod

# Run tests
pnpm run test

# Run with coverage
pnpm run test:cov

# Lint code
pnpm run lint
```

## 🐳 Docker Services

The project includes the following Docker services:

| Service             | Port  | Description       |
| ------------------- | ----- | ----------------- |
| PostgreSQL          | 5432  | Primary database  |
| RabbitMQ            | 5672  | Message broker    |
| RabbitMQ Management | 15672 | RabbitMQ admin UI |

## 📚 Technology Stack

- **Framework**: NestJS 10
- **Database**: PostgreSQL 15
- **ORM**: TypeORM
- **Authentication**: Passport (JWT + Local)
- **API Documentation**: Swagger/OpenAPI
- **Package Manager**: pnpm
- **Message Queue**: RabbitMQ

## 📄 License

ISC
