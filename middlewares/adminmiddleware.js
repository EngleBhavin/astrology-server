const Admin = require("../models/admin");

const checkAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findOne({ _id: req.user.userId });
        if (!admin) {
        return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    } catch (error) {
        
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {checkAdmin};