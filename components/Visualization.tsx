'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

type VisualizationType = 'sorting' | 'graph' | 'statistics'

interface SortStep {
  array: number[]
  comparing: number[]
  sorted: number[]
}

export default function Visualization() {
  const [activeViz, setActiveViz] = useState<VisualizationType>('sorting')
  const [showMath, setShowMath] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(50)
  
  const sortCanvasRef = useRef<HTMLCanvasElement>(null)
  const graphSvgRef = useRef<SVGSVGElement>(null)
  const statsSvgRef = useRef<SVGSVGElement>(null)
  const animationRef = useRef<number | null>(null)

  // Bubble Sort Visualization
  useEffect(() => {
    if (activeViz !== 'sorting' || !sortCanvasRef.current) return

    const canvas = sortCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const array = Array.from({ length: 40 }, () => Math.floor(Math.random() * 180) + 20)
    let i = 0
    let j = 0
    let lastTime = 0

    // Draw initial state
    const drawArray = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const barWidth = canvas.width / array.length
      array.forEach((value, index) => {
        let color = '#3b82f6'
        if (index === j || index === j + 1) color = '#f59e0b'
        if (index >= array.length - i) color = '#10b981'
        
        ctx.fillStyle = color
        ctx.fillRect(index * barWidth, canvas.height - value, barWidth - 2, value)
      })
    }

    // Draw initial state immediately
    drawArray()

    const animate = (currentTime: number) => {
      if (!isPlaying) return
      
      if (currentTime - lastTime < (100 - speed)) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastTime = currentTime

      if (j < array.length - i - 1) {
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]]
        }
        j++
      } else {
        j = 0
        i++
      }

      drawArray()

      if (i < array.length - 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setIsPlaying(false)
      }
    }

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [activeViz, isPlaying, speed])

  // Graph Traversal Visualization (BFS)
  useEffect(() => {
    if (activeViz !== 'graph' || !graphSvgRef.current) return

    const svg = d3.select(graphSvgRef.current)
    svg.selectAll('*').remove()

    const containerWidth = graphSvgRef.current.clientWidth || 500
    const width = Math.min(containerWidth, 500)
    const height = 300
    const scale = width / 500
    
    const nodes = [
      { id: 0, x: 250, y: 50 },
      { id: 1, x: 150, y: 130 },
      { id: 2, x: 350, y: 130 },
      { id: 3, x: 80, y: 220 },
      { id: 4, x: 180, y: 220 },
      { id: 5, x: 320, y: 220 },
      { id: 6, x: 420, y: 220 }
    ]

    const links = [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 1, target: 3 },
      { source: 1, target: 4 },
      { source: 2, target: 5 },
      { source: 2, target: 6 }
    ]

    const g = svg.append('g')

    // Draw edges
    g.selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('x1', d => nodes[d.source].x)
      .attr('y1', d => nodes[d.source].y)
      .attr('x2', d => nodes[d.target].x)
      .attr('y2', d => nodes[d.target].y)
      .attr('stroke', '#4b5563')
      .attr('stroke-width', 2)

    // Draw nodes
    const nodeGroups = g.selectAll('g')
      .data(nodes)
      .enter()
      .append('g')

    nodeGroups.append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 20)
      .attr('fill', '#1f2937')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)

    nodeGroups.append('text')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', '14px')
      .text(d => d.id)

    // BFS Animation
    if (isPlaying) {
      const visited = new Set<number>()
      const queue = [0]
      let step = 0

      const animateBFS = () => {
        if (queue.length === 0) {
          setIsPlaying(false)
          return
        }

        const current = queue.shift()!
        visited.add(current)

        nodeGroups.filter((d: any) => d.id === current)
          .select('circle')
          .transition()
          .duration(500)
          .attr('fill', '#10b981')

        links.forEach(link => {
          if (link.source === current && !visited.has(link.target)) {
            queue.push(link.target)
          }
        })

        setTimeout(animateBFS, 1000)
      }

      animateBFS()
    }
  }, [activeViz, isPlaying])

  // Statistical Visualization
  useEffect(() => {
    if (activeViz !== 'statistics' || !statsSvgRef.current) return

    const svg = d3.select(statsSvgRef.current)
    svg.selectAll('*').remove()

    const containerWidth = statsSvgRef.current.clientWidth || 500
    const svgWidth = Math.min(containerWidth, 500)
    const margin = { top: 20, right: 30, bottom: 40, left: 50 }
    const width = svgWidth - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom

    const data = d3.range(1000).map(d3.randomNormal(50, 12))

    const x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, width])

    const histogram = d3.histogram()
      .domain(x.domain() as [number, number])
      .thresholds(x.ticks(25))

    const bins = histogram(data)

    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length) || 0])
      .range([height, 0])

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // X axis
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5))
      .attr('color', '#9ca3af')

    // Y axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .attr('color', '#9ca3af')

    // Bars
    g.selectAll('rect')
      .data(bins)
      .enter()
      .append('rect')
      .attr('x', d => x(d.x0!)!)
      .attr('y', height)
      .attr('width', d => Math.max(0, x(d.x1!)! - x(d.x0!)! - 1))
      .attr('height', 0)
      .attr('fill', '#3b82f6')
      .transition()
      .duration(1000)
      .attr('y', d => y(d.length))
      .attr('height', d => height - y(d.length))

    // Normal curve overlay
    const normalCurve = d3.range(0, 100, 0.5).map(x => ({
      x,
      y: (1 / (12 * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - 50) / 12, 2))
    }))

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(normalCurve, d => d.y) || 0])
      .range([height, 0])

    const line = d3.line<{ x: number; y: number }>()
      .x(d => x(d.x))
      .y(d => yScale(d.y))

    g.append('path')
      .datum(normalCurve)
      .attr('fill', 'none')
      .attr('stroke', '#f59e0b')
      .attr('stroke-width', 2)
      .attr('d', line)
  }, [activeViz])

  const visualizations = [
    {
      id: 'sorting' as VisualizationType,
      title: 'Bubble Sort',
      description: 'Demonstrates comparison-based sorting by repeatedly swapping adjacent elements',
      complexity: 'O(n²)',
      formula: '\\text{Comparisons} = \\frac{n(n-1)}{2}'
    },
    {
      id: 'graph' as VisualizationType,
      title: 'Graph Traversal (BFS)',
      description: 'Explores nodes level by level using a queue data structure',
      complexity: 'O(V + E)',
      formula: '\\text{Queue: } Q = \\{v_0\\}, \\text{ visited} = \\emptyset'
    },
    {
      id: 'statistics' as VisualizationType,
      title: 'Normal Distribution',
      description: 'Visualizes probability distribution with mean μ=50 and standard deviation σ=12',
      complexity: 'N/A',
      formula: 'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{1}{2}(\\frac{x-\\mu}{\\sigma})^2}'
    }
  ]

  const currentViz = visualizations.find(v => v.id === activeViz)!

  return (
    <section id="visualization" className="py-20 bg-gray-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Algorithm & Mathematical Visualization
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
          <p className="mt-6 text-gray-400 max-w-3xl mx-auto text-lg">
            Visualizing computational processes to understand, analyze, and communicate algorithmic logic
          </p>
        </motion.div>

        {/* Visualization Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {visualizations.map((viz) => (
            <button
              key={viz.id}
              onClick={() => {
                setActiveViz(viz.id)
                setIsPlaying(false)
              }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeViz === viz.id
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
              }`}
            >
              {viz.title}
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Info Section */}
            <div className="mb-8">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {currentViz.title}
                  </h3>
                  <p className="text-gray-300 mb-3">{currentViz.description}</p>
                  <div className="inline-block bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-lg">
                    <span className="text-blue-400 font-semibold">Time Complexity: </span>
                    <span className="text-white font-mono">{currentViz.complexity}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowMath(!showMath)}
                  className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-all duration-300"
                >
                  {showMath ? 'Hide' : 'Show'} Math
                </button>
              </div>

              {/* Mathematical Formula */}
              {showMath && (
                <motion.div
                  className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-6 mt-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center text-lg">
                    <BlockMath math={currentViz.formula} />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Visualization Canvas */}
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6 mb-6 overflow-x-auto">
              <div className="flex justify-center items-center min-h-[300px]">
                {activeViz === 'sorting' && (
                  <canvas
                    ref={sortCanvasRef}
                    width={500}
                    height={300}
                    className="max-w-full h-auto"
                  />
                )}
                {activeViz === 'graph' && (
                  <svg
                    ref={graphSvgRef}
                    viewBox="0 0 500 300"
                    className="w-full max-w-full h-auto"
                    preserveAspectRatio="xMidYMid meet"
                  />
                )}
                {activeViz === 'statistics' && (
                  <svg
                    ref={statsSvgRef}
                    viewBox="0 0 500 300"
                    className="w-full max-w-full h-auto"
                    preserveAspectRatio="xMidYMid meet"
                  />
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Pause
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Start
                  </>
                )}
              </button>
              
              {activeViz === 'sorting' && (
                <div className="flex items-center gap-3">
                  <label className="text-gray-300">Speed:</label>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-32"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}