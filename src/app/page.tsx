"use client";
import Link from "next/link";
import gsap from "gsap";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl.to(".t1", { opacity: 1, x: 0 })
      .to(".t2", { opacity: 1, x: 0 })
      .to(".t3", { opacity: 1, x: 0 });
  }, []);

  return (
   <div className="container mx-auto p-5 ">
    
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <h1 className="text-5xl t1 font-bold  mb-10 opacity-0 -translate-x-72 ">
          Welcome!
        </h1>
        <p className="text-2xl t2 mb-10 opacity-0 -translate-x-72">
          Here you can start creating amazing things.
        </p>
        <p className="text-2xl t3  mb-10 text-center opacity-0 -translate-x-72">
          You will upload a photo of your bedroom and kitchen or wherever you
          want to change the decoration, and then you will provide a description
          of what you want. After that, you wait, and you will have an
          incredible result
        </p>
        <Link
          href="/create"
          className="font-bold py-2 px-4 rounded-full shadow-lg hover:bg-slate-600 hover:text-white transition duration-500 "
        >
          Start
        </Link>
      </div>
    </div>
  );
}
