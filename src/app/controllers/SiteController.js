const Course = require('../models/Course');
class SiteController {
    async home(req, res, next) {
        try {
            const courses = await Course.find({}).lean();
            res.render('site/home', { courses });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new SiteController();
