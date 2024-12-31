"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { GiStarSwirl } from "react-icons/gi";
import {
  FaRocket,
  FaLightbulb,
  FaUsers,
  FaTrophy,
  FaHandshake,
  FaQuestion,
} from "react-icons/fa";

const navItems = [
  { name: "LNC", href: "/", icon: GiStarSwirl, isDirectNav: true },
  { name: "Home", href: "#home", icon: FaRocket, isDirectNav: false },
  { name: "About", href: "#about", icon: FaLightbulb, isDirectNav: false },
  { name: "Prizes", href: "#prize", icon: FaTrophy, isDirectNav: false },
  { name: "Sponsors", href: "#sponsor", icon: FaHandshake, isDirectNav: false },
  { name: "Community", href: "#community-partners", icon: FaUsers, isDirectNav: false },
  { name: "FAQ", href: "#faq", icon: FaQuestion, isDirectNav: false },
];

const Navbar = ({ }: { NavType: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const menuControls = useAnimation();
  const lastInteractionTime = useRef(Date.now());

  const smoothScroll = (targetElement: HTMLElement) => {
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500; // Increased duration for slower scroll
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + distance * easedProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isOpen) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        lastInteractionTime.current = Date.now();
        setIsVisible(false);
      }
    };

    const handleInteraction = () => {
      lastInteractionTime.current = Date.now();
      setIsVisible(false);
    };

    const checkVisibility = () => {
      if (Date.now() - lastInteractionTime.current > 500) {
        setIsVisible(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("scroll", handleInteraction);

    const visibilityInterval = setInterval(checkVisibility, 100);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      clearInterval(visibilityInterval);
    };
  }, [isOpen]);

  useEffect(() => {
    menuControls.start({
      x: mousePosition.x - 25,
      y: mousePosition.y - 25,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
  }, [mousePosition, menuControls]);

  const toggleMenu = () => {
    if (!isOpen) {
      menuControls.start({
        x: mousePosition.x - 25,
        y: mousePosition.y - 25,
        transition: { duration: 0 },
      });
    }
    setIsOpen(!isOpen);
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isDirectNav: boolean) => {
    if (isDirectNav) {
      setIsOpen(false);
      return true;
    }

    e.preventDefault();
    setIsOpen(false);

    const targetElement = document.querySelector(href);
    if (targetElement) {
      smoothScroll(targetElement as HTMLElement);
    }
  };

  const menuVariants = {
    closed: { scale: 1, rotate: 0 },
    open: { scale: 1.1, rotate: 180 },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        ref={menuRef}
        className="fixed z-50 w-12 h-12 flex items-center justify-center cursor-pointer"
        animate={
          isOpen
            ? { x: mousePosition.x - 25, y: mousePosition.y - 25 }
            : menuControls
        }
        style={{
          opacity: isVisible || isOpen ? 1 : 0,
          pointerEvents: isVisible || isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
          variants={menuVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.5, type: "spring" }}
          onClick={toggleMenu}
        >
          <motion.div
            className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center"
            style={{ margin: "2px" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaRocket className="text-white text-xl" />
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.nav
        className="fixed z-40 pointer-events-none"
        style={{
          top: mousePosition.y + 20,
          left: mousePosition.x + 20,
        }}
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <motion.ul
          className="bg-gray-900/20 bg-opacity-40 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              variants={itemVariants}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="mb-2 last:mb-0"
            >
              <Link
                href={item.href}
                className="flex items-center p-2 rounded-lg hover:bg-purple-600 transition-colors duration-200"
                onClick={(e) => handleNavigation(e, item.href, item.isDirectNav)}
              >
                <item.icon className="text-xl mr-3 text-white" />
                <span className="text-lg font-medium text-white">
                  {item.name}
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>
    </>
  );
};

export default Navbar;