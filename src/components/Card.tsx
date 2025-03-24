import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import * as React from 'react';



export default function Card({ restaurantName, imgSrc}: { restaurantName: string, imgSrc: string}) {

    return (
        <InteractiveCard contentName={ restaurantName }>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                    alt='Product Picture'
                    fill={true}
                    className='object-cover rounded-t-lg' />
            </div>
            <div className='w-full h-[15%] p-[10px] text-black'>
                {restaurantName}
            </div>
        </InteractiveCard>

    );
}