import React from "react";
import { render } from "@testing-library/react";
import RoutesList from "../RoutesList";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "./testUser";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <RoutesList />
      </UserProvider>
    </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <RoutesList />
      </UserProvider>
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
