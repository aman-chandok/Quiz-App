import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import App from '../App';

test('testing app text case', () => {
  render(<App />);
  const textElement = screen.getByText(/QUIZ/i);
  const buttonElement = screen.getByText(/Start/i);
  expect(textElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test('testing click event case', async () => {
  render(<App />);
  const btnElement = screen.getByRole("button");
  fireEvent.click(btnElement);
  expect(screen.getByText('Loading Questions...')).toBeInTheDocument();
  expect(screen.getByText('Your Current Score: 0')).toBeInTheDocument();
});