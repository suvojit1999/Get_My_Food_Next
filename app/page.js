'use client'
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import CatagoryList from "./components/CatagoryList";
import RestaurantList from "./components/RestaurantList";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push('?category=all')
  }, [])
  
  return (
    <div>
      <CatagoryList/>
      <RestaurantList/>
    </div>
  );
}
