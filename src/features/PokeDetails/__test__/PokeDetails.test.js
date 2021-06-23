import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { screen, waitFor, cleanup, fireEvent } from "@testing-library/react";

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
  expect(screen.getByTestId("pokedetails-error")).toHaveTextContent(
    "Fetching Error, please refresh the page"
  );
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
  expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  data.types.forEach(({ type }) => {
    expect(screen.getByTestId(`type-${type.name}`)).toHaveTextContent(
      type.name
    );
  });
  expect(screen.getByTestId("height")).toHaveTextContent(`${data.height} m`);
  expect(screen.getByTestId("weight")).toHaveTextContent(`${data.weight} kg`);
  data.stats.forEach((stat) => {
    expect(screen.getByTestId(`stat-${stat.stat.name}`)).toHaveTextContent(
      stat.base_stat
    ); // stat
  });

  data.abilities.forEach(({ ability }) => {
    expect(screen.getByTestId(`ability-${ability.name}`)).toHaveTextContent(
      ability.name
    ); // ability
  });

  data.moves.forEach(({ move }) => {
    expect(screen.getByTestId(`move-${move.name}`)).toHaveTextContent(
      move.name
    ); // move
  });

  // screen.debug();
});

it("should redirect to types page when the pokemon type clicked", async () => {
  api.getPokemon = jest.fn();
  api.getPokemon.mockResolvedValueOnce({
    data: data,
  });
  const history = createMemoryHistory();
  await act(async () => {
    render(
      <Router history={history}>
        <PokeDetails />
      </Router>,
      container
    );
  });

  data.types.forEach(({ type }) => {
    expect(screen.getByTestId(`type-${type.name}`)).toHaveTextContent(
      type.name
    );
  });

  const type = screen.getByTestId(`type-${data.types[0].type.name}`);
  fireEvent.click(type);

  await waitFor(() => history.location.pathname);
  expect(history.location.pathname).toBe(`/type/${data.types[0].type.name}`);
});
