'use client'

import React, { useState, useEffect } from 'react'

type ShapeKind = 'heart' | 'star' | 'bubble' | 'sparkle'

interface AmbientItem {
  id: number
  shape: ShapeKind
  left: number
  delay: number
  duration: number
  size: number
  drift: number
  hue: string
  opacity: number
}

function Shape({ kind, size, color }: { kind: ShapeKind; size: number; color: string }) {
  if (kind === 'heart') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path d="M12 20 C 4 14, 3 9, 6 6 C 9 3, 12 5, 12 8 C 12 5, 15 3, 18 6 C 21 9, 20 14, 12 20 Z"
              fill={color} stroke="#00000030" strokeWidth="1" strokeLinejoin="round" />
      </svg>
    )
  }
  if (kind === 'star') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path d="M12 2 L14 9 L22 9 L16 13 L18 21 L12 17 L6 21 L8 13 L2 9 L10 9 Z"
              fill={color} stroke="#00000025" strokeWidth="0.8" strokeLinejoin="round" />
      </svg>
    )
  }
  if (kind === 'sparkle') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path d="M12 2 L13 11 L22 12 L13 13 L12 22 L11 13 L2 12 L11 11 Z"
              fill={color} stroke="#00000020" strokeWidth="0.6" strokeLinejoin="round" />
      </svg>
    )
  }
  // bubble
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `radial-gradient(circle at 30% 30%, #ffffff90, ${color})`,
      border: '1px solid #00000015',
    }} />
  )
}

export function AmbientLayer({ density = 14 }: { density?: number }) {
  const shapes: ShapeKind[] = ['heart', 'star', 'bubble', 'sparkle']
  const hues = ['#ffb8c6', '#ffd6a5', '#c3e7d5', '#d8c4f0', '#ffe8a8']

  // Generate only on client to avoid SSR/client Math.random() mismatch
  const [items, setItems] = useState<AmbientItem[]>([])

  useEffect(() => {
    const out: AmbientItem[] = []
    for (let i = 0; i < density; i++) {
      out.push({
        id: i,
        shape: shapes[i % shapes.length],
        left: Math.random() * 100,
        delay: Math.random() * 14,
        duration: 12 + Math.random() * 10,
        size: 12 + Math.random() * 16,
        drift: (Math.random() - 0.5) * 40,
        hue: hues[i % 5],
        opacity: 0.35 + Math.random() * 0.35,
      })
    }
    setItems(out)
  }, [density]) // eslint-disable-line

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {items.map((it) => (
        <div key={it.id} style={{
          position: 'absolute',
          left: `${it.left}%`,
          bottom: -30,
          width: it.size,
          height: it.size,
          animation: `float-up ${it.duration}s linear ${it.delay}s infinite`,
          opacity: it.opacity,
          '--drift': `${it.drift}px`,
        } as React.CSSProperties}>
          <Shape kind={it.shape} size={it.size} color={it.hue} />
        </div>
      ))}
    </div>
  )
}
