export interface Phase {
  kind: 'inhale' | 'hold' | 'exhale'
  label: string
  seconds: number
}

export interface Pattern {
  id: string
  name: string
  subtitle: string
  blurb: string
  phases: Phase[]
}

export interface Preset {
  id: string
  name: string
  seconds: number
  blurb: string
}

export const PATTERNS: Record<string, Pattern> = {
  box: {
    id: 'box',
    name: 'Box Breathing',
    subtitle: '4 · 4 · 4 · 4',
    blurb: 'Inhale, hold, exhale, hold — all equal. Used by Navy SEALs to calm the nervous system.',
    phases: [
      { kind: 'inhale', label: 'Breathe in',  seconds: 4 },
      { kind: 'hold',   label: 'Hold',         seconds: 4 },
      { kind: 'exhale', label: 'Breathe out',  seconds: 4 },
      { kind: 'hold',   label: 'Hold',         seconds: 4 },
    ],
  },
  '478': {
    id: '478',
    name: '4 · 7 · 8',
    subtitle: 'Relaxing breath',
    blurb: "Inhale 4, hold 7, exhale 8. Dr. Weil's method for falling asleep fast.",
    phases: [
      { kind: 'inhale', label: 'Breathe in',  seconds: 4 },
      { kind: 'hold',   label: 'Hold',        seconds: 7 },
      { kind: 'exhale', label: 'Breathe out', seconds: 8 },
    ],
  },
  resonant: {
    id: 'resonant',
    name: 'Resonant',
    subtitle: '5 · 5',
    blurb: 'Even 5-in, 5-out. Syncs heart and breath for calm focus.',
    phases: [
      { kind: 'inhale', label: 'Breathe in',  seconds: 5 },
      { kind: 'exhale', label: 'Breathe out', seconds: 5 },
    ],
  },
  belly: {
    id: 'belly',
    name: 'Belly Breath',
    subtitle: '4 · 6',
    blurb: 'Longer exhale than inhale. Best for winding down.',
    phases: [
      { kind: 'inhale', label: 'Breathe in',  seconds: 4 },
      { kind: 'exhale', label: 'Breathe out', seconds: 6 },
    ],
  },
}

export const PATTERN_LIST = ['box', '478', 'resonant', 'belly']

export const PRESETS: Preset[] = [
  { id: '1', name: '1 min', seconds: 60,  blurb: 'A quick reset' },
  { id: '3', name: '3 min', seconds: 180, blurb: 'Just right' },
  { id: '5', name: '5 min', seconds: 300, blurb: 'A proper pause' },
]

export const ENCOURAGEMENTS = [
  'you are doing so well',
  'one breath at a time',
  'you are safe here',
  'soft shoulders',
  'let it go',
  'this is enough',
  'slow and steady',
  'we are here with you',
  'gentle, gentle',
  'well done, little one',
  'nothing else to do',
  'just this breath',
]

export const DIALOGUE = [
  { who: 'biscuit', text: 'in through the nose...' },
  { who: 'boba',    text: 'out through the mouth...' },
  { who: 'biscuit', text: "you're doing great!" },
  { who: 'boba',    text: 'mm, cozy.' },
  { who: 'biscuit', text: 'one more, together?' },
  { who: 'boba',    text: "i'm right here." },
  { who: 'biscuit', text: 'sooo calm now' },
  { who: 'boba',    text: 'almost... zzz' },
]
