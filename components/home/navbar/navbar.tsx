"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const NavLinks = [
  {
    name: "EVENTS",
    href: "events",
  },
  {
    name: "TEAM",
    href: "teams",
  },
  {
    name: "PROJECTS",
    href: "projects",
  },
  {
    name: "ARCHIVE",
    href: "archive",
  },
  {
    name: "ABOUT US",
    href: "about",
  },
];
const Navbar = () => {
  const [active, setActive] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(true);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const section = document.getElementById(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(href);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShow(false);
      else setShow(true);
      setLastScrollY(window.scrollY);
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActive(sectionId);
          window.history.replaceState(null, "", `#${sectionId}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0.25,
    });

    window.addEventListener("scroll", handleScroll);
    observerRef.current = observer;

    NavLinks.forEach((link) => {
      const section = document.getElementById(link.href);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [lastScrollY]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: show ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full shadow-lg z-50"
    >
      <header className="w-full fixed top-5 z-50">
        {/* 🔮 SVG Filter and Background Layer */}
        <svg className="absolute w-0 h-0 ">
          <filter id="liquidGlass" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0"
              numOctaves="0"
              result="turbulence"
              seed="0"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="50"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>

        {/* 🔳 Glass Background Layer */}
        <div className="relative ">
          <div
            className="absolute inset-0 max-w-screen-xl mx-auto xl:rounded-2xl z-[-1]"
            style={{
              backdropFilter: "blur(10px)",
              filter: "url(#liquidGlass)",
            }}
          />
          <div className="mx-auto relative flex justify-between items-center max-w-screen-xl px-6 py-3 sm:backdrop-brightness-100 bg-transparent sm:bg-black/20 rounded  sm:shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Lnc logo"
                width={40}
                height={40}
                priority
              />
            </Link>
            <div className="hidden md:flex gap-10 items-center justify-between lg:text-xl">
              {NavLinks.map((link, index) => {
                const isActive = active === link.href;
                return (
                  <a
                    href={`#${link.href}`}
                    key={index}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative group transition-all duration-300  ${isActive
                      ? "text-violet-500"
                      : "text-white hover:text-violet-400"
                      }`}
                  >
                    <span
                      key={isActive ? "active" : "inactive"}
                      className={`inline-block relative after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:bg-[#BC13FE] after:transition-all after:duration-300 
                  ${isActive
                          ? "after:w-full"
                          : "after:w-0 group-hover:after:w-full"
                        }`}
                    >
                      {link.name}
                    </span>
                  </a>
                );
              })}
            </div>
            <Button
              size="lg"
              className="hidden md:block bg-[#BC13FE] hover:bg-[#A911E5] cursor-pointer text-lg text-white font-light text-shadow-lg text-shadow-purple-300"
            >
              JOIN US
            </Button>
            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? (
                  <X size={32} className="text-white" />
                ) : (
                  <Menu size={32} className="text-white" />
                )}
              </button>
            </div>
          </div>
          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full flex flex-col items-center py-4 space-y-6 z-40 text-lg bg-black/20">
              <div
                className="absolute inset-0 max-w-screen-xl h-full mx-auto xl:rounded-2xl z-[-1]"
                style={{
                  backdropFilter: "blur(2px)",
                  filter: "url(#liquidGlass)",
                }}
              />

              {NavLinks.map((link, index) => (
                <a
                  key={index}
                  href={`#${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`${active === link.href
                    ? "text-violet-500"
                    : "text-white hover:text-violet-400"
                    }`}
                >
                  {link.name}
                </a>
              ))}
              <Button
                size="lg"
                className="bg-[#BC13FE] hover:bg-[#A911E5] text-white font-light"
              >
                JOIN US
              </Button>
            </div>
          )}
        </div>
      </header>
    </motion.div>
  );
};

export default Navbar;
