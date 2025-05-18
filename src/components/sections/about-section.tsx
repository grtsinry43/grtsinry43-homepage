"use client"

import {useRef} from "react"
import {motion, useScroll, useTransform} from "framer-motion"
import {Github} from "lucide-react"
import {Button} from "@/components/ui/button"
import {useInView} from "framer-motion"
import SkillBadge from "@/components/skill-badge"

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, {once: false, amount: 0.3})

    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])

    return (
        <section id="about" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-muted/20 to-transparent"/>

                {/* Animated grid background */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="h-full w-full grid grid-cols-12 gap-4">
                        {Array(36)
                            .fill(0)
                            .map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="row-span-1 bg-primary/80 rounded-lg"
                                    initial={{opacity: 0}}
                                    animate={isInView ? {opacity: 0.8} : {opacity: 0}}
                                    transition={{
                                        delay: i * 0.02,
                                        duration: 0.6,
                                        ease: "easeOut",
                                    }}
                                />
                            ))}
                    </div>
                </div>
            </div>

            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{opacity: 0, y: 40}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    viewport={{once: true, amount: 0.3}}
                    className="flex items-center justify-center space-x-2 mb-12"
                >
                    <div className="h-px w-12 bg-primary/60"/>
                    <h2 className="text-lg font-medium text-primary">关于我</h2>
                    <div className="h-px w-12 bg-primary/60"/>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <motion.div
                        className="space-y-8 lg:col-span-6"
                        initial={{opacity: 0, x: -40}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.8}}
                        viewport={{once: true, amount: 0.3}}
                    >
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                            构建优雅、高效的
                            <br/>
                            <span className="text-primary">数字体验</span>
                        </h3>

                        <div className="space-y-4 text-lg text-muted-foreground">
                            <p>我是一名全栈开发者，专注于 Java/JavaScript 开发，目前正在转向 Kotlin/TypeScript
                                全栈开发，对于 Web 与跨平台有自己的见解。</p>
                            <p>
                                我热爱创建优雅、高效的应用程序，无论是 Web 应用还是 Android
                                应用。对我来说良好的用户体验和干净的代码同样重要。
                            </p>
                            <p>目前我活跃于开源社区，并在个人博客上分享技术文章。</p>
                        </div>

                        <div className="flex gap-3">
                            <Button asChild variant="default">
                                <a
                                    href="https://github.com/grtsinry43"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    <Github className="h-5 w-5"/>
                                    GitHub
                                </a>
                            </Button>
                            <Button asChild variant="outline">
                                <a href="https://blog.grtsinry43.com" target="_blank" rel="noopener noreferrer">
                                    我的博客
                                </a>
                            </Button>
                        </div>
                    </motion.div>

                    <div className="lg:col-span-1"/>

                    <motion.div className="lg:col-span-5 relative" style={{y}}>
                        <div className="relative z-10">
                            <motion.div
                                className="p-1 rounded-xl bg-gradient-to-tr from-primary/30 via-primary/20 to-background backdrop-blur-sm border border-primary/20 shadow-xl"
                                initial={{opacity: 0, scale: 0.9, x: 20, backdropFilter: "blur(20px)"}}
                                whileInView={{opacity: 1, scale: 1, x: 0, backdropFilter: "blur(0px)"}}
                                transition={{duration: 0.8, delay: 0.2}}
                                viewport={{once: true, amount: 0.3}}
                            >
                                <div className="bg-card p-6 rounded-lg space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-3 w-3 rounded-full bg-red-500"/>
                                        <div className="h-3 w-3 rounded-full bg-yellow-500"/>
                                        <div className="h-3 w-3 rounded-full bg-green-500"/>
                                        <div className="ml-2 text-sm font-mono">~/grtsinry43/skills</div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-mono text-sm text-primary mb-2">{"// 我的技术栈"}</p>
                                            <div className="flex flex-wrap gap-2">
                                                <SkillBadge name="React"/>
                                                <SkillBadge name="Next.js"/>
                                                <SkillBadge name="Vue.js"/>
                                                <SkillBadge name="Nuxt.js"/>
                                                <SkillBadge name="TypeScript"/>
                                                <SkillBadge name="JavaScript"/>
                                                <SkillBadge name="Kotlin"/>
                                                <SkillBadge name="Python"/>
                                                <SkillBadge name="Jupyter Notebook"/>
                                                <SkillBadge name="FastAPI"/>
                                                <SkillBadge name="PyTorch"/>
                                                <SkillBadge name="Spring Boot"/>
                                                <SkillBadge name="Ktor"/>
                                                <SkillBadge name="Java"/>
                                                <SkillBadge name="Jetpack Compose"/>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="font-mono text-sm text-primary mb-2">{"// 开发工具"}</p>
                                            <div className="flex flex-wrap gap-2">
                                                <SkillBadge name="WebStorm"/>
                                                <SkillBadge name="VS Code"/>
                                                <SkillBadge name="IntelliJ IDEA"/>
                                                <SkillBadge name="Android Studio"/>
                                                <SkillBadge name="RustRover"/>
                                                <SkillBadge name="PyCharm"/>
                                                <SkillBadge name="CLion"/>
                                                <SkillBadge name="Git"/>
                                                <SkillBadge name="Figma"/>
                                                <SkillBadge name="Docker"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -z-10 -top-10 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"/>
                        <div
                            className="absolute -z-10 -bottom-10 -right-10 h-60 w-60 rounded-full bg-primary/5 blur-3xl"/>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
