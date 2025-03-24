import styles from './topmenu.module.css';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { Link } from '@mui/material';

export default async function TopMenu() {
    const session = await getServerSession()
    return (
        <div className={styles.menucontainer}>
            <TopMenuItem pageRef='/restaurant' title='Restaurant'></TopMenuItem>
            {
                session? <Link href="/api/auth/signout">
                    <div className="flex items-center absolute right-0 h-full px-2 text-cyan-600 text-sm">Sign-Out of {session.user?.name}</div>
                </Link>: 
                <Link href="/login"><div className="flex items-center absolute right-0 h-full px-2 text-cyan-600 text-sm">Sign-In</div></Link>
            }
            
           
        </div>
    );
}