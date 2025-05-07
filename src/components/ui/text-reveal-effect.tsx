"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface TextRevealEffectProps {
    text: string
    className?: string
    once?: boolean
    delay?: number
    duration?: number
    as?: React.ElementType
}

export default function TextRevealEffect({
                                             text,
                                             className,
                                             once = true,
                                             delay = 0,
                                             duration = 0.05,
                                             as: Component = "div",
                                         }: TextRevealEffectProps) {
    const controls = useAnimation()
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once, amount: 0.5 })

    // Split text into words and characters
    const words = text.split(" ")

    useEffect(() => {
        if (isInView) {
            controls.start("visible")
        } else if (!once) {
            controls.start("hidden")
        }
    }, [isInView, controls, once])

    const wordVariants = {
        hidden: {},
        visible: {},
    }

    const characterVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: [0.2, 0.65, 0.3, 0.9],
                delay: delay + i * duration,
            },
        }),
    }

    return (
        <Component className={className} ref={ref}>
            {words.map((word, wordIndex) => (
                <motion.span
                    key={`word-${wordIndex}`}
                    className="inline-block whitespace-nowrap"
                    variants={wordVariants}
                    initial="hidden"
                    animate={controls}
                    aria-hidden
                >
                    {word.split("").map((character, charIndex) => (
                        <motion.span
                            key={`char-${charIndex}`}
                            className="inline-block"
                            variants={characterVariants}
                            initial="hidden"
                            animate={controls}
                            custom={wordIndex * 0.25 + charIndex}
                        >
                            {character}
                        </motion.span>
                    ))}
                    {wordIndex < words.length - 1 && <span>&nbsp;</span>}
                </motion.span>
            ))}
        </Component>
    )
}
