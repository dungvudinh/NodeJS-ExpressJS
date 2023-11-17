const CourseController = require('../app/controllers/CourseController');
const express = require('express');
const router = express.Router();

router.post('/handle-form-actions', CourseController.handleFormAction);
router.patch('/:id/restore', CourseController.restore);
router.delete('/:id/soft-delete', CourseController.softDelete);
router.delete('/:id/delete', CourseController.delete);
router.put('/:id', CourseController.update);
router.get('/:id/edit', CourseController.edit);
router.post('/store', CourseController.store);
router.get('/create', CourseController.create);
router.get('/:slug', CourseController.detail);
module.exports = router;
