import React, { useContext } from "react";
import { Button } from 'reactstrap'
import './JobCard.css'
import UserContext from "./userContext";

/** Show job's basic info
 * 
 * rendered for each job by jobslist
 * 
 * also rendered for each job or a company on company details component */ 

function JobCard({ job, applied }) {
  const { applyToJob } = useContext(UserContext)

  function handleApply(e) {
    applyToJob(job)
  }

  return (
    <div className="JobCard card">
      <div className="card-body">
        <h6 className="card-title">{job.title}</h6>
        <p>{job.companyName}</p>
        <div><small>Salary: {job.salary || 'N/A'}</small></div>
        <div><small>Equity: {job.equity || '0'}</small></div>
        {applied
          ?
          <Button disabled className="float-end apply"><b>APPLIED</b></Button>
          :
          <Button
            className="float-end apply"
            onClick={handleApply}
          ><b>APPLY</b></Button>}
      </div>
    </div>
  )
}

export default JobCard;