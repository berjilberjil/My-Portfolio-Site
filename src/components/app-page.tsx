'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { FaBirthdayCake, FaGlobe, FaEnvelope, FaMapMarkerAlt, FaGraduationCap, FaFreeCodeCamp } from "react-icons/fa"
import { SiFlutter, SiNodedotjs, SiWordpress, SiFigma, SiFirebase } from "react-icons/si"
import Image from "next/image"
import { motion, useScroll, useTransform } from 'framer-motion'

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  category: 'UI/UX' | 'App Dev' | 'Web Dev';
}

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

const projects: Project[] = [
  { id: 1, title: "E-commerce UI Redesign", description: "A modern UI redesign for an e-commerce platform", image: "/images/project1.jpg", link: "https://www.figma.com/file/example1", category: "UI/UX" },
  { id: 2, title: "Travel App UI", description: "User interface design for a travel planning application", image: "/images/project1.jpg", link: "https://www.figma.com/file/example2", category: "UI/UX" },
  { id: 3, title: "Fitness Tracker App", description: "A mobile app for tracking workouts and nutrition", image: "/images/project1.jpg", link: "https://github.com/example/fitness-app", category: "App Dev" },
  { id: 4, title: "Weather App", description: "A simple weather application with geolocation", image: "/images/project1.jpg", link: "https://github.com/example/weather-app", category: "App Dev" },
  { id: 5, title: "Portfolio Website", description: "A responsive portfolio website for a photographer", image: "/images/project1.jpg", link: "https://www.example-portfolio.com", category: "Web Dev" },
  { id: 6, title: "Blog Platform", description: "A full-stack blog platform with user authentication", image: "/images/project1.jpg", link: "https://github.com/example/blog-platform", category: "Web Dev" },
]

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechInnovate",
    content: "Berjil's work on our app redesign was exceptional. His attention to detail and innovative solutions greatly improved our user experience.",
    avatar: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "GlobalSoft",
    content: "Working with Berjil was a pleasure. He delivered our web application on time and exceeded our expectations in terms of functionality and design.",
    avatar: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "CreativeMinds",
    content: "Berjil's UI/UX skills are top-notch. He transformed our outdated website into a modern, user-friendly platform that our customers love.",
    avatar: "/placeholder.svg?height=100&width=100"
  }
]

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('mousemove', moveCursor)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed w-8 h-8 rounded-full border-2 border-white pointer-events-none z-50 transition-transform duration-100 ease-out hidden md:block"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  )
}

export function Page() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const lineHeight = useTransform(scrollYProgress, [0, 0.2], ['0%', '100%'])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-black text-white relative cursor-none">
      <CustomCursor />
      <motion.div 
        className="fixed left-0 top-0 w-1 bg-white/30 z-50"
        style={{
          height: lineHeight,
          boxShadow: '0 0 10px #fff, 0 0 20px #fff',
        }}
      />

      {/* Header */}
     <motion.header 
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.5, delay: 0.5 }}
  className="sticky top-0 z-40 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 border-b border-white/10"
>
  <div className="container flex h-20 items-center justify-between px-[6%]"> {/* Changed px-4 sm:px-6 lg:px-8 to px-[6%] */}
    <a className="flex items-center space-x-2" href="/">
      <span className="text-xl font-bold">Berjil Jacob</span>
    </a>
    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
      {['about', 'portfolio', 'services', 'toolbox', 'testimonials', 'contact'].map((section) => (
        <button
          key={section}
          onClick={() => scrollToSection(section)}
          className="text-sm font-medium transition-colors hover:text-white"
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </button>
      ))}
    </nav>
    <button
      className="md:hidden"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  </div>
</motion.header>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {['about', 'portfolio', 'services', 'toolbox', 'testimonials', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-2xl font-medium transition-colors hover:text-white"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}<motion.section 
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.7 }}
  className="relative min-h-screen flex items-center"
>
  <div className="absolute inset-0 z-0">
    <div 
      className="w-full h-full"
      style={{
        background: 'repeating-linear-gradient(to right, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 30px)',
        backgroundSize: '30px 30px',
      }}
    />
  </div>
  <div className="container px-[6%] relative z-10"> {/* Changed px-4 sm:px-6 lg:px-8 to px-[6%] */}
    <div className="flex max-w-[500px] flex-col items-start gap-4">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
        I Make What You Think. So, Just Think!
      </h1>
      <p className="max-w-[700px] text-lg text-white/70"> 
        Innovative web developer crafting unique user experiences. 
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button 
          className="w-full sm:w-auto bg-white text-black hover:bg-black hover:text-white border border-white transition-colors"
          onClick={() => scrollToSection('portfolio')}
        >
          My Works
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto bg-black text-white border-white hover:bg-white hover:text-black transition-colors"
          onClick={() => scrollToSection('contact')}
        >
          Let&apos;s Talk!
        </Button>
      </div>
    </div>
  </div>
