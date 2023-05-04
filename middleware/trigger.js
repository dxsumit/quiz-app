// const QuizModel = require('../models/question');
const updateDB = require('../utils/updateDB');

// trigger will run each time before request, to keep the status of each quiz updated..
const trigger = async (req, res, next) => {

    try{
        await updateDB();
        next();
    }
    catch(err){
        return res.status(200).json({status: 'failed', res: "error in middleware", msg: err});
    }
}

module.exports = trigger;

