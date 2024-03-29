import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { screen, waitFor, cleanup, fireEvent } from "@testing-library/react";

import TypeList from "../TypeList";
import api from "../../../api/api";

const data = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      name: "normal",
      url: "https://pokeapi.co/api/v2/type/1/",
    },
    {
      name: "fighting",
      url: "https://pokeapi.co/api/v2/type/2/",
    },
  ],
};

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

it("render loading when mounted", () => {
  act(() => {
    render(<TypeList />, container);
  });
  expect(screen.getByTestId("typelist-loading")).toHaveTextContent(
    "Loading..."
  );
});

it("renders error in type list", async () => {
  api.getAllTypes = jest.fn();
  api.getAllTypes.mockRejectedValueOnce({
    message: "Fetching error",
  });
  act(() => {
    render(<TypeList />, container);
  });
  expect(api.getAllTypes).toHaveBeenCalledTimes(1);
  await waitFor(() => screen.getByTestId("typelist-error"));
  expect(screen.getByTestId("typelist-error")).toHaveTextContent(
    "Fetching error"
  );
  // screen.debug();
});

it("renders type list", async () => {
  api.getAllTypes = jest.fn();
  api.getAllTypes.mockResolvedValueOnce({
    data: data,
  });
  const history = createMemoryHistory();
  const route = "/type";
  history.push(route);
  act(() => {
    render(
      <Router history={history}>
        <TypeList />
      </Router>,
      container
    );
  });
  // Let's also make sure our Axios mock was called the way we expect
  expect(api.getAllTypes).toHaveBeenCalledTimes(1);
  await waitFor(() => screen.getByText("normal"));
  data.results.forEach((res) => {
    expect(screen.getByText(res.name)).toBeInTheDocument;
  });
});

it("should redirect when specific type is clicked", async () => {
  api.getAllTypes = jest.fn();
  api.getAllTypes.mockResolvedValueOnce({
    data: data,
  });
  const history = createMemoryHistory();
  act(() => {
    render(
      <Router history={history}>
        <TypeList />
      </Router>,
      container
    );
  });
  expect(api.getAllTypes).toHaveBeenCalledTimes(1);
  await waitFor(() => screen.getByText("normal"));
  data.results.forEach((res) => {
    expect(screen.getByText(res.name)).toBeInTheDocument;
  });
  
  const normal = screen.getByText("normal");
  fireEvent.click(normal);
  await waitFor(() => history.location.pathname);
  expect(history.location.pathname).toBe("/type/normal");
});
