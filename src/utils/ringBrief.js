const key = 'ring-experience-design-brief'
let currentBrief = null

export function saveRingBrief(text) {
  currentBrief = { text: String(text).slice(0,4000), savedAt: Date.now() }
  try { sessionStorage.setItem(key, JSON.stringify(currentBrief)) } catch { /* In-memory handoff remains available. */ }
}

export function readRingBrief() {
  try { currentBrief = JSON.parse(sessionStorage.getItem(key)) || currentBrief } catch { /* Storage can be unavailable. */ }
  return typeof currentBrief?.text === 'string' && Date.now() - currentBrief.savedAt < 4 * 60 * 60 * 1000
    ? currentBrief.text.slice(0,4000) : ''
}

export function clearRingBrief() {
  currentBrief = null
  try { sessionStorage.removeItem(key) } catch { /* Nothing else to clear. */ }
}
