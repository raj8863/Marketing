import express from 'express';
import { 
    getProjects, 
    getProjectBySlug, 
    createProject, 
    updateProject, 
    deleteProject 
} from '../controllers/ProjectController.js';

const router = express.Router();

// Public & Admin: Get all projects / Admin: Create new project
router.route('/')
    .get(getProjects)
    .post(createProject);

// Public: Get a single project by slug (for Case Study page)
router.route('/slug/:slug')
    .get(getProjectBySlug);

// Admin: Update or Delete a project by ID
router.route('/:id')
    .put(updateProject)
    .delete(deleteProject);

export default router;