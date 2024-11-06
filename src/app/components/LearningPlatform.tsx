'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, ArrowRight, RefreshCcw, BookOpen } from 'lucide-react';

interface QuestionData {
  type: 'multiple-choice' | 'true-false' | 'text';
  question: string;
  options?: string[];
  correctAnswer: number | boolean | string;
  explanation?: string;
}

interface Lesson {
  id: number;
  title: string;
  content: {
    type: 'image' | 'video';
    url: string;
    description: string;
  };
  quiz: QuestionData;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      bounce: 0.3
    }
  },
  exit: { opacity: 0, y: -20 }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      type: "spring",
      bounce: 0.2
    }
  }
};

const LearningPlatform = () => {
  const sampleLesson: Lesson = {
    id: 1,
    title: "Introduction to Web3",
    content: {
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Web3 Architecture Overview"
    },
    quiz: {
      type: 'multiple-choice',
      question: "What is the main difference between Web2 and Web3?",
      options: [
        "Decentralization and user ownership of data",
        "Better graphics and animations",
        "Faster loading times",
        "More social media features"
      ],
      correctAnswer: 0
    }
  };

  const [currentView, setCurrentView] = useState<'content' | 'quiz'>('content');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAnswerSelect = (index: number) => {
    if (!isAnswered) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null && !isAnswered) {
      setIsAnswered(true);
      if (selectedAnswer === sampleLesson.quiz.correctAnswer) {
        setProgress((prev) => Math.min(prev + 25, 100));
      }
    }
  };

  const handleNext = () => {
    setCurrentView(currentView === 'content' ? 'quiz' : 'content');
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleReset = () => {
    setProgress(0);
    setCurrentView('content');
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-6 space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Progress Bar */}
      <motion.div 
        className="space-y-2 bg-white p-4 rounded-lg shadow-sm"
        variants={cardVariants}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">Course Progress</span>
          <span className="text-sm font-bold text-primary">{progress}%</span>
        </div>
        <Progress 
          value={progress} 
          className="h-2 bg-gray-100" 
        />
      </motion.div>

      {/* Main Content Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          <Card className="w-full border-2 shadow-lg bg-white">
            <CardHeader className="bg-primary/5 border-b">
              <CardTitle className="flex items-center text-2xl font-bold text-gray-800">
                <BookOpen className="mr-2 h-6 w-6 text-primary" />
                {sampleLesson.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {currentView === 'content' ? (
                <motion.div 
                  className="space-y-6"
                  variants={cardVariants}
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 shadow-md">
                    {sampleLesson.content.type === 'video' ? (
                      <iframe
                        src={sampleLesson.content.url}
                        title={sampleLesson.content.description}
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <Image 
                        src={sampleLesson.content.url}
                        alt={sampleLesson.content.description}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <p className="text-center text-gray-600 font-medium">
                    {sampleLesson.content.description}
                  </p>
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleNext}
                      className="bg-primary hover:bg-primary/90 text-white shadow-lg transition-all"
                    >
                      Continue to Quiz <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="space-y-6"
                  variants={cardVariants}
                >
                  <p className="text-xl font-semibold text-gray-800">
                    {sampleLesson.quiz.question}
                  </p>
                  <div className="space-y-3">
                    {sampleLesson.quiz.options?.map((option, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all
                          ${selectedAnswer === index ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}
                          ${isAnswered && index === sampleLesson.quiz.correctAnswer ? 'bg-green-50 border-green-500' : ''}
                          ${isAnswered && index === selectedAnswer && index !== sampleLesson.quiz.correctAnswer ? 'bg-red-50 border-red-500' : ''}
                        `}
                        onClick={() => handleAnswerSelect(index)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{option}</span>
                          {isAnswered && index === sampleLesson.quiz.correctAnswer && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {isAnswered && index === selectedAnswer && index !== sampleLesson.quiz.correctAnswer && (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                      className="border-2 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    >
                      <RefreshCcw className="mr-2 h-4 w-4" /> Reset Progress
                    </Button>
                    <Button
                      onClick={isAnswered ? handleNext : handleSubmit}
                      disabled={selectedAnswer === null && !isAnswered}
                      className="bg-primary hover:bg-primary/90 text-white shadow-lg transition-all"
                    >
                      {isAnswered ? 'Next Lesson' : 'Submit Answer'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default LearningPlatform;