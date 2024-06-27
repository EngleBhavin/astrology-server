const Plan  = require('../models/plan');

exports.checkPlan = async (req,res,next)=>{
    try {
        const {title,planType } = req.body;
        const checkPlan = await Plan.findOne({title,planType});
        if(checkPlan){
            return res.status(400).json({ message: "Plan already exist" });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}
exports.checkValidPlan = async (req,res,next)=>{
    try {
        const {plan} = req.body;
        const check = await Plan.findById(plan);
        if(!check){
            return res.status(400).json({ message: "Plan not found" });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

};

exports.checkValidPlanId = async (req,res,next)=>{
    try {
        const id = req.params.id || req.body.plan;
        const check = await Plan.findById(id);

        if(!check){
            return res.status(400).json({ message: "Plan not found" });
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: error.message })
    }
}