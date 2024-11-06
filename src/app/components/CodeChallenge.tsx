'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, ChevronRight, Maximize2, FileCode2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// VS Code-like theme colors for syntax highlighting
const theme = {
  background: '#1e1e1e',
  lineNumber: '#858585',
  activeLine: '#282828',
  text: '#d4d4d4',
  keyword: '#c586c0',
  type: '#4ec9b0',
  string: '#ce9178',
  function: '#dcdcaa',
  variable: '#9cdcfe',
  number: '#b5cea8',
  comment: '#6a9955',
};

const challenges = [
  {
    id: 1,
    language: 'typescript',
    title: 'Generic Array Filter',
    description: 'Complete the TypeScript function that filters an array based on a condition.',
    template: [
      { lineNumber: 1, prefix: '', suffix: 'filterArray<T>', blocks: [{ id: 0, solution: 'function' }] },
      { lineNumber: 2, prefix: '    ', suffix: ' T[]', blocks: [{ id: 1, solution: 'array:' }] },
      { lineNumber: 3, prefix: '    ', suffix: ' (item: T) => boolean', blocks: [{ id: 2, solution: 'predicate:' }] },
      { lineNumber: 4, prefix: '): T[] {', suffix: '', blocks: [] },
      { lineNumber: 5, prefix: '    return array.', suffix: '((item) => {', blocks: [{ id: 3, solution: 'filter' }] },
      { lineNumber: 6, prefix: '        return ', suffix: '(item);', blocks: [{ id: 4, solution: 'predicate' }] },
      { lineNumber: 7, prefix: '    });', suffix: '', blocks: [] },
      { lineNumber: 8, prefix: '}', suffix: '', blocks: [] },
    ],
    initialBlocks: ['function', 'array:', 'predicate:', 'filter', 'predicate'],
  },
  {
    id: 2,
    language: 'solidity',
    title: 'Simple Token Contract',
    description: 'Create a basic ERC20-like token contract with a mapping for balances.',
    template: [
      { lineNumber: 1, prefix: '', suffix: ' 0.8.0;', blocks: [{ id: 0, solution: 'pragma solidity ^' }] },
      { lineNumber: 2, prefix: '', suffix: '', blocks: [] },
      { lineNumber: 3, prefix: '', suffix: ' Token {', blocks: [{ id: 1, solution: 'contract' }] },
      { lineNumber: 4, prefix: '    ', suffix: ' balances;', blocks: [{ id: 2, solution: 'mapping(address => uint256) public' }] },
      { lineNumber: 5, prefix: '', suffix: '', blocks: [] },
      { lineNumber: 6, prefix: '    ', suffix: ' mint(address to, uint256 amount) public {', blocks: [{ id: 3, solution: 'function' }] },
      { lineNumber: 7, prefix: '        balances[to] += ', suffix: ';', blocks: [{ id: 4, solution: 'amount' }] },
      { lineNumber: 8, prefix: '    }', suffix: '', blocks: [] },
      { lineNumber: 9, prefix: '}', suffix: '', blocks: [] },
    ],
    initialBlocks: ['pragma solidity ^', 'contract', 'mapping(address => uint256) public', 'function', 'amount'],
  },
  {
    id: 3,
    language: 'typescript',
    title: 'State Management Interface',
    description: 'Complete the TypeScript interface for a state management store.',
    template: [
      { lineNumber: 1, prefix: '', suffix: ' Store<T> {', blocks: [{ id: 0, solution: 'interface' }] },
      { lineNumber: 2, prefix: '    ', suffix: ': T;', blocks: [{ id: 1, solution: 'state' }] },
      { lineNumber: 3, prefix: '    ', suffix: ' getState(): T;', blocks: [{ id: 2, solution: 'function' }] },
      { lineNumber: 4, prefix: '    ', suffix: ': (newState: Partial<T>) => void;', blocks: [{ id: 3, solution: 'setState' }] },
      { lineNumber: 5, prefix: '    ', suffix: ': (listener: (state: T) => void) => void;', blocks: [{ id: 4, solution: 'subscribe' }] },
      { lineNumber: 6, prefix: '}', suffix: '', blocks: [] },
    ],
    initialBlocks: ['interface', 'state', 'function', 'setState', 'subscribe'],
  },
  {
    id: 4,
    language: 'solidity',
    title: 'NFT Minting Function',
    description: 'Complete the NFT minting function with proper checks and events.',
    template: [
      { lineNumber: 1, prefix: '', suffix: ' NFTMinted(address to, uint256 tokenId);', blocks: [{ id: 0, solution: 'event' }] },
      { lineNumber: 2, prefix: '', suffix: '', blocks: [] },
      { lineNumber: 3, prefix: '    ', suffix: ' mint(address to) public returns (uint256) {', blocks: [{ id: 1, solution: 'function' }] },
      { lineNumber: 4, prefix: '        ', suffix: '(to != address(0), "Invalid address");', blocks: [{ id: 2, solution: 'require' }] },
      { lineNumber: 5, prefix: '        ', suffix: '++;', blocks: [{ id: 3, solution: '_tokenIds' }] },
      { lineNumber: 6, prefix: '        uint256 newTokenId = _tokenIds;', suffix: '', blocks: [] },
      { lineNumber: 7, prefix: '        ', suffix: ' NFTMinted(to, newTokenId);', blocks: [{ id: 4, solution: 'emit' }] },
      { lineNumber: 8, prefix: '        return newTokenId;', suffix: '', blocks: [] },
      { lineNumber: 9, prefix: '    }', suffix: '', blocks: [] },
    ],
    initialBlocks: ['event', 'function', 'require', '_tokenIds', 'emit'],
  }
];

