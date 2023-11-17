const Course = require('../models/Course');
const apifeatures = require('../../utils/apiFeatures');

class APIController {
    async getAllCourses(req, res) {
        try {
            const features = new apifeatures(Course.find(), req.query)
                .filter()
                .sort()
                .limitFields()
                .pagination();
            const courses = await features.query;
            res.status(200).send({
                status: 'success',
                result: courses.length,
                data: { courses },
            });
        } catch (err) {
            res.status(404).json({ status: 'fail', message: err });
        }
    }
    async getCourseById(req, res) {
        try {
            const course = await Course.findById(req.params.id);
            res.status(200).json({status:'success', data: course});
        } catch (err) {
            res.status(500).json({ status: 'fail', message: err });
        }
    }
    aliasTopCourses(req, res, next) {
        req.query.limit = '5';
        req.query.sort = 'price';
        req.query.fields = 'name,description,price,countLesson';
        next();
    }
    async getCourseStats(req, res) {
        try {
            const stats = await Course.aggregate([
                {
                    $match: { countLesson: { $gte: 70 } },
                },
                {
                    $group: {
                        _id: {$toUpper:'$level'},
                        numCourses:{$sum:1},
                        numLessons: {$sum: '$countLesson'}, 
                        avgPrice:{$avg:'$price'},
                        minPrice: { $min: '$price' },
                    },
                },
                {
                    $sort:{
                        avgPrive:1 // -1 pre sort
                    }
                }, 
                {
                    $limit:5
                }, 
                
                // {
                //     $match:{_id:{$ne:'BASIC'}}
                // }
            ]);
            const course = await Course.aggregate([
                {
                    $unwind:'$description'
                }, 
                {
                    $match:{
                        level:'enhance'
                    }
                }, 
                {
                    $group:{
                        _id:{$toUpper:'$level'},
                        numCourses:{$sum:1}, 
                        course:{$push:'$name'}
                    }
                },
                {
                    $addFields:{
                        level:'$_id'
                    }
                }, 
                {
                    $project:{
                        course:0
                    }
                }, 
                {
                    $limit:1
                }
            ])
            res.status(200).json({
                status: 'success',
                data: {
                    stats, 
                },
            });
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err,
            });
        }
    }
    async createNewCourse(req, res)
    {
        try 
        {
            const data = req.body;
            console.log(req.body);
            const newCourse = await Course.create(data, {new:true});
            res.status(200).json({status:'success', data:newCourse})
        }
        catch(err)
        {
            res.status(500).json({status:'fail', message:err})
        }
    }
}

module.exports = new APIController();
