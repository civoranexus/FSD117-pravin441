# Week 3: Backend Development with Node.js, Express & MongoDB

**Developer**: Pravin Sharma  
**Company**: Civora Nexus  
**Internship Program**: Full Stack Development

Complete backend development projects covering REST APIs, databases, and authentication.

---

## 📦 Projects Included

### Project 1: Blog REST API 📝
Complete RESTful API for blog management with:
- ✅ Full CRUD operations
- ✅ MongoDB integration
- ✅ Pagination & filtering
- ✅ Search functionality
- ✅ Categories & tags
- ✅ View counter & likes
- ✅ Featured posts
- ✅ Statistics endpoint

### Project 2: Authentication System 🔐
Secure user authentication system featuring:
- ✅ User registration & login
- ✅ JWT tokens
- ✅ Password hashing (bcrypt)
- ✅ Role-based access control
- ✅ Protected routes
- ✅ Admin panel
- ✅ Password update
- ✅ Account deletion

### Project 3: Full Stack Integration 🌐
React frontend connected to backend:
- ✅ API integration
- ✅ Authentication flow
- ✅ CRUD operations
- ✅ State management
- ✅ Protected routes
- ✅ Error handling

---

## 🚀 Quick Start

### Prerequisites
```bash
# Install Node.js (v14+)
node --version

# Install MongoDB
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb
```

### Project 1: Blog API

```bash
cd project1-blog-api
npm install

# Create .env file
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/civora-blog
NODE_ENV=development" > .env

# Start server
npm run dev
```

**Test the API:**
```bash
# Open browser
http://localhost:5000

# View docs
http://localhost:5000/api/docs
```

### Project 2: Authentication System

```bash
cd project2-auth-system
npm install

# Create .env file
echo "PORT=5001
MONGODB_URI=mongodb://localhost:27017/civora-auth
JWT_SECRET=your_super_secret_jwt_key_pravin_sharma_2024
JWT_EXPIRE=7d
NODE_ENV=development" > .env

# Start server
npm run dev
```

**Test Authentication:**
```bash
# Register user
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Pravin Sharma","email":"pravin@civoranexus.com","password":"password123"}'

# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"pravin@civoranexus.com","password":"password123"}'
```

---

## 📚 API Documentation

### Blog API Endpoints

#### Get All Posts
```http
GET /api/posts?page=1&limit=10&category=Technology

Response:
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 50,
    "page": 1,
    "pages": 5,
    "limit": 10
  }
}
```

#### Create Post
```http
POST /api/posts
Content-Type: application/json

{
  "title": "Getting Started with Node.js",
  "content": "Node.js is a powerful JavaScript runtime...",
  "category": "Technology",
  "tags": ["nodejs", "javascript", "backend"],
  "published": true
}

Response:
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "_id": "...",
    "title": "Getting Started with Node.js",
    "slug": "getting-started-with-node-js",
    ...
  }
}
```

#### Get Single Post
```http
GET /api/posts/:id

Response:
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Getting Started with Node.js",
    "content": "...",
    "views": 45,
    "likes": 12,
    ...
  }
}
```

#### Update Post
```http
PUT /api/posts/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

#### Delete Post
```http
DELETE /api/posts/:id

Response:
{
  "success": true,
  "message": "Post deleted successfully"
}
```

#### Like Post
```http
PATCH /api/posts/:id/like

Response:
{
  "success": true,
  "message": "Post liked",
  "likes": 13
}
```

### Authentication API Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Pravin Sharma",
  "email": "pravin@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "name": "Pravin Sharma",
    "email": "pravin@example.com",
    "role": "user"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "pravin@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {...}
}
```

#### Get Current User (Protected)
```http
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Pravin Sharma",
    "email": "pravin@example.com",
    "role": "user",
    "createdAt": "..."
  }
}
```

#### Update Profile (Protected)
```http
PUT /api/auth/updateprofile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Pravin K. Sharma",
  "bio": "Full Stack Developer at Civora Nexus"
}
```

#### Change Password (Protected)
```http
PUT /api/auth/updatepassword
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "password123",
  "newPassword": "newpassword456"
}
```

---

## 🗄️ Database Schema

### Post Model
```javascript
{
  title: String (required, max 200 chars),
  slug: String (unique, auto-generated),
  content: String (required),
  excerpt: String (max 500 chars, auto-generated),
  author: {
    name: String (default: "Pravin Sharma"),
    email: String
  },
  category: String (enum),
  tags: [String],
  featured: Boolean,
  published: Boolean,
  publishedAt: Date,
  views: Number (default: 0),
  likes: Number (default: 0),
  coverImage: String,
  readTime: Number (auto-calculated),
  createdAt: Date,
  updatedAt: Date
}
```

