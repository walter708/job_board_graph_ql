import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getCompany } from '../graphql/query';
import  JobList from './JobList';

function CompanyDetail() {
  const [company, setCompany] = useState(null)
  const [error, setError] = useState(false)
  const { companyId } = useParams();
  useEffect(() => {
    getCompany(companyId)
    .then(setCompany)
    .catch(err =>{if(err) setError(err)})
  }, [companyId])
  
  if(company === null){
    return <p>Loading...</p>
  }
  if(error){
    return <p>Sorry something went wrong!</p>
  }
  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <p className='title is-5'>Jobs at {company.name}</p>
      <JobList jobs={company.jobs}/>
    </div>
  );
}

export default CompanyDetail;
