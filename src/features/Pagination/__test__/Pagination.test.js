import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { screen } from "@testing-library/react";

import Pagination from "../Pagination";

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
const totalData = 100;
const dataPerPage = 5; // it means the component has 20 page

it("renders first page number component", () => {
  const currentPage = 1;
  const history = createMemoryHistory();
  act(() => {
    render(
      <Router history={history}>
        <Pagination
          totalData={totalData}
          dataPerPage={dataPerPage}
          currentPage={currentPage}
        />
      </Router>,
      container
    );
  });
  expect(screen.getByTestId("page-prev")).toHaveTextContent("<");
  expect(screen.getByTestId("page-1")).toHaveTextContent("1");
  expect(screen.getByTestId("page-2")).toHaveTextContent("2");
  expect(screen.getByTestId("page-3")).toHaveTextContent("3");
  expect(screen.getByTestId("page-20")).toHaveTextContent("20");
  expect(screen.getByTestId("page-next")).toHaveTextContent(">");
  // screen.debug();
});

it("renders middle page number component", () => {
  const currentPage = 3;
  const history = createMemoryHistory();
  act(() => {
    render(
      <Router history={history}>
        <Pagination
          totalData={totalData}
          dataPerPage={dataPerPage}
          currentPage={currentPage}
        />
      </Router>,
      container
    );
  });
  expect(screen.getByTestId("page-prev")).toHaveTextContent("<");
  expect(screen.getByTestId("page-1")).toHaveTextContent("1");
  expect(screen.getByTestId("page-2")).toHaveTextContent("2");
  expect(screen.getByTestId("page-3")).toHaveTextContent("3");
  expect(screen.getByTestId("page-4")).toHaveTextContent("4");
  expect(screen.getByTestId("page-5")).toHaveTextContent("5");
  expect(screen.getByTestId("page-20")).toHaveTextContent("20");
  expect(screen.getByTestId("page-next")).toHaveTextContent(">");
  // screen.debug();
});

it("renders last page number component", () => {
  const currentPage = 20;
  const history = createMemoryHistory();
  act(() => {
    render(
      <Router history={history}>
        <Pagination
          totalData={totalData}
          dataPerPage={dataPerPage}
          currentPage={currentPage}
        />
      </Router>,
      container
    );
  });
  expect(screen.getByTestId("page-prev")).toHaveTextContent("<");
  expect(screen.getByTestId("page-1")).toHaveTextContent("1");
  expect(screen.getByTestId("page-18")).toHaveTextContent("18");
  expect(screen.getByTestId("page-19")).toHaveTextContent("19");
  expect(screen.getByTestId("page-20")).toHaveTextContent("20");
  expect(screen.getByTestId("page-next")).toHaveTextContent(">");
  // screen.debug();
});