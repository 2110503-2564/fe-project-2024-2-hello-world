import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import * as React from 'react';

export default function Card({ restaurantName, imgSrc }: { restaurantName: string, imgSrc: string }) {
    return (
        <InteractiveCard contentName={restaurantName}>
            <div className='w-full h-[70%] relative rounded-t-lg overflow-hidden'>
                <Image 
                    src={imgSrc} 
                    alt='Restaurant Image' 
                    fill={true} 
                    className='object-cover rounded-t-lg transition-transform duration-300 ease-in-out hover:scale-105' 
                />
            </div>
            <div className='w-full h-[30%] p-3 text-center text-gray-800 font-medium bg-white shadow-md rounded-b-lg'>
                {restaurantName}
            </div>
        </InteractiveCard>
    );
}