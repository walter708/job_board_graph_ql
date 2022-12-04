import { Company, Job } from './db.js'
export const resolvers = {
  Query:{
    job: (_root, {id}) => Job.findById(id),
    company:(_root, {id}) => Company.findById(id),
    jobs:() => Job.findAll()
  },
  
  Mutation:{
    createJob:(_root, {input}, {user}) => {
      if(!user){
        throw Error("User not logged in")
      }
      return Job.create({...input, companyId:user.companyId})
    },
    deleteJob:(_root, {id}) => Job.delete(id),
    updateJob:(_root, {updateInput}) => Job.update(updateInput)
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

