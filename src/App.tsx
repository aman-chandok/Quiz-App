import React, { useState } from 'react';
import { getQuestions } from './client';
import QuestionCard from './components/Question';
import { GlobalStyle, Wrapper } from './App.styles';
import { Difficulty, TOTAL_QUESTIONS } from './utils';
import { AnswerObject, QuestionsState } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    try{
      setLoading(true);
      setGameOver(false);
      setQuestions(await getQuestions(TOTAL_QUESTIONS, Difficulty.EASY));
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
    } catch (err) {
      console.log(`Error in startQuiz: ${err}`);
    }
  };

  const checkUserAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (gameOver) return;
    const answer = e.currentTarget.value;
    const correct = questions[number].correct_answer === answer;
    if (correct) setScore((prev) => prev + 1);
    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer,
    };
    setUserAnswers((prev) => [...prev, answerObject]);
  };

  const goToNextQuestion = () => {
    const nextQ = number + 1;
    return (nextQ === TOTAL_QUESTIONS) ? setGameOver(true) : setNumber(nextQ);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>FUN QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startQuiz}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className='score'>Your Current Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkUserAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={goToNextQuestion}>
            Go To Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
