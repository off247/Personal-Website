import { useEffect, useState } from 'react'

export default function RotatingText({ texts, interval = 2000, finalDelay = 1000 }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length)
        setIsVisible(true)
      }, 300)
    }, Math.max(300, interval + finalDelay))

    return () => clearInterval(timer)
  }, [texts, interval, finalDelay])

  return (
    <span className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {texts[currentIndex]}
    </span>
  )
}