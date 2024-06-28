import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className=" flex flex-col md:flex-row lg:flex-row md:bg-orange-700 lg:bg-orange-700">
      <div className="relative ">
        <Image src={"/side.jpg"} width={1000} height={1000} className="w-[50vw] h-[90vh] object-cover brightness-50 hidden md:flex lg:flex " />
        <div className="md:absolute lg:absolute top-[50px] left-10 md:text-white lg:text-white font-bold flex flex-col justify-center md:items-start lg:items-start md:border-white lg:border-white md:border-2 lg:border-2 p-2 rounded-md items-center">
          <h2>Sign In credentials </h2>
          <h3>Email: test@test.com</h3>
          <h3>password: 12345678</h3>
        </div>
      </div>
      <div className=" flex justify-center items-center m-auto">
        <SignIn />
      </div>
    </div>
  );
}