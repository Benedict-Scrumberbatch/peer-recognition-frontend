import React from 'react';
import { render, screen } from '@testing-library/react';
import Post from './Post';
import { Recognition } from '../../../dtos/entity/recognition.entity';

test('renders learn react link', () => {
  const recognition: Recognition = {
    recId: 1,
    comments: [],
    empTo: {
      firstName: "James",
      lastName: "Brown",
      setId: async () => {}
    },
    empFrom: {
      firstName: "Lucy",
      lastName: "Lambertla",
      setId: async () => {}
    },
    msg: "Great job bringing cookies yesterday",
    tags: [
      { tagId: 1, value: "tag value" },
      { tagId: 2, value: "Brilliant" },
      { tagId: 3, value: "Friendly" }
    ]
  }
  render(<Post recognition={recognition} />);
  const linkElement = screen.getByText("tag value");
  expect(linkElement).toBeInTheDocument();
});
