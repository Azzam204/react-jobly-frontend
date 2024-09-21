import React, { useContext, useEffect, useState } from "react";
import JobCard from "./JobCard";
import JoblyApi from "./api"
import Loading from "./Loading";
import UserContext from "./userContext";

/** Displays list of jobs
 * 
 * Search: stores search parameters
 * 
 * If search is empty, displays all jobs
 * 
 * component reloads every time search is altered*/ 

function JobsList() {
  const [jobs, setJobs] = useState(null);
  const [search, setSearch] = useState('')
  const { isApplied } = useContext(UserContext)

  useEffect(() => {
    async function getJobs() {
      let jobs = await JoblyApi.getJobs(search);
      setJobs(jobs)
    }

    getJobs()
  }, [search])

  function handleChange(e) {
    setSearch(e.target.value)
  }

  if (!jobs) {
    return <Loading />;
  }

  return (
    <div className="col-md-8 offset-md-2">
      <div>
        <form
        >
          <input
            type="search"
            placeholder="Find job"
            value={search}
            onChange={handleChange}
            className="search form-control-lg"
          />
        </form>
      </div>
      {jobs.length
        ?
        jobs.map(job => (
          isApplied(job.id)
            ?
            <JobCard applied job={job} key={job.id} />
            :
            <JobCard job={job} key={job.id} />
        ))
        :
        <h2 className="white">0 matches</h2>
      }
    </div>
  )
}

export default JobsList;