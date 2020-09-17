import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from './App';

test('renders landing page just fine', () => {
  const { getAllByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const elements = getAllByText(/net worth/i);
  expect(elements.length).toBeGreaterThan(0);
});

test('routing works when not found', () => {
  const { getAllByText } = render(
    <MemoryRouter initialEntries={['/unknown']}>
      <App />
    </MemoryRouter>
  );
  const elements = getAllByText(/not found/i);
  expect(elements.length).toBeGreaterThan(0);
});
