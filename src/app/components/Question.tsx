import { CheckCircle, XCircle } from 'lucide-react';

export type QuestionType = 'multiple-choice' | 'true-false' | 'text';

export interface BaseQuestion {
  type: QuestionType;
  question: string;
  correctAnswer: number | string;
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
  selectedAnswer: number | string | null;
  isAnswered: boolean;
  onAnswerSelect: (answer: number | string) => void;
}

export const Question = ({ questionData, selectedAnswer, isAnswered, onAnswerSelect }: QuestionProps) => {
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
          onClick={() => onAnswerSelect(index)}
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

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{questionData.question}</p>
      {questionData.type === 'multiple-choice' && renderMultipleChoice(questionData)}
      {/* Add other question type renders here */}
    </div>
  );
};