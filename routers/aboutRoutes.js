const router = require("express").Router()
const About = require("../model/About")

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authMidleware")
const upload = require("../utils/Upload")


router.get("/", async(req, res, next) => {
    try {

        let post = await About.find();
        res.status(200).json({
            success: true,
            post: post.length > 0 ? post[0] : []
        })
    } catch (err) {
        next(err)
    }
})

router.post("/create", upload.single("about-image"), async(req, res, next) => {
    try {

        const about = new About({
            about: req.body.about,
            image: `/images/${req.file.filename}`,
            // adminId: req.admin._id
        })
        await about.save();
        // console.log(req.file)
        // console.log(req.body)

        res.status(200).json({
            success: true,
        })
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", async(req, res, next) => {
    try {
        const { id } = req.params
        console.log(id)
        await About.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
        })
    } catch (err) {
        next(err)
    }
})


module.exports = router