import React from "react";
import { Link } from "react-router-dom";
import './CompanyCard.css'

/** Show company's basic info
 * 
 * rendered for each company by CompanyList */ 

function CompanyCard({comp}) {
  return (
    <div>
      <Link className="CompanyCard card" to={`/companies/${comp.handle}`}>
        <div className="card-body">
          <h6 className="card-title">
            {comp.name}
            <img className="float-end ml-5" src={`https://dummyimage.com/500x300/000/fff&text=${comp.name}`} alt={comp.name} />
          </h6>
          <p><small>{comp.description}</small></p>
        </div>
      </Link>
    </div>
  )
}

export default CompanyCard