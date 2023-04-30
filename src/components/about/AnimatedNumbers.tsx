import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { AnimatedNumbersProps } from '@/types/About'

const AnimatedNumbers: React.FC<AnimatedNumbersProps> = ({ value }) => {
  const ref = useRef<HTMLElement>(null)

  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 3000 })
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [value, isInView, motionValue])

  useEffect(() => {
    springValue.on('change', (latest: number) => {
      if (ref.current && Number(latest.toFixed(0)) <= value) {
        ref.current.textContent = latest.toFixed(0)
      }
    })
  }, [springValue, value])

  return <span ref={ref}></span>
}

export default AnimatedNumbers
