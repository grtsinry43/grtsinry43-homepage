"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
    from: number
    to: number
    duration?: number
    delay?: number
    formatter?: (value: number) => string
    className?: string
}

export default function AnimatedCounter({
                                            from,
                                            to,
                                            duration = 2,
                                            delay = 0,
                                            formatter = (value) => Math.round(value).toString(),
                                            className,
                                        }: AnimatedCounterProps) {
    const [count, setCount] = useState(from)
    const nodeRef = useRef<HTMLSpanElement>(null)
    const isInView = useInView(nodeRef, { once: true, amount: 0.5 })
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        if (!isInView || hasAnimated) return

        let startTimestamp: number | null = null
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp

            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
            const currentCount = from + progress * (to - from)

            setCount(currentCount)

            if (progress < 1) {
                window.requestAnimationFrame(step)
            } else {
                setHasAnimated(true)
            }
        }

        // Add delay before starting animation
        const timer = setTimeout(() => {
            window.requestAnimationFrame(step)
        }, delay * 1000)

        return () => clearTimeout(timer)
    }, [from, to, duration, delay, isInView, hasAnimated])

    return (
        <span ref={nodeRef} className={className}>
      {formatter(count)}
    </span>
    )
}
