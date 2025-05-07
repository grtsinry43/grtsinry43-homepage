"use client"

import React from "react"

import {useRef, useEffect, useState} from "react"
import {motion, useInView, type Variants} from "framer-motion"

type Direction = "up" | "down" | "left" | "right" | "none"
type Effect = "fade" | "slide" | "zoom" | "flip" | "none"

interface ScrollRevealProps {
    children: React.ReactNode
    direction?: Direction
    effect?: Effect
    duration?: number
    delay?: number
    threshold?: number
    once?: boolean
    className?: string
    staggerChildren?: boolean
    staggerDelay?: number
}

export default function ScrollReveal({
                                         children,
                                         direction = "up",
                                         effect = "fade",
                                         duration = 0.5,
                                         delay = 0,
                                         threshold = 0.1,
                                         once = true,
                                         className = "",
                                         staggerChildren = false,
                                         staggerDelay = 0.1,
                                     }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, {amount: threshold, once})
    const [childrenCount, setChildrenCount] = useState(0)

    // Count direct children for staggering
    useEffect(() => {
        if (ref.current && staggerChildren) {
            setChildrenCount(ref.current.children.length)
        }
    }, [staggerChildren])

    // Define animation variants based on direction and effect
    const getVariants = (): Variants => {
        // Initial state based on direction
        const getInitialPosition = () => {
            switch (direction) {
                case "up":
                    return {y: 50}
                case "down":
                    return {y: -50}
                case "left":
                    return {x: 50}
                case "right":
                    return {x: -50}
                case "none":
                    return {}
            }
        }

        // Initial state based on effect
        const getInitialEffect = () => {
            switch (effect) {
                case "fade":
                    return {opacity: 0}
                case "zoom":
                    return {scale: 0.9, opacity: 0}
                case "flip":
                    return {rotateX: 30, opacity: 0}
                case "none":
                    return {}
                default:
                    return {}
            }
        }

        return {
            hidden: {
                ...getInitialPosition(),
                ...getInitialEffect(),
            },
            visible: (i = 0) => ({
                x: 0,
                y: 0,
                scale: 1,
                rotateX: 0,
                opacity: 1,
                transition: {
                    duration,
                    delay: delay + (staggerChildren ? i * staggerDelay : 0),
                    ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth easing
                },
            }),
        }
    }

    // If staggering children, wrap each child in a motion.div
    if (staggerChildren && React.Children.count(children) > 0) {
        return (
            <motion.div
                ref={ref}
                className={className}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={getVariants()}
            >
                {React.Children.map(children, (child, index) => (
                    <motion.div variants={getVariants()} custom={index} className="scroll-reveal-child">
                        {child}
                    </motion.div>
                ))}
            </motion.div>
        )
    }

    // Otherwise, animate the container as a whole
    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={getVariants()}
        >
            {children}
        </motion.div>
    )
}
