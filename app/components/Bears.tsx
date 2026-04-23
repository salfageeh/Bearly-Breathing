'use client'

import React from 'react'
import { Phase } from './patterns'

type EyeState = 'open' | 'closed' | 'squint' | 'sparkle' | 'sleepy-deep'
type MouthState = 'coy-w' | 'o-inhale' | 'o-exhale' | 'smile-big'
type BearColor = 'cream' | 'caramel'

function Freckles({ cx, cy, color = '#ff9bb0' }: { cx: number; cy: number; color?: string }) {
  return (
    <g opacity="0.75">
      <circle cx={cx - 8} cy={cy - 4} r="4" fill={color} />
      <circle cx={cx}     cy={cy}     r="5" fill={color} />
      <circle cx={cx - 12} cy={cy + 4} r="4" fill={color} />
    </g>
  )
}

function Eyes({ state, O, OW }: { state: EyeState; O: string; OW: number }) {
  if (state === 'closed' || state === 'sleepy-deep') {
    const depth = state === 'sleepy-deep' ? 20 : 10
    return (
      <>
        <path d={`M 80 112 Q 92 ${112 + depth}, 104 112`} stroke={O} strokeWidth={OW} fill="none" strokeLinecap="round" />
        <path d={`M 136 112 Q 148 ${112 + depth}, 160 112`} stroke={O} strokeWidth={OW} fill="none" strokeLinecap="round" />
        <path d="M 80 112 L 76 108"   stroke={O} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 104 112 L 108 108" stroke={O} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 136 112 L 132 108" stroke={O} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 160 112 L 164 108" stroke={O} strokeWidth="2.5" strokeLinecap="round" />
      </>
    )
  }
  if (state === 'squint') {
    return (
      <>
        <path d="M 82 110 Q 92 106, 102 110"   stroke={O} strokeWidth={OW} fill="none" strokeLinecap="round" />
        <path d="M 138 110 Q 148 106, 158 110" stroke={O} strokeWidth={OW} fill="none" strokeLinecap="round" />
      </>
    )
  }
  if (state === 'sparkle') {
    return (
      <>
        <ellipse cx="92"  cy="108" rx="8" ry="11" fill={O} />
        <ellipse cx="148" cy="108" rx="8" ry="11" fill={O} />
        <circle cx="95"  cy="103" r="3"   fill="#fff" />
        <circle cx="151" cy="103" r="3"   fill="#fff" />
        <circle cx="89"  cy="112" r="1.6" fill="#fff" />
        <circle cx="145" cy="112" r="1.6" fill="#fff" />
      </>
    )
  }
  // default 'open'
  return (
    <>
      <ellipse cx="92"  cy="108" rx="7" ry="9" fill={O} />
      <ellipse cx="148" cy="108" rx="7" ry="9" fill={O} />
      <circle cx="94"  cy="104" r="2.4" fill="#fff" />
      <circle cx="150" cy="104" r="2.4" fill="#fff" />
      <path d="M 85 100 L 81 95"   stroke={O} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 99 100 L 103 95"  stroke={O} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 141 100 L 137 95" stroke={O} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 155 100 L 159 95" stroke={O} strokeWidth="2.2" strokeLinecap="round" />
    </>
  )
}

function Mouth({ state, O }: { state: MouthState; O: string }) {
  if (state === 'o-inhale') {
    return <ellipse cx="120" cy="150" rx="5" ry="6" fill={O} />
  }
  if (state === 'o-exhale') {
    return (
      <>
        <ellipse cx="120" cy="152" rx="7" ry="9" fill={O} />
        <ellipse cx="120" cy="154" rx="4" ry="5" fill="#ff8fa3" opacity="0.8" />
      </>
    )
  }
  if (state === 'smile-big') {
    return (
      <path d="M 104 146 Q 120 162, 136 146"
            stroke={O} strokeWidth="3.2" fill="none" strokeLinecap="round" />
    )
  }
  // default 'coy-w'
  return (
    <path d="M 108 146 Q 114 152, 120 146 Q 126 152, 132 146"
          stroke={O} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  )
}

