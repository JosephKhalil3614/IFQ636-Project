
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
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

        <div className="min-h-screen bg-gray-100 flex">

            {/* Sidebar including buttons*/}

            <div className="w-56 bg-[#10322C] text-white p-6">

                <h1 className="text-3xl font-bold mb-10">Quizlett</h1>
                <Link
                    to="/create-quiz"
                    className="block bg-[#3D6B58] p-3 rounded-lg mt-10">
                    Create Quiz
                </Link>

                <Link to="/profile" className="block bg-[#3D6B58] p-3 rounded-lg mt-2">
                    View Profile
                </Link>

                <Link to="/quizzes" className="block bg-[#3D6B58] p-3 rounded-lg mt-2">
                    View Quizzes
                </Link>

                <Link to="/Tasks" className="block bg-[#3D6B58] p-3 rounded-lg mt-2">
                    Home Page
				</Link>
            </div>

            <div className="flex-1 min-w-0 p-10">

                <div className="max-w-3xl mx-auto">

                    <h1 className="text-3xl font-bold text-[#173D35] mb-6">
                        Quiz Designer
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">

						<div className="bg-white p-6 shadow-sm rounded-xl">

                        <h2 className="text-xl font-semibold mb-4">
                            Quiz Details
						</h2>

                <label className= "block mb-2">Quiz Title</label>
                <input
                    type="text"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    placeholder="Enter quiz title"
                    className="w-full border rounded-lg p-3 mb-4"
                    required
                            
                />
                <label className = "block mb-2">Quiz Description</label>
                <textarea
                    value={quizDescription}
                            onChange={(e) => setQuizDescription(e.target.value)}
                            placeholder="Enter quiz description"
							className="w-full border rounded-lg p-3"
                    required
                />
                </div>

                {questions.map((question, questionIndex) => ( 

                    <div className="bg-white p-6 shadow-sm rounded-xl" key={questionIndex}>

                    <h3 className="text-xl font-semibold mb-4"> Question {questionIndex + 1}</h3>
                    <label>Question Text</label>
                    <input
                        type="text"
                        value={question.questionText}
                        onChange={(e) => updateQuestionText(questionIndex, e.target.value)}
                            required
							className="w-full border rounded-lg p-3 mb-4"
                            placeholder="Enter question text"

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
									className="w-full border rounded-lg p-3 mb-4"
                                />
                            </div>
                        ))}

                        <label>Correct Answer</label>
                        <select className="w-full border rounded-lg p-3 mb-4" value={question.correctAnswer} onChange={(e) => updateCorrectAnswer(questionIndex, parseInt(e.target.value))}>

                            <option value={0}>Option 1</option>
                            <option value={1}>Option 2</option>
                            <option value={2}>Option 3</option> 
                            <option value={3}>Option 4</option>

                        </select>
                        </div>
                ))}

                <button type="button" className="block bg-[#3D6B58] p-3 rounded-lg mt-2 text-white" onClick={addQuestion}>Add Question</button>

                <button type="submit" className="block bg-[#3D6B58] p-3 rounded-lg mt-2 text-white">
                    Save Quiz
                </button>

                <p>{responseMessage}</p>

            </form>
                </div>
            </div>
		</div>
    );
}

export default CreateQuizForm;
