const express = require('express');
const router = express.Router();
const apiController = require('../app/controllers/APIController');

router.get('/course-stats', apiController.getCourseStats);
router.get(
    '/top-5-cheap',
    apiController.aliasTopCourses,
    apiController.getAllCourses,
);
router.post('/create', apiController.createNewCourse);
router.get('/:id', apiController.getCourseById);
router.get('/', apiController.getAllCourses);

module.exports = router;
