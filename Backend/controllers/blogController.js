import Blog from '../models/Blog.js';

// @desc    Get all blogs
// @route   GET /api/blogs
export const getBlogs = async (req, res, next) => {
    try {
        // Sort by newest first
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500);
        next(error);
    }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/slug/:slug
export const getBlogBySlug = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) {
            res.status(404);
            throw new Error("Blog post not found");
        }
        res.status(200).json(blog);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a new blog
// @route   POST /api/blogs
export const createBlog = async (req, res, next) => {
    try {
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
export const updateBlog = async (req, res, next) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedBlog) {
            res.status(404);
            throw new Error("Blog not found");
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
export const deleteBlog = async (req, res, next) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            res.status(404);
            throw new Error("Blog not found");
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500);
        next(error);
    }
};

// @desc    Add a Like to a blog
// @route   PUT /api/blogs/:id/like
export const likeBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } }, // Increments the likes counter by 1
            { new: true }
        );
        res.status(200).json({ likes: blog.likes });
    } catch (error) {
        next(error);
    }
};

// @desc    Add a comment to a blog
// @route   POST /api/blogs/:id/comment
export const addComment = async (req, res, next) => {
    try {
        const { name, email, text } = req.body;
        
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            res.status(404);
            throw new Error("Blog not found");
        }

        const newComment = { name, email, text };
        blog.comments.push(newComment);
        
        await blog.save();
        res.status(201).json(blog.comments);
    } catch (error) {
        res.status(400);
        next(error);
    }
};
// @desc    Delete a comment from a blog
// @route   DELETE /api/blogs/:blogId/comment/:commentId
export const deleteComment = async (req, res, next) => {
    try {
        const { blogId, commentId } = req.params;
        
        const blog = await Blog.findById(blogId);
        if (!blog) {
            res.status(404);
            throw new Error("Blog not found");
        }

        // Filter out the comment that matches the ID
        blog.comments = blog.comments.filter(
            (comment) => comment._id.toString() !== commentId
        );

        await blog.save();
        
        // Return the updated comments array
        res.status(200).json(blog.comments);
    } catch (error) {
        res.status(400);
        next(error);
    }
};