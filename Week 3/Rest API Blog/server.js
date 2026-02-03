const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/civora-blog', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📚 Database: ${conn.connection.name}`);
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // Logging

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Routes
app.use('/api/posts', require('./routes/posts'));

// Home route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Civora Blog API',
        developer: 'Pravin Sharma',
        company: 'Civora Nexus',
        version: '1.0.0',
        documentation: '/api/docs',
        endpoints: {
            posts: {
                getAll: 'GET /api/posts',
                getOne: 'GET /api/posts/:id',
                create: 'POST /api/posts',
                update: 'PUT /api/posts/:id',
                delete: 'DELETE /api/posts/:id',
                publish: 'PATCH /api/posts/:id/publish',
                like: 'PATCH /api/posts/:id/like',
                featured: 'GET /api/posts/featured',
                stats: 'GET /api/posts/admin/stats'
            }
        }
    });
});

// API Documentation
app.get('/api/docs', (req, res) => {
    res.json({
        title: 'Civora Blog API Documentation',
        version: '1.0.0',
        developer: 'Pravin Sharma',
        company: 'Civora Nexus',
        baseURL: `http://localhost:${process.env.PORT || 5000}`,
        endpoints: [
            {
                method: 'GET',
                path: '/api/posts',
                description: 'Get all posts with pagination and filters',
                queryParams: {
                    page: 'Page number (default: 1)',
                    limit: 'Posts per page (default: 10)',
                    category: 'Filter by category',
                    tag: 'Filter by tag',
                    search: 'Search in title, content, excerpt',
                    published: 'Filter by published status (true/false)',
                    sort: 'Sort field (default: -publishedAt)'
                },
                example: '/api/posts?page=1&limit=10&category=Technology'
            },
            {
                method: 'GET',
                path: '/api/posts/:id',
                description: 'Get single post by ID or slug',
                example: '/api/posts/60d5ec49f1b2c72e8c8e4a1a'
            },
            {
                method: 'GET',
                path: '/api/posts/featured',
                description: 'Get featured posts',
                example: '/api/posts/featured'
            },
            {
                method: 'POST',
                path: '/api/posts',
                description: 'Create new post',
                body: {
                    title: 'Post title (required)',
                    content: 'Post content (required)',
                    category: 'Category (optional)',
                    tags: 'Array of tags (optional)',
                    featured: 'Boolean (optional)',
                    published: 'Boolean (optional)',
                    coverImage: 'Image URL (optional)'
                },
                example: {
                    title: 'Getting Started with Node.js',
                    content: 'Node.js is a powerful runtime...',
                    category: 'Technology',
                    tags: ['nodejs', 'javascript'],
                    published: true
                }
            },
            {
                method: 'PUT',
                path: '/api/posts/:id',
                description: 'Update existing post',
                example: '/api/posts/60d5ec49f1b2c72e8c8e4a1a'
            },
            {
                method: 'DELETE',
                path: '/api/posts/:id',
                description: 'Delete post',
                example: '/api/posts/60d5ec49f1b2c72e8c8e4a1a'
            },
            {
                method: 'PATCH',
                path: '/api/posts/:id/publish',
                description: 'Toggle publish status',
                example: '/api/posts/60d5ec49f1b2c72e8c8e4a1a/publish'
            },
            {
                method: 'PATCH',
                path: '/api/posts/:id/like',
                description: 'Like a post',
                example: '/api/posts/60d5ec49f1b2c72e8c8e4a1a/like'
            },
            {
                method: 'GET',
                path: '/api/posts/admin/stats',
                description: 'Get blog statistics',
                example: '/api/posts/admin/stats'
            }
        ],
        responseFormat: {
            success: 'Boolean indicating success',
            message: 'Response message (on errors or actions)',
            data: 'Response data',
            pagination: 'Pagination info (on list endpoints)'
        },
        categories: ['Technology', 'Business', 'Lifestyle', 'Tutorial', 'News', 'Other']
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.originalUrl
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Server error',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('\n╔════════════════════════════════════════════╗');
    console.log('║     Civora Blog API Server Started        ║');
    console.log('╚════════════════════════════════════════════╝');
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 Local: http://localhost:${PORT}`);
    console.log(`📖 Docs: http://localhost:${PORT}/api/docs`);
    console.log(`👨‍💻 Developer: Pravin Sharma`);
    console.log(`🏢 Company: Civora Nexus\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

module.exports = app;