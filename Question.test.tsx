import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QuestionCard from '../../components/Question';

const mockProps = {
	question: 'What is the capital of France?',
	answers: ['Rome', 'Paris', 'London', 'Madrid'],
	callback: jest.fn(),
	userAnswer: { question: '', answer: '', correct: false, correctAnswer: '' },
	questionNr: 1,
	totalQuestions: 10,
};

test('testing question and answer buttons rendering', () => {
  render(<QuestionCard {...mockProps} />);
	expect(screen.getByText(/What is the capital of France\?/i)).toBeInTheDocument();
	mockProps.answers.forEach(answer => {
		expect(screen.getByRole('button', { name: answer })).toBeInTheDocument();
	});
});

test('testing answer buttons disable when user has answered', () => {
	const userAnsweredProps = {
		...mockProps,
		userAnswer: { question: 'What is the capital of France?', answer: 'Paris', correct: true, correctAnswer: 'Paris' },
	};
	render(<QuestionCard {...userAnsweredProps} />);
	userAnsweredProps.answers.forEach(answer => {
		expect(screen.getByRole('button', { name: answer })).toBeDisabled();
	});
});