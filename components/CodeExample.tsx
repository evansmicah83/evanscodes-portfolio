'use client'

import { useMathMode } from './MathModeToggle'
import { InlineMath, BlockMath } from 'react-katex'

interface CodeExampleProps {
  code: string
  math: string
}

export default function CodeExample({ code, math }: CodeExampleProps) {
  const { mathMode } = useMathMode()

  return (
    <div className="my-6">
      <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <code className="language-ts">{code}</code>
      </pre>
      {mathMode && (
        <div className="mt-4 text-blue-300">
          <BlockMath>{math}</BlockMath>
        </div>
      )}
    </div>
  )
}