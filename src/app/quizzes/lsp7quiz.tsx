"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, Check, X, RefreshCw, Book } from 'lucide-react';

interface Stage {
  title: string;
  content: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const LSP7Game = () => {
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answered, setAnswered] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameComplete, setGameComplete] = useState<boolean>(false);

  const stages: Stage[] = [
    {
      title: "Understanding LSP7 Basics",
      content: "Let's start with the fundamental concept of LSP7 Digital Assets.",
      question: "What type of assets does LSP7 standard represent?",
      options: [
        "Non-fungible assets only",
        "Fungible assets only",
        "Both fungible and non-fungible assets",
        "Neither fungible nor non-fungible assets"
      ],
      correctAnswer: 1,
      explanation: "LSP7 is a standard that aims to describe fungible assets. Fungible means these assets are mutually interchangeable - one token has the same value as another token."
    },
    {
      title: "Divisibility in LSP7",
      content: "LSP7 offers flexibility in how tokens can be divided.",
      question: "What is true about divisible assets in LSP7?",
      options: [
        "They can only have whole number values",
        "They can have up to 18 decimals",
        "They must always be divided",
        "They cannot be transferred in parts"
      ],
      correctAnswer: 1,
      explanation: "Divisible assets in LSP7 can have decimals (up to 18) and token amounts can be fractional. This means you can transfer amounts like 0.3 tokens."
    },
    {
      title: "Force Parameter",
      content: "LSP7 includes a safety feature for transfers.",
      question: "What happens when the 'force' parameter is set to false in a transfer?",
      options: [
        "The transfer fails completely",
        "The transfer only succeeds if recipient is LSP1-UniversalReceiver compatible",
        "The transfer succeeds regardless of recipient",
        "The transfer requires manual approval"
      ],
      correctAnswer: 1,
      explanation: "When force is set to false, the transfer will only succeed if the recipient is a smart contract that implements the LSP1-UniversalReceiver standard, ensuring safer transfers."
    },
    {
      title: "Token Hooks",
      content: "LSP7 implements notification features for transfers.",
      question: "What happens during an LSP7 token transfer that's different from ERC20?",
      options: [
        "Only balances are updated",
        "Only the sender is notified",
        "Both sender and recipient are notified via universalReceiver",
        "Transfers must be approved by a third party"
      ],
      correctAnswer: 2,
      explanation: "During an LSP7 transfer, both the sender and recipient are informed of the transfer by calling their universalReceiver function (if these are smart contracts), unlike ERC20 which only updates balances."
    },
    {
      title: "Metadata Handling",
      content: "LSP7 offers enhanced metadata capabilities.",
      question: "How does LSP7 handle token metadata compared to traditional standards?",
      options: [
        "It only allows name and symbol",
        "It uses LSP4-DigitalAssetMetadata for flexible metadata",
        "It doesn't support metadata",
        "It only supports static metadata"
      ],
      correctAnswer: 1,
      explanation: "LSP7 uses LSP4-DigitalAssetMetadata to ensure flexible and generic asset representation, allowing any information to be attached to the token contract."
    },
    {
      title: "Universal Receiver Notifications",
      content: "LSP7 uses specific typeIds for notifications.",
      question: "Which typeId is used when notifying a token recipient?",
      options: [
        "0x429ac7a06903dbc9c13dfcb3c9d11df8194581fa047c96d7a4171fc7402958ea",
        "0x20804611b3e2ea21c480dc465142210acf4a2485947541770ec1fb87dee4a55c",
        "0x386072cc5a58e61263b434c722725f21031cd06e7c552cfaa06db5de8a320dbc",
        "None of the above"
      ],
      correctAnswer: 1,
      explanation: "The typeId 0x20804611b3e2ea21c480dc465142210acf4a2485947541770ec1fb87dee4a55c (keccak256('LSP7Tokens_RecipientNotification')) is used when notifying token recipients."
    },
    {
      title: "Non-Divisible Assets",
      content: "LSP7 supports non-divisible assets.",
      question: "Which is a good example use case for non-divisible LSP7 tokens?",
      options: [
        "Cryptocurrency",
        "Fractional shares",
        "Event tickets",
        "Loyalty points"
      ],
      correctAnswer: 2,
      explanation: "Tickets are a great example of non-divisible LSP7 tokens because they look the same, are interchangeable, have the same utility, and can't be divided (you can't transfer part of a ticket)."
    },
    {
      title: "LSP7 vs Traditional Standards",
      content: "LSP7 improves upon previous token standards.",
      question: "What key improvement does LSP7 offer over ERC20?",
      options: [
        "Lower gas fees",
        "Faster transfers",
        "More secure transfers via force parameter",
        "Simpler implementation"
      ],
      correctAnswer: 2,
      explanation: "LSP7 improves upon ERC20 by offering more secure transfers through the force parameter, which helps prevent accidental transfers to incompatible addresses."
    },
    {
      title: "Recommended Usage",
      content: "LSP7 has specific recommendations for implementation.",
      question: "What is recommended for marking asset authenticity in LSP7?",
      options: [
        "Only using LSP4",
        "Only using LSP12",
        "Combining LSP4-DigitalAssetMetadata and LSP12-IssuedAssets",
        "Using traditional metadata"
      ],
      correctAnswer: 2,
      explanation: "To mark asset authenticity, it's advised to use a combination between LSP4-DigitalAssetMetadata and LSP12-IssuedAssets."
    },
    {
      title: "Account Interaction",
      content: "LSP7 has specific expectations about account usage.",
      question: "How should EOAs (Externally Owned Accounts) be used in the LUKSO ecosystem?",
      options: [
        "As the main holders of tokens",
        "As the primary transaction initiators",
        "Mainly to control smart contract-based accounts",
        "As the primary receivers of assets"
      ],
      correctAnswer: 2,
      explanation: "In the LUKSO ecosystem, EOAs should be used mainly to control smart contract-based accounts, not to interact on the network or hold tokens directly."
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    if (answerIndex === stages[currentStage].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextStage = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentStage(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setGameComplete(false);
  };

  const currentQuestion = stages[currentStage];

  const getButtonVariant = (index: number): "default" | "outline" | "secondary" | "destructive" => {
    if (!answered) {
      return selectedAnswer === index ? "default" : "outline";
    }
    if (index === currentQuestion.correctAnswer) {
      return "secondary";
    }
    if (index === selectedAnswer) {
      return "destructive";
    }
    return "outline";
  };

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto p-4 py-24">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">LSP7 Digital Asset Learning Game</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Score: {score}/{stages.length}</span>
              <Button variant="outline" size="sm" onClick={resetGame}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{currentQuestion.title}</h3>
            <p className="text-gray-600">{currentQuestion.content}</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">{currentQuestion.question}</p>
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={getButtonVariant(index)}
                  className="w-full justify-start text-left"
                  onClick={() => !answered && handleAnswer(index)}
                  disabled={answered}
                >
                  <span className="flex-1">{option}</span>
                  {answered && index === currentQuestion.correctAnswer && 
                    <Check className="w-4 h-4 ml-2" />
                  }
                  {answered && index === selectedAnswer && index !== currentQuestion.correctAnswer &&
                    <X className="w-4 h-4 ml-2" />
                  }
                </Button>
              ))}
            </div>
          </div>

          {answered && (
            <div className="space-y-4">
              <Alert>
                <Book className="w-4 h-4 mr-2" />
                <AlertDescription>
                  {currentQuestion.explanation}
                </AlertDescription>
              </Alert>
              
              {currentStage < stages.length - 1 ? (
                <Button className="w-full" onClick={nextStage}>
                  Next Question
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <div className="space-y-4">
                  <Alert className={score >= 8 ? "bg-green-50" : "bg-yellow-50"}>
                    <AlertDescription>
                      Game Complete! You scored {score} out of {stages.length}.
                      {score >= 8 ? " Excellent work! 🎉" : " Keep learning! 📚"}
                    </AlertDescription>
                  </Alert>
                  <Button className="w-full" onClick={resetGame}>
                    Play Again
                    <RefreshCw className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LSP7Game;
