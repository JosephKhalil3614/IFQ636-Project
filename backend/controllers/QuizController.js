const Quiz = require('../models/Quiz');

const createQuiz = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'teacher') {
            return res.status(403).json({
                message: 'Access denied. Only teachers can create quizzes.'
            });
        }
    
        const {
            quizTitle,
            quizDescription,
            questionText,
            settings
        } = req.body;

        const quiz = new Quiz({
            quizTitle,
            quizDescription,
            questionText,
            settings,
            createdBy: req.user.id
        });

        await quiz.save();

        return res.status(201).json({
            message: 'Quiz created successfully',
            quiz
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

const RetrieveQuizzes = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'teacher') {
            return res.status(403).json({
                message: 'Access denied. Only teachers can access this page.'
            });
        }

        const storedQuizzes = await Quiz.find({
            createdBy: req.user.id
        });

        return res.status(200).json({
            quizzes: storedQuizzes
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    createQuiz,
    RetrieveQuizzes
};