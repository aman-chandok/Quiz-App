import { Question, QuestionsState } from './types';
import { Difficulty, questionAPIEndpoint, shuffleArray } from './utils';

export async function getQuestions (amount: number, difficulty: Difficulty): Promise<QuestionsState[]> {
  const apiEnpoint = questionAPIEndpoint(amount, difficulty);
  const resp = await (await fetch(apiEnpoint)).json();
  return resp.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
  }))
}
