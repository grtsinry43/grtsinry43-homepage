"use client"

import type React from "react"

import {useState, useRef} from "react"
import {motion, AnimatePresence, useInView} from "framer-motion"
import {Github, ExternalLink, ChevronLeft, ChevronRight} from "lucide-react"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"

interface Project {
    id: number
    title: string
    description: string
    status: "In Progress" | "Completed"
    progress: number
    colorClass: string
    tags: string[]
    links: { icon: React.ReactNode; url: string }[]
    image: string
}

export default function ProjectShowcase() {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, {once: false, amount: 0.2})
    const [activeIndex, setActiveIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    // Project data
    const projects: Project[] = [
        {
            id: 1,
            title: "grtblog",
            description:
                "个人博客站点，一站式快速解决方案—一套源，扩展性强，快速部署的博客框架，使用 Nextjs + SpringBoot 构建，致力于轻松搭建个性化你的博客站点",
            status: "In Progress",
            progress: 50,
            colorClass: "from-orange-400 to-amber-600",
            tags: ["React", "Next.js", "Spring Boot", "Umi.js", "Socket.io", "Radix UI"],
            links: [
                {icon: <Github className="h-4 w-4"/>, url: "https://github.com/grtsinry43/grtblog"},
                {icon: <ExternalLink className="h-4 w-4"/>, url: "https://grtblog.js.org"},
            ],
            image: "/placeholder.svg?height=600&width=800",
        },
        {
            id: 2,
            title: "csu-dynamic-youth",
            description: "途有青，去追山！学校官微毕业节的微信网页程序，统计参与次数与时长，生成排行榜，完成完成打卡",
            status: "Completed",
            progress: 100,
            colorClass: "from-emerald-400 to-green-600",
            tags: ["微信小程序", "Vue.js", "微信API"],
            links: [{icon: <Github className="h-4 w-4"/>, url: "#"}],
            image: "/placeholder.svg?height=600&width=800",
        },
    ]

    const nextProject = () => {
        setDirection(1)
        setActiveIndex((prev) => (prev + 1) % projects.length)
    }

    const prevProject = () => {
        setDirection(-1)
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
    }

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction > 0 ? 45 : -45,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            },
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction < 0 ? 45 : -45,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    }

    return (
        <div ref={containerRef} className="relative w-full perspective-[1200px]">
            <div className="flex justify-between items-center mb-12">
                <motion.h4
                    initial={{opacity: 0, x: -20}}
                    animate={isInView ? {opacity: 1, x: 0} : {}}
                    transition={{duration: 0.6, delay: 0.1}}
                    className="text-2xl font-bold"
                >
                    项目展示
                </motion.h4>

                <motion.div
                    initial={{opacity: 0, x: 20}}
                    animate={isInView ? {opacity: 1, x: 0} : {}}
                    transition={{duration: 0.6, delay: 0.2}}
                    className="flex gap-2"
                >
                    <Button variant="outline" size="icon" onClick={prevProject} className="rounded-full h-10 w-10">
                        <ChevronLeft className="h-5 w-5"/>
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextProject} className="rounded-full h-10 w-10">
                        <ChevronRight className="h-5 w-5"/>
                    </Button>
                </motion.div>
            </div>

            <div className="relative h-[500px] overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={projects[activeIndex].id}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 w-full h-full"
                        style={{transformStyle: "preserve-3d"}}
                    >
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transform-gpu">
                            {/* Project image with overlay */}
                            <div className="absolute inset-0 z-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/40 z-10"/>
                                <img
                                    src={projects[activeIndex].image || "/placeholder.svg"}
                                    alt={projects[activeIndex].title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Project content */}
                            <div className="relative z-20 h-full flex flex-col justify-end p-8">
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-3xl font-bold text-white">{projects[activeIndex].title}</h3>
                                        <div
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                projects[activeIndex].status === "Completed"
                                                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                                    : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                            }`}
                                        >
                                            {projects[activeIndex].status}
                                        </div>
                                    </div>
                                    <p className="text-white/80 mb-4">{projects[activeIndex].description}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {projects[activeIndex].tags.map((tag, index) => (
                                            <Badge key={index} variant="outline"
                                                   className="bg-white/10 text-white border-white/20">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{width: 0}}
                                            animate={{width: `${projects[activeIndex].progress}%`}}
                                            transition={{duration: 1, ease: "easeOut"}}
                                            className={`h-full bg-gradient-to-r ${projects[activeIndex].colorClass}`}
                                        />
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-white/80">
                                            进度: <span className="font-bold">{projects[activeIndex].progress}%</span>
                                        </div>

                                        <div className="flex gap-2">
                                            {projects[activeIndex].links.map((link, index) => (
                                                <Button
                                                    key={index}
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-8 w-8 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                                                >
                                                    {link.icon}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Project indicators */}
            <div className="flex justify-center mt-8 gap-2">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > activeIndex ? 1 : -1)
                            setActiveIndex(index)
                        }}
                        className={`w-3 h-3 rounded-full transition-all ${
                            index === activeIndex
                                ? "bg-gradient-to-r from-emerald-500 to-blue-500 w-8"
                                : "bg-neutral-300 dark:bg-neutral-700"
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}

