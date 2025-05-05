"use client"

import {useEffect, useRef, useState} from "react"
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion"
import {ArrowDown} from "lucide-react"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import MacbookFrame from "@/components/macbook-frame"
import {Typewriter} from "@/components/ui/typewriter";

export default function HeroSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])

    const titleVariants = {
        hidden: {opacity: 0, y: 20},
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.215, 0.61, 0.355, 1],
            },
        }),
    }

    const words = ["全栈开发者", "设计者", "创造者"]
    const [currentWord, setCurrentWord] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{scale, opacity}}
        >
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background"/>
            </div>

            <motion.div className="container px-4 mx-auto pt-32 pb-24 md:pt-40 md:pb-32" style={{y}}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="space-y-8 lg:col-span-6">
                        <div className="space-y-2">
                            <motion.span
                                className="inline-block py-1 px-3 text-sm font-medium bg-primary/10 text-primary rounded-full"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.1, duration: 0.6}}
                            >
                                grtsinry43
                            </motion.span>

                            <div className="space-y-1">
                                <motion.h1
                                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                                    custom={1}
                                    variants={titleVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    你好，我是
                                    <span className="text-primary ml-2">grtsinry43</span>
                                </motion.h1>

                                <motion.h2
                                    className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground/80"
                                    custom={2}
                                    variants={titleVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <span>热爱技术的</span>{" "}
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            className="inline-block relative text-primary"
                                            animate={{opacity: [0.7, 1, 0.7]}}
                                            key={"key-" + currentWord}
                                            transition={{
                                                duration: 2,
                                                repeat: Number.POSITIVE_INFINITY,
                                                repeatType: "loop",
                                            }}
                                        >
                                            {words[currentWord]}
                                        </motion.span>
                                    </AnimatePresence>
                                </motion.h2>
                            </div>
                        </div>

                        <motion.p
                            className="text-xl text-muted-foreground max-w-2xl"
                            custom={3}
                            variants={titleVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            全栈开发者，专注于 Java/JavaScript， 正在转向 Kotlin/TypeScript
                            。构建优雅、高效的应用程序是我的追求。
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4"
                            custom={4}
                            variants={titleVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Button asChild size="lg" className="rounded-md px-8">
                                <Link href="#projects">查看我的项目</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-md px-8">
                                <Link href="https://blog.grtsinry43.com" target="_blank" rel="noopener noreferrer">
                                    访问我的博客
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div
                        className="lg:col-span-6"
                        initial={{opacity: 0, x: 40}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: 0.6, duration: 1.2}}
                    >
                        <MacbookFrame/>
                    </motion.div>
                </div>
            </motion.div>

            <Link href="#about" className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <motion.div
                    animate={{
                        y: [0, 10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                    }}
                >
                    <Button variant="ghost" size="icon" className="rounded-full h-12 w-12">
                        <ArrowDown className="h-6 w-6"/>
                    </Button>
                </motion.div>
            </Link>
        </motion.section>
    )
}
