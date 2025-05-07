"use client"

import {useRef} from "react"
import {motion, useInView} from "framer-motion"
import {cn} from "@/lib/utils"

interface AnimatedDividerProps {
    className?: string
    width?: string
    height?: string
    color?: string
    animationDuration?: number
    delay?: number
    direction?: "horizontal" | "vertical"
    pattern?: "solid" | "dashed" | "dotted" | "zigzag" | "wave"
}

export default function AnimatedDivider({
                                            className,
                                            width = "100%",
                                            height = "2px",
                                            color = "var(--primary)",
                                            animationDuration = 1.5,
                                            delay = 0,
                                            direction = "horizontal",
                                            pattern = "solid",
                                        }: AnimatedDividerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, {once: true, amount: 0.5})

    // Generate SVG path for patterns
    const generatePath = () => {
        if (direction === "horizontal") {
            switch (pattern) {
                case "zigzag":
                    return "M0,10 L10,0 L20,10 L30,0 L40,10 L50,0 L60,10 L70,0 L80,10 L90,0 L100,10"
                case "wave":
                    return "M0,5 C25,-5 25,15 50,5 C75,-5 75,15 100,5"
                default:
                    return ""
            }
        } else {
            switch (pattern) {
                case "zigzag":
                    return "M5,0 L0,10 L5,20 L0,30 L5,40 L0,50 L5,60 L0,70 L5,80 L0,90 L5,100"
                case "wave":
                    return "M5,0 C-5,25 15,25 5,50 C-5,75 15,75 5,100"
                default:
                    return ""
            }
        }
    }

    // Render SVG for zigzag and wave patterns
    if (pattern === "zigzag" || pattern === "wave") {
        const svgWidth = direction === "horizontal" ? "100%" : height
        const svgHeight = direction === "horizontal" ? height : "100%"
        const viewBox = direction === "horizontal" ? "0 0 100 10" : "0 0 10 100"
        const pathLength = 100

        return (
            <div ref={ref} className={cn("overflow-hidden", className)} style={{width, height}}>
                <motion.svg
                    width={svgWidth}
                    height={svgHeight}
                    viewBox={viewBox}
                    preserveAspectRatio="none"
                    initial={{pathLength: 0, opacity: 0}}
                    animate={isInView ? {pathLength: 1, opacity: 1} : {pathLength: 0, opacity: 0}}
                    transition={{duration: animationDuration, delay, ease: "easeInOut"}}
                >
                    <motion.path
                        d={generatePath()}
                        stroke={color}
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray={pathLength}
                        strokeDashoffset={pathLength}
                        animate={isInView ? {strokeDashoffset: 0} : {strokeDashoffset: pathLength}}
                        transition={{duration: animationDuration, delay, ease: "easeInOut"}}
                    />
                </motion.svg>
            </div>
        )
    }

    // Render standard divider for solid, dashed, dotted
    return (
        <div
            ref={ref}
            className={cn("overflow-hidden", className)}
            style={{
                width: direction === "horizontal" ? width : height,
                height: direction === "horizontal" ? height : width,
            }}
        >
            <motion.div
                style={{
                    width: "100%",
                    height: "100%",
                    background: color,
                    borderStyle: pattern === "solid" ? "none" : pattern,
                    borderWidth: pattern === "solid" ? 0 : "1px",
                    borderColor: pattern === "solid" ? "transparent" : color,
                    transformOrigin: direction === "horizontal" ? "left center" : "center top",
                    scaleX: direction === "horizontal" ? 0 : 1,
                    scaleY: direction === "vertical" ? 0 : 1,
                }}
                initial={{
                    scaleX: direction === "horizontal" ? 0 : 1,
                    scaleY: direction === "vertical" ? 0 : 1,
                }}
                animate={
                    isInView
                        ? {
                            scaleX: 1,
                            scaleY: 1,
                        }
                        : {
                            scaleX: direction === "horizontal" ? 0 : 1,
                            scaleY: direction === "vertical" ? 0 : 1,
                        }
                }
                transition={{duration: animationDuration, delay, ease: "easeInOut"}}
            />
        </div>
    )
}
