import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompanyCard from "../CompanyCard";

const comp = {
  name: 'company',
  handle: 'comp',
  description: 'comp description'
}

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <CompanyCard comp={comp} />
    </MemoryRouter>
  )
})

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyCard comp={comp} />
    </MemoryRouter>
  )

  expect(asFragment()).toMatchSnapshot();
})