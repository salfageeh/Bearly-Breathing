'use client'

import React from 'react'
import { Bear } from '../Bears'
import { Pattern } from '../patterns'

function Stat({ value, label, small }: { value: string | number; label: string; small?: boolean }) {
  return (
    <div style={{ flex: 1, padding: '2px 4px', textAlign: 'center' }}>
      <div style={{
        fontFamily: 'var(--font-nunito), sans-serif', fontWeight: 800,
        fontSize: small ? 16 : 22, color: '#3a2818', lineHeight: 1.1,
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: 'var(--font-nunito), sans-serif', fontSize: 10, fontWeight: 800,
        letterSpacing: 1.5, textTransform: 'uppercase', color: '#a08e7a', marginTop: 4,
      }}>
        {label}
      </div>
    </div>
  )
}

interface CompleteScreenProps {
  sessionLength: number
  pattern: Pattern
  onAgain: () => void
  onHome: () => void
}

export function CompleteScreen({ sessionLength, pattern, onAgain, onHome }: CompleteScreenProps) {
  const mins = Math.floor(sessionLength / 60)
  const secs = Math.floor(sessionLength % 60)
  const totalPhaseSeconds = pattern.phases.reduce((a, p) => a + p.seconds, 0)
  const breaths = Math.floor(sessionLength / totalPhaseSeconds)

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      padding: '80px 28px 28px',
      boxSizing: 'border-box',
      zIndex: 3,
      animation: 'screen-in 700ms ease-out forwards',
      textAlign: 'center',
    }}>
      <div style={{ fontFamily: 'var(--font-satisfy), cursive', fontSize: 48, color: '#4a3528', lineHeight: 1 }}>
        well done!
      </div>
      <div style={{ fontFamily: 'var(--font-nunito), sans-serif', fontSize: 14, fontWeight: 700, color: '#8a7a6a', marginTop: 8, letterSpacing: 0.3 }}>
        that was a lovely pause
      </div>

      {/* Happy bears */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 2, margin: '24px 0 16px', height: 190 }}>
        <div style={{ width: 160, animation: 'gentle-float 3s ease-in-out infinite' }}>
          <Bear color="cream" eyes="sparkle" mouth="smile-big" />
        </div>
        <div style={{ width: 160, animation: 'gentle-float 3s ease-in-out infinite 1.5s' }}>
          <Bear color="caramel" eyes="sparkle" mouth="smile-big" />
        </div>
      </div>

      {/* Stats card */}
      <div style={{
        background: '#fff7e8', border: '2.5px solid #3a2818', borderRadius: 22,
        padding: '16px 18px', margin: '8px 0 18px',
        boxShadow: '0 4px 0 #3a2818',
        display: 'flex', justifyContent: 'space-around', alignItems: 'stretch',
      }}>
        <Stat value={`${mins}:${String(secs).padStart(2, '0')}`} label="time" />
        <div style={{ width: 2, background: '#3a281820' }} />
        <Stat value={breaths} label="breaths" />
        <div style={{ width: 2, background: '#3a281820' }} />
        <Stat value={pattern.subtitle} label={pattern.name.toLowerCase()} small />
      </div>

      <div style={{
        fontFamily: 'var(--font-satisfy), cursive', fontSize: 22, color: '#8a6a5a',
        marginBottom: 16, lineHeight: 1.3,
      }}>
        come back whenever you need us 💛
      </div>

      <div style={{ flex: 1 }} />

      <button onClick={onAgain} style={{
        background: '#ff9bb0', border: '3px solid #3a2818', borderRadius: 999,
        padding: '16px 24px', width: '100%',
        fontFamily: 'var(--font-nunito), sans-serif', fontWeight: 800, fontSize: 18, color: '#3a2818',
        cursor: 'pointer', boxShadow: '0 5px 0 #3a2818',
        marginBottom: 10,
      }}>
        one more?
      </button>
      <button onClick={onHome} style={{
        background: 'transparent', border: 'none',
        fontFamily: 'var(--font-nunito), sans-serif', fontWeight: 700, fontSize: 14, color: '#8a7a6a',
        cursor: 'pointer', padding: 8,
      }}>
        back to home
      </button>
    </div>
  )
}
