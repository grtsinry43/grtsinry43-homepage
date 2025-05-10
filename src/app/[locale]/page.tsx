"use client"

import {useEffect, useState} from "react"
import Link from "next/link"
import {Github, Mail, ExternalLink} from "lucide-react"
import {cn} from "@/lib/utils"
import {motion, useMotionValue, useScroll, useSpring, useTransform} from "framer-motion"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import SkillsSection from "@/components/sections/skills-section"
import ProjectsSection from "@/components/sections/projects-section"
import ContactSection from "@/components/sections/contact-section"
import NavigationMenu from "@/components/navigation-menu"
import {useTheme} from "next-themes"
import KeywordSection from "@/components/sections/keyword-section";
import ParallaxText from "@/components/ParallaxText"
import CreativeCanvas from "@/components/creative-canvas"
import PersonalitySection from "@/components/sections/personality-section";
import {LampContainer} from "@/components/ui/lamp-container";
import CardSection from "@/components/sections/card-section";
import GsapSkillsTree from "@/components/sections/skill-tree";
import GsapProjectsShowcase from "@/components/sections/project-showcase";
import GsapPersonalIntro from "@/components/sections/personal-intro";
import GsapPhotographySection from "@/components/sections/photography-section";
import GsapRhythmGamesSection from "@/components/sections/rhythm-games-section";
import FinalSection from "@/components/sections/final-section";
import {useTranslations} from 'next-intl';

export default function HomePage() {
    const t = useTranslations('HomePage');
    const {theme} = useTheme()
    const [scrolled, setScrolled] = useState(false)
    const {scrollYProgress} = useScroll()
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring physics for mouse movement
    const springConfig = {damping: 25, stiffness: 700}
    const mouseXSpring = useSpring(mouseX, springConfig)
    const mouseYSpring = useSpring(mouseY, springConfig)

    // Progress bar
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [mouseX, mouseY])

    return (
        <div className="">
            {/* Progress indicator */}
            <motion.div className="fixed top-0 left-0 right-0 h-[1px] bg-primary z-[60] origin-left" style={{scaleX}}/>

            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-background"
                initial={{opacity: 1}}
                animate={{opacity: 0, pointerEvents: "none"}}
                transition={{duration: 1, delay: 0.5}}
            >
                <motion.div
                    initial={{scale: 0.8, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{duration: 0.5}}
                    className="text-4xl font-bold text-primary flex"
                >
                    <img className="w-12 h-12 mr-4 rounded-full"
                         src={"https://dogeoss.grtsinry43.com/img/author.jpeg"}/>
                    <div>{t('greeting')}</div>
                </motion.div>
            </motion.div>

            {/* Navigation */}
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border/30" : "bg-transparent",
                )}
            >
                <div className="container flex items-center justify-between h-16 px-4 mx-auto">
                    <motion.div initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}>
                        <Link href="/public" className="text-xl font-bold tracking-tight">
                            {t('title')}
                        </Link>
                    </motion.div>

                    <NavigationMenu scrolled={scrolled}/>
                </div>
            </header>

            <main className="relative overflow-hidden">

                <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
                    {/* Creative background canvas */}
                    <div className="absolute inset-0">
                        <CreativeCanvas mouseX={mouseXSpring} mouseY={mouseYSpring}/>
                    </div>

                    {/* Hero Section with GSAP animation */}
                    <GsapPersonalIntro/>
                </div>


                {/* Floating elements */}
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1, delay: 1.2}}
                >
                    <KeywordSection/>
                </motion.div>

                {/* Horizontal scrolling text */}
                <section className="py-20 overflow-hidden opacity-55">
                    <ParallaxText baseVelocity={-3}>
                        {t('parallaxText1')}
                    </ParallaxText>
                    <ParallaxText baseVelocity={3}>
                        {t('parallaxText2')}
                    </ParallaxText>
                </section>

                {/* About Section with parallax */}
                <AboutSection/>

                {/* Skills Section with animation */}
                {/*<SkillsSection/>*/}

                <motion.div>
                    <GsapSkillsTree/>
                </motion.div>

                <GsapProjectsShowcase/>

                {/* Projects Section with enhanced visuals */}
                {/*<ProjectsSection/>*/}

                <LampContainer className="rounded-none">
                    <motion.h1
                        initial={{opacity: 0.5, y: 100}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4
                        font-bold bg-clip-text text-center text-3xl tracking-tight text-transparent md:text-5xl"
                    >
                        {t('moreToSee')}
                        <p className="mt-4">
                            {t('personalityAndInterests')}
                        </p>
                    </motion.h1>
                </LampContainer>

                <CardSection/>

                {/* Personality Section with animation */}
                <PersonalitySection/>

                {/*<GsapPersonalIntro/>*/}

                <GsapPhotographySection/>

                <GsapRhythmGamesSection/>

                {/* Contact Section with glass morphism */}
                <ContactSection/>

                <FinalSection/>
            </main>

            {/* Footer with subtle animation */}
            <footer className="py-8 border-t border-border/30 backdrop-blur-sm bg-background/80">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <motion.div
                            className="mb-4 md:mb-0"
                            initial={{opacity: 0}}
                            whileInView={{opacity: 1}}
                            transition={{duration: 0.8}}
                        >
                            <p className="text-sm text-muted-foreground">{t('footerRights', {year: new Date().getFullYear()})}</p>
                        </motion.div>
                        <motion.div
                            className="flex items-center space-x-6"
                            initial={{opacity: 0}}
                            whileInView={{opacity: 1}}
                            transition={{duration: 0.8, delay: 0.2}}
                        >
                            <a
                                href="https://github.com/grtsinry43"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
                            >
                                <Github className="h-5 w-5"/>
                                <span className="sr-only">{t('srGitHub')}</span>
                            </a>
                            <a
                                href="mailto:grtsinry43@outlook.com"
                                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
                            >
                                <Mail className="h-5 w-5"/>
                                <span className="sr-only">{t('srEmail')}</span>
                            </a>
                            <a
                                href="https://blog.grtsinry43.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
                            >
                                <ExternalLink className="h-5 w-5"/>
                                <span className="sr-only">{t('srBlog')}</span>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
