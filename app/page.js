'use client'
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import CatagoryList from "./components/CatagoryList";
import RestaurantList from "./components/RestaurantList";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const {isSignedIn} = useUser()
  const router = useRouter()
  useEffect(() => {
    router.push('?category=all')
  }, [])
  useEffect(()=>{
    router.push('?category=all')
  }, [isSignedIn])
  
  return (
    <div>
      <CatagoryList/>
      <RestaurantList/>
    </div>
  );
}
