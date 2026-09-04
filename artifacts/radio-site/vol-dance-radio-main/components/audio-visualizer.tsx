'use client'

import { useEffect, useRef } from 'react'
import { useRadio } from './radio-provider'

/**
 * Real-time-style frequency spectrum rendered on a canvas.
 * The public radio stream is cross-origin without CORS headers, so routing it
 * through a Web Audio AnalyserNode would mute playback. Instead we synthesize a
 * lively, smoothly-eased spectrum that surges while the stream plays and
 * settles to a calm baseline when paused — keeping playback rock-solid.
 */
export function AudioVisualizer() {
  const { isPlaying } = useRadio()
  const playingRef = useRef(isPlaying)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    playingRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const BARS = 48
    const levels = new Array(BARS).fill(0)
    const targets = new Array(BARS).fill(0)
    let raf = 0
    let frame = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { clientWidth, clientHeight } = canvas
      canvas.width = clientWidth * dpr
      canvas.height = clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const render = () => {
      frame++
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      const gap = 3
      const barW = (w - gap * (BARS - 1)) / BARS

      // Canvas may report a zero/negative width before layout settles.
      if (barW <= 0 || h <= 0) {
        raf = requestAnimationFrame(render)
        return
      }

      for (let i = 0; i < BARS; i++) {
        // Refresh targets a few times per second for a natural cadence.
        if (frame % 6 === 0) {
          if (playingRef.current) {
            // Bell-shaped envelope: mids punch higher than the edges.
            const envelope = Math.sin((i / (BARS - 1)) * Math.PI)
            const beat =
              0.55 + 0.45 * Math.abs(Math.sin(frame * 0.08 + i * 0.35))
            targets[i] = (0.15 + envelope * 0.85) * beat * Math.random()
          } else {
            targets[i] = 0.04 + Math.random() * 0.05
          }
        }
        // Ease current level toward target (attack faster than release).
        const t = targets[i]
        const ease = t > levels[i] ? 0.35 : 0.12
        levels[i] += (t - levels[i]) * ease

        const barH = Math.max(2, levels[i] * h)
        const x = i * (barW + gap)
        const y = h - barH

        const grad = ctx.createLinearGradient(0, h, 0, 0)
        grad.addColorStop(0, 'rgba(255, 85, 0, 0.95)')
        grad.addColorStop(0.55, 'rgba(255, 170, 0, 0.95)')
        grad.addColorStop(1, 'rgba(0, 210, 255, 0.95)')
        ctx.fillStyle = grad

        const r = Math.max(0, Math.min(barW / 2, 3))
        ctx.beginPath()
        ctx.roundRect(x, y, barW, barH, [r, r, 0, 0])
        ctx.fill()
      }

      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      role="img"
      aria-label="Візуалізація частотного спектру ефіру"
    />
  )
}
