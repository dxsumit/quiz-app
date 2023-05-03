const mongoose = require("mongoose");

// validate length of input array..
const validateLength = (val) => {
    return (val.length > 1 && val.length < 10)
}

// create schema
const QuizSchema = new mongoose.Schema({
    question: {
        type: String,
        require: [true, "question can not be empty."],
        maxlength: [200, 'question more than 200 characters.'],
        trim: true
    },
    options:{
        type: [String],
        default: undefined,
        validate: [validateLength,'{PATH} should have items between 2 to 10']
    },
    rightAnswer:{
        type: Number,
        validate: [
            function (val) {
                return (val > 0 && val <= this.options.length)
            },
            "{PATH} should be in range of options provided"
        ]
    },
    startTime: {
        type: Date,
        required: [true, "startTime can not be empty."],
        default: () => ( new Date() )
    },
    endTime: {
        type: Date,
        required: [true, "endtTime can not be empty."],
        default: ( new Date(+new Date() + 24*60*60*1000) )          // 24hr from creation.
    },
    status: {
        type: String,
        default: "inactive"
    }
}) 

module.exports = mongoose.model('Question', QuizSchema);

