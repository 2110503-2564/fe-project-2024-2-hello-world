'use client'
import React from "react";

export default function InteractiveCard({ children, contentName }: { children: React.ReactNode, contentName: string }) {

    const onCardMouseAction = (event: React.SyntheticEvent) => {
        if (event.type === 'mouseover') {
            event.currentTarget.classList.remove('shadow-lg');
            event.currentTarget.classList.add('shadow-xl', 'scale-105');
        } else {
            event.currentTarget.classList.remove('shadow-xl', 'scale-105');
            event.currentTarget.classList.add('shadow-lg');
        }
    };

    return (
        <div
            className="w-full h-[300px] rounded-lg shadow-md transition-all duration-300 transform"
            onMouseOver={onCardMouseAction}
            onMouseOut={onCardMouseAction}
        >
            {children}
        </div>
    );
}