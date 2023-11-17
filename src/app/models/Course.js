const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const { Schema } = mongoose;
const mongooseDelete = require('mongoose-delete');
const validator = require('validator');
// const courseSchema = new Schema(
//     {
//         name: { type: String,required:[true, 'A course must have a name'],  unique: true, 
//             // maxLength: [40, 'A course name must have less or equal then 40 characters'], 
//             // minLength:[10, 'A course name must have more or equal then 10 characters'], 
//             // validate:[validator.isAlphanumeric, 'Course name must only contain characters and numbers']
//         }, 
//         description: { type: String, required:[true, 'A course must have a description']},
//         image: { type: String },
//         countLesson: { type: Number, required:[true, 'A course must have a number of lesson']},
//         price: { 
//             type: Number,
//             required:[true, 'A course must have a price'], 
//             // min:[1, 'price must be at least 1, got {VALUE}'] , 
//         },
//         priceDiscount:{
//             type:Number, 
//             // validate:{
//             //     validator:function(val){
//             //         return val < this.price;
//             //     }, 
//             //     message:'Discount price {VALUE} should be below regular price'
//             // }
//         }, 
//         slug: { type: String, slug: 'name', unique: true },
//         level:{
//             type:String,
//              enum:{
//                 values:['basic', 'enhance'], 
//                 message:'{VALUE} is not supported'
//              }}, 
//         secretCourse:{type:Boolean, default:false}
//     },
//     {
//         timestamps: true,
//     },
// );
const courseSchema = new Schema({
    name: { type:String,  unique: true}, 
    description: { type: String}, 
    image: { type: String }, 
    countLesson: { type: Number}, 
    price: { 
        type: Number,
    },
    priceDiscount:{
        type:Number, 
    }, 
    slug: { type: String, slug: 'name', unique: true },
    level:{
    type:String}, 
    secretCourse:{type:Boolean, default:false}
}, 
{
    timestamps: true,
})
//QUERY MIDDLEWARE
courseSchema.pre(/^find/, function(next){
    this.where({secretCourse:{$ne:true}});
    this.start = Date.now();
    next();
})

courseSchema.post(/^find/, function(docs, next){
    console.log(docs);
    console.log(`Query took ${Date.now() - this.start} milliseconds`);
    next();
})
//AGGREATION MIDDLEWARE
courseSchema.pre('aggregate', function(next){
    this.pipeline().unshift({$match:{secretCourse:{$ne:true}}});
    next();
})

//DOCUMENT MIDDLEWARE: run before .save() abd .create() 

// courseSchema.pre('save', ()=>
// {
    
// })
//custom query helpers
courseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};
mongoose.plugin(slug);
courseSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});


module.exports = mongoose.model('Course', courseSchema);
