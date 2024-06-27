const getInTouch = require('../models/getInTouch');

exports.createGetInTouch = async (req,res)=>{
    try {
        const {email,mobileNumber,address} = req.body;
        let getInTouchData = new getInTouch({
            email,
            mobileNumber,
            address
        });
        await getInTouchData.save();
        return res.status(201).json({message:"GetInTouch created successfully"});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:error.message});

    }
}
exports.updateGetInTouch = async (req,res)=>{
    try {
        const id = req.params.id;
        const {email,mobileNumber,address,isDeleted} = req.body;
      
        const getInTouchData = await getInTouch.findByIdAndUpdate({_id:id},{
            email:email,
            mobileNumber:mobileNumber,
            address:address,
        });
        if(isDeleted){
            await getInTouch.findByIdAndUpdate({_id:id},{
                isDeleted:isDeleted,
                deletedAt:Date.now()
            });
        }
        return res.status(200).json({message:"GetInTouch updated successfully"});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:error.message});
    }
}

exports.sendGetInTouchMessage = async (req,res)=>{
    try {
        const {name,message,sendMessageEmail} = req.body;
        let getInTouchData = new getInTouch({
            name,
            message,
            sendMessageEmail
        })
        await getInTouchData.save();
        return res.status(201).json({message:"Your message has been sent successfully"});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:error.message});
    }
}
exports.getDataOfGetInTouch = async (req,res)=>{
    try {
        const getInTouchData = await getInTouch.find({isDeleted:false},{email:1,mobileNumber:1,address:1});
        return res.status(200).json({getInTouchData});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:error.message});
    }
}
exports.getMessagesOfGetInTouch = async (req,res)=>{
    try {
        const messages = await getInTouch.find({isDeleted:false},{name:1,message:1,sendMessageEmail:1});
        return res.status(200).json({messages});
    } catch (error) {
        console.error(error)
        return  res.status(500).json({message:error.message});
    }
}