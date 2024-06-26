'use client'
import React, { useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Rating as ReactRating } from '@smastrom/react-rating'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'
import Image from 'next/image'
import { FaStar } from "react-icons/fa";

const ReviewSection = ({ Restaurant }) => {
    const [rating, setRating] = useState(0)
    const [ReviewText, setReviewText] = useState()
    const { user } = useUser()
    const [update, setUpdate] = useState(false)
    const [ReviewList, setReviewList] = useState([])

    useEffect(() => {
        getReviewList()
    }, [Restaurant, update])


    const HandleSubmit = () => {
        const data = {
            userName: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
            star: rating,
            ProfileImage: user?.imageUrl,
            ReviewText: ReviewText,
            RestroSlug: Restaurant?.slug
        }
        GlobalApi.AddReview(data).then(res => {
            console.log(res)
            toast('Review Added !!!')
            setUpdate(!update)
        })
    }

    const getReviewList = () => {
        GlobalApi.GetRestroReview(Restaurant?.slug).then(res => {
            console.log(res)
            setReviewList(res.reviews)
        })
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mt-5 md:gap-8 lg:gap-8'>
            <div className='flex flex-col gap-4 bg-slate-100 p-3 rounded-lg'>
                <h2>Add Your Review:</h2>
                <ReactRating style={{ maxWidth: 100 }} value={rating} onChange={setRating} />
                <Textarea onChange={(e) => setReviewText(e.target.value)} />
                <button className='w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-orange-800' disabled={rating == 0 || !ReviewText} onClick={() => { HandleSubmit() }}>Submit</button>
            </div>
            <div className='col-span-2 mt-6 md:mt-0 lg:mt-0'>
                {ReviewList?.map((item, index) => (
                    <div key={index} className='my-2 p-2 border border-slate-400 rounded-lg flex justify-start gap-2 items-center'>
                        <Image src={item?.profileImage} width={50} height={50} className='rounded-full w-[60px] h-[60px] m-2' />
                        <div className='flex flex-col justify-center items-start my-2'>
                            <h2 className='font-bold'>{item?.userName}</h2>
                            <div className='mb-2'>
                                <ReactRating style={{ maxWidth: 100 }} value={item?.star} isDisabled />
                            </div>
                            <div>{item?.reviewText}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReviewSection
