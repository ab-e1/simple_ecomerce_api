# Simple E-commerce API

A REST API for a basic e-commerce app: auth, products, cart, and orders. Built with Express 5, Mongoose 9, MongoDB, Zod, argon2, and JWT.

## Setup

```bash
bun install
cp .env.example .env   # fill in your values
bun run dev
```

Server runs on `http://localhost:3000`.

## Environment variables

| Variable | Description |
| --- | --- |
| `PORT` | Server port (default 3000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign/verify tokens |
| `MONGO_PASSWORD` | MongoDB password (if your URI needs it) |

## API docs

Swagger UI is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Endpoints

All routes except `register` and `login` require a `Bearer` token in the `Authorization` header.

| Method | Path | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a user (role defaults to `buyer`) |
| POST | `/api/auth/login` | Login, returns a JWT |
| GET | `/api/products` | List products (paginated with `page` / `limit`) |
| GET | `/api/products/:id` | Get one product |
| POST | `/api/products` | Create a product (admin/seller) |
| PATCH | `/api/products/:id` | Update a product (admin) |
| DELETE | `/api/products/:id` | Delete a product (admin) |
| GET | `/api/cart` | Get your cart |
| POST | `/api/cart/item` | Add a product to your cart (`productId`, `quantity`) |
| DELETE | `/api/cart/item/:id` | Remove a product from your cart |
| GET | `/api/order` | List your orders |
| POST | `/api/order/create` | Create an order from your cart (clears the cart) |

## Auth flow

```bash
# register or login to get a token
TOKEN=$(curl -s -X POST localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin1@email.com","password":"Im_the_admin11"}' | jq -r .token)

# use it
curl -s localhost:3000/api/cart -H "Authorization: Bearer $TOKEN"
```

## Seed admin

There is no admin registration. To seed the admin user, run this **once**:

```bash
bun run src/seedAdmin.js
```

It creates:

- Email: `admin1@email.com`
- Password: `Im_the_admin11`

Run it only once — re-running it won't duplicate the admin, but there's no need to.