"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
  { name: 'Home', href: '#home', isDirectNav: false },
  { name: 'Events', href: '/events', isDirectNav: true },
  { name: 'About', href: '#why-join-us', isDirectNav: false },
  { name: 'Join', href: '#join', isDirectNav: false },
  { name: 'Contact', href: '#footer', isDirectNav: false },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isDirectNav: boolean) => {
    if (isDirectNav) {
      // Allow direct navigation for Events page
      handleMenuClose()
      return true
    }

    // For other menu items, perform smooth scroll
    e.preventDefault()
    handleMenuClose()

    const targetElement = document.querySelector(href)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      {/* Toggle Button */}
      {!isMenuOpen && (
        <motion.button
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(true)}
        >
          <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold">
            ☰
          </div>
        </motion.button>
      )}

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleMenuClose}
          >
            {/* Menu Container */}
            <motion.div
              className="absolute top-4 left-4"
            >
              {/* Close Button */}
              <motion.button
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
              </motion.button>

              {/* Menu Items */}
              <motion.ul
                className="absolute top-14 left-0 bg-gray-800 bg-opacity-40 rounded-lg p-6 space-y-4 min-w-48 shadow-lg backdrop-blur"
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
                      className="text-white text-lg hover:text-blue-400 transition-colors block"
                      onClick={(e) => handleNavigation(e, item.href, item.isDirectNav)}
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
    </div>
  )
}

export default Navbar