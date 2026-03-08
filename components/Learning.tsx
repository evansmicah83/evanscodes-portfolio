'use client'

import { motion } from 'framer-motion'

export default function Learning() {
  const topics = [
    'Machine Learning',
    'Data Science',
    'Algorithm Optimization',
    'Artificial Intelligence',
    'Mathematical Computing',
    'Advanced Calculus',
    'Cryptography',
    'Computer Vision'
  ]

  return (
    <section id="learning" className="py-12 sm:py-16 lg:py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What I&apos;m Currently Learning
        </motion.h2>
        <div className="max-w-4xl mx-auto">
          <motion.p
            className="text-base sm:text-lg text-center mb-8 text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Continuous learning is key to staying at the forefront of technology and mathematics.
            Here are some areas I&apos;m currently exploring and deepening my knowledge in:
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {topics.map((topic, index) => (
              <motion.div
                key={topic}
                className="bg-gray-900 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-blue-400">{topic}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}