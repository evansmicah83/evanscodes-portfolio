'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface Project {
  title: string
  tagline: string
  overview: string
  capabilities: string[]
  techStack: string[]
  mathConcepts: { symbol: string; concept: string; application: string }[]
  stats?: { label: string; value: string }[]
  media: {
    type: 'carousel' | 'video' | 'both' | 'diagram'
    images?: string[]
    video?: string
    labels: { images?: string; video?: string }
  }
  repo?: string
  liveDemo?: string
  isConcept?: boolean
  conceptLink?: string
}

export default function Projects() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [lightboxImage, setLightboxImage] = useState<{ projectIndex: number; imageIndex: number } | null>(null)
  const [showConceptProjects, setShowConceptProjects] = useState(false)
  const [activeCarouselIndex, setActiveCarouselIndex] = useState<{ [key: number]: number }>({})
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState<{ [key: number]: boolean }>({})
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({})

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
        type: 'both',
        images: ['/smart-sale/smart-sale.png', '/smart-sale/smart-sale 1.png', '/smart-sale/smart-sale 2 (1).jpeg', '/smart-sale/smart-sale 2 (2).jpeg'],
        video: '/smart-sale/smart video.mp4',
        labels: { images: 'System Preview', video: 'Platform Demo' }
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
        type: 'both',
        images: ['/CIRAS/ciras.png', '/CIRAS/ciras1.png', '/CIRAS/ciras2.png'],
        video: '/CIRAS/ciras video.mp4',
        labels: { images: 'System Interface', video: 'System Demonstration' }
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
        images: ['/Anony/anony.png', '/Anony/anony1.png', '/Anony/anony2.png'],
        video: '/Anony/anony video.mp4',
        labels: { images: 'Platform Interface', video: 'Live Chat Demonstration' }
      },
      repo: 'https://github.com/evansmicah83/anonymous-mental-health-chat'
    }
  ]

  const conceptProjects: Project[] = [
    {
      title: 'Distributed Microservices E-Commerce Platform',
      tagline: 'Architecture Prototype',
      overview: 'A scalable microservices architecture design for high-traffic e-commerce systems, featuring event-driven communication, distributed transactions, and fault-tolerant service orchestration.',
      capabilities: [
        'Designed microservices architecture with domain-driven design principles',
        'Implemented event-driven communication using message queues and pub/sub patterns',
        'Architected distributed transaction management with saga pattern',
        'Designed API gateway with rate limiting and circuit breaker patterns',
        'Planned horizontal scaling strategy with load balancing and service discovery'
      ],
      techStack: ['Microservices', 'Docker', 'Kubernetes', 'RabbitMQ', 'Redis', 'PostgreSQL', 'API Gateway'],
      mathConcepts: [
        { symbol: '⚖️', concept: 'Load Balancing Theory', application: 'Applied weighted round-robin algorithms for optimal traffic distribution across service instances' },
        { symbol: '🔄', concept: 'CAP Theorem', application: 'Designed system trade-offs between consistency and availability in distributed database architecture' },
        { symbol: '📊', concept: 'Queueing Theory', application: 'Optimized message queue throughput using Little\'s Law for request processing rates' }
      ],
      stats: [
        { label: 'Pattern', value: 'Microservices' },
        { label: 'Architecture', value: 'Event-Driven' },
        { label: 'Type', value: 'Concept Design' }
      ],
      media: {
        type: 'both',
        images: ['/Distributed/Distributed Microservices E-Commerce Platform (1).png', '/Distributed/Distributed Microservices E-Commerce Platform (2).png'],
        labels: { images: 'Architecture Preview' }
      },
      isConcept: true,
      conceptLink: '#'
    },
    {
      title: 'AI-Powered Predictive Analytics Engine',
      tagline: 'Concept System Design',
      overview: 'An intelligent data processing pipeline that leverages machine learning for real-time predictive analytics, featuring automated model training, feature engineering, and scalable inference architecture.',
      capabilities: [
        'Designed real-time data ingestion pipeline with stream processing',
        'Architected ML model training workflow with automated hyperparameter tuning',
        'Implemented feature store for consistent feature engineering across models',
        'Designed model versioning and A/B testing infrastructure',
        'Planned scalable inference API with model serving optimization'
      ],
      techStack: ['Python', 'TensorFlow', 'Apache Kafka', 'Apache Spark', 'MLflow', 'FastAPI', 'MongoDB'],
      mathConcepts: [
        { symbol: '∇', concept: 'Gradient Descent', application: 'Optimized neural network training using adaptive learning rate algorithms (Adam, RMSprop)' },
        { symbol: '∑', concept: 'Statistical Modeling', application: 'Applied ensemble methods combining multiple weak learners for robust predictions' },
        { symbol: '∫', concept: 'Time Series Analysis', application: 'Implemented ARIMA and LSTM models for temporal pattern recognition and forecasting' }
      ],
      stats: [
        { label: 'Domain', value: 'Machine Learning' },
        { label: 'Processing', value: 'Real-Time' },
        { label: 'Type', value: 'Concept Design' }
      ],
      media: {
        type: 'both',
        images: ['/AI-Powered/AI-Powered Predictive  (1).png', '/AI-Powered/AI-Powered Predictive  (2).png'],
        labels: { images: 'System Architecture' }
      },
      isConcept: true,
      conceptLink: '#'
    }
  ]

  const openLightbox = (projectIndex: number, imageIndex: number) => {
    setLightboxImage({ projectIndex, imageIndex })
  }

  const openConceptLightbox = (conceptIndex: number, imageIndex: number) => {
    setLightboxImage({ projectIndex: projects.length + conceptIndex, imageIndex })
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  const nextCarousel = (projectIndex: number, totalImages: number) => {
    setActiveCarouselIndex(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % totalImages
    }))
  }

  const prevCarousel = (projectIndex: number, totalImages: number) => {
    setActiveCarouselIndex(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) - 1 + totalImages) % totalImages
    }))
  }

  const nextLightboxImage = () => {
    if (!lightboxImage) return
    const allProjects = [...projects, ...conceptProjects]
    const project = allProjects[lightboxImage.projectIndex]
    const totalImages = project.media.images?.length || 0
    setLightboxImage({
      ...lightboxImage,
      imageIndex: (lightboxImage.imageIndex + 1) % totalImages
    })
  }

  const prevLightboxImage = () => {
    if (!lightboxImage) return
    const allProjects = [...projects, ...conceptProjects]
    const project = allProjects[lightboxImage.projectIndex]
    const totalImages = project.media.images?.length || 0
    setLightboxImage({
      ...lightboxImage,
      imageIndex: (lightboxImage.imageIndex - 1 + totalImages) % totalImages
    })
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    if (isLeftSwipe) nextLightboxImage()
    if (isRightSwipe) prevLightboxImage()
  }

  // Eager preload all project media for instant display
  useEffect(() => {
    const allProjects = [...projects, ...conceptProjects]

    allProjects.forEach((project) => {
      project.media.images?.forEach((src) => {
        const img = new Image()
        img.src = src
      })

      if (project.media.video) {
        const video = document.createElement('video')
        video.preload = 'auto'
        video.src = project.media.video
      }
    })
  }, [])

  // Auto-scroll carousel
  useEffect(() => {
    const intervals: { [key: number]: NodeJS.Timeout } = {}
    
    const allProjects = [...projects, ...conceptProjects]
    allProjects.forEach((project, index) => {
      if (project.media.images && project.media.images.length > 1 && isAutoScrolling[index] !== false) {
        intervals[index] = setInterval(() => {
          nextCarousel(index, project.media.images!.length)
        }, 3000)
      }
    })

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval))
    }
  }, [activeCarouselIndex, isAutoScrolling])

  // Video autoplay on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    projects.forEach((project, index) => {
      if (project.media.video) {
        const videoElement = videoRefs.current[index]
        if (videoElement) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  videoElement.play().catch(() => {})
                } else {
                  videoElement.pause()
                }
              })
            },
            { threshold: 0.5 }
          )

          observer.observe(videoElement)
          observers.push(observer)
        }
      }
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [])

  const pauseAutoScroll = (index: number) => {
    setIsAutoScrolling(prev => ({ ...prev, [index]: false }))
  }

  const resumeAutoScroll = (index: number) => {
    setIsAutoScrolling(prev => ({ ...prev, [index]: true }))
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              {/* Animated Architecture Diagram for Concept Projects */}
              {project.media.type === 'diagram' && (
                <div className="relative h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.8 }} />
                      </linearGradient>
                      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0.8 }} />
                      </linearGradient>
                    </defs>
                    
                    {index === 3 ? (
                      // Microservices Architecture
                      <>
                        {/* API Gateway */}
                        <motion.rect x="350" y="30" width="100" height="60" rx="8" fill="url(#grad1)" stroke="#60a5fa" strokeWidth="2"
                          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} />
                        <motion.text x="400" y="65" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>API Gateway</motion.text>
                        
                        {/* Microservices */}
                        {[0, 1, 2, 3].map((i) => (
                          <motion.g key={i}
                            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1 }}>
                            <rect x={150 + i * 150} y="150" width="100" height="60" rx="8" fill="url(#grad2)" stroke="#a78bfa" strokeWidth="2" />
                            <text x={200 + i * 150} y="185" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Service {i + 1}</text>
                          </motion.g>
                        ))}
                        
                        {/* Database Layer */}
                        {[0, 1, 2].map((i) => (
                          <motion.g key={i}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.1 }}>
                            <ellipse cx={225 + i * 175} cy="300" rx="50" ry="30" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                            <text x={225 + i * 175} y="305" textAnchor="middle" fill="#60a5fa" fontSize="11">DB {i + 1}</text>
                          </motion.g>
                        ))}
                        
                        {/* Connection Lines */}
                        {[0, 1, 2, 3].map((i) => (
                          <motion.line key={i} x1="400" y1="90" x2={200 + i * 150} y2="150" stroke="#60a5fa" strokeWidth="2" strokeDasharray="5,5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }} />
                        ))}
                        {[0, 1, 2].map((i) => (
                          <motion.line key={i} x1={200 + i * 150} y1="210" x2={225 + i * 175} y2="270" stroke="#a78bfa" strokeWidth="2" strokeDasharray="5,5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }} />
                        ))}
                        
                        {/* Message Queue */}
                        <motion.rect x="650" y="150" width="120" height="60" rx="8" fill="#0f172a" stroke="#ec4899" strokeWidth="2"
                          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}>
                          <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                        </motion.rect>
                        <motion.text x="710" y="185" textAnchor="middle" fill="#ec4899" fontSize="12" fontWeight="600"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>Message Queue</motion.text>
                      </>
                    ) : (
                      // ML Pipeline Architecture
                      <>
                        {/* Data Ingestion */}
                        <motion.rect x="50" y="170" width="100" height="60" rx="8" fill="url(#grad1)" stroke="#60a5fa" strokeWidth="2"
                          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} />
                        <motion.text x="100" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Data Ingestion</motion.text>
                        
                        {/* Feature Store */}
                        <motion.rect x="200" y="170" width="100" height="60" rx="8" fill="url(#grad2)" stroke="#a78bfa" strokeWidth="2"
                          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} />
                        <motion.text x="250" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="600"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Feature Store</motion.text>
                        
                        {/* ML Training */}
                        <motion.rect x="350" y="100" width="100" height="60" rx="8" fill="url(#grad1)" stroke="#60a5fa" strokeWidth="2"
                          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                          <animate attributeName="fill-opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                        </motion.rect>
                        <motion.text x="400" y="135" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>ML Training</motion.text>
                        
                        {/* Model Registry */}
                        <motion.rect x="350" y="240" width="100" height="60" rx="8" fill="url(#grad2)" stroke="#a78bfa" strokeWidth="2"
                          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} />
                        <motion.text x="400" y="275" textAnchor="middle" fill="white" fontSize="12" fontWeight="600"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>Model Registry</motion.text>
                        
                        {/* Inference API */}
                        <motion.rect x="550" y="170" width="100" height="60" rx="8" fill="url(#grad1)" stroke="#60a5fa" strokeWidth="2"
                          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }} />
                        <motion.text x="600" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>Inference API</motion.text>
                        
                        {/* Monitoring */}
                        <motion.rect x="700" y="170" width="80" height="60" rx="8" fill="#0f172a" stroke="#ec4899" strokeWidth="2"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                          <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                        </motion.rect>
                        <motion.text x="740" y="205" textAnchor="middle" fill="#ec4899" fontSize="11" fontWeight="600"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>Monitoring</motion.text>
                        
                        {/* Connection Lines */}
                        <motion.line x1="150" y1="200" x2="200" y2="200" stroke="#60a5fa" strokeWidth="2"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.3 }} />
                        <motion.line x1="300" y1="200" x2="350" y2="160" stroke="#a78bfa" strokeWidth="2"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.3 }} />
                        <motion.line x1="300" y1="200" x2="350" y2="270" stroke="#a78bfa" strokeWidth="2"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.3 }} />
                        <motion.line x1="450" y1="270" x2="550" y2="200" stroke="#60a5fa" strokeWidth="2"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.0, duration: 0.3 }} />
                        <motion.line x1="650" y1="200" x2="700" y2="200" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.3 }} />
                      </>
                    )}
                  </svg>
                </div>
              )}

              {/* Video Section */}
              {(project.media.type === 'video' || project.media.type === 'both') && project.media.video && (
                <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                  <video
                    ref={(el) => { videoRefs.current[index] = el }}
                    src={project.media.video}
                    className="w-full h-full object-contain"
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="auto"
                    poster={project.media.images?.[0]}
                    onLoadedData={(e) => {
                      const video = e.currentTarget
                      video.play().catch(() => {})
                    }}
                  />
                </div>
              )}

              {/* Image Thumbnails Below Video */}
              {project.media.images && project.media.images.length > 0 && (
                <div className="p-4 bg-gray-900/50 border-t border-gray-700/30">
                  <div className="grid grid-cols-4 gap-2">
                    {project.media.images.map((img, imgIndex) => (
                      <button
                        key={imgIndex}
                        onClick={() => openLightbox(index, imgIndex)}
                        className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105"
                      >
                        <img
                          src={img}
                          alt={`Screenshot ${imgIndex + 1}`}
                          className="w-full h-full object-cover"
                          loading="eager"
                          decoding="async"
                          fetchpriority="high"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {project.overview}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-3 mb-4">
                  {project.isConcept ? (
                    <button
                      onClick={() => setConceptModal(index)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Explore Design
                    </button>
                  ) : (
                    <button
                      onClick={() => project.repo && window.open(project.repo, '_blank')}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View Repository
                    </button>
                  )}
                  {project.liveDemo && (
                    <button
                      onClick={() => window.open(project.liveDemo, '_blank')}
                      className="px-5 py-3 bg-gray-700/50 hover:bg-gray-700 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Stats Pills */}
                {project.stats && (
                  <div className="flex flex-wrap gap-2">
                    {project.stats.map((stat, i) => (
                      <div key={i} className="bg-gray-700/30 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                        <span className="text-xs font-medium text-gray-400">{stat.label}:</span>
                        <span className="text-xs font-bold text-blue-400">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Expandable Content */}
              <div className={`overflow-hidden transition-all duration-500 ${expandedProject === index ? 'max-h-[2000px]' : 'max-h-0'}`}>
                <div className="p-6 space-y-6 border-t border-gray-700/30">
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

                  {/* Visual Demonstration - Removed from expandable section */}

                  {/* Repository Link */}
                  <div className="flex gap-3">
                    {project.isConcept ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); setConceptModal(index) }}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Explore Design
                      </button>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); project.repo && window.open(project.repo, '_blank') }}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View Code
                      </button>
                    )}
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

              {/* View Details Button */}
              <button
                onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                className="w-full p-5 border-t border-gray-700/50 bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 transition-all duration-300 group/btn"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-base font-bold text-blue-400 group-hover/btn:text-blue-300 transition-colors">
                    {expandedProject === index ? 'Hide Details' : 'View Full Details'}
                  </span>
                  <svg
                    className={`w-5 h-5 text-blue-400 group-hover/btn:text-blue-300 transition-all duration-300 ${expandedProject === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            </motion.div>
          ))}

          {/* Explore More Projects Card */}
          <motion.div
            className="group bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl border-2 border-purple-500/50 rounded-3xl overflow-hidden hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: projects.length * 0.15 }}
            onClick={() => setShowConceptProjects(!showConceptProjects)}
          >
            <div className="relative h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center overflow-hidden">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                  animate={{ rotate: showConceptProjects ? 180 : 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </motion.div>
                <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Concept Designs
                </h3>
                <p className="text-purple-200 text-lg font-semibold mb-2">Architecture Prototypes</p>
                <p className="text-purple-300/80 text-sm px-6">Explore advanced system designs & architectural concepts</p>
              </motion.div>
              
              {/* Animated Background Elements */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 3) * 20}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="bg-purple-500/20 border border-purple-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-300">
                  2 Projects
                </span>
                <span className="bg-pink-500/20 border border-pink-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold text-pink-300">
                  System Design
                </span>
              </div>
              
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-5 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2">
                <svg className={`w-5 h-5 transition-transform duration-300 ${showConceptProjects ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {showConceptProjects ? 'Hide Projects' : 'Explore More Projects'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Concept Projects - Slide Down */}
        <AnimatePresence>
          {showConceptProjects && (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mt-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              {conceptProjects.map((project, cIndex) => {
                const index = projects.length + cIndex
                return (
                  <motion.div
                    key={cIndex}
                    className="group bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-purple-500/50 rounded-3xl overflow-hidden hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: cIndex * 0.2 }}
                  >
                    {/* Single Auto-Animating Image */}
                    {project.media.images && project.media.images.length > 0 && (
                      <div 
                        className="relative h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-gray-900 to-black overflow-hidden cursor-pointer"
                        onClick={() => openConceptLightbox(cIndex, activeCarouselIndex[index] || 0)}
                      >
                        <img
                          src={project.media.images[activeCarouselIndex[index] || 0]}
                          alt={`${project.title} - Architecture`}
                          className="w-full h-full object-contain transition-opacity duration-500"
                          loading="eager"
                        />
                        {project.media.images.length > 1 && (
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {project.media.images.map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  (activeCarouselIndex[index] || 0) === i ? 'bg-purple-400 w-6' : 'bg-gray-500'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {project.overview}
                      </p>
                      
                      <div className="flex gap-3 mb-4">
                        <button
                          onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          View Architecture
                        </button>
                      </div>
                      
                      {project.stats && (
                        <div className="flex flex-wrap gap-2">
                          {project.stats.map((stat, i) => (
                            <div key={i} className="bg-gray-700/30 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                              <span className="text-xs font-medium text-gray-400">{stat.label}:</span>
                              <span className="text-xs font-bold text-purple-400">{stat.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Expandable Content */}
                    <div className={`overflow-hidden transition-all duration-500 ${expandedProject === index ? 'max-h-[2000px]' : 'max-h-0'}`}>
                      <div className="p-6 space-y-6 border-t border-gray-700/30">
                        <div>
                          <h4 className="text-sm font-semibold text-purple-400 mb-2 flex items-center gap-2">
                            <span className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                            Overview
                          </h4>
                          <p className="text-sm text-gray-300">{project.overview}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                            <span className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                            Architecture Highlights
                          </h4>
                          <ul className="space-y-2">
                            {project.capabilities.map((cap, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                <svg className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{cap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                            <span className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                            Technology Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, i) => (
                              <span key={i} className="bg-gray-700/50 px-3 py-1 rounded-lg text-xs font-medium text-gray-300">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                      className="w-full p-5 border-t border-gray-700/50 bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 transition-all duration-300 group/btn"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-base font-bold text-purple-400 group-hover/btn:text-purple-300 transition-colors">
                          {expandedProject === index ? 'Hide Details' : 'View Full Details'}
                        </span>
                        <svg
                          className={`w-5 h-5 text-purple-400 group-hover/btn:text-purple-300 transition-all duration-300 ${expandedProject === index ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Professional Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all duration-300 hover:scale-110 group"
              aria-label="Close"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Container */}
            <motion.div
              className="relative max-w-7xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main Image */}
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl">
                <motion.img
                  key={lightboxImage.imageIndex}
                  src={[...projects, ...conceptProjects][lightboxImage.projectIndex].media.images?.[lightboxImage.imageIndex]}
                  alt={`${[...projects, ...conceptProjects][lightboxImage.projectIndex].title} - Image ${lightboxImage.imageIndex + 1}`}
                  className="w-full max-h-[80vh] object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Navigation Arrows */}
                {([...projects, ...conceptProjects][lightboxImage.projectIndex].media.images?.length || 0) > 1 && (
                  <>
                    <button
                      onClick={prevLightboxImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-full transition-all duration-300 hover:scale-110"
                      aria-label="Previous"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextLightboxImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-full transition-all duration-300 hover:scale-110"
                      aria-label="Next"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold text-white">
                    {lightboxImage.imageIndex + 1} / {[...projects, ...conceptProjects][lightboxImage.projectIndex].media.images?.length}
                  </span>
                </div>
              </div>

              {/* Project Info Below Image */}
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  {[...projects, ...conceptProjects][lightboxImage.projectIndex].title}
                </h3>
                <p className="text-sm text-gray-400">
                  {[...projects, ...conceptProjects][lightboxImage.projectIndex].tagline}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}