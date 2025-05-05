"use client"

import {useRef} from "react"
import {motion, useScroll, useTransform, type MotionValue, useInView} from "framer-motion"
import ProjectShowcase from "@/components/project-showcase"

export default function SectionProjects() {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, {once: false, amount: 0.2})

    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
    const y1 = useTransform(scrollYProgress, [0, 1], [50, -50])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])

    return (
        <section id="projects" ref={containerRef} className="relative min-h-screen py-24 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-950 z-0"/>

            {/* Background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"
                    style={{
                        y: useTransform(scrollYProgress, [0, 1], [0, -100]),
                        x: useTransform(scrollYProgress, [0, 1], [0, 50]),
                    }}
                />
                <motion.div
                    className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl"
                    style={{
                        y: useTransform(scrollYProgress, [0, 1], [0, -150]),
                        x: useTransform(scrollYProgress, [0, 1], [0, -50]),
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                <motion.div style={{opacity}} className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex items-center justify-center space-x-2 mb-12"
                    >
                        <div className="h-px w-12 bg-primary/60" />
                        <h2 className="text-lg font-medium text-primary">我的项目</h2>
                        <div className="h-px w-12 bg-primary/60" />
                    </motion.div>

                    <motion.h3
                        initial={{opacity: 0, y: 20}}
                        animate={isInView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.6, delay: 0.2}}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-center"
                    >
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              以往项目展示
            </span>
                    </motion.h3>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={isInView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.6, delay: 0.3}}
                        className="w-full mb-16"
                    >
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <p className="text-lg text-neutral-700 dark:text-neutral-300">
                                探索我的创意世界，每个项目都是一段独特的旅程
                            </p>
                        </div>
                        <ProjectShowcase/>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

