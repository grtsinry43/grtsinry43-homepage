"use client"

import {useState, useEffect, useRef} from "react"
import {motion, useInView} from "framer-motion"

interface TypingEffectProps {
    text: string | string[]
    className?: string
    typingSpeed?: number
    deletingSpeed?: number
    delayBeforeDeleting?: number
    delayBeforeTyping?: number
    cursor?: boolean
    cursorStyle?: string
    cursorColor?: string
    repeat?: boolean
    onComplete?: () => void
}

export default function TypingEffect({
                                         text,
                                         className = "",
                                         typingSpeed = 50,
                                         deletingSpeed = 30,
                                         delayBeforeDeleting = 1500,
                                         delayBeforeTyping = 500,
                                         cursor = true,
                                         cursorStyle = "|",
                                         cursorColor = "var(--primary)",
                                         repeat = false,
                                         onComplete,
                                     }: TypingEffectProps) {
    const [displayText, setDisplayText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, {once: true, amount: 0.5})

    // Convert single string to array for consistent handling
    const textArray = Array.isArray(text) ? text : [text]

    useEffect(() => {
        if (!isInView || isComplete) return

        let timeout: NodeJS.Timeout

        const handleTyping = () => {
            if (isPaused) return

            const currentText = textArray[currentIndex]

            if (isTyping) {
                if (displayText.length < currentText.length) {
                    // Still typing
                    setDisplayText(currentText.substring(0, displayText.length + 1))
                    timeout = setTimeout(handleTyping, typingSpeed)
                } else {
                    // Finished typing
                    if (textArray.length === 1 || (currentIndex === textArray.length - 1 && !repeat)) {
                        // All done, no more texts to type
                        setIsComplete(true)
                        if (onComplete) onComplete()
                    } else {
                        // Pause before deleting
                        setIsPaused(true)
                        timeout = setTimeout(() => {
                            setIsPaused(false)
                            setIsDeleting(true)
                        }, delayBeforeDeleting)
                    }
                }
            } else if (isDeleting) {
                if (displayText.length > 0) {
                    // Still deleting
                    setDisplayText(displayText.substring(0, displayText.length - 1))
                    timeout = setTimeout(handleTyping, deletingSpeed)
                } else {
                    // Finished deleting
                    setIsDeleting(false)

                    // Move to next text or loop back
                    const nextIndex = (currentIndex + 1) % textArray.length
                    setCurrentIndex(nextIndex)

                    // Pause before typing next text
                    setIsPaused(true)
                    timeout = setTimeout(() => {
                        setIsPaused(false)
                        setIsTyping(true)
                    }, delayBeforeTyping)
                }
            }
        }

        timeout = setTimeout(handleTyping, 0)

        return () => clearTimeout(timeout)
    }, [
        displayText,
        currentIndex,
        isTyping,
        isDeleting,
        isPaused,
        isComplete,
        isInView,
        textArray,
        typingSpeed,
        deletingSpeed,
        delayBeforeDeleting,
        delayBeforeTyping,
        repeat,
        onComplete,
    ])

    return (
        <div ref={containerRef} className={className}>
            <span>{displayText}</span>
            {cursor && !isComplete && (
                <motion.span
                    style={{color: cursorColor}}
                    animate={{opacity: [1, 0]}}
                    transition={{duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse"}}
                >
                    {cursorStyle}
                </motion.span>
            )}
        </div>
    )
}
