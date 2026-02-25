let lastText = ''
let lastTime = 0
let currentAudio = null

const isLocalhost = () => {
  if (typeof window === 'undefined') return true
  const host = window.location.hostname
  return host === 'localhost' || host === '127.0.0.1'
}

export const speak = async (text) => {
  const now = Date.now()
  if (text === lastText && now - lastTime < 1000) {
    return
  }
  lastText = text
  lastTime = now

  if (currentAudio) {
    currentAudio.pause()
    currentAudio = null
  }

  try {
    if (isLocalhost()) {
      const res = await fetch(`/api/speak?text=${encodeURIComponent(text)}`)
      if (!res.ok) throw new Error('API failed')
    } else {
      const res = await fetch(`/api/speak?text=${encodeURIComponent(text)}&stream=true`)
      if (!res.ok) throw new Error('API failed')

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      currentAudio = new Audio(url)
      currentAudio.onended = () => URL.revokeObjectURL(url)
      await currentAudio.play()
    }
  } catch {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.7
    window.speechSynthesis.speak(utterance)
  }
}

export const shuffle = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const parseWords = (text) => {
  return text
    .split(/[,\n]/)
    .map(word => word.trim().toLowerCase())
    .filter(word => word.length > 0)
}