export interface BearProps {
  color?: BearColor
  eyes?: EyeState
  mouth?: MouthState
  scale?: number
  tilt?: number
  style?: React.CSSProperties
}

export function Bear({ color = 'cream', eyes = 'open', mouth = 'coy-w', scale = 1, tilt = 0, style = {} }: BearProps) {
  const palettes = {
    cream:   { body: '#fae0c0', ear: '#ffc9d4', patch: '#fff4dc', shade: '#e8cfa3' },
    caramel: { body: '#c58c5c', ear: '#e5b086', patch: '#f5dcbe', shade: '#a87247' },
  }
  const p = palettes[color]
  const O = '#3a2818'
  const OW = 5

  return (
    <svg viewBox="0 0 240 260" width="100%" height="100%"
         style={{ ...style, transform: `scale(${scale}) rotate(${tilt}deg)`, transformOrigin: '50% 60%', transition: 'transform 400ms ease-out', overflow: 'visible' }}>
      {/* Ground shadow */}
      <ellipse cx="120" cy="250" rx="62" ry="5" fill="#00000014" />
      {/* Body */}
      <path d="M 80 178 Q 66 224 96 240 Q 120 250 148 238 Q 176 222 160 178 Z"
            fill={p.body} stroke={O} strokeWidth={OW} strokeLinejoin="round" strokeLinecap="round" />
      {/* Tummy patch (stitched) */}
      <ellipse cx="120" cy="210" rx="28" ry="22" fill={p.patch} stroke={O} strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="94"  cy="220" r="1.6" fill={p.shade} opacity="0.6" />
      <circle cx="150" cy="215" r="1.6" fill={p.shade} opacity="0.6" />
      {/* Arms */}
      <circle cx="68"  cy="202" r="18" fill={p.body} stroke={O} strokeWidth={OW} />
      <circle cx="172" cy="202" r="18" fill={p.body} stroke={O} strokeWidth={OW} />
      {/* Head */}
      <circle cx="120" cy="112" r="78" fill={p.body} stroke={O} strokeWidth={OW} />
      {/* Ears — intentionally uneven */}
      <circle cx="54"  cy="54" r="19" fill={p.body} stroke={O} strokeWidth={OW} />
      <circle cx="56"  cy="56" r="9"  fill={p.ear} />
      <circle cx="186" cy="50" r="22" fill={p.body} stroke={O} strokeWidth={OW} />
      <circle cx="184" cy="52" r="10" fill={p.ear} />
      {/* Muzzle patch */}
      <ellipse cx="120" cy="132" rx="34" ry="24" fill={p.patch} />
      <Eyes state={eyes} O={O} OW={OW} />
      {/* Nose */}
      <path d="M 113 130 L 127 130 L 120 140 Z" fill={O} strokeLinejoin="round" />
      <Mouth state={mouth} O={O} />
      {/* Freckles */}
      <Freckles cx={88}  cy={138} />
      <Freckles cx={164} cy={138} />
    </svg>
  )
}

export interface BearState {
  eyes: EyeState
  mouth: MouthState
  scale: number
}

export function bearStateForPhase(phase: Phase | null, who: 'biscuit' | 'boba'): BearState {
  if (!phase) return { eyes: who === 'biscuit' ? 'open' : 'closed', mouth: 'coy-w', scale: 1 }
  if (phase.kind === 'inhale') {
    return { eyes: who === 'biscuit' ? 'open' : 'closed', mouth: 'o-inhale', scale: 1.12 }
  }
  if (phase.kind === 'exhale') {
    return { eyes: who === 'biscuit' ? 'squint' : 'sleepy-deep', mouth: 'o-exhale', scale: 0.92 }
  }
  // hold
  return { eyes: who === 'biscuit' ? 'sparkle' : 'closed', mouth: 'coy-w', scale: 1.06 }
}
