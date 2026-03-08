'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'

export default function GitHubActivity() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    if (!svg) return

    // Mock GitHub contribution data
    const data = Array.from({ length: 52 }, () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 5)))

    const cellSize = 12
    const margin = { top: 20, right: 20, bottom: 20, left: 20 }
    const width = 52 * cellSize + margin.left + margin.right
    const height = 7 * cellSize + margin.top + margin.bottom

    svg.attr('width', width).attr('height', height)

    const color = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, 4])

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    g.selectAll('rect')
      .data(data.flat())
      .enter()
      .append('rect')
      .attr('x', (d, i) => (i % 52) * cellSize)
      .attr('y', (d, i) => Math.floor(i / 52) * cellSize)
      .attr('width', cellSize - 1)
      .attr('height', cellSize - 1)
      .attr('fill', d => color(d))
      .attr('rx', 2)
      .attr('ry', 2)
  }, [])

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          GitHub Activity
        </motion.h2>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gray-800 p-8 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Contribution Graph</h3>
            <svg ref={svgRef} className="mx-auto"></svg>
            <p className="mt-6 text-gray-300">
              This visualization represents coding consistency and project development patterns over the past year.
              Each square represents a day, with darker colors indicating more contributions.
            </p>
            <div className="flex justify-center mt-4 space-x-4 text-sm">
              <span>Less</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-blue-100 rounded"></div>
                <div className="w-3 h-3 bg-blue-200 rounded"></div>
                <div className="w-3 h-3 bg-blue-400 rounded"></div>
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <div className="w-3 h-3 bg-blue-800 rounded"></div>
              </div>
              <span>More</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}