const EditorHeader = () => (
  <div className="flex items-center justify-between bg-[#3c3c3c] px-4 py-2">
    <div className="flex items-center space-x-2">
      <span className="text-sm text-[#cccccc]">Coding Challenge</span>
    </div>
    <div className="flex items-center space-x-2">
      <Maximize2 className="w-4 h-4 text-[#858585] cursor-pointer hover:text-[#cccccc]" />
    </div>
  </div>
);

const CodeChallenge = () => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const challenge = challenges[currentChallengeIndex];
  
  const [placedBlocks, setPlacedBlocks] = useState(
    Array(challenge.template.reduce((acc, line) => acc + line.blocks.length, 0)).fill(null)
  );
  const [availableBlocks, setAvailableBlocks] = useState(challenge.initialBlocks);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  const getSyntaxColor = (word, language) => {
    if (language === 'typescript') {
      if (['interface', 'function', 'return'].includes(word)) return theme.keyword;
      if (['T', 'Partial', 'void'].includes(word)) return theme.type;
      if (word.startsWith('(')) return theme.variable;
    } else if (language === 'solidity') {
      if (['contract', 'function', 'event', 'emit', 'require'].includes(word)) return theme.keyword;
      if (['address', 'uint256'].includes(word)) return theme.type;
      if (word.startsWith('_')) return theme.variable;
    }
    return theme.text;
  };

  const handleDragStart = (e, item, index, fromPlaced = false) => {
    setIsDragging(true);
    setDraggedItem({ item, index, fromPlaced });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex, isPlacedArea) => {
    e.preventDefault();
    setIsDragging(false);

    if (!draggedItem) return;

    const { item, index, fromPlaced } = draggedItem;

    if (isPlacedArea) {
      if (fromPlaced) {
        const newPlacedBlocks = [...placedBlocks];
        newPlacedBlocks[index] = placedBlocks[targetIndex];
        newPlacedBlocks[targetIndex] = item;
        setPlacedBlocks(newPlacedBlocks);
      } else {
        if (placedBlocks[targetIndex] === null) {
          const newPlacedBlocks = [...placedBlocks];
          newPlacedBlocks[targetIndex] = item;
          setPlacedBlocks(newPlacedBlocks);

          const newAvailableBlocks = availableBlocks.filter((_, idx) => idx !== index);
          setAvailableBlocks(newAvailableBlocks);
        }
      }
    } else if (fromPlaced) {
      const newAvailableBlocks = [...availableBlocks, item];
      setAvailableBlocks(newAvailableBlocks);

      const newPlacedBlocks = [...placedBlocks];
      newPlacedBlocks[index] = null;
      setPlacedBlocks(newPlacedBlocks);
    }
  };

  const checkSolution = () => {
    let blockIndex = 0;
    return challenge.template.every(line => 
      line.blocks.every(block => {
        const isCorrect = placedBlocks[blockIndex] === block.solution;
        blockIndex++;
        return isCorrect;
      })
    );
  };

  const isComplete = () => {
    return !placedBlocks.includes(null);
  };

  const handleNextChallenge = () => {
    const nextIndex = (currentChallengeIndex + 1) % challenges.length;
    setCurrentChallengeIndex(nextIndex);
    const nextChallenge = challenges[nextIndex];
    setPlacedBlocks(Array(nextChallenge.template.reduce((acc, line) => acc + line.blocks.length, 0)).fill(null));
    setAvailableBlocks(nextChallenge.initialBlocks);
  };

  const handleReset = () => {
    setPlacedBlocks(Array(challenge.template.reduce((acc, line) => acc + line.blocks.length, 0)).fill(null));
    setAvailableBlocks(challenge.initialBlocks);
  };

  let blockIndex = 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="overflow-hidden border-none shadow-xl">
        <EditorHeader />
        <div className="flex items-center bg-[#252526] border-b border-[#3c3c3c] px-2">
          <motion.div
            initial={false}
            animate={{ backgroundColor: '#1e1e1e' }}
            className="flex items-center px-3 py-2 space-x-2 border-t-2 border-t-blue-500"
          >
            <FileCode2 className="w-4 h-4 text-[#858585]" />
            <span className="text-sm text-[#858585]">
              {challenge.language === 'typescript' ? 'challenge.ts' : 'Challenge.sol'}
            </span>
          </motion.div>
        </div>
        
        <CardContent className="p-0 bg-[#1e1e1e]">
          <div className="space-y-6 p-6">
            <div className="text-sm text-[#cccccc]">
              {challenge.description}
            </div>

            {/* Code display area */}
            <div className="font-mono text-sm">
              <div className="space-y-1">
                {challenge.template.map((line, lineIdx) => (
                  <div key={lineIdx} className="flex items-center space-x-2">
                    <div className="w-8 text-[#858585]">{line.lineNumber}</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#d4d4d4]">{line.prefix}</span>
                      {line.blocks.map((block, blockIdx) => {
                        const currentBlockIndex = blockIndex++;
                        return (
                          <React.Fragment key={blockIdx}>
                            <div
                              className="h-8 flex items-center"
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, currentBlockIndex, true)}
                            >
                              {placedBlocks[currentBlockIndex] ? (
                                <div
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, placedBlocks[currentBlockIndex], currentBlockIndex, true)}
                                  className="bg-blue-500/20 px-2 py-1 rounded cursor-move"
                                  style={{ color: getSyntaxColor(placedBlocks[currentBlockIndex], challenge.language) }}
                                >
                                  {placedBlocks[currentBlockIndex]}
                                </div>
                              ) : (
                                <div className="w-24 h-6 border-2 border-dashed border-[#3c3c3c] rounded"></div>
                              )}
                            </div>
                            <span className="text-[#d4d4d4]">{blockIdx === line.blocks.length - 1 ? line.suffix : ' '}</span>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available blocks */}
            <div
              className="flex flex-wrap gap-2 p-4 min-h-16 bg-[#2d2d2d] rounded"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, null, false)}
            >
              {availableBlocks.map((block, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, block, index)}
                  className="bg-blue-500/20 px-2 py-1 rounded cursor-move"
                  style={{ color: getSyntaxColor(block, challenge.language) }}
                >
                  {block}
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={handleReset}>
                Reset Challenge
              </Button>
              <Button onClick={handleNextChallenge}>
                Next Challenge
              </Button>
            </div>

            {/* Status */}
            {isComplete() && (
              <div className={`flex items-center space-x-2 ${checkSolution() ? 'text-green-500' : 'text-red-500'}`}>
                {checkSolution() ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Correct! Well done!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    <span>Not quite right. Try rearranging the blocks.</span>
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CodeChallenge;