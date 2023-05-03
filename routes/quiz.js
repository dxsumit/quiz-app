const router = require("express").Router();
const QuizModel = require('../models/question')

// middleware for trigger
const trigger = require('../middleware/trigger')

router.get('/', (req,res) => {
    res.status(200).json({status: "success", msg: "This quiz API"}); 
});


// get all quizzes
router.get('/quizzes/all', trigger, async (req, res) => {

    try{
        const allQuiz = await QuizModel.find().select("-rightAnswer -__v");
        res.status(200).json({status: 'successful', msg: allQuiz});
    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }
})

// get all active quizzes
router.get('/quizzes/active', trigger, async (req, res) => {

    try{
        const activeQuiz = await QuizModel.find({status: "active"}).select("-__v");
        res.status(200).json({status: 'successful', msg: activeQuiz});
    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }
})

// find result of quiz..... /// need fix
router.get('/quizzes/:id/result', trigger, async (req, res) => {

    try{
        const {id} = req.params;
        // access the unique job
        const foundQuiz = await QuizModel.findOne({_id:id}).select({"options":1, "rightAnswer":1, "endTime":1});
        if(!foundQuiz)
            return res.status(404).json({status: 'failed', msg: 'Quiz ID not found.'});

        let currentDateTime = new Date();
        let resultDateTime = new Date(+foundQuiz.endTime + 5*60*1000) 

        // if result time + 5min is not passed then don't show result..
        if((resultDateTime - currentDateTime) > 0){
            return res.status(200).json({status: 'successful', msg: "Result Not announced yet.."});
        }
        
        const result = foundQuiz.options[foundQuiz.rightAnswer-1]; 
        res.status(200).json({status: 'successful', msg: `Correct Answer is : ${result}`});
    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }
})

// post a new quiz...
router.post('/quizzes', trigger, async (req, res) => {
    try{
        const {question, options, rightAnswer, startTime, endTime} = req.body

        if( !(question && options && rightAnswer))
            return res.status(400).json({status: "error", msg: "All fields are required.."});

        // creating new object to be passed..
        let newDataObj = {question, options, rightAnswer}
        if(startTime){
            newDataObj["startTime"] = new Date(startTime);
        }
        if(endTime){
            newDataObj["endTime"] = new Date(endTime);
        }

        const newData = new QuizModel(newDataObj)
 
        // save user in database..
        await newData.save()
        res.status(201).json({status: 'successful', msg: newData});
    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }
})



module.exports = router;

