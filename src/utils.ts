export const TOTAL_QUESTIONS = 10;

export const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard"
}

export const questionAPIEndpoint = (amount: number, difficulty: Difficulty) => `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
