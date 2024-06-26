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
    const { UpdateCart, setUpdateCart } = useContext(CartUpdateContext)
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

    return (
        <div className="shadow-lg w-[100vw] flex flex-col justify-center items-center ">
            <div className="flex justify-between items-center lg:w-[80vw] m-auto py-[10px] md:w-[90vw] w-[90vw]">
                <Image src={'/logo.png'} width={180} height={180} />
                <div className="md:flex lg:flex justify-center items-center gap-[5px]  lg:w-[500px] h-[40px] rounded-xl bg-zinc-200 md:w-[350px] hidden">
                    <input type="text" className="bg-transparent h-[40px] lg:w-[450px] rounded-xl outline-none md:w-[300px]" />
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
                        <div className="flex justify-center items-center gap-4">
                            <SignInButton className="px-3 py-[3px] border-[3px] border-[#ed0909] rounded-lg text-[#ed0909] font-semibold" mode="modal">Sign In</SignInButton>
                            <SignUpButton mode="modal" className="px-3 py-[6px] bg-[#ed0909] rounded-lg text-white font-semibold ">Sign Up</SignUpButton>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
