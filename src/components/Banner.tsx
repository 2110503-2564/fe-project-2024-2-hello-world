'use client'
import styles from './banner.module.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Banner() {
    const covers = ['/img/restaurant_home1.jpg', '/img/restaurant_home2.webp', '/img/restaurant_home3.webp'];
    const [index, setIndex] = useState(0);
    const router = useRouter();
    const { data:session } = useSession();
    console.log(session?.user.token)


    // Automatically change the image every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % covers.length);
        }, 4000); // Change every 3 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return (
        <div className={styles.banner}>
            <Image 
                src={covers[index]} 
                alt='cover'
                fill={true}
                objectFit='cover'
            />

            <div className={`${styles.bannerText} text-white`}>
                <h1 className='text-4xl font-medium'>Reserve your restaurant here</h1>
            </div>

            {
                session? <div className='z-30 absolute right-10 top-5 font-semibold text-xl'>Welcome {session.user?.name}</div> 
                : null
            }
            
        </div>
    );
}