const dbConnection = require('../lib/db');
const conn = dbConnection();
const sessionStarter = async (model)=>{
    console.log(conn)
    const session = await model.startSession();
    session.startTransaction();
    return session;
}

const sessionAborter = async (session)=>{
    await session.abortTransaction();
    session.endSession();
}

const sessionCommiter = async (session)=>{
    await session.commitTransaction();
    session.endSession();
}

const sessionEnder = async (session)=>{
    session.endSession();
}

module.exports = {
    sessionStarter,
    sessionAborter,
    sessionCommiter,
    sessionEnder
}