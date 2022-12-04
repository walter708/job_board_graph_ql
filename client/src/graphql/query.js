import {request, gql} from 'graphql-request';
 const GRAPHQL_URL = 'http://localhost:9000/graphql';
 
 export const getJob = async (id) =>{
  const query = gql`
      query JobQuery($id:ID!){
        job(id:$id) {
           id
           title
           description
           company {
             name
              id
            }
        }
     }
  `
  const variable = {id}
  const {job} = await request(GRAPHQL_URL, query, variable)
  return job;
  
}
 
 
 

export const getData = async () =>{
  const query = gql`
    query  {
      jobs {
        id
        title
        company {
          name
        }
      }
    }
  `
  const {jobs} = await request(GRAPHQL_URL, query)
  return jobs;
  
}


export const getCompany = async (id) =>{
  const query = gql`
      query CompanyQuery($id:ID!){
        company(id:$id) {
          name
          description
        }
     }
  `
  const variable = {id}
  const {company} = await request(GRAPHQL_URL, query, variable)
  return company;
  
}