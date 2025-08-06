import React from 'react'
import ManagerActions from '../Component/MangerAction';
import ReviewerFeedback from '../Component/ReviewerFeedback';
import ApplicantProfile from '../Component/ApplicantProfile';
import PageTitle from '@/app/Components/PageTitle';
const Manage = () => {
  return (
    <div className='p-10 flex flex-col gap-5' >
        <PageTitle title = "Manage : Abel"/>
      <div className=' flex flex-wrap  gap-4 '>
        <ApplicantProfile/>
        <ManagerActions/>
      </div>
      <ReviewerFeedback/>
      
    </div>
  )
}

export default Manage