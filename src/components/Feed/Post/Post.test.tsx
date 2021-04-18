import React from 'react';
import { render, screen } from '@testing-library/react';
import Post from './Post';

test('renders learn react link', () => {
  const recognition = {
    postDate: new Date(),
    empTo: {
      firstName: "James",
      lastName: "Brown"
    },
    empFrom: {
      firstName: "Lucy",
      lastName: "Lambertla"
    },
    msg: "Great job bringing cookies yesterday",
    tags: [
      { value: "tag value" },
      { value: "Brilliant" },
      { value: "Friendly" }
    ]
  }
  render(<Post recognition={recognition} />);
  const linkElement = screen.getByText("tag value");
  expect(linkElement).toBeInTheDocument();
});
