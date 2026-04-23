'use client'

import React from 'react'
import { Bear } from '../Bears'
import { PATTERNS, PATTERN_LIST, PRESETS } from '../patterns'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font-nunito), sans-serif',
      fontSize: 11, fontWeight: 800, letterSpacing: 2,
      textTransform: 'uppercase', color: '#a08e7a',
    }}>
      {children}
    </div>
  )
}

function PillButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      flex: 1,
      background: active ? '#c3e7d5' : '#fff7e8',
      border: '2.5px solid #3a2818',
      borderRadius: 18,
      padding: '10px 8px',
      cursor: 'pointer',
      fontFamily: 'var(--font-nunito), sans-serif',
      color: '#3a2818',
      boxShadow: active ? '0 2px 0 #3a2818' : '0 3px 0 #3a2818',
      transform: active ? 'translateY(1px)' : 'none',
      transition: 'all 150ms',
    }}>
      {children}
    </button>
  )
}

interface WelcomeScreenProps {
  selectedPreset: string
  setPreset: (id: string) => void
  selectedPattern: string
  setPattern: (id: string) => void
  onStart: () => void
  onOpenSettings: () => void
}

export function WelcomeScreen({
  selectedPreset, setPreset,
  selectedPattern, setPattern,
  onStart, onOpenSettings,
}: WelcomeScreenProps) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      padding: '72px 28px 28px',
      boxSizing: 'border-box',
      zIndex: 3,
      animation: 'screen-in 600ms ease-out forwards',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-satisfy), cursive', fontSize: 36, lineHeight: 1, color: '#4a3528', letterSpacing: '-0.5px', whiteSpace: 'nowrap' }}>
            Bearly Breathing
          </div>
          <div style={{ fontFamily: 'var(--font-nunito), sans-serif', fontSize: 13, fontWeight: 700, color: '#8a7a6a', marginTop: 6, letterSpacing: 0.3 }}>
            a cozy pause with Biscuit &amp; Boba
          </div>
        </div>
        <button onClick={onOpenSettings} style={{
          background: '#fff7e8', border: '2.5px solid #3a2818', borderRadius: 999,
          width: 42, height: 42, cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 3px 0 #3a2818', flexShrink: 0,
        }} aria-label="Settings">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3.2" stroke="#3a2818" strokeWidth="2" />
            <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6L18 18M6 18l1.4-1.4M16.6 7.4L18 6"
                  stroke="#3a2818" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Bears */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, margin: '8px 0 16px', height: 150 }}>
        <div style={{ width: 130, animation: 'gentle-float 4s ease-in-out infinite' }}>
          <Bear color="cream" eyes="sparkle" mouth="smile-big" />
        </div>
        <div style={{ width: 130, animation: 'gentle-float 4s ease-in-out infinite 2s' }}>
          <Bear color="caramel" eyes="closed" mouth="coy-w" />
        </div>
      </div>

      {/* How long */}
      <div style={{ marginBottom: 16 }}>
        <SectionLabel>how long?</SectionLabel>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {PRESETS.map((p) => (
            <PillButton key={p.id} active={selectedPreset === p.id} onClick={() => setPreset(p.id)}>
              <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-nunito), sans-serif' }}>{p.name}</div>
              <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.75, marginTop: 2 }}>{p.blurb}</div>
            </PillButton>
          ))}
        </div>
      </div>

      {/* Which pattern */}
      <div style={{ marginBottom: 18 }}>
        <SectionLabel>which breath?</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
          {PATTERN_LIST.map((id) => {
            const pat = PATTERNS[id]
            const active = selectedPattern === id
            return (
              <button key={id} onClick={() => setPattern(id)} style={{
                background: active ? '#ffd6a5' : '#fff7e8',
                border: '2.5px solid #3a2818',
                borderRadius: 22,
                padding: '10px 14px',
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: 'var(--font-nunito), sans-serif',
                color: '#3a2818',
                boxShadow: active ? '0 2px 0 #3a2818' : '0 3px 0 #3a2818',
                transform: active ? 'translateY(1px)' : 'none',
                transition: 'all 150ms',
              }}>
                <div style={{ fontSize: 15, fontWeight: 800 }}>{pat.name}</div>
                <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.7 }}>{pat.subtitle}</div>
              </button>
            )
          })}
        </div>
        <div style={{
          marginTop: 10,
          background: '#fff7e880', borderRadius: 14, padding: '10px 14px',
          fontSize: 12.5, fontWeight: 600, color: '#6a5a4a', lineHeight: 1.45,
          fontFamily: 'var(--font-nunito), sans-serif',
        }}>
          {PATTERNS[selectedPattern].blurb}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* CTA */}
      <button onClick={onStart} style={{
        background: '#ff9bb0', border: '3px solid #3a2818', borderRadius: 999,
        padding: '18px 28px', width: '100%',
        fontFamily: 'var(--font-nunito), sans-serif', fontWeight: 800, fontSize: 20, color: '#3a2818',
        cursor: 'pointer', boxShadow: '0 5px 0 #3a2818',
        letterSpacing: 0.3,
      }}>
        let&apos;s get started! ✨
      </button>
      <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#8a7a6a', marginTop: 10, fontFamily: 'var(--font-nunito), sans-serif' }}>
        take a moment. we&apos;re right here with you.
      </div>
    </div>
  )
}
