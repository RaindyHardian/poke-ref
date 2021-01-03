import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { screen, waitFor, cleanup } from "@testing-library/react";

import PokeDetails from "../PokeDetails";
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
        <PokeDetails />
      </Router>,
      container
    );
  });
  expect(
    screen.getByTestId("pokedetails-loading").getAttribute("width")
  ).toEqual("550");
  // screen.debug()
});

it("renders error in pokedetails", async () => {
  api.getPokemon = jest.fn();
  api.getPokemon.mockRejectedValueOnce({
    message: "Fetching Error",
  });
  const history = createMemoryHistory();
  act(() => {
    render(
      <Router history={history}>
        <PokeDetails />
      </Router>,
      container
    );
  });
  expect(api.getPokemon).toHaveBeenCalledTimes(1);
  await waitFor(() => screen.getByTestId("pokedetails-error"));
  // screen.debug();
});

it("renders detailed pokemon info", async () => {
  api.getPokemon = jest.fn();
  api.getPokemon.mockResolvedValueOnce({
    data: data,
  });
  const history = createMemoryHistory();
  act(() => {
    render(
      <Router history={history}>
        <PokeDetails />
      </Router>,
      container
    );
  });
  expect(api.getPokemon).toHaveBeenCalledTimes(1);
  await waitFor(() => screen.getByText("bulbasaur"));
  // screen.debug();
});
