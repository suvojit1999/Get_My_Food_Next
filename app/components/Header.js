'use client'
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useUser } from '@clerk/nextjs';
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { CartUpdateContext } from "../_context/CartUpdateContext";
import GlobalApi from "../_utils/GlobalApi";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Cart from "./Cart";








const Header = () => {
    const { UpdateCart, setUpdateCart, search, setSearch } = useContext(CartUpdateContext)
    const { user, isSignedIn } = useUser()
    const [cart, setCart] = useState()

    useEffect(() => {
        if (user) {
            console.log('Cart is updated')
            GetUserCart()
        }

    }, [UpdateCart, user])

    

    const GetUserCart = () => {
        GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress).then(res => {
            console.log(res)
            setCart(res?.userCarts)
        })
    }
    const runthis = ()=>{
        alert('login credentials: Email: your_email+clerk_test@example.com   Verification Code: 424242')
    }

    return (
        <div className="shadow-lg w-[100vw] flex flex-col justify-center items-center ">
            <div className="flex justify-between items-center lg:w-[80vw] m-auto py-[10px] md:w-[90vw] w-[90vw]">
                <Image src={'/logo.png'} width={180} height={180} className="w-[130px] md:w-[200px] lg:w-[180px]"/>
                <div className="md:flex lg:flex justify-center items-center gap-[5px]  lg:w-[500px] h-[40px] rounded-xl bg-zinc-200 md:w-[350px] hidden">
                    <input type="text" className="bg-transparent h-[40px] lg:w-[450px] rounded-xl outline-none md:w-[300px]" placeholder="Search Restaurants Here" onChange={e => setSearch(e.target.value)}/>
                    <FaSearch fill="#ed0909" className="mx-[5px]" />
                </div>
                <div>
                    {isSignedIn ?
                        <div className="flex justify-between items-center gap-4 lg:w-[70px] md:w-[50px] relative">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div>
                                        <BsCart3 className="scale-150 cursor-pointer" />
                                        <div className="w-[20px] h-[20px] rounded-full text-white text-center bg-orange-600 font-semibold absolute text-sm right-10 bottom-4">{cart?.length}</div>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className='w-full'>
                                    <Cart cart={cart}/>
                                </PopoverContent>
                            </Popover>


                            <UserButton />

                        </div>

                        :
                        <div className="flex justify-center items-center gap-1 lg:gap-4 md:gap-4 ">
                            <SignInButton className="px-3 py-[3px] border-[3px] border-[#ed0909] rounded-lg text-[#ed0909] font-semibold text-sm md:text-md lg:text-md" mode="redirect">Sign In</SignInButton>
                            <SignUpButton mode="modal" className="px-3 py-[6px] bg-[#ed0909] rounded-lg text-white font-semibold text-sm md:text-md lg:text-md">Sign Up</SignUpButton>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
