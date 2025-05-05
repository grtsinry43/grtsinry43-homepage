"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Mail, ExternalLink, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"])

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-muted/30">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent" />

        {/* Animated circles */}
        <motion.div
          className="absolute -bottom-[40%] -left-[10%] w-[80%] h-[80%] rounded-full opacity-20 blur-3xl"
          style={{
            background: "linear-gradient(180deg, rgba(var(--primary-rgb), 0.3) 0%, rgba(var(--primary-rgb), 0) 100%)",
            y: y1,
          }}
        />

        <motion.div
          className="absolute -top-[30%] -right-[10%] w-[60%] h-[60%] rounded-full opacity-10 blur-3xl"
          style={{
            background: "linear-gradient(180deg, rgba(var(--primary-rgb), 0.3) 0%, rgba(var(--primary-rgb), 0) 100%)",
            y: y2,
          }}
        />
      </div>

      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex items-center justify-center space-x-2 mb-12"
        >
          <div className="h-px w-12 bg-primary/60" />
          <h2 className="text-lg font-medium text-primary">联系我</h2>
          <div className="h-px w-12 bg-primary/60" />
        </motion.div>

        <motion.h3
          className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          有<span className="text-primary">项目</span>想要讨论？或是只是想要聊聊天？😉
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-xl">如果您有任何问题或合作意向，欢迎通过以下方式联系我：</p>

            <div className="space-y-6">
              <motion.a
                href="mailto:grtsinry43@outlook.com"
                className="flex items-center gap-3 text-lg hover:text-primary transition-all duration-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                grtsinry43@outlook.com
              </motion.a>

              <motion.a
                href="https://github.com/grtsinry43"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg hover:text-primary transition-all duration-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Github className="h-5 w-5 text-primary" />
                </div>
                github.com/grtsinry43
              </motion.a>

              <motion.a
                href="https://blog.grtsinry43.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg hover:text-primary transition-all duration-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <ExternalLink className="h-5 w-5 text-primary" />
                </div>
                blog.grtsinry43.com
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl border border-border/50 shadow-xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full filter blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full filter blur-3xl -z-10" />

              <form className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    称呼
                  </label>
                  <input
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                    placeholder="怎么称呼您？"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    邮箱
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                    placeholder="您的邮箱"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    留言
                  </label>
                  <textarea
                    id="message"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 min-h-[120px]"
                    placeholder="您的留言"
                  ></textarea>
                </div>

                <Button type="submit" className="w-full rounded-lg py-6 group">
                  <span className="flex items-center gap-2">
                    发送留言
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
