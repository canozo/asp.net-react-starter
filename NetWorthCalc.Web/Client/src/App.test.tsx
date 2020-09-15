import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders repository link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/repo/i);
  expect(linkElement).toBeInTheDocument();
});
