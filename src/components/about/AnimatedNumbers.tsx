import { useEffect, useRef } from 'react'
import { AnimatedNumbersProps } from '@/types/About'

const AnimatedNumbers: React.FC<AnimatedNumbersProps> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element || hasAnimated.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hasAnimated.current = true
            animateNumber(element, value)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [value])

  const animateNumber = (element: HTMLSpanElement, targetValue: number) => {
    const duration = 2000 // 2 seconds for smooth animation
    const startTime = performance.now()
    const startValue = 0

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOut)

      element.textContent = currentValue.toLocaleString()

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }

  return (
    <span ref={ref} className='inline-block font-mono tabular-nums'>
      0
    </span>
  )
}

export default AnimatedNumbers
