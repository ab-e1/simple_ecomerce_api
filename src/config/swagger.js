import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple E-commerce API",
      version: "1.0.0",
      description: "A simple e-commerce API with users, products, cart, and orders.",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            role: { type: "string", enum: ["admin", "buyer", "seller"] },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean" },
            data: { $ref: "#/components/schemas/User" },
            token: { type: "string" },
          },
        },
        Product: {
          type: "object",
          properties: {
            name: { type: "string" },
            price: { type: "number" },
            description: { type: "string" },
            category: { type: "string" },
            inStock: { type: "boolean" },
          },
        },
        ProductInput: {
          type: "object",
          required: ["name", "price"],
          properties: {
            name: { type: "string" },
            price: { type: "number" },
            description: { type: "string" },
            category: { type: "string" },
            inStock: { type: "boolean" },
          },
        },
        CartItem: {
          type: "object",
          properties: {
            product: { type: "string" },
            quantity: { type: "number" },
          },
        },
        Cart: {
          type: "object",
          properties: {
            user: { type: "string" },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/CartItem" },
            },
          },
        },
        Order: {
          type: "object",
          properties: {
            user: { type: "string" },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/CartItem" },
            },
            totalPrice: { type: "number" },
            status: { type: "string", enum: ["pending", "paid", "shipped"] },
          },
        },
        Error: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: false },
            error: { type: "string" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    paths: {
      "/api/auth/register": {
        post: {
          summary: "Register a new user",
          tags: ["Auth"],
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "password"],
                  properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string", minLength: 8 },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "User created", content: { "application/json": { schema: { $ref: "#/components/schemas/AuthResponse" } } } },
            401: { description: "Email already registered", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          },
        },
      },
      "/api/auth/login": {
        post: {
          summary: "Login a user",
          tags: ["Auth"],
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: { type: "string" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Login success", content: { "application/json": { schema: { $ref: "#/components/schemas/AuthResponse" } } } },
            401: { description: "Invalid credentials", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          },
        },
      },
      "/api/products": {
        get: {
          summary: "List all products (paginated)",
          tags: ["Products"],
          parameters: [
            { name: "page", in: "query", schema: { type: "number" }, description: "Page number (default 1)" },
            { name: "limit", in: "query", schema: { type: "number" }, description: "Items per page, max 100 (default 15)" },
          ],
          responses: {
            200: {
              description: "Products list",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      ok: { type: "boolean" },
                      data: { type: "array", items: { $ref: "#/components/schemas/Product" } },
                      pagination: {
                        type: "object",
                        properties: {
                          page: { type: "number" },
                          limit: { type: "number" },
                          total: { type: "number" },
                          totalPages: { type: "number" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create a product (admin/seller)",
          tags: ["Products"],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/ProductInput" } } },
          },
          responses: {
            201: { description: "Product created", content: { "application/json": { schema: { $ref: "#/components/schemas/Product" } } } },
            401: { description: "Unauthorized or role forbidden" },
          },
        },
      },
      "/api/products/{id}": {
        get: {
          summary: "Get a product by id",
          tags: ["Products"],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "Product found", content: { "application/json": { schema: { $ref: "#/components/schemas/Product" } } } },
            404: { description: "Product not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          },
        },
        patch: {
          summary: "Update a product (admin)",
          tags: ["Products"],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/ProductInput" } } },
          },
          responses: {
            200: { description: "Product updated", content: { "application/json": { schema: { $ref: "#/components/schemas/Product" } } } },
            404: { description: "Product not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          },
        },
        delete: {
          summary: "Delete a product (admin)",
          tags: ["Products"],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "Product deleted", content: { "application/json": { schema: { $ref: "#/components/schemas/Product" } } } },
            404: { description: "Product not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          },
        },
      },
      "/api/cart": {
        get: {
          summary: "Get the current user's cart",
          tags: ["Cart"],
          responses: {
            200: { description: "Cart (created on first access)", content: { "application/json": { schema: { $ref: "#/components/schemas/Cart" } } } },
          },
        },
      },
      "/api/cart/item": {
        post: {
          summary: "Add a product to the cart",
          tags: ["Cart"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["productId", "quantity"],
                  properties: {
                    productId: { type: "string" },
                    quantity: { type: "number", minimum: 1 },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Product added to cart", content: { "application/json": { schema: { $ref: "#/components/schemas/Cart" } } } },
            404: { description: "Product not found" },
          },
        },
      },
      "/api/cart/item/{id}": {
        delete: {
          summary: "Remove a product from the cart",
          tags: ["Cart"],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "Product removed", content: { "application/json": { schema: { $ref: "#/components/schemas/Cart" } } } },
            404: { description: "No product in cart with that id" },
          },
        },
      },
      "/api/order/create": {
        post: {
          summary: "Create an order from the cart",
          tags: ["Orders"],
          responses: {
            201: { description: "Order created, cart cleared", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } },
            404: { description: "Cart is empty" },
          },
        },
      },
      "/api/order": {
        get: {
          summary: "List the current user's orders",
          tags: ["Orders"],
          responses: {
            200: { description: "List of orders", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Order" } } } } },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJSDoc(options);