"use client";
import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Projects", link: "/projects" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <footer className="bg-muted py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Late Night Coders</h3>
            <p>Turning caffeine into code since 2024</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.link} className="hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <p className="mb-4">Subscribe to our newsletter for updates</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Late Night Coders. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
