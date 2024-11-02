'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, RefreshCcw } from 'lucide-react';
import { Question, QuestionData } from './Question';

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
      correctAnswer: 0,
      explanation: "Web3 fundamentally differs from Web2 by emphasizing decentralization and giving users control over their data."
    }
  };

  const [currentView, setCurrentView] = useState<'content' | 'quiz'>('content');
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAnswerSelect = (answer: number | string | boolean) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
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
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {/* Main Content Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{sampleLesson.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentView === 'content' ? (
            <div className="space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
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
              <p className="text-center text-gray-600">
                {sampleLesson.content.description}
              </p>
              <div className="flex justify-end">
                <Button onClick={handleNext}>
                  Continue to Quiz <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Question
                questionData={sampleLesson.quiz}
                selectedAnswer={selectedAnswer}
                isAnswered={isAnswered}
                onAnswerSelect={handleAnswerSelect}
              />
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="flex items-center"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
                <Button
                  onClick={isAnswered ? handleNext : handleSubmit}
                  disabled={selectedAnswer === null && !isAnswered}
                >
                  {isAnswered ? 'Next Lesson' : 'Submit Answer'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default LearningPlatform;