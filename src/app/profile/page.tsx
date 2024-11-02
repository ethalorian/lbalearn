'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Trophy, Award, Star } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
};

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  date: string;
}

interface Quiz {
  id: number;
  title: string;
  topic: string;
  questionsCount: number;
  completions: number;
  rating: number;
}

const ProfilePage = () => {
  const [achievements] = useState<Achievement[]>([
    {
      id: 1,
      title: "First Quiz Created",
      description: "Created your first quiz",
      icon: <BookOpen className="h-4 w-4" />,
      date: "2024-03-15"
    },
    {
      id: 2,
      title: "Knowledge Master",
      description: "Completed 10 quizzes",
      icon: <Brain className="h-4 w-4" />,
      date: "2024-03-18"
    },
    {
      id: 3,
      title: "Popular Creator",
      description: "Your quiz was taken 100 times",
      icon: <Trophy className="h-4 w-4" />,
      date: "2024-03-20"
    }
  ]);

  const [createdQuizzes] = useState<Quiz[]>([
    {
      id: 1,
      title: "Web3 Basics",
      topic: "Blockchain",
      questionsCount: 10,
      completions: 156,
      rating: 4.5
    },
    {
      id: 2,
      title: "Smart Contracts 101",
      topic: "Solidity",
      questionsCount: 8,
      completions: 89,
      rating: 4.8
    }
  ]);

  return (
    <motion.div
      className="container mx-auto p-6 pt-24 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Header */}
      <motion.div variants={itemVariants} className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Profile Picture" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-gray-600">Web3 Enthusiast</p>
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary">
              <Trophy className="h-4 w-4 mr-1" />
              Level 5
            </Badge>
            <Badge variant="secondary">
              <BookOpen className="h-4 w-4 mr-1" />
              10 Quizzes Created
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Progress Section */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-medium">75%</span>
              </div>
              <Progress value={75} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Quizzes Completed</span>
                </div>
                <p className="text-2xl font-bold mt-2">24</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  <span>Average Score</span>
                </div>
                <p className="text-2xl font-bold mt-2">85%</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  <span>Achievements</span>
                </div>
                <p className="text-2xl font-bold mt-2">{achievements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs Section */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="created" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="created">Created Quizzes</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="created">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {createdQuizzes.map((quiz) => (
                <Card key={quiz.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    <Badge>{quiz.topic}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Questions: {quiz.questionsCount}</span>
                        <span>Completions: {quiz.completions}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{quiz.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-primary rounded-full text-primary-foreground">
                        {achievement.icon}
                      </div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Achieved on {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;