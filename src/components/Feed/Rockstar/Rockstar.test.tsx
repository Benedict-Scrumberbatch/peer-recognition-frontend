import React from 'react';
import { render, screen } from '@testing-library/react';
import Rockstar from './Rockstar';

/*
DOES NOT PASS
- Rockstar.tsx uses require("react-chartjs") which testing library does not support
*/

test('renders learn react link', () => {
  render(<Rockstar />);
  const linkElement = screen.getByText("Rockstar of the Month");
  expect(linkElement).toBeInTheDocument();
});