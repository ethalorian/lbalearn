type BaseTestCase = {
    description: string;
  };
  
  type StandardTestCase = BaseTestCase & {
    type: 'standard';
    input: any[];
    expected: any;
  };
  
  type SolidityTestCase = BaseTestCase & {
    type: 'solidity';
    test: string; // Serialized test function
  };
  
  type TestCase = StandardTestCase | SolidityTestCase;
  
  type Challenge = {
    id: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    starterCode: string;
    testCases: TestCase[];
    solution: string;
    type: 'standard' | 'solidity';
    contractName?: string; // For Solidity challenges
  };