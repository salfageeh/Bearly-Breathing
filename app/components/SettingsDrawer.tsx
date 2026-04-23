'use client'

import React from 'react'

function Toggle({ label, sublabel, on, onChange }: {
  label: string
  sublabel: string
  on: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button onClick={() => onChange(!on)} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      width: '100%', padding: '12px 14px', margin: '6px 0',
      background: '#fff7e8', border: '2.5px solid #3a2818', borderRadius: 18,
      cursor: 'pointer', fontFamily: 'var(--font-nunito), sans-serif',
      boxShadow: '0 3px 0 #3a2818',
      textAlign: 'left',
    }}>
      <div>
        <div style={{ fontWeight: 800, fontSize: 15, color: '#3a2818', textTransform: 'lowercase' }}>{label}</div>
        <div style={{ fontWeight: 700, fontSize: 12, color: '#8a7a6a', marginTop: 2 }}>{sublabel}</div>
      </div>
      <div style={{
        width: 48, height: 28, borderRadius: 999,
        background: on ? '#c3e7d5' : '#e8d6b2',
        border: '2.5px solid #3a2818',
        position: 'relative',
        transition: 'background 200ms',
        flexShrink: 0,
        marginLeft: 12,
      }}>
        <div style={{
          position: 'absolute', top: 1, left: on ? 21 : 1,
          width: 20, height: 20, borderRadius: '50%',
          background: '#3a2818',
          transition: 'left 200ms',
        }} />
      </div>
    </button>
  )
}

interface SettingsDrawerProps {
  open: boolean
  onClose: () => void
  soundOn: boolean
  setSoundOn: (v: boolean) => void
  hapticsOn: boolean
  setHapticsOn: (v: boolean) => void
  ambientOn: boolean
  setAmbientOn: (v: boolean) => void
}

export function SettingsDrawer({
  open, onClose,
  soundOn, setSoundOn,
  hapticsOn, setHapticsOn,
  ambientOn, setAmbientOn,
}: SettingsDrawerProps) {
  return (
    <>
      {/* Scrim */}
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0,
        background: '#00000040',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 300ms',
        zIndex: 9,
      }} />
      {/* Drawer */}
      <div style={{
        position: 'absolute', left: 12, right: 12, bottom: 12,
        background: '#fdf6e3',
        border: '3px solid #3a2818', borderRadius: 28,
        padding: '22px 20px 24px',
        boxShadow: '0 6px 0 #3a2818',
        transform: open ? 'translateY(0)' : 'translateY(120%)',
        transition: 'transform 380ms cubic-bezier(0.34, 1.2, 0.64, 1)',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--font-satisfy), cursive', fontSize: 30, color: '#4a3528' }}>
            settings
          </div>
          <button onClick={onClose} style={{
            background: '#fff7e8', border: '2.5px solid #3a2818', borderRadius: 999,
            width: 36, height: 36, cursor: 'pointer', padding: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 0 #3a2818',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="#3a2818" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <Toggle label="music"   sublabel="soft pentatonic lullaby"       on={soundOn}   onChange={setSoundOn} />
        <Toggle label="haptics" sublabel="gentle buzzes on phase change"  on={hapticsOn} onChange={setHapticsOn} />
        <Toggle label="ambient" sublabel="floating hearts & stars"        on={ambientOn} onChange={setAmbientOn} />

        <div style={{
          marginTop: 14, padding: '12px 14px',
          background: '#fff7e880', borderRadius: 14,
          fontSize: 12, fontWeight: 700, color: '#8a7a6a', textAlign: 'center', lineHeight: 1.4,
          fontFamily: 'var(--font-nunito), sans-serif',
        }}>
          made with 💛 for soft days
        </div>
      </div>
    </>
  )
}
