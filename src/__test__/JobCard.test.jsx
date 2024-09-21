import React from "react";
import { render } from "@testing-library/react";
import JobCard from "../JobCard";
import { UserProvider } from "./testUser";

const job = {
  title: "title",
  companyName: 'comp',
  salary: 10,
  equity: 1
}

it("renders without crashing", function () {
  render(
    <UserProvider>
      <JobCard job={job} />
    </UserProvider>
  )
})

it('matches snapshot', function () {
  const { asFragment } = render(
    <UserProvider>
      <JobCard job={job} />
    </UserProvider>
  )

  expect(asFragment()).toMatchSnapshot();
})