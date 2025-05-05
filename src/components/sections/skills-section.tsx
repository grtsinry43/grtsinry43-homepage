"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  const skills = [
    {
      category: "Web 开发",
      color: "from-blue-500/20 to-violet-500/20",
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "Vue.js", level: 85 },
        { name: "TypeScript", level: 90 },
        { name: "JavaScript", level: 95 },
      ],
    },
    {
      category: "后端开发",
      color: "from-green-500/20 to-emerald-500/20",
      skills: [
        { name: "Spring Boot", level: 60 },
        { name: "Spring Security", level: 60 },
        { name: "Java", level: 60 },
        { name: "Node.js", level: 75 },
        { name: "MySQL", level: 70 },
      ],
    },
    {
      category: "Android 开发",
      color: "from-amber-500/20 to-orange-500/20",
      skills: [
        { name: "Kotlin", level: 70 },
        { name: "Jetpack Compose", level: 65 },
        { name: "Kotlin Multiplatform", level: 60 },
      ],
    },
  ]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-muted/30">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex items-center justify-center space-x-2 mb-12"
        >
          <div className="h-px w-12 bg-primary/60" />
          <h2 className="text-lg font-medium text-primary">专业技能</h2>
          <div className="h-px w-12 bg-primary/60" />
        </motion.div>

        <motion.h3
          className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          我的<span className="text-primary">技术</span>栈和能力
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((category, idx) => (
            <motion.div
              key={category.category}
              className="relative"
              style={{ y }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div
                className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br ${category.color} opacity-30 blur-xl`}
              />
              <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 h-full shadow-lg">
                <h4 className="text-xl font-semibold mb-6">{category.category}</h4>
                <div className="space-y-5">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="text-primary">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: idx * 0.1 + 0.4, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
