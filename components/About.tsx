'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">About Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-blue-500/30 rounded-tl-3xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-purple-500/30 rounded-br-3xl" />
            
            {/* Content Card */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 sm:p-12 shadow-2xl">
              <div className="space-y-6">
                <motion.p 
                  className="text-lg sm:text-xl text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  I'm a <span className="text-blue-400 font-semibold">Mathematics and Computer Science professional</span> with 
                  expertise in building efficient and intelligent software systems. My background combines mathematical 
                  reasoning with practical software development to solve complex problems.
                </motion.p>
                
                <motion.p 
                  className="text-lg sm:text-xl text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  My mathematical foundation strengthens my ability to think analytically and design optimized algorithms. 
                  I leverage mathematical concepts to structure logic, analyze data, and develop scalable applications 
                  that perform efficiently at scale.
                </motion.p>
                
                <motion.p 
                  className="text-lg sm:text-xl text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  I specialize in <span className="text-purple-400 font-semibold">problem solving, system optimization</span>, and 
                  applying mathematical principles to build reliable software solutions that address real-world challenges 
                  and deliver measurable impact.
                </motion.p>
              </div>

              {/* Accent Line */}
              <motion.div 
                className="mt-8 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
              
              {/* Education */}
              <motion.div
                className="mt-8 pt-6 border-t border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <p className="text-base sm:text-lg text-gray-400 italic">
                  <span className="text-cyan-400 font-semibold not-italic">BSc Mathematics & Computer Science</span> from <span className="text-cyan-400 font-semibold not-italic">Maseno University</span>—the only university in the world on the Equator—where global perspective isn't just a mindset, it's a daily walk between hemispheres.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
