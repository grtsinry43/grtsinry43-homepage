"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"

export default function MacbookFrame() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const devicePixelRatio = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio

      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Code animation
    const lines = [
      "import React from 'react';",
      "import { motion } from 'framer-motion';",
      "",
      "const DevProfile = () => {",
      "  return (",
      "    <motion.div",
      "      initial={{ opacity: 0 }}",
      "      animate={{ opacity: 1 }}",
      "      className='profile-card'",
      "    >",
      "      <h1>grtsinry43</h1>",
      "      <p>全栈开发者</p>",
      "      <Skills />",
      "    </motion.div>",
      "  );",
      "};",
      "",
      "export default DevProfile;",
    ]

    // Animation variables
    const fontSize = 12
    const lineHeight = 16
    let currentLineIndex = 0
    let currentCharIndex = 0
    const startY = 50
    const startX = 30

    // Colors
    const colors = {
      keyword: "#ff79c6",
      component: "#bd93f9",
      string: "#f1fa8c",
      comment: "#6272a4",
      punctuation: "#f8f8f2",
      function: "#50fa7b",
      variable: "#8be9fd",
      default: "#f8f8f2",
    }

    // Syntax highlighting
    const getTokenColor = (token: string) => {
      if (token.match(/^(import|from|const|export|default|return)$/)) return colors.keyword
      if (token.match(/^(React|motion|DevProfile|Skills)$/)) return colors.component
      if (token.match(/^[{}()<>/.;,]$/)) return colors.punctuation
      if (token.startsWith("'") || token.endsWith("'")) return colors.string
      if (token.match(/^(className|initial|animate)$/)) return colors.function
      if (token.match(/^(opacity|h1|p|div)$/)) return colors.variable
      return colors.default
    }

    // Animation function
    const animateCoding = () => {
      if (currentLineIndex >= lines.length) return

      const currentLine = lines[currentLineIndex]

      // If we've reached the end of the current line
      if (currentCharIndex > currentLine.length) {
        currentLineIndex++
        currentCharIndex = 0
        setTimeout(animateCoding, 100) // Delay between lines
        return
      }

      // Clear canvas and redraw everything
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw all completed lines
      for (let i = 0; i < currentLineIndex; i++) {
        const tokens = tokenizeLine(lines[i])
        let xPos = startX

        for (const token of tokens) {
          ctx.font = `${fontSize}px Menlo, Monaco, Consolas, monospace`
          ctx.fillStyle = getTokenColor(token)
          ctx.fillText(token, xPos, startY + i * lineHeight)
          xPos += ctx.measureText(token).width
        }
      }

      // Draw current line up to currentCharIndex
      const partialLine = currentLine.substring(0, currentCharIndex)
      const tokens = tokenizeLine(partialLine)
      let xPos = startX

      for (const token of tokens) {
        ctx.font = `${fontSize}px Menlo, Monaco, Consolas, monospace`
        ctx.fillStyle = getTokenColor(token)
        ctx.fillText(token, xPos, startY + currentLineIndex * lineHeight)
        xPos += ctx.measureText(token).width
      }

      // Cursor
      if (Math.floor(Date.now() / 500) % 2 === 0) {
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(xPos, startY + currentLineIndex * lineHeight - fontSize, 2, fontSize)
      }

      currentCharIndex++
      requestAnimationFrame(animateCoding)
    }

    // Simple tokenizer for syntax highlighting
    const tokenizeLine = (line: string) => {
      if (!line) return []

      // Very simple tokenization for demonstration
      return line.split(/([{}()<>/.;, ]|'[^']*'|import|from|const|export|default|return)/).filter(Boolean)
    }

    // Start animation when in view
    if (isInView) {
      setTimeout(() => {
        animateCoding()
      }, 500)
    }

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [isInView])

  return (
    <div ref={ref} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 mx-auto"
        style={{ perspective: "1000px" }}
      >
        {/* MacBook frame */}
        <div className="relative mx-auto" style={{ maxWidth: "500px" }}>
          {/* Screen */}
          <motion.div
            initial={{ rotateX: 30 }}
            animate={isInView ? { rotateX: 0 } : { rotateX: 30 }}
            transition={{ duration: 1.2, delay: 0.5, type: "spring", stiffness: 100 }}
            className="bg-[#1a1a1a] rounded-t-lg border-[8px] border-[#3a3a3a] overflow-hidden"
            style={{
              boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.1) inset",
              transformOrigin: "bottom center",
            }}
          >
            {/* Screen content */}
            <div className="bg-[#282a36] relative w-full aspect-[4/3]">
              {/* Code editor */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="w-full h-6 bg-[#1a1a1a] flex items-center px-2">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <div className="mx-auto text-xs text-gray-400 font-mono">DevProfile.tsx</div>
                </div>
                <canvas ref={canvasRef} className="w-full h-[calc(100%-1.5rem)]" />
              </div>
            </div>
          </motion.div>

          {/* Base */}
          <div className="relative">
            <div className="h-[12px] bg-[#3a3a3a] rounded-b-lg"></div>
            <div className="absolute left-1/2 bottom-0 w-[30%] h-[4px] bg-[#1a1a1a] translate-y-[3px] -translate-x-1/2 rounded-b-lg"></div>
          </div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-primary opacity-20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-primary opacity-10 rounded-full blur-3xl -z-10" />
    </div>
  )
}
