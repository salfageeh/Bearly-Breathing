'use client'

import React, { useState, useEffect } from 'react'
import { Bear, bearStateForPhase } from '../Bears'
import { Pattern, ENCOURAGEMENTS, DIALOGUE } from '../patterns'

function DialogueBalloon({ show, text, side }: { show: boolean; text: string; side: 'left' | 'right' }) {
  if (!show) return null
  return (
    <div style={{
      position: 'absolute',
      top: -30,
      ...(side === 'left' ? { left: -20 } : { right: -20 }),
      background: '#fff7e8',
      border: '2.5px solid #3a2818',
      borderRadius: 14,
      padding: '6px 10px',
      fontFamily: 'var(--font-nunito), sans-serif', fontSize: 11, fontWeight: 700, color: '#3a2818',
      boxShadow: '0 2px 0 #3a2818',
      whiteSpace: 'nowrap',
      zIndex: 5,
      maxWidth: 140,
      textAlign: 'center',
    }}>
      {text}
      <div style={{
        position: 'absolute',
        bottom: -8,
        ...(side === 'left' ? { left: 20 } : { right: 20 }),
        width: 10, height: 10,
        background: '#fff7e8',
        borderRight: '2.5px solid #3a2818',
        borderBottom: '2.5px solid #3a2818',
        transform: 'rotate(45deg)',
      }} />
    </div>
  )
}

interface SessionScreenProps {
  pattern: Pattern
  presetSeconds: number
  onComplete: (elapsed: number) => void
  onCancel: () => void
}

