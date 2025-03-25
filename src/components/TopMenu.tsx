'use client'

import styles from './topmenu.module.css';
import TopMenuItem from './TopMenuItem';
import { useSession } from 'next-auth/react'; // Use the client-side session hook
import Link from 'next/link';

export default function TopMenu() {
    const { data: session, status } = useSession(); // Get session data and status

    return (
        <div className={`${styles.menucontainer} flex justify-between items-center px-6 py-4 shadow-md bg-white`}>
            <div className="flex gap-2">
                <TopMenuItem pageRef='/' title='Home' />
                <TopMenuItem pageRef='/restaurant' title='Restaurant' />
                <TopMenuItem pageRef='/mybooking' title='My booking' />
            </div>
        
            {session ? (
                <Link href="/api/auth/signout">
                    <div className="text-gray-600 text-sm px-4 py-2 transition-all duration-200 hover:text-black hover:underline">
                        Sign-Out of {session.user?.name}
                    </div>
                </Link>
            ) : status === 'loading' ? (
                <div className="text-gray-600 text-sm px-4 py-2">
                    Loading...
                </div>
            ) : (
                <div className="flex gap-6">
                    <Link href="/login">
                        <div className="text-gray-600 text-sm px-4 py-2 transition-all duration-200 hover:text-black hover:underline">
                            Sign In
                        </div>
                    </Link>
                    <Link href="/register">
                        <div className="text-gray-500 text-sm px-4 py-2 transition-all duration-200 hover:text-black hover:underline">
                            Create Account
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}