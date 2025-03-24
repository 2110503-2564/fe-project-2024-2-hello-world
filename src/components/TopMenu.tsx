import styles from './topmenu.module.css';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function TopMenu() {
    const session = await getServerSession();

    return (
        <div className={`${styles.menucontainer} flex justify-between items-center px-6 py-4 shadow-md bg-white`}>
            <TopMenuItem pageRef='/restaurant' title='Restaurant' />

            {session ? (
                <Link href="/api/auth/signout">
                    <div className="text-gray-600 text-sm px-4 py-2 transition-all duration-200 hover:text-black hover:underline">
                        Sign-Out of {session.user?.name}
                    </div>
                </Link>
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
