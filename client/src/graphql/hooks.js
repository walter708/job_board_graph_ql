import {useQuery} from '@apollo/client'
import {JOBS_QUERY} from './query'
import { JOB_QUERY } from './query'
import { COMPANY_QUERY } from './query'
import { useMutation } from '@apollo/client'
import { CREATE_JOB_MUTATION } from './query'
import { getAccessToken } from '../auth'




export const useCompany = (id) => {
  const {data, loading, error} = useQuery(COMPANY_QUERY , {
    variables:{id}
})
return {
  company:data?.company,
  loading:loading,
  error:Boolean(error)
}
}

export const useCreateJob = () => {
  const [mutate, {loading, error}] = useMutation(CREATE_JOB_MUTATION);
  return {
    createJob:async(title, description) => {
      return await mutate({
        variables:{input:{title, description}},
        context:{
          headers:{"Authorization":"Bearer " + getAccessToken()}
        },
        update:(cache, {data: {job}}) => {
          cache.writeQuery(
            {
              query:JOB_QUERY,
              variables:{ id : job.id },
              data:{ job }
            }
          )
        }
      })
    },
    loading,
    error
  }
  
}
export const useJob = (id) => {
  const {data, loading, error} = useQuery(JOB_QUERY, {
    variables:{id}
})
return {
  job:data?.job,
  loading:loading,
  error:Boolean(error)
}

}

export const useJobs = () => {
  const {data, loading, error} = useQuery(JOBS_QUERY, {
    fetchPolicy:'network-only'
  })
  
  return {
    jobs:data?.jobs,
    loading:loading,
    error:Boolean(error)
  }
}