'use client'

import { motion } from 'framer-motion'

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-gray-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Experience</span>
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
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent hidden sm:block" />

            {/* Experience Card */}
            <div className="relative pl-0 sm:pl-20">
              {/* Timeline Dot */}
              <div className="absolute left-6 top-8 w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-950 hidden sm:block" />

              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Industrial Attachment
                  </h3>
                  <div className="space-y-2">
                    <p className="text-lg text-gray-300 font-semibold">Manam Limited | ICT / Networking Department</p>
                    <p className="text-base text-gray-400 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Vanguard Plaza, Westlands, Nairobi, Kenya
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8 border-l-4 border-blue-500/30 pl-4">
                  Focused on Systems Infrastructure & Network Logic, applying analytical thinking to optimize network topology, 
                  improve system performance, and resolve software and hardware challenges. Leveraged mathematical and computational 
                  background to enhance IT operations and deliver tangible results.
                </p>

                {/* Achievements & Responsibilities */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                    Key Achievements & Responsibilities
                  </h4>
                  <ul className="space-y-3">
                    {[
                      'Optimized network infrastructure, reducing downtime and improving connectivity for over 100+ users',
                      'Installed and managed CCTV surveillance systems, ensuring robust security and seamless integration with IT operations',
                      'Designed, deployed, and troubleshot Wi-Fi networks and hotspot resale systems, improving network speed and reliability by over 30%',
                      'Diagnosed and resolved software and connectivity issues, enhancing operational efficiency and minimizing service interruptions',
                      'Maintained secure, scalable, and resilient IT systems, applying logical problem-solving to reduce errors and optimize workflow'
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3 text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      >
                        <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Skills & Competencies */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full" />
                    Skills & Competencies Developed
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Network Architecture & Topology Optimization',
                      'Systems & Software Troubleshooting',
                      'Infrastructure Design & Logical Analysis',
                      'Analytical Problem-Solving',
                      'Security & Scalable System Engineering'
                    ].map((skill, index) => (
                      <motion.div
                        key={skill}
                        className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 backdrop-blur-sm border border-gray-600/30 p-4 rounded-xl text-center hover:border-blue-500/50 hover:from-gray-700/70 hover:to-gray-800/70 transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        whileHover={{ y: -3 }}
                      >
                        <span className="text-gray-200 font-medium">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}