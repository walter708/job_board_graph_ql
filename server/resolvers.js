import { Company, Job } from './db.js'
const rejectIf = (condition) =>{
  if(condition){
    throw Error("Unauthorized")
  }
}
export const resolvers = {
  Query:{
    job: (_root, {id}) => Job.findById(id),
    company:(_root, {id}) => Company.findById(id),
    jobs:() => Job.findAll()
  },
  
  Mutation:{
    createJob:(_root, {input}, {user}) => {
      rejectIf(!user)
      return Job.create({...input, companyId:user.companyId})
    },
    deleteJob:async(_root, {id}, {user}) => {
      const job = await Job.findById(id)
      rejectIf(!user)
      rejectIf(job.companyId !== user.companyId)
      return Job.delete(id);   
    },
    updateJob:async(_root, {updateInput}, {user}) => {
      const {id} = updateInput
      const job = await Job.findById(id)
      rejectIf(!user)
      rejectIf(job.companyId !== user.companyId)
      return Job.update({...updateInput, company:user.companyId})
    }
  },
  
  Job:{
    company:(job) => {
      return Company.findById(job.companyId)
    }
    },
    
  Company:{
    jobs:(company) => Job.findAll((job)=> job.companyId === company.id)
  }
}

