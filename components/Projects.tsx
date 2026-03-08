'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Project {
  title: string
  tagline: string
  overview: string
  capabilities: string[]
  techStack: string[]
  mathConcepts: { symbol: string; concept: string; application: string }[]
  stats?: { label: string; value: string }[]
  media: {
    type: 'carousel' | 'video' | 'both'
    images?: string[]
    video?: string
    labels: { images?: string; video?: string }
  }
  repo: string
  liveDemo?: string
}

export default function Projects() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [activeImage, setActiveImage] = useState<{ [key: number]: number }>({})

  const projects: Project[] = [
    {
      title: 'Smart Sale Networking System',
      tagline: 'Scalable Referral Commerce Platform',
      overview: 'A full-stack networking and digital commerce platform engineered with structured backend architecture and referral-driven system logic. The platform demonstrates the design of scalable user relationships, commission flows, and administrative infrastructure management.',
      capabilities: [
        'Designed hierarchical referral network structures and relationship mapping',
        'Implemented commission calculation and distribution workflows',
        'Built structured backend architecture using Laravel MVC principles',
        'Developed administrative monitoring and control interfaces',
        'Applied analytical reasoning to system workflows and infrastructure behavior'
      ],
      techStack: ['Laravel', 'PHP', 'MySQL', 'JavaScript'],
      mathConcepts: [
        { symbol: '🌳', concept: 'Graph Theory', application: 'Modeled referral networks as directed acyclic graphs (DAGs) for hierarchical user relationships' },
        { symbol: '∑', concept: 'Recursive Algorithms', application: 'Calculated multi-level commission distributions using recursive tree traversal' },
        { symbol: '⊆', concept: 'Set Theory', application: 'Managed user permissions and role-based access control through set operations' }
      ],
      stats: [
        { label: 'Architecture', value: 'MVC' },
        { label: 'Database', value: 'Relational' },
        { label: 'Focus', value: 'Backend Logic' }
      ],
      media: {
        type: 'carousel',
        images: ['/projects/smart-sale/landing.png', '/projects/smart-sale/dashboard.png', '/projects/smart-sale/referral.png', '/projects/smart-sale/admin.png'],
        labels: { images: 'System Preview' }
      },
      repo: 'https://github.com/evansmicah83/smart-sale-networking'
    },
    {
      title: 'Cybersecurity Incident Response System (CIRAS)',
      tagline: 'AI-Powered Security Expert System',
      overview: 'A rule-based expert system engineered to assist with cybersecurity incident detection, classification, and remediation planning. The platform integrates Python application logic with Prolog-based inference rules to simulate structured cybersecurity reasoning.',
      capabilities: [
        'Designed rule-based inference logic for incident classification',
        'Integrated Python application architecture with Prolog knowledge base',
        'Implemented automated remediation recommendation workflows',
        'Built an analytical dashboard for incident monitoring and evaluation',
        'Demonstrated expert system design principles and knowledge-based reasoning'
      ],
      techStack: ['Python', 'Prolog', 'Flask', 'Knowledge-Based Systems'],
      mathConcepts: [
        { symbol: '∧', concept: 'Propositional Logic', application: 'Implemented rule-based inference engine using logical AND/OR operations for threat detection' },
        { symbol: '∀', concept: 'First-Order Logic', application: 'Designed Prolog predicates with universal quantifiers for pattern matching across incidents' },
        { symbol: '⇒', concept: 'Conditional Reasoning', application: 'Built if-then rule chains for automated remediation recommendation workflows' }
      ],
      stats: [
        { label: 'Type', value: 'Expert System' },
        { label: 'Logic', value: 'Rule-Based' },
        { label: 'Domain', value: 'Cybersecurity' }
      ],
      media: {
        type: 'video',
        video: '/projects/ciras/demo.mp4',
        labels: { video: 'System Demonstration' }
      },
      repo: 'https://github.com/evansmicah83/cybersecurity-incident-response-system/tree/main/CIRAS_Expert_System'
    },
    {
      title: 'Anonymous Mental Health Communication Platform',
      tagline: 'Privacy-First Real-Time Messaging',
      overview: 'A real-time anonymous communication platform designed to reduce barriers to mental health engagement through privacy-first system design and secure live messaging.',
      capabilities: [
        'Implemented real-time communication using React and WebSocket architecture',
        'Built a Django-based backend for secure session and message handling',
        'Designed privacy-oriented user interaction flows with minimal identity exposure',
        'Developed scalable frontend interaction components for live chat systems',
        'Focused on accessibility, anonymity, and secure digital interaction'
      ],
      techStack: ['React.js', 'Python', 'Django', 'WebSockets', 'MySQL'],
      mathConcepts: [
        { symbol: '⊕', concept: 'Cryptographic Hashing', application: 'Applied hash functions for anonymous session ID generation without storing user identities' },
        { symbol: '≈', concept: 'Asynchronous Processing', application: 'Optimized WebSocket message queues using event-driven architecture for real-time delivery' },
        { symbol: 'O(1)', concept: 'Time Complexity', application: 'Designed constant-time message routing using hash-based session lookup tables' }
      ],
      stats: [
        { label: 'Protocol', value: 'WebSocket' },
        { label: 'Privacy', value: 'Anonymous' },
        { label: 'Type', value: 'Real-Time' }
      ],
      media: {
        type: 'both',
        images: ['/projects/mental-health/interface.png', '/projects/mental-health/chat.png', '/projects/mental-health/landing.png'],
        video: '/projects/mental-health/demo.mp4',
        labels: { images: 'Platform Interface', video: 'Live Chat Demonstration' }
      },
      repo: 'https://github.com/evansmicah83/anonymous-mental-health-chat'
    }
  ]

  const nextImage = (projectIndex: number, totalImages: number) => {
    setActiveImage(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % totalImages
    }))
  }

  const prevImage = (projectIndex: number, totalImages: number) => {
    setActiveImage(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) - 1 + totalImages) % totalImages
    }))
  }

  return (
    <section id="projects" className="py-20 bg-gray-900 light:bg-gray-100 text-white light:text-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Systems Portfolio</span>
          </h2>
          <p className="text-gray-400 light:text-gray-600 text-sm mb-4">
            Where <span className="text-blue-400 font-semibold">Mathematical Logic</span> Drives <span className="text-purple-400 font-semibold">Computational Innovation</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <motion.span 
              className="inline-flex items-center gap-1.5 text-blue-400"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <motion.span className="text-lg font-mono" whileHover={{ scale: 1.3, rotate: 360 }} transition={{ duration: 0.5 }}>∑</motion.span>
              <span className="font-medium">Algorithmic Thinking</span>
            </motion.span>
            <span className="text-gray-600">•</span>
            <motion.span 
              className="inline-flex items-center gap-1.5 text-purple-400"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <motion.span className="text-lg font-mono" whileHover={{ scale: 1.3, rotate: -360 }} transition={{ duration: 0.5 }}>∫</motion.span>
              <span className="font-medium">System Optimization</span>
            </motion.span>
            <span className="text-gray-600">•</span>
            <motion.span 
              className="inline-flex items-center gap-1.5 text-cyan-400"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <motion.span className="text-lg font-mono" whileHover={{ scale: 1.3, rotate: 360 }} transition={{ duration: 0.5 }}>∆</motion.span>
              <span className="font-medium">Logical Architecture</span>
            </motion.span>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group bg-gradient-to-br from-gray-800/90 to-gray-900/90 light:from-white light:to-gray-50 backdrop-blur-xl border border-gray-700/50 light:border-gray-300 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 cursor-pointer hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onClick={() => setExpandedProject(expandedProject === index ? null : index)}
            >
              {/* Card Header with Gradient Overlay */}
              <div className="relative p-6 border-b border-gray-700/50 light:border-gray-300 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all">
                        {project.title}
                      </h3>
                      <p className="text-xs font-medium text-blue-400/80 light:text-blue-600">{project.tagline}</p>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 light:text-gray-600 line-clamp-2">{project.overview}</p>
                  
                  {/* Stats Pills */}
                  {project.stats && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.stats.map((stat, i) => (
                        <div key={i} className="bg-gray-700/30 light:bg-gray-200/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                          <span className="text-xs font-medium text-gray-400 light:text-gray-600">{stat.label}:</span>
                          <span className="text-xs font-bold text-blue-400 light:text-blue-600">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Expandable Content */}
              <div className={`overflow-hidden transition-all duration-500 ${expandedProject === index ? 'max-h-[2000px]' : 'max-h-0'}`}>
                <div className="p-6 space-y-6">
                  {/* Overview */}
                  <div>
                    <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                      <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                      Overview
                    </h4>
                    <p className="text-sm text-gray-300 light:text-gray-700">{project.overview}</p>
                  </div>

                  {/* Engineering Highlights */}
                  <div>
                    <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                      Engineering Highlights
                    </h4>
                    <ul className="space-y-2">
                      {project.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300 light:text-gray-700">
                          <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mathematical Foundations */}
                  <div>
                    <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                      Mathematical Foundations
                    </h4>
                    <div className="space-y-3">
                      {project.mathConcepts.map((math, i) => (
                        <div key={i} className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-lg">
                              {math.symbol}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-purple-300 text-sm mb-1">{math.concept}</div>
                              <div className="text-xs text-gray-400 light:text-gray-600">{math.application}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technology Stack */}
                  <div>
                    <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="bg-gray-700/50 light:bg-gray-200 px-3 py-1 rounded-lg text-xs font-medium text-gray-300 light:text-gray-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Visual Demonstration */}
                  <div>
                    {/* Image Carousel */}
                    {(project.media.type === 'carousel' || project.media.type === 'both') && project.media.images && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                          {project.media.labels.images}
                        </h4>
                        <div className="relative bg-gray-950/50 light:bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={project.media.images[activeImage[index] || 0]}
                            alt={`${project.title} screenshot`}
                            className="w-full h-48 object-cover"
                          />
                          {project.media.images.length > 1 && (
                            <>
                              <button
                                onClick={(e) => { e.stopPropagation(); prevImage(index, project.media.images!.length) }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                              >
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); nextImage(index, project.media.images!.length) }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                              >
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                {project.media.images.map((_, i) => (
                                  <div key={i} className={`w-2 h-2 rounded-full ${(activeImage[index] || 0) === i ? 'bg-blue-400' : 'bg-gray-400'}`} />
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Video */}
                    {(project.media.type === 'video' || project.media.type === 'both') && project.media.video && (
                      <div>
                        <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                          {project.media.labels.video}
                        </h4>
                        <div className="bg-gray-950/50 light:bg-gray-200 rounded-lg overflow-hidden">
                          <video
                            src={project.media.video}
                            controls
                            className="w-full h-48 object-cover"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Repository Link */}
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); window.open(project.repo, '_blank') }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View Code
                    </button>
                    {project.liveDemo && (
                      <button
                        onClick={(e) => { e.stopPropagation(); window.open(project.liveDemo, '_blank') }}
                        className="px-4 py-3 bg-gray-700/50 hover:bg-gray-700 light:bg-gray-200 light:hover:bg-gray-300 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Expand Indicator */}
              <div className="p-4 border-t border-gray-700/50 light:border-gray-300 flex items-center justify-center gap-2 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent">
                <span className="text-xs font-medium text-gray-400 light:text-gray-600">
                  {expandedProject === index ? 'Show Less' : 'View Details'}
                </span>
                <svg
                  className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${expandedProject === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}