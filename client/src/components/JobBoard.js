import JobList from './JobList';
import { useEffect, useState } from 'react';
import { getData } from '../graphql/query';

function JobBoard() {
  const [jobs, setJobs]  = useState([])
  useEffect(() => {
    getData().then(setJobs)
  }, [])
  
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
