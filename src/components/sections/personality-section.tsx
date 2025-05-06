"use client"

import {useRef} from "react"
import {motion, useScroll, useTransform, type MotionValue, useInView} from "framer-motion"

export default function PersonalitySection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, {once: false, amount: 0.2})

    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
    const y1 = useTransform(scrollYProgress, [0, 1], [50, -50])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])

    // Rotation for personality chart
    const chartRotation = useTransform(scrollYProgress, [0, 1], [0, 10])

    const traits = [
        "内向但关心他人",
        "直觉敏锐，善于洞察",
        "感性决策，重视和谐",
        "计划性强，有条理",
        "理想主义者，追求意义",
    ]

    // Animation variants
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: {opacity: 0, x: -30},
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                delay: 0.1 * i,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    }

    const chartVariants = {
        hidden: {opacity: 0, scale: 0.8},
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    }

    return (
        <section id="personality" ref={containerRef} className="relative min-h-screen py-24 md:py-32 overflow-hidden">

            {/* Background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"
                    style={{
                        y: useTransform(scrollYProgress, [0, 1], [0, -100]),
                        x: useTransform(scrollYProgress, [0, 1], [0, 50]),
                    }}
                />
                <motion.div
                    className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl"
                    style={{
                        y: useTransform(scrollYProgress, [0, 1], [0, -150]),
                        x: useTransform(scrollYProgress, [0, 1], [0, -50]),
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                <motion.div style={{opacity}}>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex items-center justify-center space-x-2 mb-12"
                    >
                        <div className="h-px w-12 bg-primary/60" />
                        <h2 className="text-lg font-medium text-primary">我的性格</h2>
                        <div className="h-px w-12 bg-primary/60" />
                    </motion.div>

                    <motion.h3
                        className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        你会好奇<span className="text-primary">我的性格</span>
                    </motion.h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div style={{y: y1}} className="space-y-8">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                className="space-y-4 text-lg text-neutral-700 dark:text-neutral-300"
                            >
                                <motion.p variants={itemVariants} custom={1}>
                                    我的性格大部分情况下不可能不会有固定的表现，如果中将需要量化评价的话，我属于 16
                                    人格中较为稀有的
                                    INFJ。
                                </motion.p>
                                <motion.p variants={itemVariants} custom={2}>
                                    INFJ的特行者在迷雾中寻找光芒，坚持自己的理想和信念，希望能为这个世界带来一些改变。
                                </motion.p>
                                <motion.p variants={itemVariants} custom={3}>
                                    如果上面这样一段话评价 infj 人格：
                                </motion.p>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, y: 30}}
                                animate={
                                    isInView
                                        ? {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.8,
                                                delay: 0.6,
                                                ease: [0.22, 1, 0.36, 1],
                                            },
                                        }
                                        : {}
                                }
                                whileHover={{
                                    scale: 1.02,
                                    transition: {duration: 0.3},
                                }}
                                className="relative"
                            >
                                <blockquote
                                    className="relative z-10 rounded-2xl bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/30 dark:to-blue-900/30 p-8 italic text-neutral-700 dark:text-neutral-200 border-l-4 border-blue-500 shadow-lg">
                                    "明明拿了反派的成长剧本，却依旧想成为正道的光。"
                                </blockquote>
                                <motion.div
                                    className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 blur-xl"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 0.8, 0.5],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "easeInOut",
                                    }}
                                />
                                <motion.div
                                    className="absolute bottom-0 left-0 -mb-4 -ml-4 h-24 w-24 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 blur-xl"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 0.8, 0.5],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "easeInOut",
                                        delay: 2,
                                    }}
                                />
                            </motion.div>

                            <div>
                                <motion.h4
                                    initial={{opacity: 0, y: 20}}
                                    animate={isInView ? {opacity: 1, y: 0} : {}}
                                    transition={{duration: 0.6, delay: 0.7}}
                                    className="text-xl font-bold mb-6"
                                >
                                    INFJ 特质
                                </motion.h4>
                                <div className="space-y-4">
                                    {traits.map((trait, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{opacity: 0, x: -30, scale: 0.9}}
                                            animate={
                                                isInView
                                                    ? {
                                                        opacity: 1,
                                                        x: 0,
                                                        scale: 1,
                                                        transition: {
                                                            duration: 0.6,
                                                            delay: 0.8 + index * 0.1,
                                                            ease: [0.22, 1, 0.36, 1],
                                                        },
                                                    }
                                                    : {}
                                            }
                                            whileHover={{
                                                x: 10,
                                                transition: {duration: 0.2},
                                            }}
                                            className="flex items-center p-4 rounded-xl bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 transform-gpu"
                                        >
                                            <div
                                                className="h-3 w-3 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 mr-4"/>
                                            <span className="text-neutral-700 dark:text-neutral-300">{trait}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div style={{y: y2}}>
                            <div className="space-y-12">
                                <motion.div
                                    variants={chartVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    style={{rotate: chartRotation}}
                                    whileHover={{
                                        scale: 1.05,
                                        rotate: 0,
                                        transition: {duration: 0.3},
                                    }}
                                    className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg transform-gpu"
                                >
                                    <h4 className="text-xl font-bold mb-6 text-center">INFJ 性格雷达图</h4>
                                    <div className="aspect-square relative z-10">
                                        <svg viewBox="0 0 200 200" className="w-full h-full">
                                            <defs>
                                                <linearGradient id="personalityGradient" x1="0%" y1="0%" x2="100%"
                                                                y2="100%">
                                                    <stop offset="0%" stopColor="#10b981"/>
                                                    <stop offset="100%" stopColor="#3b82f6"/>
                                                </linearGradient>
                                                <filter id="personalityGlow" x="-20%" y="-20%" width="140%"
                                                        height="140%">
                                                    <feGaussianBlur stdDeviation="3" result="blur"/>
                                                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                                                </filter>
                                            </defs>

                                            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(100,116,139,0.2)"
                                                    strokeWidth="1"/>
                                            <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(100,116,139,0.2)"
                                                    strokeWidth="1"/>
                                            <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(100,116,139,0.2)"
                                                    strokeWidth="1"/>
                                            <circle cx="100" cy="100" r="20" fill="none" stroke="rgba(100,116,139,0.2)"
                                                    strokeWidth="1"/>

                                            <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(100,116,139,0.2)"
                                                  strokeWidth="1"/>
                                            <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(100,116,139,0.2)"
                                                  strokeWidth="1"/>
                                            <line x1="37" y1="37" x2="163" y2="163" stroke="rgba(100,116,139,0.2)"
                                                  strokeWidth="1"/>
                                            <line x1="37" y1="163" x2="163" y2="37" stroke="rgba(100,116,139,0.2)"
                                                  strokeWidth="1"/>

                                            <motion.polygon
                                                initial={{points: "100,100 100,100 100,100 100,100 100,100 100,100 100,100 100,100"}}
                                                animate={
                                                    isInView
                                                        ? {
                                                            points: "100,30 150,45 170,100 150,155 100,170 50,155 30,100 50,45",
                                                            transition: {
                                                                duration: 1.5,
                                                                delay: 1,
                                                                ease: "easeOut",
                                                            },
                                                        }
                                                        : {}
                                                }
                                                fill="url(#personalityGradient)"
                                                fillOpacity="0.3"
                                                stroke="url(#personalityGradient)"
                                                strokeWidth="2"
                                                filter="url(#personalityGlow)"
                                            />

                                            <text x="100" y="15" textAnchor="middle" fill="currentColor" fontSize="8">
                                                理想主义
                                            </text>
                                            <text x="185" y="100" textAnchor="start" fill="currentColor" fontSize="8">
                                                创造力
                                            </text>
                                            <text x="100" y="190" textAnchor="middle" fill="currentColor" fontSize="8">
                                                同理心
                                            </text>
                                            <text x="15" y="100" textAnchor="end" fill="currentColor" fontSize="8">
                                                内省
                                            </text>
                                            <text x="37" y="37" textAnchor="middle" fill="currentColor" fontSize="8">
                                                洞察力
                                            </text>
                                            <text x="37" y="163" textAnchor="middle" fill="currentColor" fontSize="8">
                                                坚持
                                            </text>
                                            <text x="163" y="37" textAnchor="middle" fill="currentColor" fontSize="8">
                                                完美主义
                                            </text>
                                            <text x="163" y="163" textAnchor="middle" fill="currentColor" fontSize="8">
                                                敏感
                                            </text>

                                            {/* Animated points */}
                                            {[
                                                {cx: 100, cy: 30},
                                                {cx: 150, cy: 45},
                                                {cx: 170, cy: 100},
                                                {cx: 150, cy: 155},
                                                {cx: 100, cy: 170},
                                                {cx: 50, cy: 155},
                                                {cx: 30, cy: 100},
                                                {cx: 50, cy: 45},
                                            ].map((point, index) => (
                                                <motion.circle
                                                    key={index}
                                                    initial={{cx: 100, cy: 100, r: 0}}
                                                    animate={
                                                        isInView
                                                            ? {
                                                                cx: point.cx,
                                                                cy: point.cy,
                                                                r: 4,
                                                                transition: {
                                                                    duration: 0.5,
                                                                    delay: 1 + index * 0.1,
                                                                    ease: "easeOut",
                                                                },
                                                            }
                                                            : {}
                                                    }
                                                    fill={index % 2 === 0 ? "#10b981" : "#3b82f6"}
                                                />
                                            ))}
                                        </svg>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{opacity: 0, y: 30}}
                                    animate={
                                        isInView
                                            ? {
                                                opacity: 1,
                                                y: 0,
                                                transition: {
                                                    duration: 0.8,
                                                    delay: 0.9,
                                                    ease: [0.22, 1, 0.36, 1],
                                                },
                                            }
                                            : {}
                                    }
                                    whileHover={{
                                        scale: 1.05,
                                        transition: {duration: 0.3},
                                    }}
                                    className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg"
                                >
                                    <h4 className="text-xl font-bold mb-6">INFJ 分布</h4>
                                    <div className="relative pt-8">
                                        <div
                                            className="absolute top-0 left-0 w-full flex justify-between text-xs text-neutral-500">
                                            <span>0%</span>
                                            <span>1%</span>
                                            <span>2%</span>
                                            <span>3%</span>
                                        </div>
                                        <div
                                            className="h-16 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-lg relative">
                                            <motion.div
                                                initial={{width: 0}}
                                                animate={isInView ? {width: "16%"} : {}}
                                                transition={{duration: 1.5, delay: 1.2, ease: "easeOut"}}
                                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg opacity-70"
                                            />
                                            <motion.div
                                                initial={{opacity: 0, scale: 0}}
                                                animate={
                                                    isInView
                                                        ? {
                                                            opacity: 1,
                                                            scale: 1,
                                                            transition: {
                                                                duration: 0.5,
                                                                delay: 1.8,
                                                                ease: [0.22, 1, 0.36, 1],
                                                            },
                                                        }
                                                        : {}
                                                }
                                                className="absolute top-1/2 left-[16%] -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white dark:bg-neutral-800 border-2 border-emerald-500 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400"
                                            >
                                                1.5%
                                            </motion.div>
                                            <motion.div
                                                initial={{opacity: 0, y: 10}}
                                                animate={
                                                    isInView
                                                        ? {
                                                            opacity: 1,
                                                            y: 0,
                                                            transition: {
                                                                duration: 0.5,
                                                                delay: 2,
                                                                ease: [0.22, 1, 0.36, 1],
                                                            },
                                                        }
                                                        : {}
                                                }
                                                className="absolute top-full left-[16%] -translate-x-1/2 mt-2 text-center"
                                            >
                                                <span
                                                    className="text-sm font-medium text-neutral-700 dark:text-neutral-300">INFJ</span>
                                                <p className="text-xs text-neutral-500">全球人口比例</p>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

