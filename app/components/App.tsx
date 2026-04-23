'use client'

import React, { useState, useRef } from 'react'
import { AmbientLayer } from './AmbientLayer'
import { SettingsDrawer } from './SettingsDrawer'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { SessionScreen } from './screens/SessionScreen'
import { CompleteScreen } from './screens/CompleteScreen'
import { PATTERNS, PRESETS } from './patterns'
import { createLullaby } from './lullaby'

type Screen = 'welcome' | 'session' | 'complete'

export function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [presetId, setPresetId] = useState('3')
  const [patternId, setPatternId] = useState('box')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const [hapticsOn, setHapticsOn] = useState(true)
  const [ambientOn, setAmbientOn] = useState(true)
  const [lastSessionLength, setLastSessionLength] = useState(0)

  const lullabyRef = useRef<ReturnType<typeof createLullaby> | null>(null)

  const preset = PRESETS.find((p) => p.id === presetId)!
  const pattern = PATTERNS[patternId]

  const start = () => {
    if (!lullabyRef.current) lullabyRef.current = createLullaby()
    if (soundOn) lullabyRef.current.start()
    setScreen('session')
  }

  const complete = (actualSeconds: number) => {
    if (lullabyRef.current) lullabyRef.current.stop()
    if (soundOn) setTimeout(() => lullabyRef.current?.chime(), 400)
    setLastSessionLength(actualSeconds)
    setScreen('complete')
  }

  const cancel = () => {
    if (lullabyRef.current) lullabyRef.current.stop()
    setScreen('welcome')
  }

  const bg =
    screen === 'welcome' ? 'linear-gradient(180deg, #c8e8e0 0%, #fdf6e3 60%, #ffe8c8 100%)' :
    screen === 'session' ? 'linear-gradient(180deg, #d8c4f0 0%, #ffc8d6 50%, #ffe8c8 100%)' :
                           'linear-gradient(180deg, #ffd6a5 0%, #ffe8c8 50%, #c3e7d5 100%)'

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: bg,
      overflow: 'hidden',
      transition: 'background 1200ms ease',
    }}>
      {ambientOn && <AmbientLayer density={screen === 'session' ? 18 : 12} />}

      {screen === 'welcome' && (
        <WelcomeScreen
          selectedPreset={presetId}  setPreset={setPresetId}
          selectedPattern={patternId} setPattern={setPatternId}
          onStart={start}
          onOpenSettings={() => setSettingsOpen(true)}
        />
      )}
      {screen === 'session' && (
        <SessionScreen
          pattern={pattern}
          presetSeconds={preset.seconds}
          onComplete={complete}
          onCancel={cancel}
        />
      )}
      {screen === 'complete' && (
        <CompleteScreen
          sessionLength={lastSessionLength}
          pattern={pattern}
          onAgain={start}
          onHome={() => setScreen('welcome')}
        />
      )}

      <SettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        soundOn={soundOn}
        setSoundOn={(v) => {
          setSoundOn(v)
          if (!v) lullabyRef.current?.stop()
          if (v && screen === 'session') lullabyRef.current?.start()
        }}
        hapticsOn={hapticsOn} setHapticsOn={setHapticsOn}
        ambientOn={ambientOn} setAmbientOn={setAmbientOn}
      />
    </div>
  )
}
