Backend for Property Planner

Run:

1. copy .env.example to .env and set `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URL`
2. npm install
3. npm run dev

API Endpoints:
- POST /api/auth/register { name, email, password, role }
- POST /api/auth/login { email, password }
- GET /api/users/me (auth)
- PUT /api/users/me (auth)
- GET /api/properties
- GET /api/properties/:id
- POST /api/properties (auth client)
- PUT /api/properties/:id (auth owner|admin)
- DELETE /api/properties/:id (auth owner|admin)

Models are in src/models
