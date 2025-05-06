"use client"

import {useRef, useEffect, useState} from "react"
import {motion} from "framer-motion"
import {useTheme} from "next-themes"

export default function GsapSkillsTree() {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const {theme} = useTheme()
    const [activeSkill, setActiveSkill] = useState<string | null>(null)
    const [isInView, setIsInView] = useState(false)

    // 技能数据
    const skills = [
        // Web开发技能
        {name: "React", level: 95, group: "web", color: "#61DAFB"},
        {name: "Next.js", level: 90, group: "web", color: "#000000"},
        {name: "Vue.js", level: 85, group: "web", color: "#4FC08D"},
        {name: "TypeScript", level: 90, group: "web", color: "#3178C6"},
        {name: "JavaScript", level: 95, group: "web", color: "#F7DF1E"},
        {name: "HTML/CSS", level: 95, group: "web", color: "#E34F26"},

        // 后端开发技能
        {name: "Spring Boot", level: 60, group: "backend", color: "#6DB33F"},
        {name: "Spring Security", level: 60, group: "backend", color: "#6DB33F"},
        {name: "Java", level: 60, group: "backend", color: "#007396"},
        {name: "Node.js", level: 75, group: "backend", color: "#339933"},
        {name: "MySQL", level: 70, group: "backend", color: "#4479A1"},
        {name: "PostgreSQL", level: 65, group: "backend", color: "#336791"},

        // Android开发技能
        {name: "Kotlin", level: 70, group: "android", color: "#7F52FF"},
        {name: "Jetpack Compose", level: 65, group: "android", color: "#4285F4"},
        {name: "Kotlin Multiplatform", level: 60, group: "android", color: "#7F52FF"},
        {name: "Android SDK", level: 75, group: "android", color: "#3DDC84"},
    ]

    // 技能分组
    const skillGroups = [
        {id: "web", name: "Web开发", color: "from-blue-500 to-violet-500"},
        {id: "backend", name: "后端开发", color: "from-green-500 to-emerald-500"},
        {id: "android", name: "Android开发", color: "from-amber-500 to-orange-500"},
    ]

    useEffect(() => {
        // 检测元素是否在视口中
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

    useEffect(() => {
        if (!isInView) return

        // 动态导入GSAP以避免SSR问题
        const loadGsap = async () => {
            try {
                const gsapModule = await import("gsap")
                const ScrollTriggerModule = await import("gsap/ScrollTrigger")

                const gsap = gsapModule.default
                const ScrollTrigger = ScrollTriggerModule.default

                // 注册ScrollTrigger插件
                gsap.registerPlugin(ScrollTrigger)

                if (!containerRef.current || !canvasRef.current) return

                const container = containerRef.current
                const canvas = canvasRef.current
                const ctx = canvas.getContext("2d")
                if (!ctx) return

                // 设置canvas尺寸
                const setCanvasSize = () => {
                    const rect = canvas.getBoundingClientRect()
                    canvas.width = rect.width * window.devicePixelRatio
                    canvas.height = rect.height * window.devicePixelRatio
                    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
                }

                setCanvasSize()
                window.addEventListener("resize", setCanvasSize)

                // 创建3D技能球体
                const skillSphereRadius = Math.min(canvas.width, canvas.height) * 0.3
                const center = {x: canvas.width / 2, y: canvas.height / 2}

                // 为每个技能分配3D位置
                const skillNodes = skills.map((skill, index) => {
                    const phi = Math.acos(-1 + (2 * index) / skills.length)
                    const theta = Math.sqrt(skills.length * Math.PI) * phi

                    return {
                        ...skill,
                        x3d: skillSphereRadius * Math.cos(theta) * Math.sin(phi),
                        y3d: skillSphereRadius * Math.sin(theta) * Math.sin(phi),
                        z3d: skillSphereRadius * Math.cos(phi),
                        x2d: 0,
                        y2d: 0,
                        scale: 0,
                        opacity: 0,
                    }
                })

                // 动画参数
                const rotation = {x: 0, y: 0}
                const targetRotation = {x: 0, y: 0}
                let autoRotate = true
                let mouseX = 0
                let mouseY = 0

                // 鼠标移动事件
                const handleMouseMove = (e: MouseEvent) => {
                    const rect = canvas.getBoundingClientRect()
                    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
                    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2

                    if (Math.abs(mouseX) > 0.1 || Math.abs(mouseY) > 0.1) {
                        autoRotate = false
                        targetRotation.x = mouseY * 0.5
                        targetRotation.y = mouseX * 0.5

                        // 5秒后恢复自动旋转
                        clearTimeout(autoRotateTimeout)
                        autoRotateTimeout = setTimeout(() => {
                            autoRotate = true
                        }, 5000)
                    }
                }

                let autoRotateTimeout: NodeJS.Timeout
                canvas.addEventListener("mousemove", handleMouseMove)

                // 绘制函数
                const draw = () => {
                    // 清空画布
                    ctx.clearRect(0, 0, canvas.width, canvas.height)

                    // 更新旋转
                    if (autoRotate) {
                        targetRotation.y += 0.003
                    }

                    rotation.x += (targetRotation.x - rotation.x) * 0.05
                    rotation.y += (targetRotation.y - rotation.y) * 0.05

                    // 计算3D旋转
                    const cosX = Math.cos(rotation.x)
                    const sinX = Math.sin(rotation.x)
                    const cosY = Math.cos(rotation.y)
                    const sinY = Math.sin(rotation.y)

                    // 更新每个技能节点的位置
                    skillNodes.forEach((node) => {
                        // 应用旋转变换
                        const x = node.x3d
                        const y = node.y3d * cosX - node.z3d * sinX
                        const z = node.y3d * sinX + node.z3d * cosX

                        const x2 = x * cosY - z * sinY
                        const z2 = x * sinY + z * cosY

                        // 投影到2D
                        const scale = (z2 / skillSphereRadius + 2) / 3
                        node.x2d = center.x + x2 / window.devicePixelRatio
                        node.y2d = center.y + y / window.devicePixelRatio
                        node.scale = scale
                        node.opacity = (scale - 0.6) * 2.5

                        // 绘制技能节点
                        if (node.opacity > 0) {
                            ctx.save()
                            ctx.globalAlpha = node.opacity

                            // 节点大小基于技能等级
                            const nodeSize = (10 + node.level / 10) * scale

                            // 绘制节点
                            ctx.fillStyle = node.color
                            ctx.beginPath()
                            ctx.arc(node.x2d, node.y2d, nodeSize, 0, Math.PI * 2)
                            ctx.fill()

                            // 绘制技能名称
                            ctx.font = `${12 * scale}px Arial`
                            ctx.fillStyle = theme === "dark" ? "#ffffff" : "#000000"
                            ctx.textAlign = "center"
                            ctx.textBaseline = "middle"
                            ctx.fillText(node.name, node.x2d, node.y2d)

                            ctx.restore()
                        }
                    })

                    requestAnimationFrame(draw)
                }

                // 开始动画
                draw()

                // 清理函数
                return () => {
                    window.removeEventListener("resize", setCanvasSize)
                    canvas.removeEventListener("mousemove", handleMouseMove)
                    clearTimeout(autoRotateTimeout)
                }
            } catch (error) {
                console.error("Failed to load GSAP:", error)
            }
        }

        loadGsap()
    }, [isInView, theme])

    return (
        <section id="skills" ref={containerRef} className="relative py-24 md:py-32 overflow-hidden bg-muted/30">
            {/* 背景效果 */}
            <div className="absolute inset-0 -z-10">
                <div
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"/>
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
                    <h2 className="text-lg font-medium text-primary">专业技能</h2>
                    <div className="h-px w-12 bg-primary/60"/>
                </motion.div>

                <motion.h3
                    className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-8"
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.8, delay: 0.2}}
                    viewport={{once: true, amount: 0.3}}
                >
                    我的<span className="text-primary">技术</span>栈和能力
                </motion.h3>

                <motion.p
                    className="text-center text-muted-foreground max-w-2xl mx-auto mb-16"
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.8, delay: 0.3}}
                    viewport={{once: true, amount: 0.3}}
                >
                    探索我的技能宇宙 - 移动鼠标与技能球体互动，查看我的专业技能和熟练程度
                </motion.p>

                {/* 3D技能球体 */}
                <div className="relative w-full mb-16">
                    <canvas ref={canvasRef} className="w-full h-full cursor-move" style={{touchAction: "none"}}/>

                    {/* 技能说明 */}
                    <div
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-card/80 backdrop-blur-sm p-4 rounded-xl border border-border/50 shadow-lg">
                        <p className="text-sm text-center">{activeSkill ? `${activeSkill}` : "移动鼠标探索技能球体"}</p>
                    </div>
                </div>

                {/* 技能分组说明 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skillGroups.map((group, idx) => (
                        <motion.div
                            key={group.id}
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.2 + idx * 0.1}}
                            viewport={{once: true, amount: 0.3}}
                            className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-lg"
                        >
                            <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${group.color} mb-4`}></div>
                            <h4 className="text-xl font-bold mb-3">{group.name}</h4>
                            <div className="space-y-2">
                                {skills
                                    .filter((skill) => skill.group === group.id)
                                    .slice(0, 4)
                                    .map((skill) => (
                                        <div key={skill.name} className="flex items-center justify-between">
                                            <span className="text-sm">{skill.name}</span>
                                            <div className="flex items-center">
                                                <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full bg-gradient-to-r ${group.color}`}
                                                        style={{width: `${skill.level}%`}}
                                                    />
                                                </div>
                                                <span
                                                    className="text-xs text-muted-foreground ml-2">{skill.level}%</span>
                                            </div>
                                        </div>
                                    ))}
                                {skills.filter((skill) => skill.group === group.id).length > 4 && (
                                    <div className="text-xs text-right text-muted-foreground">
                                        +{skills.filter((skill) => skill.group === group.id).length - 4} 更多技能
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
