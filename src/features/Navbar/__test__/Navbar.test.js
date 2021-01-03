import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { screen } from "@testing-library/react";

import Navbar from "../Navbar";

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

it("renders navbar component correctly", () => {
  const history = createMemoryHistory();
  act(() => {
    render(
      <Router history={history}>
        <Navbar/>
      </Router>,
      container
    );
  });
  expect(screen.getByTestId("Home")).toHaveTextContent("Home");
  expect(screen.getByTestId("Type")).toHaveTextContent("Type");
  expect(screen.getByTestId("Search")).toHaveTextContent("Search");
  expect(screen.getByTestId("Home").getAttribute("href")).toEqual("/")
  expect(screen.getByTestId("Type").getAttribute("href")).toEqual("/type")
  expect(screen.getByTestId("Search").getAttribute("href")).toEqual("/search")
  // screen.debug();
});