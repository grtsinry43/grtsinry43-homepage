"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedGradientTextProps {
    text: string
    className?: string
    gradient?: string
    animate?: boolean
    delay?: number
}

export default function AnimatedGradientText({
                                                 text,
                                                 className,
                                                 gradient = "from-blue-600 via-purple-600 to-blue-600",
                                                 animate = true,
                                                 delay = 0,
                                             }: AnimatedGradientTextProps) {
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!animate || !textRef.current) return

        const loadGsap = async () => {
            const { gsap } = await import("gsap")

            gsap.to(textRef.current, {
                backgroundPosition: "-200% center",
                ease: "linear",
                duration: 15,
                repeat: -1,
                delay,
            })
        }

        loadGsap()
    }, [animate, delay])

    return (
        <motion.div
            ref={textRef}
            className={cn(
                "inline-block font-bold bg-clip-text text-transparent",
                `bg-gradient-to-r ${gradient}`,
                "bg-[length:200%_auto]",
                className,
            )}
            style={{ backgroundPosition: "0% center" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delay * 0.1 }}
        >
            {text}
        </motion.div>
    )
}
