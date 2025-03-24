import Link from "next/link";
import styles from './topmenu.module.css';

export default function TopMenuItem({ title, pageRef }: { title: string, pageRef: string }) {
    return (
        <Link
            href={pageRef}
            className={`${styles.itemcontainer} text-gray-700 text-sm font-medium px-4 transition-all duration-200 hover:text-black hover:underline`}
        >
            {title}
        </Link>
    );
}