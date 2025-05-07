"use client"

import type React from "react"

import {useRef, useEffect, useState, useMemo} from "react"
import {useTheme} from "next-themes"

interface Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string
    opacity: number
    life: number
    maxLife: number
}

interface ParticleContainerProps {
    className?: string
    particleCount?: number
    particleSize?: [number, number]
    particleSpeed?: number
    particleLife?: [number, number]
    colorPalette?: string[]
    interactive?: boolean
    interactionRadius?: number
    interactionForce?: number
    children?: React.ReactNode
}

export default function ParticleContainer({
                                              className = "",
                                              particleCount = 50,
                                              particleSize = [1, 3],
                                              particleSpeed = 0.5,
                                              particleLife = [5, 10],
                                              colorPalette,
                                              interactive = true,
                                              interactionRadius = 100,
                                              interactionForce = 1,
                                              children,
                                          }: ParticleContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const animationRef = useRef<number>(0)
    const mouseRef = useRef<{ x: number; y: number; active: boolean }>({x: 0, y: 0, active: false})
    const {theme} = useTheme()
    const [dimensions, setDimensions] = useState({width: 0, height: 0})
    const [isInitialized, setIsInitialized] = useState(false)

    // Set default color palette based on theme - memoize to prevent recreation on every render
    const defaultLightPalette = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"]
    const defaultDarkPalette = ["#60a5fa", "#a78bfa", "#f472b6", "#34d399", "#fbbf24"]

    const effectiveColorPalette = useMemo(() => {
        return colorPalette || (theme === "dark" ? defaultDarkPalette : defaultLightPalette)
    }, [colorPalette, theme, defaultLightPalette, defaultDarkPalette])

    // Create a single particle
    const createParticle = (width: number, height: number): Particle => {
        const size = Math.random() * (particleSize[1] - particleSize[0]) + particleSize[0]
        const maxLife = Math.random() * (particleLife[1] - particleLife[0]) + particleLife[0]

        return {
            x: Math.random() * width,
            y: Math.random() * height,
            size,
            speedX: (Math.random() - 0.5) * particleSpeed,
            speedY: (Math.random() - 0.5) * particleSpeed,
            color: effectiveColorPalette[Math.floor(Math.random() * effectiveColorPalette.length)],
            opacity: Math.random() * 0.5 + 0.2,
            life: 0,
            maxLife,
        }
    }

    // Initialize particles
    useEffect(() => {
        if (!containerRef.current || isInitialized) return

        const {width, height} = containerRef.current.getBoundingClientRect()

        if (width === 0 || height === 0) return // Skip if container has no dimensions yet

        setDimensions({width, height})

        // Initialize particles
        particlesRef.current = Array.from({length: particleCount}, () => createParticle(width, height))

        // Set canvas dimensions
        if (canvasRef.current) {
            canvasRef.current.width = width
            canvasRef.current.height = height
        }

        setIsInitialized(true)
    }, [particleCount, isInitialized, particleSize, particleSpeed, particleLife, effectiveColorPalette])

    // Animation loop
    const animate = () => {
        if (!canvasRef.current || !containerRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const {width, height} = dimensions

        // Clear canvas
        ctx.clearRect(0, 0, width, height)

        // Performance optimization: only do full animation when in viewport
        const rect = canvas.getBoundingClientRect()
        const isVisible =
            rect.bottom >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right >= 0 &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)

        // If not in viewport, reduce frame rate
        if (!isVisible) {
            animationRef.current = requestAnimationFrame(() => {
                setTimeout(animate, 100) // Reduce frame rate
            })
            return
        }

        // Update and draw particles
        particlesRef.current.forEach((particle, index) => {
            // Update position
            particle.x += particle.speedX
            particle.y += particle.speedY

            // Apply mouse interaction
            if (interactive && mouseRef.current.active) {
                const dx = particle.x - mouseRef.current.x
                const dy = particle.y - mouseRef.current.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < interactionRadius) {
                    const force = ((interactionRadius - distance) / interactionRadius) * interactionForce
                    particle.speedX += (dx / distance) * force * 0.2
                    particle.speedY += (dy / distance) * force * 0.2
                }
            }

            // Apply friction
            particle.speedX *= 0.99
            particle.speedY *= 0.99

            // Boundary check with bounce
            if (particle.x < 0 || particle.x > width) {
                particle.speedX *= -1
                particle.x = Math.max(0, Math.min(width, particle.x))
            }
            if (particle.y < 0 || particle.y > height) {
                particle.speedY *= -1
                particle.y = Math.max(0, Math.min(height, particle.y))
            }

            // Update life
            particle.life += 0.01
            if (particle.life >= particle.maxLife) {
                particlesRef.current[index] = createParticle(width, height)
            }

            // Calculate opacity based on life
            const lifeRatio = particle.life / particle.maxLife
            const fadeInOut =
                lifeRatio < 0.2
                    ? lifeRatio * 5 // Fade in
                    : lifeRatio > 0.8
                        ? (1 - lifeRatio) * 5 // Fade out
                        : 1 // Full opacity

            // Draw particle
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fillStyle =
                particle.color +
                Math.floor(particle.opacity * fadeInOut * 255)
                    .toString(16)
                    .padStart(2, "0")
            ctx.fill()
        })

        animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation when initialized
    useEffect(() => {
        if (!isInitialized) return

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationRef.current)
        }
    }, [isInitialized])

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (!containerRef.current) return

            const {width, height} = containerRef.current.getBoundingClientRect()

            if (width === 0 || height === 0) return // Skip if container has no dimensions

            setDimensions({width, height})

            if (canvasRef.current) {
                canvasRef.current.width = width
                canvasRef.current.height = height
            }

            // Reposition particles within new boundaries
            particlesRef.current.forEach((particle) => {
                particle.x = Math.min(particle.x, width)
                particle.y = Math.min(particle.y, height)
            })
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Handle mouse interaction
    useEffect(() => {
        if (!interactive || !containerRef.current) return

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return

            const rect = containerRef.current.getBoundingClientRect()
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                active: true,
            }
        }

        const handleMouseLeave = () => {
            mouseRef.current.active = false
        }

        const container = containerRef.current
        container.addEventListener("mousemove", handleMouseMove)
        container.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            container.removeEventListener("mousemove", handleMouseMove)
            container.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [interactive])

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0"/>
            <div className="relative z-10">{children}</div>
        </div>
    )
}
