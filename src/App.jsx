import React, { useState } from "react";
import question from "./Data/question.json";
import "./App.css";
import { Footer } from './Components/footer';
import Header from './Components/header';

export default function App() {
  const [allQuestion, setAllQuestion] = useState(question);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const totalQuestions = allQuestion.length;

  const onSelectOption = (qid, op) => {
    const updatedAnswers = [...answers];
    updatedAnswers[qid - 1] = op;
    setAnswers(updatedAnswers);

    // Move to the next question
    setQIndex(qIndex + 1);
  }

  const getOptionStyle = (q, op) => {
    const style = "list-group-item";

    if (op !== q.selectedOption)
      return style;

    if (op === q.answer)
      return style + " bg-success";
    else
      return style + " bg-danger";
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

  // Check if all questions have been answered
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
        {!quizComplete && (
          <div className="btn-container">
            <button onClick={() => setQIndex(qIndex + 1)}>Next Question</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}




