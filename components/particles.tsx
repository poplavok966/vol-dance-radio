'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  r: number
  vy: number
  vx: number
  hue: 'brand' | 'blue'
  alpha: number
  twinkle: number
}

const COLORS = {
  brand: '255, 136, 0',
  blue: '0, 210, 255',
} as const

/**
 * Lightweight festival-style floating light particles behind the page content.
 * Uses a single rAF loop with a capped particle count so it stays smooth on
 * mobile. Respects prefers-reduced-motion.
 */
export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduce) return

    let raf = 0
    let particles: Particle[] = []
    let w = 0
    let h = 0
    let dpr = 1

    const seed = () => {
      const count = Math.min(60, Math.round((w * h) / 26000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 2.2,
        vy: -(0.12 + Math.random() * 0.5),
        vx: (Math.random() - 0.5) * 0.25,
        hue: Math.random() > 0.5 ? 'brand' : 'blue',
        alpha: 0.15 + Math.random() * 0.5,
        twinkle: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }
    resize()
    window.addEventListener('resize', resize)

    const render = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.y += p.vy
        p.x += p.vx
        p.twinkle += 0.03
        if (p.y < -10) {
          p.y = h + 10
          p.x = Math.random() * w
        }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10

        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.twinkle))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${COLORS[p.hue]}, ${a})`
        ctx.shadowBlur = 8
        ctx.shadowColor = `rgba(${COLORS[p.hue]}, ${a})`
        ctx.fill()
      }
      ctx.shadowBlur = 0
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
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  )
}
