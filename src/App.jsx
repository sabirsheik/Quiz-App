import React, { useState } from "react";
import question from "./Data/question.json";
import "./App.css";
import { Footer } from './Components/footer';
import Header from './Components/header';

export default function App() {
  const [allQuestion, setAllQuestion] = useState(question);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answered, setAnswered] = useState(false); // Track if a question is answered
  const totalQuestions = allQuestion.length;

  const onSelectOption = (qid, op) => {
    const updatedAnswers = [...answers];
    updatedAnswers[qid - 1] = op;
    setAnswers(updatedAnswers);
    setAnswered(true); // Mark the question as answered

    // Automatically move to the next question after selection
    setTimeout(() => {
      setQIndex(qIndex + 1);
      setAnswered(false); // Reset answered flag for the next question
    }, 500); // Short delay for the user to see the selected answer
  }

  const getOptionStyle = (q, op) => {
    const style = "list-group-item";
    if (op === q.answer && answered) return style + " bg-success"; // Correct answer
    if (op === answers[q.id - 1] && answered) return style + " bg-danger"; // Incorrect answer
    return style; // Default style
  }

  const getResult = () => {
    let correctCount = 0;
    allQuestion.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correctCount++;
      }
    });
    return {
      correct: correctCount,
      wrong: totalQuestions - correctCount
    };
  }

  const q = allQuestion[qIndex];
  const quizComplete = qIndex === totalQuestions;

  return (
    <>
      <Header />
      <div className="container my-3">
        <h4>Quiz Mathematics</h4>
        {quizComplete ? (
          <div className="card result my-2">
            <h2>Quiz Result</h2>
            <hr />
            <div><p>Correct Answers :  <span>{getResult().correct}</span></p>
            <p>Wrong Answers  :  <span>{getResult().wrong}</span></p></div>
          </div>
        ) : (
          <div className="card my-2" key={q.id}>
            <div className="card-header">{q.id}. {q.statement}</div>
            <ul className="list-group list-group-flush">
              {q.options.map((op) => (
                <li
                  key={op}
                  className={getOptionStyle(q, op)}
                  onClick={() => onSelectOption(q.id, op)}
                >
                  {op}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