</motion.section>

      {/* About Section */}
      <motion.section 
        id="about"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white/5"
      >
        <div className="container px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[980px] flex-col items-start gap-8">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl mb-4">About Me</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <p className="text-lg text-white/70">
                  I&apos;m a passionate developer and aesthetic UI/UX designer who also has a strong interest in finance and enjoys diving into entrepreneurial ventures.
                </p>
                <p className="text-lg text-white/70">
                  A dedicated and creative individual with a passion for design, technology, and collaboration, seeking opportunities to contribute innovative solutions and make a meaningful impact.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FaBirthdayCake className="text-white" />
                  <span>Birthday: 23 March 2005</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaGlobe className="text-white" />
                  <span>Website: www.berjiljacob.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-white" />
                  <span>Email: berjiljacob@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-white" />
                  <span>Location: India, Tamil Nadu</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaGraduationCap className="text-white" />
                  <span>Degree: B.Tech Information Technology (In Progress)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaFreeCodeCamp className="text-white" />
                  <span>Freelance: Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Portfolio Section */}
      <motion.section 
        id="portfolio"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="container px-[6%] py-16 md:py-24 lg:py-32" 
      >
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl mb-8">My Portfolio</h2>
        {['UI/UX', 'App Dev', 'Web Dev'].map((category) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-bold mb-6">{category}</h3>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.filter(project => project.category === category).map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-lg transition-transform hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-48 sm:h-64"
                  />
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                    <p className="text-white/70">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.section>

      {/* Project Pop-up */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-white/10 p-6 sm:p-8 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
            <p className="text-white/70 mb-6">{selectedProject.description}</p>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white text-black px-4 py-2 rounded hover:bg-white/90 transition-colors text-center"
              >
                View Project
              </a>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto text-white/70 hover:text-white transition-colors border border-white/10 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Services Section */}
      <motion.section 
        id="services"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white/5"
      >
        <div className="container px-[6%] py-16 md:py-24 lg:py-32">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl mb-8">Services</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {['UI/UX Design', 'Web Development', 'Mobile App Design', 'Branding', 'Prototyping', 'Consulting'].map((service) => (
              <motion.div 
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-lg border border-white/10 bg-black/50 shadow-lg p-6 transition-all hover:bg-white/10 hover:backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold mb-4">{service}</h3>
                <p className="text-white/70">Offering professional {service.toLowerCase()} services tailored to your needs.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* My Toolbox Section */}
      <motion.section 
        id="toolbox"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="container px-[6%] py-16 md:py-24 lg:py-32"
      >
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl mb-8">My Toolbox</h2>
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[
            { icon: SiFlutter, name: "Flutter" },
            { icon: SiNodedotjs, name: "Node.js" },
            { icon: SiWordpress, name: "WordPress" },
            { icon: SiFigma, name: "Figma" },
            { icon: SiFirebase, name: "Firebase" },
          ].map((tool) => (
            <motion.div 
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center gap-4 p-4 rounded-lg border border-white/10 bg-white/5"
            >
              <tool.icon className="text-4xl" />
              <span className="text-sm sm:text-base font-semibold text-center">{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        id="testimonials"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white/5"
      >
        <div className="container px-[6%] py-16 md:py-24 lg:py-32">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl mb-8">Testimonials</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <motion.div 
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-lg border border-white/10 bg-black/50 shadow-lg p-6 transition-all hover:bg-white/10 hover:backdrop-blur-sm"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-white/70">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-white/90 italic">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="container px-[6%] py-16 md:py-24 lg:py-32"
      >
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl mb-8">Contact Me</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-lg text-white/70 mb-6">
              Interested in working together? Fill out the form below with some info about your project 
              and I will get back to you as soon as I can.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <FaGithub size={28} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <FaLinkedin size={28} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <FaTwitter size={28} />
              </a>
            </div>
          </div>
          <form className="space-y-6">
            <Input placeholder="Name" className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary" />
            <Input type="email" placeholder="Email" className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary" />
            <Textarea placeholder="Your message" className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary" />
            <Button type="submit" size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-white/90">Send Message</Button>
          </form>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-white/10">
  <div className="container px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row md:py-0">
    <p className="text-center text-sm text-white/70 md:text-left md:ml-[6%]">
      © 2023 Berjil Jacob. All rights reserved.
    </p>
  </div>
</footer>
    </div>
  )
}