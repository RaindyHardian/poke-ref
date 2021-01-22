import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Router, Route, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { screen, waitFor, cleanup } from "@testing-library/react";

import TypeDetails from "../TypeDetails";
import api from "../../../api/api";
import data from "./data";

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
  cleanup();
});

it("renders loading when mounted", () => {
  const history = createMemoryHistory();
  act(() => {
    render(
      <Router history={history}>
        <TypeDetails />
      </Router>,
      container
    );
  });
  expect(screen.getByTestId("typedetails-loading")).toHaveTextContent(
    "Loading..."
  );
  // screen.debug()
});

it("renders error in typedetails", async () => {
  api.getType = jest.fn();
  api.getType.mockRejectedValueOnce({
    message: "Fetching Error",
  });
  const history = createMemoryHistory();
  const route = "/type/poison";
  history.push(route);
  act(() => {
    render(
      <MemoryRouter initialEntries={["type/poison"]}>
        <Route path="type/:id">
          <TypeDetails />
        </Route>
      </MemoryRouter>,
      container
    );
  });
  expect(api.getType).toHaveBeenCalledTimes(1);
  await waitFor(() => screen.getByTestId("typedetails-error"));
  expect(screen.getByTestId("typedetails-error")).toHaveTextContent(
    "Fetching Error, please refresh the page"
  );
  // screen.debug();
});

it("renders detailed pokemon info", async () => {
  api.getType = jest.fn();
  api.getType.mockResolvedValueOnce({
    data: data,
  });
  const history = createMemoryHistory();
  act(() => {
    render(
      <MemoryRouter initialEntries={["type/poison"]}>
        <Route path="type/:id">
          <TypeDetails />
        </Route>
      </MemoryRouter>,
      container
    );
  });
  expect(api.getType).toHaveBeenCalledTimes(1);
  await waitFor(() => screen.getByTestId('poison'));
  expect(screen.getByTestId('poison')).toHaveTextContent("poison type")
  expect(screen.getByTestId("ddt-fairy")).toHaveTextContent("fairy");
  expect(screen.getByTestId("hdt-ground")).toHaveTextContent("ground");
  expect(screen.getByTestId("hdf-fighting")).toHaveTextContent("fighting");
  expect(screen.getByTestId("ddf-psychic")).toHaveTextContent("psychic");

  expect(screen.getByText("List of all poison pokemon")).toBeInTheDocument()
  expect(screen.getByText("ivysaur")).toBeInTheDocument()
  // screen.debug();
});
