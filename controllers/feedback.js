const feedback = require('../models/feedback');

exports.createFeedback = async (req,res)=>{
    try {
        const {question,answer} = req.body;
        let feedbackData = new feedback({
            question,
            answer
        });
        await feedbackData.save();
        return res.status(201).json({message:"Feedback created successfully"});
    } catch (error) {
       console.error(error);
       return res.status(500).json({message:error.message}); 
    }
}
exports.getFeedbacks = async (req,res)=>{
    try {
        const feedbacks = await feedback.find({isDeleted:false});
        return res.status(200).json({feedbacks});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:error.message});
    }
}
exports.getFeedbackById = async (req,res)=>{
    try {
        const id = req.params.id;
        const feedbacks = await feedback.findById({
            _id:id,
            isDeleted:false
        });
        return res.status(200).json({feedbacks});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:error.message});
    }
}
exports.updateFeedback = async (req,res)=>{
    try {
        const id = req.params.id;
        const {points} = req.body;
        let obj = {
            points: points,
            user: req.user.userId
        }
        let feedbacks = await feedback.findById({_id:id});
        feedbacks.feedBacks.push(obj);
        await feedbacks.save();
        return res.status(200).json({message:"Feedback added successfully"});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:error.message});
    }
}