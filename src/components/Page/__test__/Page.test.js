import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { screen } from "@testing-library/react";

import Page from "../Page";

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

it("renders Page component correctly", () => {
  const history = createMemoryHistory();
  const childComponent = <div data-testid="child">Child Component</div>;
  act(() => {
    render(
      <Router history={history}>
        <Page children={childComponent} />
      </Router>,
      container
    );
  });
  expect(screen.getByTestId("child")).toHaveTextContent("Child Component");
  // screen.debug();
});
