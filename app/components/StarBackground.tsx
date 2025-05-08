"use client";
import { useEffect, useState } from "react";

export function StarBackground() {
    const [stars, setStars] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const newStars = [...Array(200)].map((_, i) => {
            const size = Math.random() * 3 + 0.5;
            return (
                <div
                    key={i}
                    className="absolute bg-white rounded-full shadow-2xl animate-twinkle"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 10}s`,
                    }}
                />
            );
        });
        setStars(newStars);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 w-full h-screen pointer-events-none z-[-1]"
            style={{ height: '100vh', minHeight: '100%' }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 via-40% to-blue-600 opacity-95" />
            <div className="absolute inset-0">{stars}</div>
        </div>
    );
}