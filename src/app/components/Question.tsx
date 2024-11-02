'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export type QuestionType = 'multiple-choice' | 'true-false' | 'text';

export interface BaseQuestion {
  type: QuestionType;
  question: string;
  correctAnswer: number | string | boolean;
  explanation?: string;  // Add this line
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: number;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  correctAnswer: boolean;
}

export interface TextQuestion extends BaseQuestion {
  type: 'text';
  correctAnswer: string;
}

export type QuestionData = MultipleChoiceQuestion | TrueFalseQuestion | TextQuestion;

interface QuestionProps {
  questionData: QuestionData;
  selectedAnswer: number | string | boolean | null;
  isAnswered: boolean;
  onAnswerSelect: (answer: number | string | boolean) => void;
}

export const Question: React.FC<QuestionProps> = ({
  questionData,
  selectedAnswer,
  isAnswered,
  onAnswerSelect,
}) => {
  const [textInput, setTextInput] = useState('');

  const renderMultipleChoice = (question: MultipleChoiceQuestion) => (
    <div className="space-y-2">
      {question.options.map((option, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border cursor-pointer transition-all
            ${selectedAnswer === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}
            ${isAnswered && index === question.correctAnswer ? 'bg-green-50 border-green-500' : ''}
            ${isAnswered && index === selectedAnswer && index !== question.correctAnswer ? 'bg-red-50 border-red-500' : ''}
          `}
          onClick={() => !isAnswered && onAnswerSelect(index)}
        >
          <div className="flex items-center justify-between">
            <span>{option}</span>
            {isAnswered && index === question.correctAnswer && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            {isAnswered && index === selectedAnswer && index !== question.correctAnswer && (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderTrueFalse = (question: TrueFalseQuestion) => (
    <div className="flex gap-4 justify-center">
      {[true, false].map((value) => (
        <Button
          key={value.toString()}
          variant={selectedAnswer === value ? "default" : "outline"}
          className={`w-32 ${
            isAnswered && value === question.correctAnswer
              ? 'bg-green-500 hover:bg-green-600'
              : isAnswered && value === selectedAnswer
              ? 'bg-red-500 hover:bg-red-600'
              : ''
          }`}
          onClick={() => !isAnswered && onAnswerSelect(value)}
          disabled={isAnswered}
        >
          {value ? 'True' : 'False'}
        </Button>
      ))}
    </div>
  );

  const renderTextInput = (question: TextQuestion) => (
    <div className="space-y-4">
      <Input
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter' && !isAnswered) {
            onAnswerSelect(textInput);
          }
        }}
        placeholder="Type your answer here..."
        disabled={isAnswered}
      />
      {isAnswered && (
        <div className={`p-4 rounded-lg ${
          selectedAnswer === question.correctAnswer
            ? 'bg-green-50 border-green-500'
            : 'bg-red-50 border-red-500'
        }`}>
          <p className="font-medium">
            {selectedAnswer === question.correctAnswer ? (
              <span className="text-green-600">Correct!</span>
            ) : (
              <span className="text-red-600">
                Incorrect. The correct answer is: {question.correctAnswer}
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-lg font-medium">{questionData.question}</p>
        {questionData.explanation && isAnswered && (
          <p className="text-sm text-gray-600">{questionData.explanation}</p>
        )}
      </div>

      {/* Render different question types */}
      {questionData.type === 'multiple-choice' && renderMultipleChoice(questionData)}
      {questionData.type === 'true-false' && renderTrueFalse(questionData)}
      {questionData.type === 'text' && renderTextInput(questionData)}
    </div>
  );
};