const mongoose = require('mongoose');


//Checks there are exactly 4 options and that they are all non-empty strings
function arrayLimit(val) {  
    return Array.isArray(val) &&
        val.length == 4 &&
        val.every(option => typeof option === 'string' && option.trim() !== '');
  
}

const questionSchema = new mongoose.Schema({

    questionText: { type: String, required: true },
    options: [{ type: String, required: true, validate: [arrayLimit, '{PATH} must have exactly 4 options']],
    correctAnswer: { type: String, required: true, min: 0, max: 3 },
}); 

const quizSchema = new mongoose.Schema({

    quizTitle: { type: String, required: true },
    quizDescription: { type: String, required: true },
    questionText: { [questionSchema]: String, required: true },
});



const SettingsSchema = new mongoose.Schema({
   

})


