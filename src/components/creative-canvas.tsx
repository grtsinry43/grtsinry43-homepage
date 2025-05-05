"use client"

import {useRef, useEffect} from "react"
import type {MotionValue} from "framer-motion"
import {useTheme} from "next-themes"

interface CreativeCanvasProps {
    mouseX: MotionValue<number>
    mouseY: MotionValue<number>
}

export default function CreativeCanvas({mouseX, mouseY}: CreativeCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const {theme} = useTheme()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas dimensions
        const setCanvasDimensions = () => {
            const devicePixelRatio = window.devicePixelRatio || 1
            canvas.width = window.innerWidth * devicePixelRatio
            canvas.height = window.innerHeight * devicePixelRatio
            ctx.scale(devicePixelRatio, devicePixelRatio)
        }

        setCanvasDimensions()
        window.addEventListener("resize", setCanvasDimensions)

        // Create grid points
        const gridSize = 40
        const points: Point[] = []

        for (let x = 0; x < canvas.width / devicePixelRatio; x += gridSize) {
            for (let y = 0; y < canvas.height / devicePixelRatio; y += gridSize) {
                points.push({
                    x,
                    y,
                    originalX: x,
                    originalY: y,
                    vx: 0,
                    vy: 0,
                })
            }
        }

        // Animation variables
        let mouseXValue = 0
        let mouseYValue = 0

        const unsubscribeX = mouseX.onChange((latest) => {
            mouseXValue = latest
        })

        const unsubscribeY = mouseY.onChange((latest) => {
            mouseYValue = latest
        })

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width / devicePixelRatio, canvas.height / devicePixelRatio)

            // Set colors based on theme
            const primaryColor = theme === "dark" ? "rgba(100, 150, 255, 0.5)" : "rgba(0, 100, 255, 0.5)"
            const secondaryColor = theme === "dark" ? "rgba(100, 150, 255, 0.2)" : "rgba(0, 100, 255, 0.2)"

            // Update and draw points
            for (const point of points) {
                // Calculate distance from mouse
                const dx = mouseXValue - point.x
                const dy = mouseYValue - point.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const maxDistance = 300

                if (distance < maxDistance) {
                    const force = (1 - distance / maxDistance) * 0.03
                    point.vx += dx * force
                    point.vy += dy * force
                }

                // Spring back to original position
                point.vx += (point.originalX - point.x) * 0.05
                point.vy += (point.originalY - point.y) * 0.05

                // Apply friction
                point.vx *= 0.9
                point.vy *= 0.9

                // Update position
                point.x += point.vx
                point.y += point.vy

                // Draw point
                ctx.fillStyle = primaryColor
                ctx.beginPath()
                ctx.arc(point.x, point.y, 1, 0, Math.PI * 2)
                ctx.fill()

                // Connect nearby points with lines
                for (const otherPoint of points) {
                    if (point === otherPoint) continue

                    const dx = point.x - otherPoint.x
                    const dy = point.y - otherPoint.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < gridSize * 1.5) {
                        ctx.strokeStyle = secondaryColor
                        ctx.lineWidth = 0.5
                        ctx.beginPath()
                        ctx.moveTo(point.x, point.y)
                        ctx.lineTo(otherPoint.x, otherPoint.y)
                        ctx.stroke()
                    }
                }
            }

            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", setCanvasDimensions)
            unsubscribeX()
            unsubscribeY()
        }
    }, [mouseX, mouseY, theme])

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
            }}
        />
    )
}

interface Point {
    x: number
    y: number
    originalX: number
    originalY: number
    vx: number
    vy: number
}
