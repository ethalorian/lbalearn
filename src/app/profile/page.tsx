'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Trophy, Star, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
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
    scale: 0.98
  }
};

const progressVariants = {
  hidden: { opacity: 0, width: "0%" },
  visible: {
    opacity: 1,
    width: "75%",
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.2
    }
  }
};

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
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
  const [selectedTab, setSelectedTab] = useState("created");
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
      <motion.div 
        variants={itemVariants} 
        className="flex items-center gap-6"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Avatar className="h-24 w-24">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Profile Picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </motion.div>
        <div>
          <motion.h1 
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            John Doe
          </motion.h1>
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Web3 Enthusiast
          </motion.p>
          <motion.div 
            className="flex gap-2 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Badge variant="secondary">
              <Trophy className="h-4 w-4 mr-1" />
              Level 5
            </Badge>
            <Badge variant="secondary">
              <BookOpen className="h-4 w-4 mr-1" />
              10 Quizzes Created
            </Badge>
          </motion.div>
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
              <motion.div
                initial="hidden"
                animate="visible"
                variants={progressVariants}
                className="relative h-2 w-full bg-secondary rounded-full overflow-hidden"
              >
                <Progress value={75} />
              </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <BookOpen className="h-5 w-5" />, label: "Quizzes Completed", value: "24" },
                { icon: <Brain className="h-5 w-5" />, label: "Average Score", value: "85%" },
                { icon: <Trophy className="h-5 w-5" />, label: "Achievements", value: achievements.length }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={statsVariants}
                  whileHover="hover"
                  className="p-4 bg-secondary rounded-lg cursor-pointer"
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-2">
                    {stat.icon}
                    <span>{stat.label}</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs Section */}
      <motion.div variants={itemVariants}>
        <Tabs 
          defaultValue="created" 
          className="w-full"
          onValueChange={setSelectedTab}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="created">Created Quizzes</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            {selectedTab === "created" ? (
              <TabsContent key="created-tab" value="created">
                <div className="space-y-6">
                  <motion.div 
                    className="flex justify-between items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="text-xl font-semibold">Your Quizzes</h2>
                    <Link href="/create-quiz">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Create New Quiz
                        </Button>
                      </motion.div>
                    </Link>
                  </motion.div>
                  
                  {createdQuizzes.length > 0 ? (
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {createdQuizzes.map((quiz, index) => (
                        <motion.div
                          key={quiz.id}
                          variants={cardVariants}
                          whileHover="hover"
                          whileTap="tap"
                          custom={index}
                        >
                          <Card>
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
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Card className="text-center py-12">
                        <CardContent>
                          <div className="space-y-4">
                            <motion.div 
                              className="flex justify-center"
                              animate={{ 
                                rotate: [0, 360],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                            >
                              <div className="p-3 rounded-full bg-secondary">
                                <Plus className="h-6 w-6" />
                              </div>
                            </motion.div>
                            <h3 className="text-lg font-semibold">No Quizzes Yet</h3>
                            <p className="text-muted-foreground">
                              Create your first quiz and start sharing knowledge with others.
                            </p>
                            <Link href="/create-quiz">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button className="flex items-center gap-2">
                                  <Plus className="h-4 w-4" />
                                  Create Your First Quiz
                                </Button>
                              </motion.div>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </TabsContent>
            ) : (
              <TabsContent key="achievements-tab" value="achievements">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      variants={cardVariants}
                      whileHover="hover"
                      whileTap="tap"
                      custom={index}
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                              className="p-2 bg-primary rounded-full text-primary-foreground"
                            >
                              {achievement.icon}
                            </motion.div>
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
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            )}
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;