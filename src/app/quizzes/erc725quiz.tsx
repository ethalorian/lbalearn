"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, Check, X, RefreshCw, Book } from 'lucide-react';
import '@/app/globals.css';

const ERC725Game = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  const stages = [
    {
      title: "Understanding EOAs vs Smart Contracts",
      content: "Let's start by understanding the fundamental differences between EOAs and Smart Contracts.",
      question: "Which of the following is NOT a capability of Externally Owned Accounts (EOAs)?",
      options: [
        "Performing CALL operations",
        "Creating new contracts",
        "Storing internal data",
        "Controlling with private keys"
      ],
      correctAnswer: 2,
      explanation: "EOAs (Externally Owned Accounts) can perform CALL operations and CREATE new contracts, and are controlled by private keys. However, they cannot store internal data - that's a capability unique to smart contracts!"
    },
    {
      title: "ERC725X Operations",
      content: "ERC725X extends basic contract functionality with special operations.",
      question: "Which ERC725X operation allows you to run another contract's function in the current contract's context?",
      options: [
        "CALL",
        "CREATE2",
        "STATICCALL",
        "DELEGATECALL"
      ],
      correctAnswer: 3,
      explanation: "DELEGATECALL (operation type 4) runs functions from another contract while using the current contract's context. However, be careful - this operation can be dangerous as it can alter the contract's state and owner variables!"
    },
    {
      title: "ERC725Y Data Storage",
      content: "ERC725Y provides a standardized way to store and manage data in smart contracts.",
      question: "What's the main advantage of ERC725Y's data storage approach?",
      options: [
        "It uses less gas than traditional storage",
        "It allows dynamic addition of data after deployment",
        "It makes contracts smaller",
        "It encrypts all stored data"
      ],
      correctAnswer: 1,
      explanation: "ERC725Y's key feature is its ability to add new data dynamically after contract deployment. Instead of fixed variables, it uses a mapping of data keys to values, making it much more flexible than traditional contract storage."
    },
    {
      title: "CREATE2 Operation",
      content: "CREATE2 is one of the special operations provided by ERC725X.",
      question: "What unique feature does CREATE2 provide compared to regular CREATE?",
      options: [
        "It uses less gas",
        "It creates multiple contracts at once",
        "It allows predetermined contract addresses",
        "It creates upgradeable contracts"
      ],
      correctAnswer: 2,
      explanation: "CREATE2 allows you to predetermine the address where a contract will be deployed based on the contract address, bytecode, and salt. This is particularly useful for cross-chain deployments and layer 2 solutions."
    },
    {
      title: "STATICCALL Understanding",
      content: "STATICCALL is a special type of call operation in ERC725X.",
      question: "What is the main purpose of STATICCALL?",
      options: [
        "To make calls faster",
        "To prevent state modifications during calls",
        "To call multiple contracts at once",
        "To reduce gas costs"
      ],
      correctAnswer: 1,
      explanation: "STATICCALL is designed to make calls to other contracts while ensuring no state modifications can occur during the call. This is useful for reading data safely from other contracts."
    },
    {
      title: "Data Key/Value Store",
      content: "ERC725Y implements a key/value store for data.",
      question: "How are variables represented in ERC725Y?",
      options: [
        "As string names",
        "As integers",
        "As bytes32 data keys",
        "As boolean flags"
      ],
      correctAnswer: 2,
      explanation: "In ERC725Y, variables are represented as bytes32 data keys, similar to how Solidity treats variables under the hood. This provides a standardized way to reference and store data."
    },
    {
      title: "Contract Interoperability",
      content: "ERC725Y enhances contract interoperability.",
      question: "Which functions are standardized in ERC725Y for data access?",
      options: [
        "read() and write()",
        "get() and set()",
        "getData() and setData()",
        "fetch() and store()"
      ],
      correctAnswer: 2,
      explanation: "ERC725Y standardizes getData() and setData() functions for reading and writing data, making contracts more interoperable as they all use the same interface for data access."
    },
    {
      title: "Ownership Management",
      content: "ERC725 uses ERC173 for ownership management.",
      question: "What can the owner of an ERC725 contract do?",
      options: [
        "Only transfer ownership",
        "Only execute calls",
        "Only set data",
        "Both execute calls and set data"
      ],
      correctAnswer: 3,
      explanation: "The owner of an ERC725 contract can both execute calls to other addresses using execute() functions and set data using setData() functions. This provides comprehensive control over the contract's operations."
    },
    {
      title: "Dangerous Operations",
      content: "Some ERC725X operations require careful handling.",
      question: "Which operation is considered the most dangerous in ERC725X?",
      options: [
        "CALL",
        "CREATE",
        "DELEGATECALL",
        "STATICCALL"
      ],
      correctAnswer: 2,
      explanation: "DELEGATECALL is considered the most dangerous operation as it can alter the state of the contract and change owner variables at will. It can even destroy the contract through selfdestruct calls."
    },
    {
      title: "Contract Ownership Types",
      content: "ERC725 supports different types of contract owners.",
      question: "Which of these can be an owner of an ERC725 contract?",
      options: [
        "Only EOAs",
        "Only other smart contracts",
        "Either EOAs or smart contracts",
        "Only multi-sig wallets"
      ],
      correctAnswer: 2,
      explanation: "An ERC725 contract can be owned by either an EOA (Externally Owned Account) or another smart contract, such as a DAO voting contract or a KeyManager. This flexibility allows for various ownership structures."
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

  const getButtonVariant = (index: number) => {
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
            <CardTitle className="text-xl">ERC725 Learning Game</CardTitle>
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

export default ERC725Game;