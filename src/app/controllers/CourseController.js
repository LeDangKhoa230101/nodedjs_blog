const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

class CourseController {
    // [GET] /course/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render("courses/show", { course: mongooseToObject(course) });
            })
            .catch(next);
    }

    // [GET] /course/create
    create(req, res, next) {
        res.render("courses/create");
    }

    // [POST] /course/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCPdLCyGt3rhzGZKsnYbpU5reDNxQ`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect("/"))
            .catch((error) => {});
    }
}

module.exports = new CourseController();