export function SessionScreen({ pattern, presetSeconds, onComplete, onCancel }: SessionScreenProps) {
  const [elapsed, setElapsed] = useState(0)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [phaseElapsed, setPhaseElapsed] = useState(0)
  const [dialogueIdx, setDialogueIdx] = useState(0)
  const [encIdx, setEncIdx] = useState(0)

  const phases = pattern.phases
  const currentPhase = phases[phaseIdx]

  // Main 100ms timer — use performance.now() for drift-free timing
  useEffect(() => {
    let last = performance.now()
    const id = setInterval(() => {
      const now = performance.now()
      const dt = (now - last) / 1000
      last = now
      setElapsed((e) => {
        const next = e + dt
        if (next >= presetSeconds) {
          clearInterval(id)
          setTimeout(() => onComplete(next), 50)
          return presetSeconds
        }
        return next
      })
      setPhaseElapsed((pe) => pe + dt)
    }, 100)
    return () => clearInterval(id)
  }, [pattern.id, presetSeconds]) // eslint-disable-line react-hooks/exhaustive-deps

  // Advance phase when phaseElapsed crosses phase length
  useEffect(() => {
    if (phaseElapsed >= currentPhase.seconds) {
      setPhaseIdx((i) => (i + 1) % phases.length)
      setPhaseElapsed(0)
      setDialogueIdx((d) => (d + 1) % DIALOGUE.length)
    }
  }, [phaseElapsed, currentPhase.seconds, phases.length])

  // Rotate encouragements every 6s
  useEffect(() => {
    const id = setInterval(() => setEncIdx((i) => (i + 1) % ENCOURAGEMENTS.length), 6000)
    return () => clearInterval(id)
  }, [])

  // Ring scale based on phase + progress
  const phaseProgress = Math.min(1, phaseElapsed / currentPhase.seconds)
  let ringScale: number
  if (currentPhase.kind === 'inhale') {
    ringScale = 0.65 + phaseProgress * 0.35
  } else if (currentPhase.kind === 'exhale') {
    ringScale = 1.0 - phaseProgress * 0.35
  } else {
    // hold — keep the endpoint of the prior phase
    ringScale = phaseIdx > 0 && phases[phaseIdx - 1].kind === 'inhale' ? 1.0 : 0.65
  }

  const biscuitState = bearStateForPhase(currentPhase, 'biscuit')
  const bobaState    = bearStateForPhase(currentPhase, 'boba')

  const remaining = Math.max(0, presetSeconds - elapsed)
  const mins = Math.floor(remaining / 60)
  const secs = Math.floor(remaining % 60)

  const currentDialogue = DIALOGUE[dialogueIdx]

  function handleCancel() {
    if (elapsed > 5 && !window.confirm('End this session?')) return
    onCancel()
  }

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      padding: '64px 20px 24px',
      boxSizing: 'border-box',
      zIndex: 3,
    }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <button onClick={handleCancel} style={{
          background: '#fff7e8', border: '2.5px solid #3a2818', borderRadius: 999,
          width: 42, height: 42, cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 3px 0 #3a2818',
        }} aria-label="End session">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="#3a2818" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </button>
        <div style={{
          background: '#fff7e8', border: '2.5px solid #3a2818', borderRadius: 999,
          padding: '8px 18px',
          fontFamily: 'var(--font-nunito), sans-serif', fontWeight: 800, fontSize: 18, color: '#3a2818',
          boxShadow: '0 3px 0 #3a2818',
        }}>
          {mins}:{String(secs).padStart(2, '0')}
        </div>
        <div style={{ width: 42 }} />
      </div>

      {/* Phase label — no fade-in animation (re-renders every 100ms — see README gotcha) */}
      <div style={{
        textAlign: 'center', marginTop: 16, marginBottom: 4,
        fontFamily: 'var(--font-satisfy), cursive', fontSize: 36, color: '#4a3528',
      }}>
        {currentPhase.label}
      </div>
      <div style={{
        textAlign: 'center',
        fontFamily: 'var(--font-nunito), sans-serif', fontSize: 22, fontWeight: 800,
        letterSpacing: 2, textTransform: 'uppercase', color: '#a08e7a',
      }}>
        {Math.ceil(currentPhase.seconds - phaseElapsed)}s
      </div>

      {/* Breathing ring */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
        {/* Outer dashed ring */}
        <div style={{
          width: 300, height: 300, borderRadius: '50%',
          border: '3px dashed #ffb8c6',
          position: 'absolute',
          transform: `scale(${ringScale})`,
          transition: 'transform 1s ease-in-out',
          opacity: 0.7,
        }} />
        {/* Inner glow */}
        <div style={{
          width: 260, height: 260, borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 35%, #fff7e8 0%, #ffd6a540 60%, #ffb8c640 100%)',
          position: 'absolute',
          transform: `scale(${ringScale})`,
          transition: 'transform 1s ease-in-out',
          boxShadow: 'inset 0 0 40px #ffffff50',
        }} />

        {/* Bears */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', zIndex: 2, position: 'relative' }}>
          <div style={{ position: 'relative', width: 110 }}>
            <DialogueBalloon show={currentDialogue.who === 'biscuit'} text={currentDialogue.text} side="left" />
            <div style={{ transform: `scale(${biscuitState.scale})`, transition: 'transform 900ms ease-in-out' }}>
              <Bear color="cream" eyes={biscuitState.eyes} mouth={biscuitState.mouth} />
            </div>
          </div>
          <div style={{ position: 'relative', width: 110 }}>
            <DialogueBalloon show={currentDialogue.who === 'boba'} text={currentDialogue.text} side="right" />
            <div style={{ transform: `scale(${bobaState.scale})`, transition: 'transform 900ms ease-in-out' }}>
              <Bear color="caramel" eyes={bobaState.eyes} mouth={bobaState.mouth} />
            </div>
          </div>
        </div>
      </div>

      {/* Encouragement — plain render, no CSS animation (100ms re-render gotcha) */}
      <div style={{
        minHeight: 42,
        textAlign: 'center',
        fontFamily: 'var(--font-satisfy), cursive',
        fontSize: 24,
        color: '#8a6a5a',
        marginTop: 8,
      }}>
        {ENCOURAGEMENTS[encIdx]}
      </div>
    </div>
  )
}
