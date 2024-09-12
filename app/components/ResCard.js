'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaStar } from "react-icons/fa";
import { useUser } from '@clerk/nextjs';

const ResCard = ({ ResData }) => {
  const { user, isSignedIn } = useUser()
  const router = useRouter()
  const GoToDetails = ()=>{
    // if (isSignedIn){
    //   router.push('/restaurant/'+ResData?.slug)
    // }
    // else{
    //   alert('Please log in first')
    // }


    router.push('/restaurant/'+ResData?.slug)
    
  }

  const AvgStar = ()=>{
    let total = 0;
    let count = 0;
    ResData?.reviews.forEach(item=>{
      total = total + item.star
      count++
    })
    let result = total/count;
    return result?result.toFixed(1):'5.0'
  }
  return (
    <div className='p-2 hover:border rounded-xl hover:border-orange-700 transition-all duration-150 ease-in-out hover:bg-orange-50 cursor-pointer' onClick={()=>GoToDetails()}>
      <Image src={ResData.banner.url} alt={ResData.name} width={500} height={130} className='h-[140px] rounded-xl object-cover' />
      <div className='mx-2 mt-2 flex justify-between'>
        <div>
          <h2 className='font-bold text-xl'>{ResData.name}</h2>
          <div >
            <div className='flex gap-2 items-center'>
              <FaStar fill='rgb(243, 207, 4)' />
              <label className='text-gray-500 text-sm'>{AvgStar()}</label>
            </div>
          </div>
        </div>
        <h2 className='text-orange-600 text-sm border-2 rounded-md px-1 py-0 bg-orange-100 h-[25px]'>{ResData.restaurantTypes[0]}</h2>
      </div>
    </div>
  )
}

export default ResCard
