'use client'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { RxCrossCircled } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import GlobalApi from '../_utils/GlobalApi';
import { toast } from 'sonner';
import { CartUpdateContext } from '../_context/CartUpdateContext';
import { useRouter } from 'next/navigation';

const Cart = ({ cart }) => {
  const {UpdateCart , setUpdateCart } = useContext(CartUpdateContext)
  const router = useRouter()

  const getTotal = () => {
    let total = 0
    cart.forEach(item => {
      total = total + item?.price
    });
    return total.toFixed(2)
  }

  const RemoveItem= (id)=>{
    GlobalApi.RemoveConnection(id).then(res=>{
      console.log(res)
      if(res){
        GlobalApi.DeleteCartItem(id).then(res=>{
          console.log|(res)
          toast('Item Removed')
          setUpdateCart(!UpdateCart)
        })
      }
    })
  }

  const gotoCheckout = ()=>{
    router.push('/checkout')
  }


  return (
    <div>
      <h3 className='font-bold  mt-2'>My Orders</h3>
      <div className='w-full m3-4'>
        {
          cart && cart?.map((item, index) => (
            <div key={index} className='flex justify-between items-center gap-5 my-2 w-full'>
              <div className='flex justify-between items-center gap-2'>
                <Image src={item?.productImage} width={60} height={60} className='rounded-lg' />
                <div className=' flex flex-col justify-between'>
                  <div className='text-[12px]'>{item?.restaurant?.name}</div>
                  <div className='text-slate-600 font-bold'>{item?.productName}</div>
                  <div className='font-bold'>₹{item?.price}</div>
                </div>
              </div>
              {/* <RxCrossCircled fill='red' className='scale-150 cursor-pointer' /> */}
              <RxCross2 className='scale-150 cursor-pointer border hover:bg-red-300 mx-2' onClick={()=>{RemoveItem(item.id)}}/>
            </div>
          ))
        }
      </div>
      <button className='w-full bg-orange-600 text-white p-2 rounded-lg outline-none hover:bg-orange-700' onClick={()=>gotoCheckout()}>Checkout ₹{getTotal()}</button>

    </div>
  )
}

export default Cart
