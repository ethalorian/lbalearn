"use client";

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Code, Users } from 'lucide-react';
import { motion, AnimatePresence, useInView, LayoutGroup } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
};

const curriculumData = [
  {
    title: "Blockchain Fundamentals",
    icon: <Code className="w-6 h-6" />,
    description: "Learn the core concepts of blockchain technology, including distributed ledgers, consensus mechanisms, and cryptography basics.",
    link: "/LP",
    className: "col-span-3 md:col-span-2 row-span-1 bg-teal-100/80 dark:bg-teal-900/30 hover:bg-teal-200/80 dark:hover:bg-teal-900/50"
  },
  {
    title: "Smart Contract Development",
    icon: <BookOpen className="w-6 h-6" />,
    description: "Master Solidity programming and learn to write, test, and deploy secure smart contracts.",
    link: "/courses/smart-contracts",
    className: "col-span-3 md:col-span-1 row-span-1 md:row-span-2 bg-pink-100/80 dark:bg-pink-900/30 hover:bg-pink-200/80 dark:hover:bg-pink-900/50"
  },
  {
    title: "DApp Architecture",
    icon: <Users className="w-6 h-6" />,
    description: "Explore decentralized application architecture and best practices for Web3 development.",
    link: "/courses/dapp-architecture",
    className: "col-span-3 md:col-span-1 row-span-1 bg-teal-100/80 dark:bg-teal-900/30 hover:bg-teal-200/80 dark:hover:bg-teal-900/50"
  },
  {
    title: "Web3 Integration",
    icon: <ArrowRight className="w-6 h-6" />,
    description: "Connect your applications to the blockchain using Web3.js and ethers.js libraries.",
    link: "/courses/web3-integration",
    className: "col-span-3 md:col-span-2 row-span-1 bg-pink-100/80 dark:bg-pink-900/30 hover:bg-pink-200/80 dark:hover:bg-pink-900/50"
  }
];

interface CurriculumCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
  className?: string;
}

function CurriculumCard({ 
  title, 
  icon, 
  description, 
  link, 
  className 
}: CurriculumCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      layout
      className={`relative rounded-xl p-4 md:p-6 cursor-pointer shadow-lg backdrop-blur-sm ${className}`}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      whileTap="tap"
      onClick={() => setIsOpen(!isOpen)}
    >
      <motion.div layout className="flex flex-col h-full">
        <motion.div layout className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <motion.div 
            className="text-teal-600 dark:text-teal-500"
            animate={{ rotate: isOpen ? 360 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
          <motion.h3 layout className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </motion.h3>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <motion.p 
                className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-3 md:mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {description}
              </motion.p>
              <Link 
                href={link}
                className="inline-flex items-center text-teal-600 dark:text-teal-500 hover:text-teal-700 dark:hover:text-teal-400 font-medium text-sm md:text-base"
              >
                <motion.span
                  className="flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function CleanLandingPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <LayoutGroup>
      <div className="min-h-screen bg-gradient-to-br from-white via-teal-50/50 to-pink-50/50 dark:from-gray-950 dark:via-teal-900/20 dark:to-pink-900/20">
      <motion.div 
        ref={heroRef}
        className="pt-32 md:pt-32 pb-12 md:pb-16 px-4 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Update the background image container */}
        <div className="absolute inset-0 pt-24 flex items-center justify-center opacity-[0.2] dark:opacity-[0.2]">
          <div className="relative w-full h-full">
            <Image
              src="/helyx.png"
              alt=""
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
          </div>
        </div>


          <motion.div 
            className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white"
              variants={itemVariants}
            >
              Learn the New{" "}
              <motion.span 
                className="text-pink-600 dark:text-teal-500 inline-block"
                animate={{ 
                  color: ['#0d9488', '#14b8a6', '#0d9488'],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Social
              </motion.span>{" "}
              Standards
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300"
              variants={itemVariants}
            >
              Learn LUKSO's social blockchain technology through interactive lessons
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-pink-500 to-teal-400 hover:from-pink-600 hover:to-teal-500 dark:from-pink-400 dark:to-teal-300 dark:hover:from-pink-500 dark:hover:to-teal-400 text-white gap-2 relative overflow-hidden group text-base md:text-lg px-6 md:px-8 py-4 md:py-6"
              >
                <motion.span
                  className="relative z-10 flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Get Started <ArrowRight className="h-5 md:h-6 w-5 md:w-6" />
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 to-teal-500 dark:from-pink-500 dark:to-teal-400"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="absolute top-20 left-0 md:left-10 text-teal-600/10 dark:text-teal-500/10 scale-75 md:scale-100"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Code size={160} />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-20 right-0 md:right-10 text-pink-600/10 dark:text-pink-500/10 scale-75 md:scale-100"
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -10, 0],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Users size={140} />
          </motion.div>
        </motion.div>

        <motion.div 
          className="py-12 md:py-16 px-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-gray-900 dark:text-white"
              >
                Curriculum Overview
              </motion.h2>
              <motion.p 
                className="text-sm md:text-base text-gray-600 dark:text-gray-300"
              >
                Click on any topic to learn more
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {curriculumData.map((item, index) => (
                <CurriculumCard key={index} {...item} />
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="py-12 md:py-16 px-4 bg-gradient-to-br from-white via-teal-50/50 to-pink-50/50 dark:from-gray-950 dark:via-teal-900/20 dark:to-pink-900/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Ready to Begin?
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
              Join thousands of developers learning Web3
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-teal-400 to-pink-500 hover:from-pink-600 hover:to-teal-500 dark:from-pink-400 dark:to-teal-300 dark:hover:from-pink-500 dark:hover:to-teal-400 text-white group"
            >
              <motion.span
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Start Learning <ArrowRight className="h-4 md:h-5 w-4 md:w-5" />
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </LayoutGroup>
  );
}