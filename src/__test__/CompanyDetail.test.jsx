import React from "react";
import { render } from "@testing-library/react";
import { UserProvider } from "./testUser";
import { MemoryRouter } from "react-router-dom";
import Company from "../CompanyDetail";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Company />
      </UserProvider>
    </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Company />
      </UserProvider>
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});


