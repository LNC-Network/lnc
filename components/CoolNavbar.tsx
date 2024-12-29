"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
  { name: 'Home', href: '#home' },
  { name: 'Events', href: 'events' },
  { name: 'Join', href: '#join' },
  { name: 'About', href: '#why-join-us' },
  { name: 'Contact', href: '#footer' },
]

const CoolNavbar = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isButtonVisible, setIsButtonVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      // Adjust cursor position to account for button center
      setCursorPosition({ 
        x: e.clientX - 24,  // Half of button width (48px/2)
        y: e.clientY - 24   // Half of button height (48px/2)
      })
      setIsButtonVisible(false)
      
      clearTimeout(timeoutId)
      
      timeoutId = setTimeout(() => {
        setIsButtonVisible(true)
      }, 650)
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeoutId)
    }
  }, [])

  const handleButtonClick = (e: React.MouseEvent) => {
    // Use the click event coordinates with the same offset
    setMenuPosition({ 
      x: e.clientX - 24,
      y: e.clientY - 24
    })
    setIsMenuOpen(true)
    setIsButtonVisible(false)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
    setIsButtonVisible(true)
  }

  return (
    <>
      <AnimatePresence>
        {isButtonVisible && !isMenuOpen && (
          <motion.div
            className="fixed z-50 w-12 h-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: cursorPosition.x,
              y: cursorPosition.y
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', duration: 0.2 }}
          >
            <motion.button
              className="w-full h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleButtonClick}
            >
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold">
                ☰
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed z-50 inset-0 bg-black bg-opacity-60 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => handleMenuClose()}
          >
            <motion.div
              className="absolute"
              initial={{ x: menuPosition.x, y: menuPosition.y }}
              animate={{ x: menuPosition.x, y: menuPosition.y }}
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleMenuClose()
                }}
              >
                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold">
                  X
                </div>
              </motion.div>

              <motion.ul
                className="absolute top-14 left-1/2 -translate-x-1/2 bg-gray-800/20  bg-opacity-40  rounded-lg p-6 space-y-4 min-w-48 shadow-lg backdrop-blur"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              > 
                {menuItems.map((item) => (
                  <motion.li 
                    key={item.name} 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <a 
                      href={item.href} 
                      className="inset-0 text-white text-lg hover:text-blue-400 transition-colors block"
                      onClick={() => handleMenuClose()}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CoolNavbar