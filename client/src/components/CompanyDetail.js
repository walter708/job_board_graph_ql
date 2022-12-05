import { useParams } from 'react-router';
import  JobList from './JobList';
import { useCompany } from '../graphql/hooks';

function CompanyDetail() {
  const { companyId } = useParams();
  const {company, loading, error} = useCompany(companyId)
  if(loading){
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
