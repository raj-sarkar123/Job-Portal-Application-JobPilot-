import { useUser } from '@clerk/clerk-react'
import React from 'react'
import CreadtedApplications from '@/components/CreadtedApplications';
import CreatedJobs from '@/components/CreatedJobs';

const Myjob = () => {
  const {user, isLoaded} = useUser();

  return (
    <div>
     {/* <h1>

      {
        user?.unsafeMetadata?.role === "candidate"?"My Applications": "My jobs"
      }
     </h1> */}
     { user?.unsafeMetadata?.role === "candidate" ?(
      <CreadtedApplications/>

     ):(
      <CreatedJobs/>

     ) }
    </div>
  )
}

export default Myjob
