'use client'
import React, { useEffect, useRef, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import Image from 'next/image'
import '@/app/globals.css'
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'


const CatagoryList = () => {
    const router = useRouter()
    const listRef = useRef(null)
    const [catagoryList, setcatagoryList] = useState([])
    const params = useSearchParams()
    const [selectedparams, setselectedparams] = useState('all')

    useEffect(() => {
        getCatagoryList()
    }, [])

    useEffect(() => {
      setselectedparams(params.get('category'))
    }, [params])
    
    
    const getCatagoryList=()=>{
        GlobalApi.GetCatagory().then(res=>{
            setcatagoryList(res.categories)
        })
    }

    const scrollright= ()=>{
       listRef.current.scrollBy(200, 0)
    }
    const scrollleft= ()=>{
       listRef.current.scrollBy(-200, 0)
    }

    const gotoCategory =(slug)=>{
      router.push('/?category='+slug)
    }

  return (
    <>
    <BsArrowLeftCircle className='absolute left-0  top-[140px] cursor-pointer size-[45px] bg-white shadow-lg shadow-gray-200 rounded-full' onClick={()=> scrollleft()}/>

    <div className='flex gap-4 mt-10 overflow-auto ml-10 mr-10 scrollbar' ref={listRef}>
      {catagoryList.map((category, index)=>(
        <div onClick={()=>{gotoCategory(category.slug)}} key={index} className={`flex justify-center flex-col items-center g-3 p-3 border cursor-pointer rounded-md hover:bg-orange-100 hover:border-orange-400   ${selectedparams==category.slug&&'bg-orange-100 border-orange-400'}`}>
            <Image src={category.icon.url} width={40} height={40}/>
            <h2 className='text-[18px] font-semibold w-[80px] text-center'>{category.name}</h2>
        </div>
      ))}
    

    </div>
    <BsArrowRightCircle className='absolute right-0  top-[140px] cursor-pointer size-[45px] bg-white shadow-lg shadow-gray-200 rounded-full' onClick={()=> scrollright()}/>
    </>
  )
}

export default CatagoryList
