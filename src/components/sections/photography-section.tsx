"use client"

import {useRef, useEffect, useState} from "react"
import {motion, AnimatePresence} from "framer-motion"
import {Camera, Film, Scissors, ImageIcon, ChevronLeft, ChevronRight} from "lucide-react"
import {Button} from "@/components/ui/button"
import {useTheme} from "next-themes"

export default function GsapPhotographySection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const {theme} = useTheme()
    const [activeIndex, setActiveIndex] = useState(0)
    const [isInView, setIsInView] = useState(false)
    const [direction, setDirection] = useState(0)

    // 摄影作品数据
    const photographyItems = [
        {
            id: 1,
            title: "城市风光",
            description: "城市建筑与自然光影的完美结合",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["城市", "建筑", "光影"],
        },
        {
            id: 2,
            title: "自然风景",
            description: "大自然的壮丽景色与细腻纹理",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["自然", "风景", "纹理"],
        },
        {
            id: 3,
            title: "人像摄影",
            description: "捕捉人物神态与情感的瞬间",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["人像", "情感", "瞬间"],
        },
    ]

    // 检测元素是否在视口中
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsInView(true)
                }
            },
            {threshold: 0.2},
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current)
            }
        }
    }, [])

    // GSAP动画
    useEffect(() => {
        if (!isInView) return

        const loadGsap = async () => {
            try {
                const gsapModule = await import("gsap")
                const ScrollTriggerModule = await import("gsap/ScrollTrigger")

                const gsap = gsapModule.default
                const ScrollTrigger = ScrollTriggerModule.default

                // 注册ScrollTrigger插件
                gsap.registerPlugin(ScrollTrigger)

                if (!containerRef.current) return

                const container = containerRef.current
                const titleElements = container.querySelectorAll(".section-title")
                const iconElements = container.querySelectorAll(".icon-item")

                // 标题动画
                gsap.fromTo(
                    titleElements,
                    {y: 30, opacity: 0},
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: container,
                            start: "top 70%",
                        },
                    },
                )

                // 图标动画
                gsap.fromTo(
                    iconElements,
                    {scale: 0.5, opacity: 0},
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: container,
                            start: "top 70%",
                        },
                    },
                )

                // 创建浮动动画
                iconElements.forEach((icon, index) => {
                    gsap.to(icon, {
                        y: "random(-10, 10)",
                        duration: 2 + index * 0.2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                    })
                })

                return () => {
                    // 清理动画
                    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
                }
            } catch (error) {
                console.error("Failed to load GSAP:", error)
            }
        }

        loadGsap()
    }, [isInView])

    // 切换到下一张幻灯片
    const nextSlide = () => {
        setDirection(1)
        setActiveIndex((prev) => (prev + 1) % photographyItems.length)
    }

    // 切换到上一张幻灯片
    const prevSlide = () => {
        setDirection(-1)
        setActiveIndex((prev) => (prev - 1 + photographyItems.length) % photographyItems.length)
    }

    // 自动播放幻灯片
    useEffect(() => {
        if (!isInView) return

        const interval = setInterval(() => {
            nextSlide()
        }, 5000)

        return () => clearInterval(interval)
    }, [isInView, activeIndex])

    // 幻灯片动画变体
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
            scale: 0.9,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: {duration: 0.8, ease: [0.16, 1, 0.3, 1]},
                opacity: {duration: 0.7},
                scale: {duration: 0.7, ease: [0.16, 1, 0.3, 1]},
            },
        },
        exit: (direction: number) => ({
            x: direction < 0 ? "100%" : "-100%",
            opacity: 0,
            scale: 0.9,
            transition: {
                x: {duration: 0.8, ease: [0.16, 1, 0.3, 1]},
                opacity: {duration: 0.7},
                scale: {duration: 0.7, ease: [0.16, 1, 0.3, 1]},
            },
        }),
    }

    // 内容动画变体
    const contentVariants = {
        hidden: {opacity: 0, y: 20},
        visible: (delay: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
            },
        }),
    }

    return (
        <section id="photography" ref={containerRef} className="relative min-h-screen py-24 md:py-32 overflow-hidden">
            {/* 背景效果 */}
            <div className="absolute inset-0 -z-10 bg-muted/20">
                <div
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent"/>
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <motion.div
                    initial={{opacity: 0, y: 40}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    viewport={{once: true, amount: 0.3}}
                    className="flex items-center justify-center space-x-2 mb-12"
                >
                    <div className="h-px w-12 bg-primary/60"/>
                    <h2 className="text-lg font-medium text-primary">摄影与剪辑</h2>
                    <div className="h-px w-12 bg-primary/60"/>
                </motion.div>

                <motion.h3
                    className="section-title text-3xl md:text-4xl font-bold tracking-tight text-center mb-16"
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.8, delay: 0.2}}
                    viewport={{once: true, amount: 0.3}}
                >
                    我的<span className="text-primary">视觉</span>创作
                </motion.h3>

                {/* 图标展示 */}
                <div className="flex flex-wrap justify-center gap-8 mb-16">
                    <div className="icon-item flex flex-col items-center gap-2">
                        <div className="p-4 rounded-full bg-purple-500/10">
                            <Camera className="h-8 w-8 text-purple-500"/>
                        </div>
                        <span className="text-sm font-medium">摄影</span>
                    </div>
                    <div className="icon-item flex flex-col items-center gap-2">
                        <div className="p-4 rounded-full bg-blue-500/10">
                            <Film className="h-8 w-8 text-blue-500"/>
                        </div>
                        <span className="text-sm font-medium">视频</span>
                    </div>
                    <div className="icon-item flex flex-col items-center gap-2">
                        <div className="p-4 rounded-full bg-green-500/10">
                            <Scissors className="h-8 w-8 text-green-500"/>
                        </div>
                        <span className="text-sm font-medium">剪辑</span>
                    </div>
                    <div className="icon-item flex flex-col items-center gap-2">
                        <div className="p-4 rounded-full bg-amber-500/10">
                            <ImageIcon className="h-8 w-8 text-amber-500"/>
                        </div>
                        <span className="text-sm font-medium">后期</span>
                    </div>
                </div>

                {/* 全屏幻灯片 */}
                <div className="relative h-[600px] mb-16 overflow-hidden rounded-2xl shadow-2xl">
                    {/* 幻灯片导航按钮 */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full h-12 w-12 bg-background/30 backdrop-blur-sm border-white/20 text-white hover:bg-background/50"
                        onClick={prevSlide}
                    >
                        <ChevronLeft className="h-6 w-6"/>
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full h-12 w-12 bg-background/30 backdrop-blur-sm border-white/20 text-white hover:bg-background/50"
                        onClick={nextSlide}
                    >
                        <ChevronRight className="h-6 w-6"/>
                    </Button>

                    {/* 幻灯片指示器 */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {photographyItems.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all ${
                                    index === activeIndex ? "bg-white w-8" : "bg-white/50"
                                }`}
                                onClick={() => {
                                    setDirection(index > activeIndex ? 1 : -1)
                                    setActiveIndex(index)
                                }}
                            />
                        ))}
                    </div>

                    {/* 幻灯片内容 */}
                    <AnimatePresence initial={false} custom={direction}>
                        {photographyItems.map(
                            (item, index) =>
                                index === activeIndex && (
                                    <motion.div
                                        key={item.id}
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="absolute inset-0"
                                    >
                                        {/* 幻灯片背景图片 */}
                                        <div className="absolute inset-0">
                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"/>
                                            <img
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* 幻灯片内容 */}
                                        <div className="absolute bottom-0 left-0 right-0 p-12 z-20">
                                            <motion.h4
                                                custom={0.2}
                                                variants={contentVariants}
                                                initial="hidden"
                                                animate="visible"
                                                className="text-4xl font-bold text-white mb-4"
                                            >
                                                {item.title}
                                            </motion.h4>

                                            <motion.p
                                                custom={0.4}
                                                variants={contentVariants}
                                                initial="hidden"
                                                animate="visible"
                                                className="text-xl text-white/80 mb-6 max-w-2xl"
                                            >
                                                {item.description}
                                            </motion.p>

                                            <motion.div
                                                custom={0.6}
                                                variants={contentVariants}
                                                initial="hidden"
                                                animate="visible"
                                                className="flex flex-wrap gap-2 mb-6"
                                            >
                                                {item.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white"
                                                    >
                            {tag}
                          </span>
                                                ))}
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ),
                        )}
                    </AnimatePresence>
                </div>

                {/* 底部CTA */}
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.5}}
                    viewport={{once: true, amount: 0.3}}
                    className="text-center"
                >
                    <p className="text-lg mb-6">想了解更多我的视觉作品？</p>
                    <Button asChild size="lg" className="rounded-full px-8">
                        <a href="#contact">联系我获取完整作品集</a>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
