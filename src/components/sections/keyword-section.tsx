"use client";

import {motion} from "framer-motion"


function FloatingElements() {
    return (
        <div className="w-full z-10">
            {[
                {name: "React", x: "10%", y: "20%", delay: 0.2, size: "lg"},
                {name: "Spring", x: "70%", y: "15%", delay: 0.5, size: "md"},
                {name: "Kotlin", x: "20%", y: "60%", delay: 0.8, size: "xl"},
                {name: "Vue", x: "75%", y: "70%", delay: 1.1, size: "sm"},
                {name: "TypeScript", x: "60%", y: "40%", delay: 1.4, size: "lg"},
                {name: "Next.js", x: "85%", y: "50%", delay: 1.7, size: "md"},
                {name: "Java", x: "30%", y: "20%", delay: 2.0, size: "xl"},
                {name: "Frontend", x: "90%", y: "10%", delay: 1.2, size: "xl"},
                {name: "Backend", x: "85%", y: "10%", delay: 1.1, size: "md"},
                {name: "Postgresql", x: "20%", y: "40%", delay: 0.4, size: "xl"},
                {name: "Redis", x: "25%", y: "20%", delay: 1.0, size: "sm"},
                {name: "React", x: "65%", y: "10%", delay: 0.7, size: "md"},
            ].map((item, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${getSizeClass(item.size)} rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center font-bold text-primary`}
                    style={{
                        left: item.x,
                        top: item.y,
                    }}
                    initial={{opacity: 0, scale: 0}}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: [0, 10, -5, 0],
                        y: [0, -15, 5, 0],
                    }}
                    transition={{
                        scale: {duration: 0.6, delay: item.delay},
                        opacity: {duration: 0.6, delay: item.delay},
                        x: {
                            duration: 5 + index,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: item.delay,
                        },
                        y: {
                            duration: 7 + index,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: item.delay,
                        },
                    }}
                >
                    {item.name}
                </motion.div>
            ))}
        </div>
    )
}

// Helper function for size classes
function getSizeClass(size: string) {
    switch (size) {
        case "sm":
            return "w-16 h-16 text-xs"
        case "md":
            return "w-24 h-24 text-sm"
        case "lg":
            return "w-32 h-32 text-base"
        case "xl":
            return "w-40 h-40 text-lg"
        default:
            return "w-24 h-24 text-sm"
    }
}

export default FloatingElements