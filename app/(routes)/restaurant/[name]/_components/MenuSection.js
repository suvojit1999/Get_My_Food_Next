'use client'
import { CartUpdateContext } from '@/app/_context/CartUpdateContext';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { menuItem } from '@nextui-org/theme';
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { FaRegPlusSquare } from "react-icons/fa";
import { toast } from 'sonner';

const MenuSection = ({ Restaurant }) => {
  const [menuItemList, setmenuItemList] = useState()
  const [allSelected, setAllSelected] = useState(true)
  const {user, isSignedIn} = useUser()
  const {UpdateCart , setUpdateCart} = useContext(CartUpdateContext)

  useEffect(() => {
    ShowAllMenu()
  }, [])


  const FilterMenu = (cate) => {
    setAllSelected(false)
    const result = Restaurant?.menu?.filter((item) => item.category == cate)
    setmenuItemList(result[0])
  }
  const ShowAllMenu = () => {
    setAllSelected(true)
    setmenuItemList()
  }

  const AddToCartHandlar = (item)=>{
    if(isSignedIn){
      toast('Adding to the cart...')
      const data ={
        email: user?.primaryEmailAddress?.emailAddress,
        name: item?.name,
        price: item?.price,
        productImage: item?.productImage?.url,
        restaurantSlug: Restaurant?.slug
      }
      GlobalApi.AddToCart(data).then(res=>{
        console.log(res)
        toast('Item added to cart.')
        setUpdateCart(!UpdateCart)
      }).catch((err)=>{
        toast('Error: Please try again.')
      })
    }
    else{
      alert('log in first!!! Click on Sign In button to get dummy credentials for logging in to use the full functionalities.')
    }
  }

  return (
    <div>
      <div className='grid grid-cols-4 mt-2 gap-3'>
        <div className='hidden md:flex flex-col bg-slate-100 rounded-lg min-h-[350px] gap-3 py-5'>
          <div className={`w-full hover:bg-slate-300 py-2 indent-4 rounded-md font-semibold cursor-pointer text-gray-700 text-sm ${allSelected == true && 'bg-slate-300'}`} onClick={() => ShowAllMenu()}>All</div>
          {
            Restaurant?.menu.map((item, index) => (
              <div key={index} className={`w-full hover:bg-slate-300 py-2 indent-4 rounded-md font-semibold cursor-pointer text-gray-700 text-sm ${item?.category == menuItemList?.category && 'bg-slate-300'}`} onClick={() => FilterMenu(item.category)}>{item.category}</div>
            ))
          }
        </div>
        <div className='lg:col-span-3 md:col-span-3 col-span-4 '>
          {!allSelected ?

            <div>
              <h2 className='font-bold text-xl'>{menuItemList?.category}</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-5'>
                {
                  menuItemList?.menuItem.map((item, index) => (
                    <div key={index} className='flex gap-3 items-start border border-x-orange-600 rounded-xl p-1 hover:bg-orange-50 hover:border-orange-600'>
                      <Image src={item?.productImage?.url} width={120} height={120} className='object-cover w-[120px] h-[120px] rounded-lg border ' />
                      <div>
                        <h2 className='font-bold'>{item.name}</h2>
                        <h2 className='text-sm text-gray-400 line-clamp-2'>{item.description}</h2>
                        <h2 className='text-md text-gray-600 font-semibold'>₹{item.price}</h2>
                        <FaRegPlusSquare className='scale-125 mt-2 cursor-pointer' onClick={()=>{AddToCartHandlar(item)}}/>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            :
            <div>
              {
                Restaurant?.menu.map((catitem, i) => (
                  <div key={i} className='mt-5'>
                    <h2 className='font-bold text-xl'>{catitem?.category}</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-2 '>
                      {
                        catitem?.menuItem.map((item, index) => (
                          <div key={index} className='flex gap-3 items-start border border-x-orange-600 rounded-xl p-1 hover:bg-orange-50 hover:border-orange-600 '>
                            <Image src={item?.productImage?.url} width={120} height={120} className='object-cover w-[120px] h-[120px] rounded-lg border ' />
                            <div>
                              <h2 className='font-bold'>{item.name}</h2>
                              <h2 className='text-sm text-gray-400 line-clamp-2'>{item.description}</h2>
                              <h2 className='text-md text-gray-600 font-semibold'>₹{item.price}</h2>
                              <FaRegPlusSquare className='scale-125 mt-2 cursor-pointer' onClick={()=>{AddToCartHandlar(item)}}/>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          }

        </div>
      </div>
    </div>
  )
}

export default MenuSection
