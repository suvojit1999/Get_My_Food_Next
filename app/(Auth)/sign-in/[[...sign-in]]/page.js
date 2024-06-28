import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex bg-orange-700">
      <div className="relative">
        <Image src={"/side.jpg"} width={1000} height={1000} className="w-[50vw] h-[90vh] object-cover brightness-50" />
        <div className="absolute top-[50px] left-10 text-white font-bold flex flex-col justify-center items-start border-white border-2 p-2 rounded-md">
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