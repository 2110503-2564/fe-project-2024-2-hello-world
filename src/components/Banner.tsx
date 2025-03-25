"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = [
    "/img/restaurant_home1.jpg",
    "/img/restaurant_home2.webp",
    "/img/restaurant_home3.webp",
  ];
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % covers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[95vh] overflow-hidden flex flex-col items-center justify-center text-center px-6">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <Image
        src={covers[index]}
        alt="cover"
        fill
        className="object-cover transition-opacity duration-700 ease-in-out blur-sm"
      />

      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-gray-100 to-gray-500 animate-textGlow drop-shadow-xl">
          Reserve Your Restaurant Here
        </h1>

        <p className="mt-4 text-lg md:text-xl text-white font-medium drop-shadow-md">
          Book a table in a few clicks and enjoy your experience.
        </p>

        <button
          className="mt-6 font-semibold py-2 px-6 rounded-lg text-white text-lg tracking-wide
          border border-white/50 cursor-pointer shadow-md shadow-gray-400 dark:shadow-gray-700
          hover:text-cyan-500 hover:border-cyan-500 hover:shadow-lg
          transition-all duration-300 ease-in-out bg-transparent
          [text-shadow:_2px_2px_3px_rgba(0,0,0,1)]"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/restaurant");
          }}
        >
          Restaurant
        </button>
      </div>

      {session && (
        <div className="absolute top-5 right-10 text-white font-medium text-lg drop-shadow-md mt-2">
          Welcome, {session.user?.name}
        </div>
      )}
    </div>
  );
}
