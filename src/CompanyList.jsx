import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./api"
import Loading from "./Loading";

/** Displays list of companies
 * 
 * Search: stores search parameters
 * 
 * If search is empty, displays all companies
 * 
 * component reloads every time search is altered*/ 

function CompanyList() {
  const [companies, setCompanies] = useState(null);
  const [search, setSearch] = useState('')


  useEffect(() => {
    async function getCompanies() {
      let companies = await JoblyApi.getCompanies(search);
      setCompanies(companies)
    }

    getCompanies()
  }, [search])

  function handleChange(e) {
    setSearch(e.target.value)
  }

  if (!companies) {
    return <Loading />
  }

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <div>
        <form
        >
          <input
            type="search"
            placeholder="Find company"
            value={search}
            onChange={handleChange}
            className="search form-control-lg"
          />
        </form>
      </div>
      <div>
        {companies.length ? 
          
            companies.map(comp => (
              <CompanyCard comp={comp} key={comp.handle} />
            ))
           :
          <h2 className="white">0 matches</h2>
        }
      </div>
    </div>
  )
}

export default CompanyList;

