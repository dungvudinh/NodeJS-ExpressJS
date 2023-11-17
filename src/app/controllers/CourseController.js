const Course = require('../models/Course');

class CourseController {
    async handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                try {
                    await Course.delete({ _id: { $in: req.body.courseIds } });
                    res.redirect('back');
                } catch (error) {
                    next(error);
                }
                break;
            default:
                res.json({ messasge: 'invalid action' });
        }
    }
    async restore(req, res, next) {
        try {
            await Course.restore({ _id: req.params.id });
            res.redirect('back');
        } catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        try {
            await Course.findByIdAndDelete(req.params.id);
            res.redirect('back');
        } catch (err) {
            next(err);
        }
    }
    async softDelete(req, res, next) {
        try {
            await Course.delete({ _id: req.params.id });
            res.redirect('back');
        } catch (err) {
            next(err);
        }
    }
    //[PUt] course/:id
    async update(req, res, next) {
        try {
            const result = await Course.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true },
            );
            // return new document after editing
            //run validator helps catch error type of input
            res.redirect('/me/stored/courses');
        } catch (err) {
            next(err);
        }
    }
    async edit(req, res, next) {
        try {
            const course = await Course.findById(req.params.id).lean();
            res.render('course/edit', { course });
        } catch (err) {
            next(err);
        }
    }
    create(req, res) {
        res.render('course/create');
    }
    async store(req, res, next) {
        try {
            const newCourse = req.body;
            await Course.create(newCourse, {new:true, runValidators:true});
            res.redirect('/courses/create');
        } catch (err) {
            next(err);
        }
    }

    async detail(req, res, next) {
        try {
            const slug = await req.params.slug;
            const result = await Course.findOne({ slug }).lean();
            res.status(200).json({ message: 'success', data: { result } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CourseController();
