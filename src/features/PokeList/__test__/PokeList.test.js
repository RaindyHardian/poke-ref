import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { screen, waitFor, cleanup, fireEvent } from "@testing-library/react";

import PokeList from "../PokeList";
import api from "../../../api/api";

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
        <PokeList />
      </Router>,
      container
    );
  });
  expect(screen.getByTestId("loading-0").getAttribute("width")).toEqual("120");
});

it("renders error in pokemon list", async () => {
  api.getAllPokemon = jest.fn();
  api.getAllPokemon.mockRejectedValueOnce({
    message: "Fetching error",
  });
  const history = createMemoryHistory();
  const route = "/";
  history.push(route);
  act(() => {
    render(
      <Router history={history}>
        <PokeList />
      </Router>,
      container
    );
  });
  // Let's also make sure our Axios mock was called the way we expect
  expect(api.getAllPokemon).toHaveBeenCalledTimes(1);
  await waitFor(() => screen.getByTestId("pokelist-error"));
  // screen.debug();
});

it("renders pokemon list", async () => {
  api.getAllPokemon = jest.fn(); // 2nd method
  api.getAllPokemon.mockResolvedValueOnce({
    data: {
      count: 1118,
      next: "https://pokeapi.co/api/v2/pokemon?offset=18&limit=18",
      previous: null,
      results: [
        {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
          id: 1,
          sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
        {
          name: "ivysaur",
          url: "https://pokeapi.co/api/v2/pokemon/2/",
          id: 2,
          sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
        },
      ],
    },
  });
  const history = createMemoryHistory();
  const route = "/";
  history.push(route);
  act(() => {
    render(
      <Router history={history}>
        <PokeList />
      </Router>,
      container
    );
  });
  // Let's also make sure our Axios mock was called the way we expect
  expect(api.getAllPokemon).toHaveBeenCalledTimes(1);
  await waitFor(() => screen.getByText("bulbasaur"));
  expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  // screen.debug();
});

it("should allow search form to be inputted", async () => {
  api.getAllPokemon = jest.fn(); // 2nd method
  api.getAllPokemon.mockResolvedValueOnce({
    data: {
      count: 1118,
      next: "https://pokeapi.co/api/v2/pokemon?offset=18&limit=18",
      previous: null,
      results: [
        {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
          id: 1,
          sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
        {
          name: "ivysaur",
          url: "https://pokeapi.co/api/v2/pokemon/2/",
          id: 2,
          sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
        },
      ],
    },
  });
  const history = createMemoryHistory();
  const route = "/";
  history.push(route);
  act(() => {
    render(
      <Router history={history}>
        <PokeList />
      </Router>,
      container
    );
  });
  // Let's also make sure our Axios mock was called the way we expect
  expect(api.getAllPokemon).toHaveBeenCalledTimes(1);
  await waitFor(() => screen.getByText("bulbasaur"));
  const input = screen.getByTestId("input-search");
  fireEvent.change(input, { target: { value: "ditto" } });
  // screen.debug();
});
