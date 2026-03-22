
import { Icon24ArrowUpOutline } from '@vkontakte/icons'
import { useState, useEffect } from 'react'

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  // Показывать кнопку после прокрутки 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    isVisible && (
      <Icon24ArrowUpOutline
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 10px',
          borderRadius: '50%',
          backgroundColor: 'var(--vkui--color_background_secondary)',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
      </Icon24ArrowUpOutline>
    )
  )
}
