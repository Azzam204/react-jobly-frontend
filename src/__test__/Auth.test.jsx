import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Login from "../Login";
import SignUp from "../SignUp";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});