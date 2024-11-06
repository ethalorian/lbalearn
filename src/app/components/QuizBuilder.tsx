'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Plus, Trash2, Save } from 'lucide-react';
import { QuestionData, QuestionType } from './Question';

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
      type: "spring",
      bounce: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { 
      duration: 0.4,
      type: "spring",
      bounce: 0.2
    }
  },
  exit: {
    opacity: 0,
    x: 30,
    scale: 0.95,
    transition: { duration: 0.3 }
  }
};

interface QuizBuilderProps {
  onSave?: (question: QuestionData) => void;
  initialQuestion?: QuestionData;
}

export const QuizBuilder: React.FC<QuizBuilderProps> = ({ onSave, initialQuestion }) => {
  const [questionType, setQuestionType] = useState<QuestionType>(initialQuestion?.type || 'multiple-choice');
  const [question, setQuestion] = useState(initialQuestion?.question || '');
  const [explanation, setExplanation] = useState(initialQuestion?.explanation || '');
  const [options, setOptions] = useState<string[]>(
    questionType === 'multiple-choice' ? (initialQuestion as any)?.options || [''] : []
  );
  const [correctAnswer, setCorrectAnswer] = useState<number | string | boolean>(
    initialQuestion?.correctAnswer || ''
  );

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSave = () => {
    let questionData: QuestionData;

    switch (questionType) {
      case 'multiple-choice':
        questionData = {
          type: 'multiple-choice',
          question,
          options,
          correctAnswer: Number(correctAnswer),
          explanation,
        };
        break;
      case 'true-false':
        questionData = {
          type: 'true-false',
          question,
          correctAnswer: correctAnswer === 'true',
          explanation,
        };
        break;
      case 'text':
        questionData = {
          type: 'text',
          question,
          correctAnswer: String(correctAnswer),
          explanation,
        };
        break;
      default:
        return;
    }

    onSave?.(questionData);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4"
    >
      <Card className="w-full border-2">
        <CardHeader className="bg-primary/5">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <CardTitle className="text-2xl font-bold">Quiz Builder</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Question Type Selection */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-sm font-medium">Question Type</label>
            <Select
              value={questionType}
              onValueChange={(value: QuestionType) => setQuestionType(value)}
            >
              <SelectTrigger className="border-2 hover:border-primary/50 transition-colors">
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                <SelectItem value="true-false">True/False</SelectItem>
                <SelectItem value="text">Text Input</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Question Text */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-sm font-medium">Question</label>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question here..."
              className="border-2 hover:border-primary/50 transition-colors min-h-[100px]"
            />
          </motion.div>

          {/* Multiple Choice Options */}
          <AnimatePresence mode='wait'>
            {questionType === 'multiple-choice' && (
              <motion.div
                key="multiple-choice"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={itemVariants}
                className="space-y-3"
              >
                <label className="text-sm font-medium">Options</label>
                <AnimatePresence>
                  {options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-3"
                    >
                      <Input
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="border-2 hover:border-primary/50 transition-colors"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveOption(index)}
                        className="border-2 hover:border-destructive/50 hover:bg-destructive/5 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    variant="outline"
                    onClick={handleAddOption}
                    className="w-full border-2 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Option
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Correct Answer */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-sm font-medium">Correct Answer</label>
            <AnimatePresence mode='wait'>
              {questionType === 'multiple-choice' ? (
                <motion.div
                  key="multiple-choice-answer"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={itemVariants}
                >
                  <Select
                    value={String(correctAnswer)}
                    onValueChange={(value) => setCorrectAnswer(Number(value))}
                  >
                    <SelectTrigger className="border-2 hover:border-primary/50 transition-colors">
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option, index) => (
                        <SelectItem key={index} value={String(index)}>
                          Option {index + 1}: {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              ) : questionType === 'true-false' ? (
                <motion.div
                  key="true-false-answer"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={itemVariants}
                >
                  <Select
                    value={String(correctAnswer)}
                    onValueChange={(value) => setCorrectAnswer(value === 'true')}
                  >
                    <SelectTrigger className="border-2 hover:border-primary/50 transition-colors">
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              ) : (
                <motion.div
                  key="text-answer"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={itemVariants}
                >
                  <Input
                    value={String(correctAnswer)}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    placeholder="Enter correct answer"
                    className="border-2 hover:border-primary/50 transition-colors"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Explanation */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-sm font-medium">Explanation (Optional)</label>
            <Textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Enter explanation for the correct answer..."
              className="border-2 hover:border-primary/50 transition-colors min-h-[100px]"
            />
          </motion.div>

          {/* Save Button */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={handleSave} 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all"
            >
              <Save className="h-4 w-4 mr-2" /> Save Question
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};