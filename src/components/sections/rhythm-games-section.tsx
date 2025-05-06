"use client"

import {useRef, useEffect, useState} from "react"
import {motion} from "framer-motion"
import {Music, Star, Trophy, Gamepad2} from "lucide-react"
import {Button} from "@/components/ui/button"
import {useTheme} from "next-themes"

export default function GsapRhythmGamesSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const {theme} = useTheme()
    const [activeGame, setActiveGame] = useState(0)
    const [isInView, setIsInView] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)

    // 音游数据
    const rhythmGames = [
        {
            id: 1,
            name: "Arcaea",
            description: "一款独特的音乐节奏游戏，以其创新的轨道系统和精美的视觉效果而闻名",
            image: "/placeholder.svg?height=400&width=400",
            level: "Expert",
            achievements: ["最高分数: 9,950,000+", "Pure Memory x 15", "EX+ Rating"],
            color: "#5d7bf7",
            trackColor: "#8e9fff",
        },
        {
            id: 2,
            name: "Cytus II",
            description: "由雷亚游戏开发的音乐节奏游戏，以其独特的扫描线机制和丰富的剧情而著名",
            image: "/placeholder.svg?height=400&width=400",
            level: "Advanced",
            achievements: ["Million Master x 20", "TP 99.50+", "All characters unlocked"],
            color: "#4cc2ff",
            trackColor: "#7ad5ff",
        },
        {
            id: 3,
            name: "Phigros",
            description: "一款具有创新判定线机制的音乐节奏游戏，以其高难度和视觉效果而受到玩家喜爱",
            image: "/placeholder.svg?height=400&width=400",
            level: "Master",
            achievements: ["Phi级别达成率 95%+", "全曲目解锁", "EX评级 x 25"],
            color: "#ff5a87",
            trackColor: "#ff8daa",
        },
        {
            id: 4,
            name: "BanG Dream!",
            description: "以日本偶像乐队为主题的音乐节奏游戏，结合了角色培养和社交元素",
            image: "/placeholder.svg?height=400&width=400",
            level: "Intermediate",
            achievements: ["Full Combo x 30", "All bands at max level", "Event ranking top 1000"],
            color: "#ffaa44",
            trackColor: "#ffc477",
        },
    ]

    // 检测元素是否在视口中
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsInView(true)
                } else {
                    setIsPlaying(false)
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

    // 音符动画
    useEffect(() => {
        if (!isInView || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // 设置canvas尺寸
        const setCanvasSize = () => {
            canvas.width = canvas.clientWidth * window.devicePixelRatio
            canvas.height = canvas.clientHeight * window.devicePixelRatio
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }

        setCanvasSize()
        window.addEventListener("resize", setCanvasSize)

        // 音符类
        class Note {
            x: number
            y: number
            size: number
            speed: number
            color: string
            rotation: number
            rotationSpeed: number

            constructor(canvasWidth: number, canvasHeight: number, color: string) {
                this.x = Math.random() * canvasWidth
                this.y = canvasHeight + Math.random() * 100
                this.size = 5 + Math.random() * 15
                this.speed = 1 + Math.random() * 3
                this.color = color
                this.rotation = Math.random() * Math.PI * 2
                this.rotationSpeed = (Math.random() - 0.5) * 0.1
            }

            update() {
                this.y -= this.speed
                this.rotation += this.rotationSpeed
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.save()
                ctx.translate(this.x, this.y)
                ctx.rotate(this.rotation)

                // 绘制音符
                ctx.fillStyle = this.color
                ctx.beginPath()

                // 音符头部
                ctx.ellipse(0, 0, this.size, this.size * 0.8, 0, 0, Math.PI * 2)
                ctx.fill()

                // 音符尾部
                ctx.fillRect(this.size - 2, -this.size * 0.8, 2, -this.size * 2)

                ctx.restore()
            }

            isOffScreen() {
                return this.y < -this.size * 3
            }
        }

        // 创建音符
        const notes: Note[] = []
        const currentGame = rhythmGames[activeGame]
        const noteColor = currentGame.color

        // 动画循环
        let animationId: number
        let lastTime = 0
        let noteInterval = 0

        const animate = (timestamp: number) => {
            if (!isPlaying) return

            const deltaTime = timestamp - lastTime
            lastTime = timestamp

            // 每隔一段时间添加新音符
            noteInterval += deltaTime
            if (noteInterval > 200) {
                notes.push(new Note(canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio, noteColor))
                noteInterval = 0
            }

            // 清空画布
            ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)

            // 更新和绘制音符
            for (let i = notes.length - 1; i >= 0; i--) {
                notes[i].update()
                notes[i].draw(ctx)

                // 移除离开屏幕的音符
                if (notes[i].isOffScreen()) {
                    notes.splice(i, 1)
                }
            }

            animationId = requestAnimationFrame(animate)
        }

        // 开始动画
        if (isPlaying) {
            animationId = requestAnimationFrame(animate)
        }

        return () => {
            window.removeEventListener("resize", setCanvasSize)
            cancelAnimationFrame(animationId)
        }
    }, [isInView, isPlaying, activeGame])

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
                const gameCards = container.querySelectorAll(".game-card")

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

                // 游戏卡片动画
                gsap.fromTo(
                    gameCards,
                    {y: 50, opacity: 0},
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

    return (
        <section id="rhythm-games" ref={containerRef} className="relative py-24 md:py-32 overflow-hidden bg-muted/30">
            {/* 背景效果 */}
            <div className="absolute inset-0 -z-10">
                <div
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"/>
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
                    <h2 className="text-lg font-medium text-primary">音乐游戏</h2>
                    <div className="h-px w-12 bg-primary/60"/>
                </motion.div>

                <motion.h3
                    className="section-title text-3xl md:text-4xl font-bold tracking-tight text-center mb-8"
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.8, delay: 0.2}}
                    viewport={{once: true, amount: 0.3}}
                >
                    我的<span className="text-primary">音游</span>之旅
                </motion.h3>

                <motion.p
                    className="section-title text-center text-muted-foreground max-w-2xl mx-auto mb-16"
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.8, delay: 0.3}}
                    viewport={{once: true, amount: 0.3}}
                >
                    点击游戏卡片，体验互动音符动画效果
                </motion.p>

                {/* 图标展示 */}
                <div className="flex flex-wrap justify-center gap-8 mb-16">
                    <div className="icon-item flex flex-col items-center gap-2">
                        <div className="p-4 rounded-full bg-blue-500/10">
                            <Music className="h-8 w-8 text-blue-500"/>
                        </div>
                        <span className="text-sm font-medium">音乐</span>
                    </div>
                    <div className="icon-item flex flex-col items-center gap-2">
                        <div className="p-4 rounded-full bg-purple-500/10">
                            <Gamepad2 className="h-8 w-8 text-purple-500"/>
                        </div>
                        <span className="text-sm font-medium">游戏</span>
                    </div>
                    <div className="icon-item flex flex-col items-center gap-2">
                        <div className="p-4 rounded-full bg-green-500/10">
                            <Star className="h-8 w-8 text-green-500"/>
                        </div>
                        <span className="text-sm font-medium">技巧</span>
                    </div>
                    <div className="icon-item flex flex-col items-center gap-2">
                        <div className="p-4 rounded-full bg-amber-500/10">
                            <Trophy className="h-8 w-8 text-amber-500"/>
                        </div>
                        <span className="text-sm font-medium">成就</span>
                    </div>
                </div>

                {/* 交互式音符动画画布 */}
                <div className="relative h-[300px] mb-16">
                    <canvas ref={canvasRef} className="w-full h-full"/>

                    {!isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-lg text-muted-foreground">点击下方游戏卡片，激活音符动画</p>
                        </div>
                    )}
                </div>

                {/* 游戏卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {rhythmGames.map((game, index) => (
                        <motion.div
                            key={game.id}
                            className={`game-card relative bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                                activeGame === index ? "ring-2 ring-offset-2" : ""
                            }`}
                            style={{
                                // ringColor: game.color,
                            }}
                            whileHover={{y: -5}}
                            onClick={() => {
                                setActiveGame(index)
                                setIsPlaying(true)
                            }}
                        >
                            {/* 背景装饰 */}
                            <div className="absolute top-0 left-0 right-0 h-1 opacity-70"
                                 style={{backgroundColor: game.color}}/>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
                                    <img src={game.image || "/placeholder.svg"} alt={game.name}
                                         className="w-full h-full object-cover"/>
                                </div>

                                <div>
                                    <h4 className="text-xl font-bold">{game.name}</h4>
                                    <div className="flex items-center text-sm">
                                        <span className="inline-block w-2 h-2 rounded-full mr-2"
                                              style={{backgroundColor: game.color}}/>
                                        <span>{game.level}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{game.description}</p>

                            {/* 成就进度条 */}
                            <div className="space-y-3">
                                {game.achievements.map((achievement, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                            <span>{achievement}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full rounded-full"
                                                style={{backgroundColor: game.trackColor}}
                                                initial={{width: 0}}
                                                whileInView={{width: `${70 + Math.random() * 30}%`}}
                                                transition={{duration: 1, delay: 0.2 + i * 0.1}}
                                                viewport={{once: true}}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 点击提示 */}
                            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">点击激活</div>
                        </motion.div>
                    ))}
                </div>

                {/* 底部CTA */}
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.5}}
                    viewport={{once: true, amount: 0.3}}
                    className="text-center"
                >
                    <p className="text-lg mb-6">喜欢音乐游戏？一起来切磋技艺吧！</p>
                    <Button asChild size="lg" className="rounded-full px-8">
                        <a href="#contact">添加我的游戏ID</a>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
