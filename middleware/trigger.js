const QuizModel = require('../models/question')

// trigger will run each time before request, to keep the status of each quiz updated..
const trigger = async (req, res, next) => {

    try{
        const foundQuiz = await QuizModel.find().select({"_id":1, "startTime":1, "endTime":1, "status":1});
        let update_to_active = [], update_to_finished = [];
        const currentDateTime = new Date();
        let endTime, startTime;

        foundQuiz.forEach((each) => {
            endTime = new Date(each.endTime);
            startTime = new Date(each.startTime);

            if( (currentDateTime - endTime) > 0){
                // if status is already set no need to update it..
                if(each.status !== 'finished'){
                    update_to_finished.push(each._id);
                }
            }
            if( ( (endTime - currentDateTime) > 0) && ( (currentDateTime - startTime) > 0) ){
                // if status is already set no need to update it..
                if(each.status !== 'active'){
                    update_to_active.push(each._id);
                }
            }
        })

        // updating the fields..
        if(update_to_finished.length > 0){
            await QuizModel.updateMany({_id: {$in: update_to_finished}}, {"status": "finished"})
        }

        if(update_to_active.length > 0){
            await QuizModel.updateMany({_id: {$in: update_to_active}}, {"status": "active"})
        }

        next();

    }
    catch(err){
        return res.status(200).json({status: 'failed', res: "error in middleware", msg: err});
    }
}

module.exports = trigger;

