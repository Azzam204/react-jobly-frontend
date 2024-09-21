import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import UserContext from "./userContext";

/** Company Details
 * 
 * Displays all info on a company aswell ass all jobs available at that company
 * 
 */ 

function Company() {
  const { handle } = useParams()
  const [comp, setComp] = useState({})
  const { isApplied } = useContext(UserContext)

  useEffect(() => {
    async function getComp() {
      let comp = await JoblyApi.getCompany(handle)
      setComp(comp)
    }
    getComp()
  }, [])

  return (
    <div className="col-md-8 offset-md-2">
      <h4 className="white">{comp.name}</h4>
      <p className="white">{comp.description}</p>
      <div>
        {comp.jobs?.map(job => (
          isApplied(job.id)
            ?
            <JobCard applied job={job} key={job.id} />
            :
            <JobCard job={job} key={job.id} />
        ))}
      </div>
    </div>
  )
}

export default Company;