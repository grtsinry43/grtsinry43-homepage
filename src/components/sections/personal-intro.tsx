"use client"

import {useRef, useEffect, useState} from "react"
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {TextPlugin} from "gsap/TextPlugin"
import {Github, Mail, ExternalLink, Code, Heart, Coffee} from "lucide-react"
import {Button} from "@/components/ui/button"
import {useTheme} from "next-themes"

export default function GsapPersonalIntro() {
    const containerRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const {theme, resolvedTheme} = useTheme()

    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, TextPlugin);

        if (!containerRef.current) return;

        const container = containerRef.current;

        // 清理所有 ScrollTrigger 实例
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
            },
        });

        if (textRef.current) {
            const headings = textRef.current.querySelectorAll("h3, h4");
            const paragraphs = textRef.current.querySelectorAll("p");
            const buttons = textRef.current.querySelectorAll("button, a");
            const icons = textRef.current.querySelectorAll(".icon-item");

            tl.from(headings, {opacity: 0, y: 50, duration: 0.8, stagger: 0.2, ease: "power3.out"})
                .from(paragraphs, {opacity: 0, y: 30, duration: 0.6, stagger: 0.2, ease: "power2.out"}, "-=0.4")
                .from(buttons, {
                    opacity: 0,
                    y: 20,
                    scale: 0.9,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                }, "-=0.3")
                .from(icons, {
                    opacity: 0,
                    scale: 0,
                    rotation: -30,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "back.out(2)"
                }, "-=0.4");
        }

        if (imageRef.current) {
            const shapes = imageRef.current.querySelectorAll(".shape");
            const particles = imageRef.current.querySelectorAll(".particle");

            tl.from(shapes, {
                opacity: 0,
                scale: 0,
                rotation: -60,
                transformOrigin: "center",
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(2)"
            }, "-=0.8");

            particles.forEach((particle) => {
                gsap.to(particle, {
                    y: "random(-30, 30)",
                    x: "random(-30, 30)",
                    rotation: "random(-360, 360)",
                    duration: "random(3, 6)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            });
        }

        return () => {
            // 确保清理所有 ScrollTrigger 实例
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [theme, resolvedTheme]);

    const words = ["全栈开发者", "设计者", "创造者"]
    const [currentWord, setCurrentWord] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            ref={containerRef}
            className="relative py-24 md:py-32 overflow-hidden"
            style={{y, scale, opacity}}
        >
            {/* Background elements */}
            <div className="absolute inset-0 -z-10">
                <div
                    className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background opacity-20"/>
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="parallax absolute top-10 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"/>
                    <div
                        className="parallax absolute bottom-20 right-1/5 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"/>
                    <div
                        className="parallax absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl"/>
                </div>
            </div>

            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 mt-12 lg:grid-cols-2 lg:mt-0 gap-12 items-center">
                    <div ref={textRef} className="space-y-8">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                                你好，我是 <p className="text-primary text-7xl">grtsinry43</p>
                            </h3>
                            <h4 className="text-2xl md:text-3xl font-semibold text-foreground/80">
                                热爱生活的{" "}
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
                            </h4>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            我专注于构建优雅、高效的应用程序，无论是 Web 应用还是 Android 应用。
                            我相信良好的用户体验和干净的代码同样重要。
                        </p>
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-center gap-2 icon-item">
                                <div className="p-2 rounded-full bg-primary/10">
                                    <Code className="h-5 w-5 text-primary"/>
                                </div>
                                <span>开发者</span>
                            </div>
                            <div className="flex items-center gap-2 icon-item">
                                <div className="p-2 rounded-full bg-pink-500/10">
                                    <Heart className="h-5 w-5 text-pink-500"/>
                                </div>
                                <span>热爱创造</span>
                            </div>
                            <div className="flex items-center gap-2 icon-item">
                                <div className="p-2 rounded-full bg-amber-500/10">
                                    <Coffee className="h-5 w-5 text-amber-500"/>
                                </div>
                                <span>咖啡爱好者</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild variant="default" className="rounded-full">
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
                            <Button asChild variant="outline" className="rounded-full">
                                <a href="mailto:grtsinry43@outlook.com" className="flex items-center gap-2">
                                    <Mail className="h-5 w-5"/>
                                    联系我
                                </a>
                            </Button>
                            <Button asChild variant="ghost" className="rounded-full">
                                <a
                                    href="https://blog.grtsinry43.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    <ExternalLink className="h-5 w-5"/>
                                    博客
                                </a>
                            </Button>
                        </div>
                    </div>
                    <div ref={imageRef} className="relative">
                        <div className="relative z-10 mx-auto max-w-md">
                            <div className="profile-image relative rounded-2xl overflow-hidden">
                                <img
                                    src="https://dogeoss.grtsinry43.com/img/author-removebg.png"
                                    alt="grtsinry43"
                                    style={resolvedTheme === "dark" ? {filter: "brightness(0.8)"} : {}}
                                    className="w-full h-auto"
                                />
                                {resolvedTheme === "dark" && (
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/>
                                )}
                                <div
                                    className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full hover:translate-y-0 transition-transform duration-300">
                                    <h4 className="text-xl font-bold text-white mb-2">grtsinry43</h4>
                                    <p className="text-white/80">全栈开发者 & 设计爱好者</p>
                                </div>
                            </div>
                            <div
                                className="shape absolute -top-6 -right-6 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 rotate-12 shadow-lg"/>
                            <div
                                className="shape absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg"/>
                            <div
                                className="shape absolute top-1/2 -right-12 w-10 h-10 rounded-md bg-gradient-to-br from-amber-500 to-orange-500 rotate-45 shadow-lg"/>
                            {[...Array(10)].map((_, i) => (
                                <div
                                    key={i}
                                    className="particle absolute w-3 h-3 rounded-full bg-primary/30"
                                    style={{
                                        top: `${20 + Math.random() * 60}%`,
                                        left: `${Math.random() * 100}%`,
                                        opacity: 0.3 + Math.random() * 0.7,
                                    }}
                                />
                            ))}
                        </div>
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 rounded-full blur-3xl"/>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}