"use client"

import {useRef, useEffect, useState} from "react"
import {motion} from "framer-motion"
import {Github, ExternalLink, ArrowRight} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {useTheme} from "next-themes"

interface Project {
    id: number
    title: string
    description: string
    tags: string[]
    image: string
    githubUrl?: string
    liveUrl?: string
}

export default function GsapProjectsShowcase() {
    const containerRef = useRef<HTMLDivElement>(null)
    const horizontalRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(0)
    const [isInView, setIsInView] = useState(false)
    const {theme} = useTheme()

    // Project data
    const projects: Project[] = [
        {
            id: 1,
            title: "grtblog",
            description:
                "个人博客站点，一站式快速解决方案—一套源，扩展性强，快速部署的博客框架，使用 Nextjs + SpringBoot 构建，致力于轻松搭建个性化你的博客站点",
            tags: ["React", "Next.js", "Spring Boot", "Umi.js", "Socket.io", "Radix UI"],
            image: "/placeholder.svg?height=600&width=800",
            githubUrl: "https://github.com/grtsinry43/grtblog",
            liveUrl: "https://grtblog.js.org",
        },
        {
            id: 2,
            title: "csu-dynamic-youth",
            description: "途有青，去追山！学校官微毕业节的微信网页程序，统计参与次数与时长，生成排行榜，完成完成打卡",
            tags: ["微信小程序", "Vue.js", "微信API"],
            image: "/placeholder.svg?height=600&width=800",
            githubUrl: "#",
        },
        {
            id: 3,
            title: "Portfolio Website",
            description: "个人作品集网站，展示我的项目和技能，使用 Next.js 和 Framer Motion 构建",
            tags: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
            image: "/placeholder.svg?height=600&width=800",
            githubUrl: "#",
            liveUrl: "#",
        },
        {
            id: 4,
            title: "AI Chat Application",
            description: "基于人工智能的聊天应用，支持多种语言和自然语言处理",
            tags: ["React", "Node.js", "OpenAI API", "WebSockets"],
            image: "/placeholder.svg?height=600&width=800",
            githubUrl: "#",
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
            {threshold: 0.1},
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

    // 计算水平滚动容器的宽度
    useEffect(() => {
        if (horizontalRef.current) {
            // 计算所有项目卡片的总宽度 + 间距
            const totalWidth = projects.length * 600 + (projects.length - 1) * 40
            setContainerWidth(totalWidth)
        }
    }, [projects.length])

    // 设置水平滚动
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

                if (!containerRef.current || !horizontalRef.current) return

                // 创建水平滚动动画
                const scrollTween = gsap.to(horizontalRef.current, {
                    x: () => -(containerWidth - window.innerWidth + 100),
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: () => `+=${containerWidth}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                    },
                })

                // 为每个项目卡片创建视差效果
                const projectCards = horizontalRef.current.querySelectorAll(".project-card")
                projectCards.forEach((card, i) => {
                    const image = card.querySelector(".project-image")
                    const content = card.querySelector(".project-content")
                    const title = card.querySelector(".project-title")
                    const desc = card.querySelector(".project-desc")
                    const tags = card.querySelector(".project-tags")
                    const links = card.querySelector(".project-links")

                    // 图片视差效果
                    if (image) {
                        gsap.fromTo(
                            image,
                            {y: 50, opacity: 0},
                            {
                                y: 0,
                                opacity: 1,
                                duration: 1,
                                scrollTrigger: {
                                    containerAnimation: scrollTween,
                                    trigger: card,
                                    start: "left center",
                                    toggleActions: "play none none reverse",
                                },
                            },
                        )
                    }

                    // 内容视差效果 - 依次显示
                    if (title) {
                        gsap.fromTo(
                            title,
                            {y: 30, opacity: 0},
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.8,
                                delay: 0.2,
                                scrollTrigger: {
                                    containerAnimation: scrollTween,
                                    trigger: card,
                                    start: "left center",
                                    toggleActions: "play none none reverse",
                                },
                            },
                        )
                    }

                    if (desc) {
                        gsap.fromTo(
                            desc,
                            {y: 30, opacity: 0},
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.8,
                                delay: 0.4,
                                scrollTrigger: {
                                    containerAnimation: scrollTween,
                                    trigger: card,
                                    start: "left center",
                                    toggleActions: "play none none reverse",
                                },
                            },
                        )
                    }

                    if (tags) {
                        gsap.fromTo(
                            tags,
                            {y: 30, opacity: 0},
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.8,
                                delay: 0.6,
                                scrollTrigger: {
                                    containerAnimation: scrollTween,
                                    trigger: card,
                                    start: "left center",
                                    toggleActions: "play none none reverse",
                                },
                            },
                        )
                    }

                    if (links) {
                        gsap.fromTo(
                            links,
                            {y: 30, opacity: 0},
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.8,
                                delay: 0.8,
                                scrollTrigger: {
                                    containerAnimation: scrollTween,
                                    trigger: card,
                                    start: "left center",
                                    toggleActions: "play none none reverse",
                                },
                            },
                        )
                    }
                })

                return () => {
                    // 清理动画
                    scrollTween.kill()
                    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
                }
            } catch (error) {
                console.error("Failed to load GSAP:", error)
            }
        }

        loadGsap()
    }, [isInView, containerWidth])

    return (
        <section id="projects" ref={containerRef} className="relative min-h-screen overflow-hidden">
            <div className="absolute top-0 left-0 w-full py-24 z-10 pointer-events-none">
                <div className="container px-4 mx-auto">
                    <motion.div
                        initial={{opacity: 0, y: 40}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        viewport={{once: true, amount: 0.3}}
                        className="flex items-center justify-center space-x-2 mb-8 pointer-events-auto"
                    >
                        <div className="h-px w-12 bg-primary/60"/>
                        <h2 className="text-lg font-medium text-primary">我的项目</h2>
                        <div className="h-px w-12 bg-primary/60"/>
                    </motion.div>

                    <motion.h3
                        className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12 pointer-events-auto"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{duration: 0.8, delay: 0.2}}
                        viewport={{once: true, amount: 0.3}}
                    >
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              以往项目展示
            </span>
                    </motion.h3>

                    <motion.p
                        className="text-center text-muted-foreground max-w-2xl mx-auto mb-16 pointer-events-auto"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{duration: 0.8, delay: 0.3}}
                        viewport={{once: true, amount: 0.3}}
                    >
                        向下滚动探索我的项目作品集 - 体验视差滚动效果
                    </motion.p>
                </div>
            </div>

            {/* 水平滚动容器 */}
            <div
                ref={horizontalRef}
                className="absolute top-0 left-0 h-screen w-fit flex items-center gap-10 pl-[calc(50vw-300px)] pr-[100px] pt-[250px]"
            >
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className="project-card flex-shrink-0 w-[600px] h-[500px] bg-card/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-border/50 relative"
                    >
                        <div className="project-image absolute inset-0 z-0">
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent z-10"/>
                            <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="relative z-20 flex flex-col justify-end h-full p-8">
                            <h4 className="project-title text-3xl font-bold mb-4">{project.title}</h4>
                            <p className="project-desc text-lg text-muted-foreground mb-6">{project.description}</p>

                            <div className="project-tags flex flex-wrap gap-2 mb-6">
                                {project.tags.map((tag) => (
                                    <Badge key={tag} variant="outline"
                                           className="bg-primary/10 text-primary border-primary/20">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="project-links flex gap-4">
                                {project.githubUrl && (
                                    <Button asChild variant="outline" size="sm">
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2"
                                        >
                                            <Github className="h-4 w-4"/>
                                            GitHub
                                        </a>
                                    </Button>
                                )}
                                {project.liveUrl && (
                                    <Button asChild size="sm">
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2"
                                        >
                                            <ExternalLink className="h-4 w-4"/>
                                            查看项目
                                        </a>
                                    </Button>
                                )}
                            </div>

                            {/* 项目序号 */}
                            <div className="absolute top-8 right-8 text-8xl font-bold text-primary/10">
                                {String(index + 1).padStart(2, "0")}
                            </div>
                        </div>
                    </div>
                ))}

                {/* 结束提示 */}
                <div className="flex-shrink-0 w-[300px] h-[500px] flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-muted-foreground mb-4">想了解更多项目？</p>
                        <Button asChild>
                            <a href="#contact" className="flex items-center gap-2">
                                联系我 <ArrowRight className="h-4 w-4"/>
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            {/* 滚动提示 */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 text-center">
                <motion.div
                    animate={{y: [0, 10, 0]}}
                    transition={{duration: 1.5, repeat: Number.POSITIVE_INFINITY}}
                    className="text-sm text-muted-foreground"
                >
                    向下滚动继续探索
                </motion.div>
            </div>
        </section>
    )
}
