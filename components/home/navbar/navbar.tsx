"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const NavLinks = [
  {
    name: "Games",
    href: "/games",
  },
  {
    name: "Events",
    href: "/events",
  },
  {
    name: "Spaces",
    href: "/spaces",
  },
  {
    name: "Learn",
    href: "https://docs-lnc-community.vercel.app/docs/intro",
  },
  {
    name: "Support us",
    href: "/fundus",
  },
];

// Desktop Navigation Component
const DesktopNav = ({
  active,
  handleNavClick,
}: {
  active: string;
  handleNavClick: (href: string) => void;
}) => {
  return (
    <div className="hidden md:block">
      <svg className="absolute w-0 h-0">
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

      <div className="relative">
        <div
          className="absolute inset-0 max-w-screen-xl mx-auto xl:rounded-2xl z-[-1]"
          style={{
            backdropFilter: "blur(10px)",
            filter: "url(#liquidGlass)",
          }}
        />
        <div className="mx-auto relative flex justify-between items-center max-w-screen-xl px-6 py-3 backdrop-brightness-100 bg-black/10 rounded-2xl shadow-[inset_0_3px_5px_rgba(200,200,200,0.3)]">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Lnc logo"
              width={40}
              height={40}
              priority
            />
          </Link>
          <div className="flex gap-10 items-center justify-between lg:text-xl">
            {NavLinks.map((link, index) => {
              const isActive = active === link.href;
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative group transition-all duration-300 ${
                    isActive ? "text-violet-500" : "text-white"
                  }`}
                >
                  <span
                    key={isActive ? "active" : "inactive"}
                    className={`inline-block relative after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:bg-[#BC13FE] after:transition-all after:duration-300 ${
                      isActive
                        ? "after:w-full"
                        : "after:w-0 group-hover:after:w-full"
                    }`}
                  >
                    {link.name}
                  </span>
                </button>
              );
            })}
          </div>
          <Button
            size="lg"
            className="bg-[#BC13FE] hover:bg-[#A911E5] cursor-pointer text-lg text-white font-light text-shadow-lg text-shadow-purple-300"
          >
            JOIN US
          </Button>
        </div>
      </div>
    </div>
  );
};

// Mobile Navigation Component
const MobileNav = ({
  active,
  handleNavClick,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  active: string;
  handleNavClick: (href: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}) => {
  return (
    <div className="md:hidden">
      <div className="relative">
        <div
          className="mx-auto relative flex justify-between items-center max-w-screen-xl px-6 py-4"
          style={{
            backgroundColor: "rgb(14,14,14)",
          }}
        >
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Lnc logo"
              width={40}
              height={40}
              priority
            />
          </Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X size={32} className="text-white" />
            ) : (
              <Menu size={32} className="text-white" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            className="absolute top-full left-0 w-full flex flex-col items-center py-4 space-y-6 z-40 text-lg"
            style={{
              backgroundColor: "rgb(14,14,14)",
            }}
          >
            {NavLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => {
                  handleNavClick(link.href);
                  setIsMobileMenuOpen(false);
                }}
                className={`${
                  active === link.href
                    ? "text-violet-500"
                    : "text-white hover:text-violet-400"
                } transition-colors duration-300`}
              >
                {link.name}
              </button>
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
    </div>
  );
};

// Main Navbar Component
const Navbar = () => {
  const router = useRouter();
  const [active, setActive] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleNavClick = (href: string) => {
    // Check if it's an external URL
    if (href.startsWith("http")) {
      window.open(href, "_blank");
      return;
    }

    // Check if section exists on current page
    const section = document.getElementById(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(href);
    } else {
      // Navigate to the route
      router.push(href);
    }
  };

  useEffect(() => {
    // Checking mobile breakpoint
    const width = window.innerWidth;
    if (width < 768) setIsMobile(true);

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
      animate={{ y: show || isMobileMenuOpen ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full shadow-lg z-50"
    >
      <header className={`w-full fixed z-50 ${isMobile ? "top-0" : "top-5"}`}>
        <DesktopNav active={active} handleNavClick={handleNavClick} />
        <MobileNav
          active={active}
          handleNavClick={handleNavClick}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </header>
    </motion.div>
  );
};

export default Navbar;
