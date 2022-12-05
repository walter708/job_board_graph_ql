import {gql, ApolloClient, InMemoryCache} from '@apollo/client'


 const GRAPHQL_URL = 'http://localhost:9000/graphql';

const JOB_DETAILS_FRAGMENT = gql`
      fragment jobDetails on Job {
        id
        title
        description
        company {
              id
              name
        }
      }
`
export const JOB_QUERY = gql`
  query JobQuery($id:ID!){
      job(id:$id) {
        ...jobDetails
      }
}
${JOB_DETAILS_FRAGMENT}
`
export const JOBS_QUERY = gql`
      query  {
        jobs {
          ...jobDetails
        }
      }
      ${JOB_DETAILS_FRAGMENT}
`
export const COMPANY_QUERY = gql`
query CompanyQuery($id:ID!){
  company(id:$id) {
    name
    description
    jobs {
       id
       title
    }
  }
}
`
export const CREATE_JOB_MUTATION = gql`
       mutation CreateJobMutation($input:CreateJobInput!){
          job: createJob(input:$input){
              ...jobDetails
             }
          }
          ${JOB_DETAILS_FRAGMENT}
`
 export const client = new ApolloClient({
  uri:GRAPHQL_URL,
  cache:new InMemoryCache()
 })
 
//  export const createJob = async (input) =>{
//   const mutation = gql`
//   mutation CreateJobMutation($input:CreateJobInput!){
//    job: createJob(input:$input){
//      ...jobDetails
//    }
//  }
//  ${JOB_DETAILS_FRAGMENT}
// `
// const variables = {input}
// const context = {
//   headers:{"Authorization":"Bearer " + getAccessToken()}
// }
// const {data: {job}} = await client.mutate({
//   mutation, 
//   variables, 
//   context,
//   update:(cache, {data: {job}}) => {
//     cache.writeQuery(
//       {
//         query:JOB_QUERY,
//         variables:{ id : job.id },
//         data:{ job }
//       }
//     )
//   }})

// return job;
// }

// export const getCompany = async (id) =>{
//   const query = gql`
//       query CompanyQuery($id:ID!){
//         company(id:$id) {
//           name
//           description
//           jobs {
//              id
//              title
//           }
//         }
//      }
//   `
//   const variables = {id}
//   const {data:{company}} = await client.query({query, variables})
//   return company;
// }



//  export const getJob = async (id) =>{
//   const query = JOB_QUERY;
  
//   const variables = {id}
//   const {data:{job}} = await client.query({query, variables})
//   return job;
  
// }
 
 
 

// export const getJobs = async () =>{
//   const query = gql`
//     query  {
//       jobs {
//         ...jobDetails
//       }
//    }
//    ${JOB_DETAILS_FRAGMENT}
// `
//   const {data:{jobs}} = await client.query({query, fetchPolicy:'network-only'})
//   return jobs;
  
// }