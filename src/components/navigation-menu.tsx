"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Menu, X } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

interface NavigationMenuProps {
  scrolled: boolean
}

export default function NavigationMenu({ scrolled }: NavigationMenuProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    { name: "关于", href: "#about" },
    { name: "技能", href: "#skills" },
    { name: "项目", href: "#projects" },
    { name: "联系", href: "#contact" },
    { name: "博客", href: "https://blog.grtsinry43.com", external: true },
  ]

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="hidden md:flex items-center space-x-8">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            {item.external ? (
              <Link
                href={item.href}
                className="relative text-sm font-medium hover:text-primary transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex items-center gap-1">
                  {item.name}
                  <ExternalLinkIcon className="w-3 h-3" />
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ) : (
              <Link
                href={item.href}
                className="relative text-sm font-medium hover:text-primary transition-colors group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            )}
          </motion.div>
        ))}

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button asChild variant="default" size="sm" className="hidden md:flex">
              <Link href="#contact">
                联系我 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Mobile navigation */}
      <div className="md:hidden flex items-center">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="ml-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex flex-col"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container px-4 py-4 flex justify-between items-center border-b border-border/30">
              <Link href="/" className="text-xl font-bold tracking-tight" onClick={handleLinkClick}>
                grtsinry43
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 space-y-8 p-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="w-full text-center"
                >
                  {item.external ? (
                    <Link
                      href={item.href}
                      className="text-2xl font-medium hover:text-primary transition-colors inline-block"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                    >
                      <span className="flex items-center justify-center gap-1">
                        {item.name}
                        <ExternalLinkIcon className="w-4 h-4" />
                      </span>
                    </Link>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-2xl font-medium hover:text-primary transition-colors inline-block"
                      onClick={handleLinkClick}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="pt-6"
              >
                <Button asChild size="lg">
                  <Link href="#contact" onClick={handleLinkClick}>
                    联系我 <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-external-link", className)}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  )
}
