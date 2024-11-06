"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Moon, Sun, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const footerLinks = {
  product: [
    { name: 'Features', href: '#' },
    { name: 'Courses', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'FAQ', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Tutorials', href: '#' },
    { name: 'Whitepaper', href: '#' },
    { name: 'Community', href: '#' },
  ],
  legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'License', href: '#' },
  ],
};

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',
    icon: <Github className="h-5 w-5" />,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/yourusername',
    icon: <Twitter className="h-5 w-5" />,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: 'Email',
    href: 'mailto:your@email.com',
    icon: <Mail className="h-5 w-5" />,
  },
];

export default function Footer() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
  
    // Wait until mounted on client-side
    useEffect(() => {
      setMounted(true);
    }, []);
  
    // Render a placeholder with the same structure while mounting
    if (!mounted) {
      return (
        <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Add minimal content to match structure */}
            <div className="py-12 md:py-16">
              {/* Placeholder content */}
            </div>
          </div>
        </footer>
      );
    }

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          {/* Top section with logo and theme switcher */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              HE<span className="text-pink-600">LYX</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Main footer links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-base text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-base text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-base text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-base text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom section with social links and copyright */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex space-x-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500"
                  >
                    <span className="sr-only">{link.name}</span>
                    {link.icon}
                  </a>
                ))}
              </div>
              <p className="text-base text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Web3Learn. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}