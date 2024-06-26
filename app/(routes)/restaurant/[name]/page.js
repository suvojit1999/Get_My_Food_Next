'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoIosArrowDropleft } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import TabsCompo from './_components/TabsCompo'


const RestaurantDetails = () => {

    const router = useRouter()
    const params = usePathname();
    const [Restaurant, setRestaurant] = useState()
    useEffect(() => {
        GetRestroDetails(params.split('/')[2])

    }, [])


    const GetRestroDetails = (ResSlug) => {
        GlobalApi.GetRestroDetais(ResSlug).then(res => {
            console.log(res)
            setRestaurant(res.restaurant)
        })
    }

    const AvgStar = ()=>{
        let total = 0;
        let count = 0;
        Restaurant?.reviews.forEach(item=>{
          total = total + item.star
          count++
        })
        let result = total/count;
        return result?result.toFixed(1):'5.0'
      }

    return (
        <div className='mx-6 my-6'>
            <div>
                <Image src={Restaurant?.banner?.url} width={1000} height={300} className='w-full h-[250px] object-cover rounded-xl' />
                <IoIosArrowDropleft fill='#f76420' className='relative -scale-[-3] bottom-[220px] left-[30px] cursor-pointer' onClick={()=>{router.back()}}/>
            </div>
            <div>
                <h2 className='text-3xl font-bold mt-2'>{Restaurant?.name}</h2>
                <div className='flex gap-2 items-center'>
                <FaStar fill='rgb(243, 207, 4)' />
                <label className='text-gray-500 text-sm'>{AvgStar()} ({Restaurant?.reviews.length})</label>
                </div>
                <div className='flex gap-1 justify-start items-center mt-1'>
                <CiLocationOn className='scale-150'/>
                <h2>{Restaurant?.address}</h2>
                </div>
            </div>
            <div className='mt-5'>
                <TabsCompo Restaurant={Restaurant}/>
            </div>
        </div>
    )
}

export default RestaurantDetails
