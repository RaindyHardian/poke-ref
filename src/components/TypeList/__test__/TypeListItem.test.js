import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import TypeListItem from "../TypeListItem";

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
  const fakeTypeName = "fighting";
  const history = createMemoryHistory();
  history.push = jest.fn();
  act(() => {
    render(
      <Router history={history}>
        <TypeListItem name={fakeTypeName} />
      </Router>,
      container
    );
  });
  expect(container.textContent).toBe(fakeTypeName);
  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(fakeTypeName), leftClick);
  // spy on push calls, assert on url (parameter)
  expect(history.push).toHaveBeenCalledWith("/type/" + fakeTypeName);
});
