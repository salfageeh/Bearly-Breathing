export function createLullaby() {
  let ctx: AudioContext | null = null
  let masterGain: GainNode | null = null
  let interval: ReturnType<typeof setTimeout> | null = null
  let enabled = false

  // C major pentatonic across two octaves
  const NOTES = [
    261.63, 293.66, 329.63, 392.00, 440.00,
    523.25, 587.33, 659.25, 783.99, 880.00,
  ]

  function init() {
    if (ctx) return
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    ctx = new AC()
    masterGain = ctx.createGain()
    masterGain.gain.value = 0.0
    masterGain.connect(ctx.destination)
  }

  function playNote(freq: number, dur = 2.2) {
    if (!ctx || !masterGain) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq
    const now = ctx.currentTime
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.18, now + 0.08)
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur)
    osc.connect(gain)
    gain.connect(masterGain)
    osc.start(now)
    osc.stop(now + dur + 0.1)
  }

  function playChord() {
    const root = NOTES[Math.floor(Math.random() * NOTES.length)]
    playNote(root, 2.4)
    if (Math.random() > 0.5) {
      const harmIdx = Math.floor(Math.random() * NOTES.length)
      setTimeout(() => playNote(NOTES[harmIdx], 2.0), 400)
    }
  }

  return {
    start() {
      init()
      if (!ctx || !masterGain) return
      if (ctx.state === 'suspended') ctx.resume()
      enabled = true
      masterGain.gain.cancelScheduledValues(ctx.currentTime)
      masterGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1.5)
      const tick = () => {
        if (!enabled) return
        playChord()
        interval = setTimeout(tick, 1800 + Math.random() * 1400)
      }
      tick()
    },
    stop() {
      enabled = false
      if (interval) clearTimeout(interval)
      if (masterGain && ctx) {
        masterGain.gain.cancelScheduledValues(ctx.currentTime)
        masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8)
      }
    },
    chime() {
      init()
      if (!ctx || !masterGain) return
      if (ctx.state === 'suspended') ctx.resume()
      masterGain.gain.setValueAtTime(0.4, ctx.currentTime)
      playNote(NOTES[0], 1.5)
      setTimeout(() => playNote(NOTES[2], 1.5), 200)
      setTimeout(() => playNote(NOTES[5], 2.2), 400)
    },
  }
}
