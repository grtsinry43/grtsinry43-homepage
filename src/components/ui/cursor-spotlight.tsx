"use client"

import type React from "react"

import {useRef, useEffect} from "react"
import {motion, useMotionValue, useSpring} from "framer-motion"

interface CursorSpotlightProps {
    children: React.ReactNode
    className?: string
    size?: number
    color?: string
    blur?: number
    opacity?: number
    delay?: number
}

export default function CursorSpotlight({
                                            children,
                                            className = "",
                                            size = 400,
                                            color = "rgba(100, 150, 255, 0.15)",
                                            blur = 100,
                                            opacity = 0.8,
                                            delay = 0.1,
                                        }: CursorSpotlightProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    // Motion values for cursor position
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Spring physics for smooth movement
    const springConfig = {damping: 20, stiffness: 200, mass: 0.5}
    const spotlightX = useSpring(mouseX, springConfig)
    const spotlightY = useSpring(mouseY, springConfig)

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            mouseX.set(x)
            mouseY.set(y)
        }

        const handleMouseLeave = () => {
            // Center the spotlight when mouse leaves
            const rect = container.getBoundingClientRect()
            mouseX.set(rect.width / 2)
            mouseY.set(rect.height / 2)
        }

        // Initialize position to center
        handleMouseLeave()

        container.addEventListener("mousemove", handleMouseMove)
        container.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            container.removeEventListener("mousemove", handleMouseMove)
            container.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [mouseX, mouseY])

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            {/* Spotlight effect */}
            <motion.div
                className="absolute pointer-events-none"
                style={{
                    x: spotlightX,
                    y: spotlightY,
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    background: color,
                    filter: `blur(${blur}px)`,
                    opacity,
                    transform: "translate(-50%, -50%)",
                    transition: `opacity ${delay}s ease`,
                }}
            />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    )
}
