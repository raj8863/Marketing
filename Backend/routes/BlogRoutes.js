import express from 'express';
import { 
    createBlog, 
    getBlogs, 
    getBlogBySlug, 
    updateBlog, 
    deleteBlog,
    likeBlog,
    addComment,
    deleteComment // <--- ADD THIS LINE HERE
} from '../controllers/blogController.js';

const router = express.Router();

// Standard CRUD
router.route('/').get(getBlogs).post(createBlog);
router.route('/slug/:slug').get(getBlogBySlug);
router.route('/:id').put(updateBlog).delete(deleteBlog);

// Interactive Features
router.route('/:id/like').put(likeBlog);
router.route('/:id/comment').post(addComment);

// This line will now work because deleteComment is imported above
router.route('/:blogId/comment/:commentId').delete(deleteComment);

export default router;