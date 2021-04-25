import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Login from './Login';

test('renders learn react link', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const linkElement = screen.getByText("Login");

  expect(linkElement).toBeInTheDocument();
});
/*

import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

it('routes to a new route', async () => {
  const history = createMemoryHistory();

  // mock push function
  history.push = jest.fn();

  const { getByText } = render(
    <MemoryRouter history={history}>
      <Link to="/hello">Click me</Link>
    </MemoryRouter>
  );

  fireEvent.click(getByText('Click me'));

  // spy on push calls, assert on url (parameter)
  expect(history.push).toHaveBeenCalledWith('/hello');
});
*/