### User Model
```javascript
{
  name: String (required, max 50 chars),
  email: String (required, unique, validated),
  password: String (required, min 6 chars, hashed),
  role: String (enum: 'user', 'admin'),
  avatar: String,
  bio: String (max 500 chars),
  isEmailVerified: Boolean,
  isActive: Boolean,
  lastLogin: Date,
  passwordChangedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Security Features

### Password Security
- **Bcrypt hashing** with cost factor 12
- **Minimum 6 characters** requirement
- **Password change tracking**
- **Select false** on password field (never returned in queries)

### JWT Authentication
- **Secure token generation**
- **7-day expiration** (configurable)
- **HTTP-only cookies** for web clients
- **Token verification** on protected routes
- **Password change invalidation**

### Additional Security
- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate limiting** - 100 requests per 15 minutes
- **Input validation** - express-validator
- **Role-based access control**

---

## 🧪 Testing with Postman/Thunder Client

### 1. Test Blog API

**Create a post:**
```
POST http://localhost:5000/api/posts
Body (JSON):
{
  "title": "My First Blog Post",
  "content": "This is the content of my first post about Civora Nexus internship.",
  "category": "Technology",
  "tags": ["internship", "nodejs"],
  "published": true
}
```

**Get all posts:**
```
GET http://localhost:5000/api/posts
```

**Search posts:**
```
GET http://localhost:5000/api/posts?search=nodejs&category=Technology
```

### 2. Test Authentication

**Register:**
```
POST http://localhost:5001/api/auth/register
Body (JSON):
{
  "name": "Pravin Sharma",
  "email": "pravin@test.com",
  "password": "test123"
}
```

**Copy the token from response**

**Get profile:**
```
GET http://localhost:5001/api/auth/me
Headers:
Authorization: Bearer <your_token_here>
```

---

## 📁 Project Structure

### Blog API
```
project1-blog-api/
├── models/
│   └── Post.js              # Post schema
├── routes/
│   └── posts.js             # API routes
├── .env                     # Environment variables
├── package.json             # Dependencies
└── server.js                # Main server file
```

### Auth System
```
project2-auth-system/
├── models/
│   └── User.js              # User schema
├── routes/
│   └── auth.js              # Auth routes
├── middleware/
│   └── auth.js              # JWT middleware
├── .env                     # Environment variables
├── package.json             # Dependencies
└── server.js                # Main server file
```

---

## 💡 Key Concepts Learned

### Express.js Fundamentals
- ✅ Routing
- ✅ Middleware
- ✅ Request/Response handling
- ✅ Error handling
- ✅ Body parsing

### MongoDB & Mongoose
- ✅ Schema design
- ✅ CRUD operations
- ✅ Queries & filters
- ✅ Indexes
- ✅ Validation
- ✅ Virtual fields
- ✅ Pre/post hooks

### RESTful API Design
- ✅ HTTP methods (GET, POST, PUT, PATCH, DELETE)
- ✅ Status codes
- ✅ URL structure
- ✅ Query parameters
- ✅ Request/response format
- ✅ Pagination

### Authentication & Security
- ✅ Password hashing (bcrypt)
- ✅ JWT tokens
- ✅ Protected routes
- ✅ Role-based access
- ✅ Cookie handling
- ✅ Security headers

---

## 🐛 Common Issues & Solutions

### MongoDB Connection Error
```
Error: MongoNetworkError
Solution: 
1. Ensure MongoDB is running
2. Check connection string in .env
3. Verify MongoDB port (default 27017)
```

### JWT Secret Not Found
```
Error: secretOrPrivateKey must have a value
Solution: Add JWT_SECRET to .env file
```

### Port Already in Use
```
Error: EADDRINUSE
Solution: Change PORT in .env or kill process:
# Mac/Linux: lsof -ti:5000 | xargs kill
# Windows: netstat -ano | findstr :5000
```

### Validation Errors
```
Error: Post validation failed
Solution: Check required fields in request body
```

---

## 🚀 Deployment

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create civora-blog-api

# Set environment variables
heroku config:set MONGODB_URI="your_mongodb_atlas_uri"
heroku config:set JWT_SECRET="your_secret"

# Deploy
git push heroku main
```

### Deploy to Railway/Render

1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### MongoDB Atlas (Cloud Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update MONGODB_URI in .env

---

## 📈 Next Steps

After Week 3:

1. **Build Full Stack App**
   - Connect React frontend
   - Implement authentication flow
   - CRUD operations from UI

2. **Add More Features**
   - File upload
   - Comments system
   - Email verification
   - Password reset

3. **Learn Advanced Topics**
   - GraphQL
   - WebSockets
   - Microservices
   - Docker

---

## 📚 Resources

### Documentation
- Express.js: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- Mongoose: https://mongoosejs.com
- JWT: https://jwt.io

### Tools
- Postman: https://www.postman.com
- MongoDB Compass: https://www.mongodb.com/products/compass
- Robo 3T: https://robomongo.org

### Learning
- Node.js Docs: https://nodejs.org/docs
- MDN HTTP: https://developer.mozilla.org/en-US/docs/Web/HTTP

---

## ✅ Week 3 Checklist

- [ ] Understand Express.js basics
- [ ] Learn MongoDB & Mongoose
- [ ] Complete Blog API
- [ ] Implement authentication
- [ ] Test all endpoints
- [ ] Understand JWT
- [ ] Deploy one project
- [ ] Connect frontend

---

## 👨‍💻 Developer Info

**Name**: Pravin Sharma  
**Company**: Civora Nexus  
**Email**: pravin@civoranexus.com (example)  
**GitHub**: github.com/pravinsharma (example)

---

## 📝 Notes

- Both projects use **different ports** (5000 & 5001)
- Passwords are **hashed** with bcrypt
- JWT tokens expire after **7 days**
- All routes have **error handling**
- APIs use **consistent response format**

---

**Happy Coding! 🚀**

*Building secure and scalable backend systems with Node.js*

**Civora Nexus - Connecting Citizens Through Intelligent Innovation**