// Checks if user is authenticated or not
exports.isAuthenticatedUser = async(req, res, next) => {
    // console.log(req.cookies)
    let { admin } = req.cookies
    console.log(admin)

    if (!admin) {
        return res.status(401).json({
            success: false,
            msg: "Login first"
        })
    }

    req.admin = JSON.parse(admin)
    next();
}

// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.admin.role)) {
            return res.status(200).json({
                success: false,
                msg: "You cannot access this route"
            });
        }
        next()
    }
}