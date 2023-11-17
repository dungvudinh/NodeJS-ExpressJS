const express = require('express');
const router = express.Router();
const MeController = require('../app/controllers/MeController');

router.get('/trash/courses', MeController.trashCourse);
router.get('/stored/courses', MeController.storedCourse);
module.exports = router;
