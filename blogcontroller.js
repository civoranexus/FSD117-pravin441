const Blog = require("../models/Blog");

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Blogs
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

// Get Blog By ID
exports.getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
};

// Update Blog
exports.updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(blog);
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted successfully" });
};
