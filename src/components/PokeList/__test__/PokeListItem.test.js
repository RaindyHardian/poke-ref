import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history'

import PokeListItem from "../PokeListItem";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders without any error", () => {
  const fakeItem = {
    id: "1",
    name: "bulbasaur",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  };
  const history = createMemoryHistory()
  // mock push function
  history.push = jest.fn();

  act(() => {
    render(
      <Router history={history}>
        <PokeListItem
          id={fakeItem.id}
          name={fakeItem.name}
          sprite={fakeItem.sprite}
        />
      </Router>,
      container
    );
  });
  expect(container.textContent).toBe(fakeItem.name);

  const leftClick = { button: 0 }
  userEvent.click(screen.getByText('bulbasaur'), leftClick)
  // spy on push calls, assert on url (parameter)
  expect(history.push).toHaveBeenCalledWith('/pokemon/1');
});
