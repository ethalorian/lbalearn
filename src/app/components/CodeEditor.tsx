'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { TestRunner } from '@/lib/test-runner';

export default function CodeEditor({ challenge, className }: { challenge: Challenge; className?: string }) {
  const [code, setCode] = useState(challenge.starterCode);
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunTests = async () => {
    setIsRunning(true);
    try {
      const testResults = await TestRunner.runTests(challenge, code);
      setResults(testResults);
    } catch (error) {
      console.error('Failed to run tests:', error);
    }
    setIsRunning(false);
  };

  return (
    <Card className={className}>
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Solution</h3>
          <div className="flex gap-2">
            {challenge.type === 'solidity' && (
              <Button variant="outline" onClick={() => setCode(challenge.starterCode)}>
                Reset Code
              </Button>
            )}
            <Button
              onClick={handleRunTests}
              disabled={isRunning}
            >
              {isRunning ? 'Running Tests...' : 'Run Tests'}
            </Button>
          </div>
        </div>
        
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 w-full p-4 font-mono text-sm bg-gray-50 rounded border resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          spellCheck="false"
        />
        
        {results.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-semibold">Test Results</h4>
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-2 rounded flex items-start gap-2 ${
                  result.passed ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                {result.passed ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <div>
                  <p className="font-medium">
                    {result.description}: {result.passed ? 'Passed' : 'Failed'}
                  </p>
                  {!result.passed && result.error && (
                    <p className="text-sm text-red-600">{result.error}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}