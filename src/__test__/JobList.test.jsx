import React from "react";
import { render } from "@testing-library/react";
import JobsList from "../JobsList";
import { UserProvider } from "./testUser";

it("renders without crashing", function () {
  render(
    <UserProvider>
      <JobsList />
    </UserProvider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <UserProvider>
      <JobsList />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
