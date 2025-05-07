"use client"

import {useRef, useEffect, useState} from "react"
import {motion, useInView, useScroll, useTransform} from "framer-motion"
import {Github, Mail, ExternalLink, Heart, Star, Download, ArrowRight, Sparkles} from "lucide-react"
import {Button} from "@/components/ui/button"
import {useTheme} from "next-themes"
import ParticleContainer from "@/components/ui/particle-container"
import AnimatedDivider from "@/components/ui/animated-divider"
import TypingEffect from "@/components/ui/typing-effect"
import MagneticButton from "@/components/ui/magnetic-button"
import ThreeDCard from "@/components/ui/3d-card"

export default function FinalSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, {once: true, amount: 0.2})
    const {theme} = useTheme()
    const [gsapLoaded, setGsapLoaded] = useState(false)
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})

    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0])

    // Handle mouse movement for interactive effects
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            setMousePosition({
                x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
                y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
            })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    // Load GSAP and create advanced animations
    useEffect(() => {
        if (!isInView || gsapLoaded) return

        const loadGsapAndAnimate = async () => {
            try {
                // Dynamically import GSAP and plugins
                const {gsap} = await import("gsap")
                const {ScrollTrigger} = await import("gsap/ScrollTrigger")
                const {TextPlugin} = await import("gsap/TextPlugin")
                const {MotionPathPlugin} = await import("gsap/MotionPathPlugin")
                const {CustomEase} = await import("gsap/CustomEase")

                // Register plugins
                gsap.registerPlugin(ScrollTrigger, TextPlugin, MotionPathPlugin, CustomEase)

                if (!containerRef.current) return

                // Create a master timeline
                const masterTl = gsap.timeline({
                    defaults: {ease: "power3.out"},
                    onComplete: () => console.log("All animations complete"),
                })

                // 1. Animate stars with staggered entrance and continuous rotation
                if (containerRef.current.querySelectorAll(".star").length > 0) {
                    const starsTl = gsap.timeline()

                    // Initial entrance animation
                    starsTl.fromTo(
                        ".star",
                        {
                            scale: 0,
                            opacity: 0,
                            rotation: -30,
                            y: -50,
                        },
                        {
                            scale: 1,
                            opacity: 1,
                            rotation: 0,
                            y: 0,
                            duration: 1.2,
                            stagger: 0.1,
                            ease: "elastic.out(1, 0.5)",
                        },
                    )

                    // Add continuous floating and twinkling animations
                    gsap.to(".star", {
                        y: "random(-15, 15)",
                        rotation: "random(-15, 15)",
                        scale: "random(0.9, 1.1)",
                        opacity: "random(0.7, 1)",
                        duration: "random(2, 4)",
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        stagger: {
                            each: 0.2,
                            from: "random",
                        },
                    })

                    masterTl.add(starsTl, 0)
                }

                // 2. Create an impressive text reveal for the thank you message
                if (textRef.current) {
                    const textTl = gsap.timeline()

                    // Split text animation
                    const titleElement = textRef.current.querySelector("h2")
                    if (titleElement) {
                        // First clear the text content but save it
                        const originalText = titleElement.textContent || "感谢您的浏览"
                        titleElement.innerHTML = ""

                        // Create wrapper spans for each character
                        const wrappedText = originalText
                            .split("")
                            .map((char) => `<span class="thank-you-char relative inline-block">${char}</span>`)
                            .join("")

                        titleElement.innerHTML = wrappedText

                        // Animate each character
                        textTl.fromTo(
                            ".thank-you-char",
                            {
                                opacity: 0,
                                y: 100,
                                rotationX: 90,
                                scale: 0.5,
                            },
                            {
                                opacity: 1,
                                y: 0,
                                rotationX: 0,
                                scale: 1,
                                duration: 1,
                                stagger: 0.08,
                                ease: "back.out(1.7)",
                            },
                        )

                        // Add a highlight effect that moves across the text
                        textTl.fromTo(
                            ".thank-you-char",
                            {color: "currentColor"},
                            {
                                color: theme === "dark" ? "#60a5fa" : "#3b82f6",
                                stagger: 0.05,
                                duration: 0.3,
                                repeat: 1,
                                yoyo: true,
                                ease: "sine.inOut",
                            },
                            "-=0.5",
                        )
                    }

                    masterTl.add(textTl, 0.5)
                }

                // 3. Create an SVG path animation
                if (svgRef.current) {
                    const svgTl = gsap.timeline()

                    const paths = svgRef.current.querySelectorAll("path")

                    // Draw each path
                    svgTl.fromTo(
                        paths,
                        {
                            strokeDasharray: (i, target) => target.getTotalLength(),
                            strokeDashoffset: (i, target) => target.getTotalLength(),
                        },
                        {
                            strokeDashoffset: 0,
                            duration: 1.5,
                            stagger: 0.2,
                            ease: "power2.inOut",
                        },
                    )

                    // Fill paths after drawing
                    svgTl.to(
                        paths,
                        {
                            fill: (i) =>
                                i % 2 === 0 ? (theme === "dark" ? "#60a5fa" : "#3b82f6") : theme === "dark" ? "#a78bfa" : "#8b5cf6",
                            duration: 0.5,
                            stagger: 0.1,
                        },
                        "-=0.5",
                    )

                    masterTl.add(svgTl, 1)
                }

                // 4. Animate the cards with 3D effects
                if (cardsRef.current) {
                    const cardsTl = gsap.timeline()

                    const cards = cardsRef.current.querySelectorAll(".card-item")

                    // Staggered entrance with 3D rotation
                    cardsTl.fromTo(
                        cards,
                        {
                            opacity: 0,
                            y: 100,
                            rotationY: 45,
                            rotationX: 20,
                            z: -100,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            rotationY: 0,
                            rotationX: 0,
                            z: 0,
                            duration: 1.2,
                            stagger: 0.15,
                            ease: "power4.out",
                        },
                    )

                    // Add hover effect to cards
                    cards.forEach((card) => {
                        card.addEventListener("mouseenter", () => {
                            gsap.to(card, {
                                y: -15,
                                rotationY: 5,
                                rotationX: -5,
                                scale: 1.05,
                                boxShadow: "0 30px 30px rgba(0,0,0,0.2)",
                                duration: 0.4,
                                ease: "power2.out",
                            })
                        })

                        card.addEventListener("mouseleave", () => {
                            gsap.to(card, {
                                y: 0,
                                rotationY: 0,
                                rotationX: 0,
                                scale: 1,
                                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                                duration: 0.4,
                                ease: "power2.out",
                            })
                        })
                    })

                    masterTl.add(cardsTl, 1.5)
                }

                // 5. Animate the CTA section
                if (ctaRef.current) {
                    const ctaTl = gsap.timeline()

                    // Heading and paragraph reveal
                    ctaTl.fromTo(
                        ctaRef.current.querySelectorAll("h3, p"),
                        {
                            opacity: 0,
                            y: 30,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            stagger: 0.2,
                            ease: "power2.out",
                        },
                    )

                    // Button reveal with bounce
                    ctaTl.fromTo(
                        ctaRef.current.querySelectorAll(".social-link"),
                        {
                            opacity: 0,
                            scale: 0,
                        },
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.6,
                            stagger: 0.2,
                            ease: "back.out(1.7)",
                        },
                        "-=0.4",
                    )

                    // Add pulse animation to primary button
                    ctaTl.to(
                        ctaRef.current.querySelector(".social-link:first-child"),
                        {
                            boxShadow: "0 0 0 8px rgba(59, 130, 246, 0.2)",
                            repeat: 3,
                            yoyo: true,
                            duration: 0.8,
                            ease: "sine.inOut",
                        },
                        "+=0.5",
                    )

                    masterTl.add(ctaTl, 2)
                }

                // 6. Final heart animation
                const heartTl = gsap.timeline()

                heartTl.fromTo(
                    ".heart-icon",
                    {
                        scale: 0,
                        opacity: 0,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.6,
                        ease: "back.out(1.7)",
                    },
                )

                // Pulsing heart animation
                heartTl.to(".heart-icon", {
                    scale: 1.2,
                    repeat: -1,
                    yoyo: true,
                    duration: 0.8,
                    ease: "sine.inOut",
                })

                masterTl.add(heartTl, 2.5)

                // 7. Create floating particles that follow mouse movement
                const createFloatingParticle = () => {
                    const particle = document.createElement("div")
                    particle.className = "absolute w-2 h-2 rounded-full pointer-events-none"
                    particle.style.backgroundColor = theme === "dark" ? "#60a5fa" : "#3b82f6"
                    particle.style.opacity = "0"
                    containerRef.current?.appendChild(particle)

                    // Random position near mouse
                    const x = mousePosition.x * 100 + Math.random() * 100 - 50
                    const y = mousePosition.y * 100 + Math.random() * 100 - 50

                    gsap.set(particle, {x, y, opacity: 0, scale: 0})

                    // Animate particle
                    gsap.to(particle, {
                        x: x + (Math.random() - 0.5) * 200,
                        y: y - Math.random() * 200,
                        opacity: 0.7,
                        scale: Math.random() * 2 + 0.5,
                        duration: Math.random() * 2 + 1,
                        ease: "power1.out",
                        onComplete: () => {
                            gsap.to(particle, {
                                opacity: 0,
                                duration: 0.5,
                                onComplete: () => {
                                    if (particle.parentNode) {
                                        particle.parentNode.removeChild(particle)
                                    }
                                },
                            })
                        },
                    })
                }

                // Create particles on interval
                const particleInterval = setInterval(() => {
                    if (isInView && containerRef.current) {
                        createFloatingParticle()
                    }
                }, 300)

                // Clean up interval
                setTimeout(() => {
                    clearInterval(particleInterval)
                }, 10000) // Stop creating particles after 10 seconds

                setGsapLoaded(true)
                console.log("GSAP animations initialized successfully")
            } catch (error) {
                console.error("Failed to load GSAP or initialize animations:", error)
            }
        }

        // Delay loading GSAP to ensure DOM is fully rendered
        const timer = setTimeout(() => {
            loadGsapAndAnimate()
        }, 500)

        return () => clearTimeout(timer)
    }, [isInView, gsapLoaded, theme, mousePosition])

    return (
        <section
            id="final"
            ref={containerRef}
            className="relative min-h-screen py-24 md:py-32 overflow-hidden perspective-[1000px]"
        >
            <ParticleContainer
                className="absolute inset-0"
                particleCount={40}
                particleSize={[1, 3]}
                particleLife={[8, 15]}
                interactive={true}
            />

            <div className="absolute inset-0">
                <div className="container px-4 mx-auto relative z-10">
                    <motion.div style={{y, opacity}} className="flex flex-col items-center justify-center">
                        {/* Stars animation */}
                        <div className="flex items-center justify-center mb-6 relative h-20">
                            <div className="star h-8 w-8 text-yellow-500 mx-1 absolute">
                                <Star className="h-full w-full fill-yellow-500"/>
                            </div>
                            <div className="star h-10 w-10 text-yellow-500 mx-1 absolute"
                                 style={{left: "calc(50% - 30px)"}}>
                                <Star className="h-full w-full fill-yellow-500"/>
                            </div>
                            <div className="star h-12 w-12 text-yellow-500 mx-1 absolute"
                                 style={{left: "calc(50% - 6px)"}}>
                                <Star className="h-full w-full fill-yellow-500"/>
                            </div>
                            <div className="star h-10 w-10 text-yellow-500 mx-1 absolute"
                                 style={{left: "calc(50% + 20px)"}}>
                                <Star className="h-full w-full fill-yellow-500"/>
                            </div>
                            <div className="star h-8 w-8 text-yellow-500 mx-1 absolute"
                                 style={{left: "calc(50% + 40px)"}}>
                                <Star className="h-full w-full fill-yellow-500"/>
                            </div>
                            <div
                                className="star h-6 w-6 text-yellow-500 mx-1 absolute"
                                style={{left: "calc(50% - 50px)", top: "5px"}}
                            >
                                <Sparkles className="h-full w-full text-yellow-500"/>
                            </div>
                            <div
                                className="star h-6 w-6 text-yellow-500 mx-1 absolute"
                                style={{left: "calc(50% + 60px)", top: "10px"}}
                            >
                                <Sparkles className="h-full w-full text-yellow-500"/>
                            </div>
                        </div>

                        {/* Thank you text with character animation */}
                        <div ref={textRef} className="mb-6 perspective-[1000px]">
                            <h2 className="text-4xl md:text-6xl font-bold text-center mb-6 [transform-style:preserve-3d]">
                                感谢您的浏览
                            </h2>
                        </div>

                        {/* SVG decoration */}
                        <div className="relative w-full max-w-md h-20 mb-8">
                            <svg ref={svgRef} viewBox="0 0 500 100" className="w-full h-full"
                                 preserveAspectRatio="xMidYMid meet">
                                <path
                                    d="M20,50 C100,20 150,80 250,50 C350,20 400,80 480,50"
                                    stroke={theme === "dark" ? "#60a5fa" : "#3b82f6"}
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M20,70 C100,40 150,100 250,70 C350,40 400,100 480,70"
                                    stroke={theme === "dark" ? "#a78bfa" : "#8b5cf6"}
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M250,10 L250,90"
                                    stroke={theme === "dark" ? "#f472b6" : "#ec4899"}
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray="5,5"
                                />
                                <circle
                                    cx="250"
                                    cy="50"
                                    r="8"
                                    stroke={theme === "dark" ? "#f472b6" : "#ec4899"}
                                    strokeWidth="2"
                                    fill="none"
                                />
                            </svg>
                        </div>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={isInView ? {opacity: 1, y: 0} : {}}
                            transition={{duration: 0.8, delay: 0.6}}
                        >
                            <TypingEffect
                                text={["希望您喜欢我的个人网站", "期待与您合作", "随时联系我"]}
                                className="text-xl md:text-2xl text-center text-muted-foreground mb-8"
                                typingSpeed={70}
                                repeat={true}
                            />
                        </motion.div>

                        <AnimatedDivider width="200px" height="2px" pattern="wave" className="mb-12" delay={0.7}/>

                        {/* Cards with 3D effect */}
                        <div
                            ref={cardsRef}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto [transform-style:preserve-3d]"
                        >
                            <ThreeDCard
                                className="card-item p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 text-center">
                                <div className="flex flex-col items-center">
                                    <div
                                        className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Mail className="h-6 w-6 text-primary"/>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">联系我</h3>
                                    <p className="text-muted-foreground mb-4">随时通过邮件联系我，我会尽快回复</p>
                                    <Button asChild variant="outline" size="sm">
                                        <a href="mailto:grtsinry43@outlook.com" className="flex items-center gap-2">
                                            发送邮件 <ArrowRight className="h-4 w-4"/>
                                        </a>
                                    </Button>
                                </div>
                            </ThreeDCard>

                            <ThreeDCard
                                className="card-item p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 text-center">
                                <div className="flex flex-col items-center">
                                    <div
                                        className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Github className="h-6 w-6 text-primary"/>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">查看代码</h3>
                                    <p className="text-muted-foreground mb-4">访问我的GitHub查看更多项目和代码</p>
                                    <Button asChild variant="outline" size="sm">
                                        <a
                                            href="https://github.com/grtsinry43"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2"
                                        >
                                            GitHub <ArrowRight className="h-4 w-4"/>
                                        </a>
                                    </Button>
                                </div>
                            </ThreeDCard>

                            <ThreeDCard
                                className="card-item p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 text-center">
                                <div className="flex flex-col items-center">
                                    <div
                                        className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <ExternalLink className="h-6 w-6 text-primary"/>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">访问博客</h3>
                                    <p className="text-muted-foreground mb-4">阅读我的技术博客，了解更多内容</p>
                                    <Button asChild variant="outline" size="sm">
                                        <a
                                            href="https://blog.grtsinry43.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2"
                                        >
                                            博客 <ArrowRight className="h-4 w-4"/>
                                        </a>
                                    </Button>
                                </div>
                            </ThreeDCard>
                        </div>

                        {/* CTA section with advanced animations */}
                        <div ref={ctaRef} className="text-center mb-12 relative">
                            <div className="absolute inset-0 -z-10 opacity-30 blur-xl">
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30"></div>
                            </div>

                            <h3 className="text-2xl font-semibold mb-4">让我们保持联系</h3>
                            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                                无论您是想讨论项目合作，还是只是想打个招呼，我都很乐意听到您的声音。
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <MagneticButton strength={15}>
                                    <Button asChild size="lg" className="social-link relative overflow-hidden group">
                                        <a href="#contact" className="flex items-center gap-2">
                                            <Mail className="h-5 w-5 transition-transform group-hover:scale-110"/>
                                            <span className="relative z-10">联系我</span>
                                            <span
                                                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        </a>
                                    </Button>
                                </MagneticButton>

                                <MagneticButton strength={15}>
                                    <Button asChild variant="outline" size="lg"
                                            className="social-link relative overflow-hidden group">
                                        <a href="#" className="flex items-center gap-2">
                                            <Download className="h-5 w-5 transition-transform group-hover:rotate-12"/>
                                            <span>下载简历</span>
                                            <span
                                                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        </a>
                                    </Button>
                                </MagneticButton>
                            </div>
                        </div>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={isInView ? {opacity: 1, y: 0} : {}}
                            transition={{duration: 0.8, delay: 1.2}}
                            className="flex items-center justify-center"
                        >
                            <motion.div
                                className="flex items-center text-muted-foreground"
                                whileHover={{scale: 1.05}}
                                transition={{type: "spring", stiffness: 400, damping: 10}}
                            >
                                <span>用</span>
                                <Heart className="heart-icon h-5 w-5 text-red-500 mx-2 inline-block"/>
                                <span>制作</span>
                            </motion.div>
                        </motion.div>

                        {/* Interactive elements that respond to mouse movement */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div
                                className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl"
                                style={{
                                    left: `calc(50% + ${mousePosition.x * 100}px)`,
                                    top: `calc(50% + ${mousePosition.y * 100}px)`,
                                    transition: "left 0.3s ease-out, top 0.3s ease-out",
                                }}
                            ></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
