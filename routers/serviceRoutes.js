const router = require("express").Router()
const Service = require("../model/Service")

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authMidleware")
const upload = require("../utils/Upload")


router.get("/", async(req, res, next) => {
    try {
        let services = await Service.find();
        res.status(200).json({
            success: true,
            services
        })
    } catch (err) {
        next(err)
    }
})

// isAuthenticatedUser, authorizeRoles("admin")
router.post("/add-service", upload.single("service-image"), async(req, res, next) => {
    try {

        const service = new Service({
            title: req.body.title,
            image: `/images/${req.file.filename}`,
            // adminId: req.admin._id
        })
        await service.save();

        res.status(201).json({
            success: true,
        })
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", async(req, res, next) => {
    try {
        const { id } = req.params
        await Service.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
        })
    } catch (err) {
        next(err)
    }
})


module.exports = router