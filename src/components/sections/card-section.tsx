import React from 'react';
import {motion} from "framer-motion";
import {InfiniteMovingCards} from "@/components/ui/infinite-moving-cards";

interface CardItem{
    quote: string;
    name: string;
    title: string;
}

const cardItems:CardItem[] = [
    {
        quote: "Java",
        name: "Java",
        title: "Java"
    },
    {
        quote: "JavaScript",
        name: "JavaScript",
        title: "JavaScript"
    },
    {
        quote: "TypeScript",
        name: "TypeScript",
        title: "TypeScript"
    },
    {
        quote: "Kotlin",
        name: "Kotlin",
        title: "Kotlin"
    },
]

const CardSection = () => {
    return (
        <div className="w-full pb-6 bg-slate-950">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex items-center justify-center space-x-2 mb-12"
            >
                <div className="h-px w-12 bg-primary/60" />
                <h2 className="text-lg font-medium text-primary">我的关键词</h2>
                <div className="h-px w-12 bg-primary/60" />
            </motion.div>

            <motion.h3
                className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16 text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
            >
                我是一个<span className="text-primary">"成分复杂"</span>的人
            </motion.h3>
            <div className="flex antialiased items-center justify-center relative">
                <InfiniteMovingCards
                    items={cardItems}
                    direction="right"
                    speed="slow"
                    pauseOnHover={true}
                />
            </div>
            <div className="flex antialiased items-center justify-center relative">
                <InfiniteMovingCards
                    items={cardItems}
                    direction="left"
                    speed="slow"
                    pauseOnHover={true}
                />
            </div>
        </div>
    );
};

export default CardSection;