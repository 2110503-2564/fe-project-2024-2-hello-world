import styles from './topmenu.module.css';
import Image from 'next/image';
import Link from 'next/link';
import TopMenuItem from './TopMenuItem';

export default function TopMenu() {
    return (
        <div className={styles.menucontainer}>
            <TopMenuItem pageRef='/booking' title='Booking'></TopMenuItem>
        </div>
    );
}