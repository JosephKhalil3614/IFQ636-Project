
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function CreateQuizForm() {
    
    const { user } = useAuth();  
	const token = user?.token;
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [questions, setQuestions] = useState([{

           questionText: '',
           options: ['', '', '', ''],
		   correctAnswer: 0

    }]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const quizData = {
            quizTitle,
            quizDescription,
            questionText: questions,
            settings: {
            TimeLimit: 30,
            MaximumAttempts: 3
            }
        };

        try {

            const response = await fetch(
                'http://localhost:5001/api/quizzes',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(quizData)
                }
            );

            const submissionResult = await response.json();

            response.ok
                ? setResponseMessage('Quiz submitted successfully!')
                : setResponseMessage(
                    submissionResult.message ||
                    'Quiz submission failed. Please try again.'
                );

        } catch (error) {
            setResponseMessage('Server is unavailable');
            console.error(error);
        }
    };

    function addQuestion() {
        setQuestions([
            ...questions,
            {
                questionText: '',
                options: ['', '', '', ''],
                correctAnswer: 0
            }
        ]);
    }

    function updateQuestionText(index, value) {
        setQuestions(previousQuestions =>
        previousQuestions.map((question, i) =>
        i === index
        ? { ...question, questionText: value }
        : question
            )
        );
    }
    function updateOption(questionIndex, optionIndex, value) {
            setQuestions(previousQuestions =>
                previousQuestions.map((question, i) => {
                    if (i !== questionIndex) return question;

                    const updatedOptions = [...question.options];
                    updatedOptions[optionIndex] = value;

                    return {
                        ...question,
                        options: updatedOptions
                    };
                })
            );
        }
    function updateCorrectAnswer(questionIndex, value) {
        setQuestions(previousQuestions =>
            previousQuestions.map((question, i) =>
                i === questionIndex
                    ? { ...question, correctAnswer: value }
                    : question
            )
        );
    }

    return (

        <div>
            <form onSubmit={handleSubmit}>

                <h1>Create Quiz</h1>

                <label>Quiz Title</label>
                <input
                    type="text"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    required
                />
                <label>Quiz Description</label>
                <textarea
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    required
                />

                {questions.map((question, questionIndex) => ( 

                    <div key={questionIndex}>

                    <h3> Question {questionIndex + 1}</h3>
                    <label>Question Text</label>
                    <input
                        type="text"
                        value={question.questionText}
                        onChange={(e) => updateQuestionText(questionIndex, e.target.value)}
                        required
                        />

                        <h4>Answer Options</h4>

                        {question.options.map((option, optionIndex) => (
                            
                            <div key={optionIndex}>
                                <label>Option {optionIndex + 1}</label>

								<input
                                    type="text"
                                    value={option}
                                    onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                                    required
                                />
                            </div>
                        ))}

                        <label>Correct Answer</label>
                        <select value={question.correctAnswer} onChange={(e) => updateCorrectAnswer(questionIndex, parseInt(e.target.value))}>

                            <option value={0}>Option 1</option>
                            <option value={1}>Option 2</option>
                            <option value={2}>Option 3</option> 
                            <option value={3}>Option 4</option>

                        </select>
                        </div>
                ))}

                <button type="button" onClick={addQuestion}>Add Question</button>

                <button type="submit">
                    Save Quiz
                </button>

                <p>{responseMessage}</p>

            </form>
        </div>
    );
}

export default CreateQuizForm;
