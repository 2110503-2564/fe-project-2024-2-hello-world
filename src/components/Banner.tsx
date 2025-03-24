"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = [
    "/img/restaurant_home1.jpg",
    "/img/restaurant_home2.webp",
    "/img/restaurant_home3.webp",
  ];
  const [index, setIndex] = useState(0);
  const { data: session } = useSession();

  // Automatically change the image every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % covers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image with blur effect */}
      <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}
      <Image 
        src={covers[index]} 
        alt="cover" 
        fill
        className="object-cover transition-opacity duration-700 ease-in-out blur-sm"
      />

      {/* Banner Text with animation and styling */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-6 z-10">
          <h1 className="text-5xl md:text-6xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-gray-100 to-gray-500 animate-textGlow drop-shadow-xl">
            Reserve Your Restaurant Here
          </h1>
          {/* Description text */}
          <p className="mt-4 text-lg md:text-xl text-white font-medium drop-shadow-md">
            Book a table in a few clicks and enjoy your experience.
          </p>
        </div>
      </div>

      {/* Welcome User */}
      {session && (
        <div className="absolute top-5 right-10 text-white font-medium text-lg drop-shadow-md">
          Welcome, {session.user?.name}
        </div>
      )}
    </div>
  );
}