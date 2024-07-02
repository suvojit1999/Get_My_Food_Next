'use client'
import { useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import ResCard from './ResCard'
import ResListLoading from './ResListLoading'
import { CartUpdateContext } from '../_context/CartUpdateContext'

const RestaurantList = () => {
    const params = useSearchParams()
    const [category, setcategory] = useState('all')
    const [ResList, setResList] = useState([])
    const [Loading, setLoading] = useState(false)
    const {search, setSearch} = useContext(CartUpdateContext)
    const storeRef = useRef()
    const listRef = useRef()

    useEffect(() => {
        if(!search || listRef.current.length==0){
            params && setcategory(params.get('category'))
            params && GetRestaurantList(params.get('category'))
        }
        else{
            setResList(listRef.current)
        }
    }, [params, search])

    useEffect(()=>{
        GetSearchedRestro()
    }, [search])

    const GetRestaurantList = (cate) => {
        setLoading(true)
        GlobalApi.GetRestaurant(cate).then(res => {
            console.log(res.restaurants)
            setResList(res.restaurants)
        })
        setLoading(false)
    }

    const GetSearchedRestro = ()=>{
        GlobalApi.GetRestaurant('all').then(res => {
            console.log(res.restaurants)
            storeRef.current = res.restaurants
            console.log(storeRef.current.filter(item=> item.name.includes(search)))
            listRef.current = storeRef.current.filter(item=> item.name.includes(search))

        })
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
