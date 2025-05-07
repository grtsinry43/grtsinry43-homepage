"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ThreeDCardProps {
    children: ReactNode
    className?: string
    glareColor?: string
    borderColor?: string
    backgroundGradient?: string
    rotationIntensity?: number
    glareIntensity?: number
    shadowColor?: string
}

export default function ThreeDCard({
                                       children,
                                       className,
                                       glareColor = "rgba(255, 255, 255, 0.4)",
                                       borderColor = "rgba(255, 255, 255, 0.1)",
                                       backgroundGradient = "radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0) 70%)",
                                       rotationIntensity = 15,
                                       glareIntensity = 0.5,
                                       shadowColor = "rgba(0, 0, 0, 0.3)",
                                   }: ThreeDCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    // Motion values for rotation and glare effect
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring physics for rotation
    const springConfig = { damping: 20, stiffness: 300 }
    const rotateX = useSpring(useTransform(mouseY, [0, 1], [rotationIntensity, -rotationIntensity]), springConfig)
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-rotationIntensity, rotationIntensity]), springConfig)

    // Glare effect position
    const glareX = useSpring(mouseX, springConfig)
    const glareY = useSpring(mouseY, springConfig)
    const glareOpacity = useSpring(useMotionValue(0), { damping: 25, stiffness: 200 })

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height

        // Calculate normalized mouse position (0 to 1)
        const normalizedX = Math.max(0, Math.min(1, (e.clientX - rect.left) / width))
        const normalizedY = Math.max(0, Math.min(1, (e.clientY - rect.top) / height))

        mouseX.set(normalizedX)
        mouseY.set(normalizedY)
    }

    function handleMouseEnter() {
        setIsHovered(true)
        glareOpacity.set(glareIntensity)
    }

    function handleMouseLeave() {
        setIsHovered(false)
        mouseX.set(0.5)
        mouseY.set(0.5)
        glareOpacity.set(0)
    }

    return (
        <motion.div
            ref={cardRef}
            className={cn("relative overflow-hidden rounded-xl transition-all duration-200", className)}
            style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
                border: `1px solid ${borderColor}`,
                boxShadow: isHovered ? `0 20px 40px ${shadowColor}` : `0 10px 20px ${shadowColor}`,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            {/* Background gradient */}
            <div className="absolute inset-0 z-0" style={{ background: backgroundGradient }} />

            {/* Glare effect */}
            <motion.div
                className="absolute inset-0 z-10 rounded-xl"
                style={{
                    background: `radial-gradient(circle at ${useTransform(glareX, [0, 1], ["0%", "100%"])} ${useTransform(glareY, [0, 1], ["0%", "100%"])}, ${glareColor} 0%, rgba(255, 255, 255, 0) 80%)`,
                    opacity: glareOpacity,
                }}
            />

            {/* Content */}
            <div className="relative z-20">{children}</div>
        </motion.div>
    )
}
