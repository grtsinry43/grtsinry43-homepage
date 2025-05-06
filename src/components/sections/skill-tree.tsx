"use client"

import {useRef, useEffect, useState} from "react"
import {motion} from "framer-motion"
import {useTheme} from "next-themes"

export default function GsapSkillsTree() {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const {theme} = useTheme()
    const [activeSkill, setActiveSkill] = useState<string | null>(null) // 状态已声明，但更新逻辑未在原始代码中提供
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
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsInView(true)
                    // 可选：确保只触发一次
                    if (containerRef.current) observer.unobserve(containerRef.current);
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
        if (!isInView) return;

        let animationFrameId: number;
        let autoRotateTimeout: NodeJS.Timeout;
        let resizeListener: () => void;
        let mouseMoveListener: (e: MouseEvent) => void;

        const loadGsapAndAnimate = async () => {
            try {
                const gsapModule = await import("gsap")
                const ScrollTriggerModule = await import("gsap/ScrollTrigger")
                const gsap = gsapModule.default
                const ScrollTrigger = ScrollTriggerModule.default
                gsap.registerPlugin(ScrollTrigger)

                if (!canvasRef.current) return;
                const canvas = canvasRef.current
                const ctx = canvas.getContext("2d")
                if (!ctx) return;

                const dpr = window.devicePixelRatio || 1;
                let cssWidth = 0;
                let cssHeight = 0;

                const setCanvasSize = () => {
                    const rect = canvas.getBoundingClientRect();
                    cssWidth = rect.width;
                    cssHeight = rect.height;

                    canvas.width = cssWidth * dpr;
                    canvas.height = cssHeight * dpr;

                    ctx.resetTransform();
                    ctx.scale(dpr, dpr);
                };

                setCanvasSize(); // Initial size
                resizeListener = setCanvasSize; // Store for cleanup
                window.addEventListener("resize", resizeListener);


                const modelSpaceRadius = 100; // 抽象的模型空间半径

                const skillNodes = skills.map((skill, index) => {
                    const phi = Math.acos(-1 + (2 * index) / skills.length);
                    const theta = Math.sqrt(skills.length * Math.PI) * phi;
                    return {
                        ...skill,
                        x3d: modelSpaceRadius * Math.cos(theta) * Math.sin(phi),
                        y3d: modelSpaceRadius * Math.sin(theta) * Math.sin(phi),
                        z3d: modelSpaceRadius * Math.cos(phi),
                        x2d: 0,
                        y2d: 0,
                        scale: 0,
                        opacity: 0,
                    };
                });

                const rotation = {x: 0, y: 0};
                const targetRotation = {x: 0, y: 0};
                let autoRotate = true;
                let mouseX = 0;
                let mouseY = 0;

                mouseMoveListener = (e: MouseEvent) => {
                    const rect = canvas.getBoundingClientRect();
                    if (!rect.width || !rect.height) return; // Avoid division by zero if canvas not rendered
                    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
                    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

                    if (Math.abs(mouseX) > 0.05 || Math.abs(mouseY) > 0.05) { // Reduced sensitivity
                        autoRotate = false;
                        targetRotation.x = mouseY * 0.3; // Reduced rotation speed
                        targetRotation.y = mouseX * 0.3; // Reduced rotation speed
                        clearTimeout(autoRotateTimeout);
                        autoRotateTimeout = setTimeout(() => {
                            autoRotate = true;
                        }, 7000); // Longer timeout
                    }
                };
                canvas.addEventListener("mousemove", mouseMoveListener);

                const draw = () => {
                    ctx.clearRect(0, 0, cssWidth, cssHeight); // 使用CSS尺寸清空

                    if (autoRotate) {
                        targetRotation.y += 0.002; // 自动旋转速度
                    }
                    rotation.x += (targetRotation.x - rotation.x) * 0.05; // 平滑过渡
                    rotation.y += (targetRotation.y - rotation.y) * 0.05; // 平滑过渡

                    const cosX = Math.cos(rotation.x);
                    const sinX = Math.sin(rotation.x);
                    const cosY = Math.cos(rotation.y);
                    const sinY = Math.sin(rotation.y);

                    const currentCssCenter = {x: cssWidth / 2, y: cssHeight / 2};
                    const cssSphereDisplayRadius = Math.min(cssWidth, cssHeight) * 0.35; // 球体在屏幕上的显示半径

                    skillNodes.forEach((node) => {
                        // 3D Rotation
                        const y_rotated = node.y3d * cosX - node.z3d * sinX;
                        const z_intermediate = node.y3d * sinX + node.z3d * cosX;
                        const x_final_model = node.x3d * cosY - z_intermediate * sinY;
                        const z_final_model = node.x3d * sinY + z_intermediate * cosY;
                        const y_final_model = y_rotated;

                        // Perspective scale and opacity
                        // z_final_model / modelSpaceRadius 将z值归一化到大约[-1, 1]范围
                        node.scale = (z_final_model / modelSpaceRadius + 2.5) / 3.5; // 调整分母和加值改变透视和大小范围
                        node.opacity = Math.max(0, (node.scale - 0.5) * 2); // 调整阈值使更多/更少的点可见

                        if (node.opacity > 0) {
                            // Project to 2D CSS coordinates
                            // (coord / modelRadius) * displayRadius: 将模型坐标按比例映射到显示半径
                            // * node.scale: 可选，应用透视缩放进一步影响位置（使远处的点更靠近中心）
                            node.x2d = currentCssCenter.x + (x_final_model / modelSpaceRadius) * cssSphereDisplayRadius * node.scale;
                            node.y2d = currentCssCenter.y + (y_final_model / modelSpaceRadius) * cssSphereDisplayRadius * node.scale;

                            ctx.save();
                            ctx.globalAlpha = node.opacity;

                            const nodeSize = (8 + node.level / 15) * node.scale; // 调整基础大小和等级影响因子

                            ctx.fillStyle = node.color;
                            ctx.beginPath();
                            ctx.arc(node.x2d, node.y2d, nodeSize, 0, Math.PI * 2);
                            ctx.fill();

                            // 仅当节点足够大时显示文字，避免拥挤
                            if (nodeSize > 5) {
                                ctx.font = `${Math.min(14, nodeSize * 1) * node.scale}px Arial`; // 字体大小也受透视影响
                                ctx.fillStyle = theme === "dark" ? "#ffffff" : "#000000";
                                ctx.textAlign = "center";
                                ctx.textBaseline = "middle";
                                ctx.fillText(node.name, node.x2d, node.y2d + nodeSize + 5 * node.scale); // 文字略微向下偏移
                            }
                            ctx.restore();
                        }
                    });
                    animationFrameId = requestAnimationFrame(draw);
                };

                draw();

            } catch (error) {
                console.error("Failed to load GSAP or run animation:", error);
            }
        };

        loadGsapAndAnimate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(autoRotateTimeout);
            if (resizeListener) window.removeEventListener("resize", resizeListener);
            if (canvasRef.current && mouseMoveListener) {
                canvasRef.current.removeEventListener("mousemove", mouseMoveListener);
            }
        };
    }, [isInView, theme, skills]); // skills 作为依赖，尽管在此处是常量

    return (
        <section id="skills" ref={containerRef} className="relative py-24 md:py-32 overflow-hidden bg-muted/30">
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

                {/* 3D技能球体容器 - 应用居中和宽高比 */}
                <div className="relative w-full max-w-xl md:max-w-2xl aspect-square mx-auto mb-16">
                    <canvas ref={canvasRef} className="w-full h-full cursor-move" style={{touchAction: "none"}}/>
                    <div
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-border/50 shadow-lg text-xs md:text-sm">
                        <p className="text-center">{activeSkill ? `${activeSkill}` : "移动鼠标探索技能球体"}</p>
                    </div>
                </div>

                {/* 技能分组说明 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {skillGroups.map((group, idx) => (
                        <motion.div
                            key={group.id}
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.2 + idx * 0.1}}
                            viewport={{once: true, amount: 0.3}}
                            className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/20 shadow-sm border-l-sky-200"
                        >
                            <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${group.color} mb-4`}></div>
                            <h4 className="text-xl font-semibold mb-3 text-card-foreground">{group.name}</h4>
                            <div className="space-y-2">
                                {skills
                                    .filter((skill) => skill.group === group.id)
                                    .slice(0, 4) // 显示前4个
                                    .map((skill) => (
                                        <div key={skill.name} className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">{skill.name}</span>
                                            <div className="flex items-center">
                                                <div
                                                    className="h-1.5 w-20 md:w-24 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full bg-gradient-to-r ${group.color}`}
                                                        style={{width: `${skill.level}%`}}
                                                    />
                                                </div>
                                                <span
                                                    className="text-xs text-muted-foreground/80 ml-2 w-8 text-right">{skill.level}%</span>
                                            </div>
                                        </div>
                                    ))}
                                {skills.filter((skill) => skill.group === group.id).length > 4 && (
                                    <div className="text-xs text-right text-muted-foreground/70 mt-2">
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