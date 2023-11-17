const Course = require('../models/Course');

class MeController {
    async storedCourse(req, res, next) {
        const countDeleted = await Course.countDocumentsWithDeleted({
            deteled: true,
        }).lean();
        const courses = await Course.find({}).sortable(req).lean();
        res.render('me/stored', { course: courses, countDeleted });
    }
    async trashCourse(req, res, next) {
        const courses = await Course.findWithDeleted({ deleted: true }).lean();
        res.render('me/trash', { course: courses });
    }
}

module.exports = new MeController();
