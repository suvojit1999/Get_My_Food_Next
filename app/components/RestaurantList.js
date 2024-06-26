'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import ResCard from './ResCard'
import ResListLoading from './ResListLoading'

const RestaurantList = () => {
    const params = useSearchParams()
    const [category, setcategory] = useState('all')
    const [ResList, setResList] = useState([])
    const [Loading, setLoading] = useState(false)

    useEffect(() => {
        params && setcategory(params.get('category'))
        params && GetRestaurantList(params.get('category'))
    }, [params])

    const GetRestaurantList = (cate) => {
        setLoading(true)
        GlobalApi.GetRestaurant(cate).then(res => {
            console.log(res.restaurants)
            setResList(res.restaurants)
        })
        setLoading(false)
    }

    return (
        <div className='mt-10 mx-3 mb-5'>
            {
                category ?
                    <div>
                        <h2 className='font-bold text-2xl'>Popular {category.replace('-', ' ')} restaurants</h2>
                        <h2 className='font-bold text-orange-600'>{ResList?.length} Results</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-col-4 gap-7 mt-3'>
                            {!Loading ? ResList.map((Restaurants, index) => (
                                <ResCard key={index} ResData={Restaurants} />
                            ))
                                :
                                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                    <ResListLoading key={num} />
                                ))
                            }
                        </div>

                    </div>
                    :
                    null
            }
        </div>
    )
}

export default RestaurantList
