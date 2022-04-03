const router = require("express").Router()
const Admin = require("../model/Admin")
const upload = require("../utils/Upload")


const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authMidleware")


router.post("/login", async(req, res, next) => {
    try {
        const { email, password } = req.body
        const admin = await Admin.findOne({ email: email })

        if (!admin) {
            return res.status(200).json({
                success: false,
                msg: "Password or email dosenot match"
            })
        }

        if (password !== admin.password) {
            return res.status(404).json({
                success: false,
                msg: "Password or email dosenot match"
            })
        }

        const newAdmin = {
            name: admin.name,
            email: admin.email,
            role: admin.role
        }


        const options = {
            expires: new Date(
                Date.now() + 1 * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        }

        res.status(200).cookie('admin', JSON.stringify(newAdmin), options).json({
            success: true,
            admin: newAdmin
        })
    } catch (err) {
        next(err)
    }
})

router.post("/add-admin", async(req, res, next) => {
    try {
        const { email, password, name } = req.body
        const newAdmin = new Admin({
            name,
            email,
            password
        })

        await newAdmin.save()
        res.status(201).json({
            success: true,
        })

    } catch (err) {
        next(err)
    }
})

router.get("/me", isAuthenticatedUser, (req, res, next) => {
    try {
        if (!req.admin) {
            res.status(404).json({
                success: false,
                msg: "Login in first"
            })
        }

        res.status(200).json({
            success: true,
            admin: req.admin
        })

    } catch (err) {
        next(err)
    }
})

router.get("/logout", (req, res, next) => {
    try {
        res.clearCookie("admin");
        res.status(200).json({
            success: true,
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router