"use client"

import React from 'react';

const RandomItems = () => {
    return (
        <>
            {[...Array(10)].map((_, i) => (
                <div
                    key={i}
                    className="particle absolute w-3 h-3 rounded-full bg-primary/30"
                    style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: 0.3 + Math.random() * 0.7,
                    }}
                />
            ))}
        </>
    );
};

export default RandomItems;