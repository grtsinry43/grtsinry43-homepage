"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
    children: ReactNode
    className?: string
    strength?: number
    onClick?: () => void
    disabled?: boolean
}

export default function MagneticButton({
                                           children,
                                           className,
                                           strength = 40,
                                           onClick,
                                           disabled = false,
                                       }: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [isMagnetic, setIsMagnetic] = useState(true)

    // Motion values
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Spring physics for smooth movement
    const springConfig = { damping: 15, stiffness: 150 }
    const x = useSpring(useTransform(mouseX, [0, 1], [-strength, strength]), springConfig)
    const y = useSpring(useTransform(mouseY, [0, 1], [-strength, strength]), springConfig)

    // Handle mouse move
    function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
        if (!buttonRef.current || disabled || !isMagnetic) return

        const rect = buttonRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Calculate distance from center
        const distanceX = e.clientX - centerX
        const distanceY = e.clientY - centerY

        // Normalize to -1 to 1 range
        mouseX.set(distanceX / (rect.width / 2))
        mouseY.set(distanceY / (rect.height / 2))
    }

    // Reset position when mouse leaves
    function handleMouseLeave() {
        mouseX.set(0)
        mouseY.set(0)
    }

    // Temporarily disable magnetic effect on click
    function handleClick() {
        if (disabled) return

        setIsMagnetic(false)
        mouseX.set(0)
        mouseY.set(0)

        // Re-enable after animation completes
        setTimeout(() => setIsMagnetic(true), 500)

        if (onClick) onClick()
    }

    return (
        <motion.button
            ref={buttonRef}
            className={cn(
                "relative overflow-hidden transition-colors",
                disabled && "opacity-50 cursor-not-allowed",
                className,
            )}
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            whileTap={{ scale: 0.95 }}
            disabled={disabled}
        >
            {children}
        </motion.button>
    )
}
