import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Accelo Dashboard title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Accelo Dashboard/i);
  expect(titleElement).toBeInTheDocument();
});