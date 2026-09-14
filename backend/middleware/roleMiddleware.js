
const authorize = (...roles) => {

    return (req, res, next) => {

        // Make sure user is authenticated first
        if (!req.user) {
            return res.status(401).json({
                msg: "Authentication required"
            });
        }

        // Check user's role
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                msg: "Access denied"
            });
        }

        next();
    };
};

module.exports = authorize;

