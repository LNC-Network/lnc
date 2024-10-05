"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      setVisible(isScrollingUp || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const navItems = [
    { name: "Home", link: "#home" },
    { name: "Projects", link: "#projects" },
    { name: "About", link: "#about" },
    { name: "Contact", link: "#contact" },
  ];

  const handleNavItemClick = (link: string) => {
    const section = document.querySelector(link);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ease-in-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="mx-auto max-w-4xl md:max-w-4xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-full border border-border shadow-lg">
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          <Link href="/" className="flex items-center space-x-2">
            <LaptopIcon className="h-6 w-6" />
            <span className="font-bold text-lg">Late Night Coders</span>
          </Link>
          <div className="flex items-center space-x-4 md:space-x-6">
            {visible && (
              <nav className="hidden md:flex space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavItemClick(item.link)}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full outline-none"
                >
                  <SunIcon
                    className={`h-5 w-5 transition-all ${
                      theme === "dark"
                        ? "rotate-90 outline-none"
                        : "rotate-0 hidden"
                    }`}
                  />
                  <MoonIcon
                    className={`h-5 w-5 transition-all ${
                      theme === "dark"
                        ? "rotate-0 hidden"
                        : "-rotate-90 outline-none"
                    }`}
                  />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
