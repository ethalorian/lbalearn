import { ethers } from "ethers";

type TestResult = {
  passed: boolean;
  output?: any;
  expected?: any;
  error?: string;
  description: string;
};

export class TestRunner {
  static async runTests(challenge: Challenge, code: string): Promise<TestResult[]> {
    if (challenge.type === 'solidity') {
      return this.runSolidityTests(challenge, code);
    }
    return this.runStandardTests(challenge, code);
  }

  private static runStandardTests(challenge: Challenge, code: string): TestResult[] {
    const results: TestResult[] = [];
    
    try {
      const userFunction = new Function(`return ${code}`)();
      
      for (const test of challenge.testCases) {
        if (test.type !== 'standard') continue;
        
        try {
          const output = userFunction(...test.input);
          results.push({
            passed: JSON.stringify(output) === JSON.stringify(test.expected),
            output,
            expected: test.expected,
            description: test.description
          });
        } catch (error) {
          results.push({
            passed: false,
            output: null,
            expected: test.expected,
            error: error.message,
            description: test.description
          });
        }
      }
    } catch (error) {
      return challenge.testCases.map(test => ({
        passed: false,
        output: null,
        expected: null,
        error: `Syntax Error: ${error.message}`,
        description: test.description
      }));
    }
    
    return results;
  }

  private static async runSolidityTests(challenge: Challenge, code: string): Promise<TestResult[]> {
    const results: TestResult[] = [];
    
    try {
      // Setup Hardhat provider
      const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
      const signer = provider.getSigner();

      // Compile contract
      const response = await fetch('/api/compile-solidity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, contractName: challenge.contractName })
      });
      
      const { abi, bytecode } = await response.json();
      
      // Deploy contract
      const factory = new ethers.ContractFactory(abi, bytecode, signer);
      const contract = await factory.deploy();
      await contract.deployed();

      // Run tests
      for (const test of challenge.testCases) {
        if (test.type !== 'solidity') continue;
        
        try {
          // Deserialize and execute test function
          const testFunction = new Function('contract', 'ethers', test.test);
          await testFunction(contract, ethers);
          
          results.push({
            passed: true,
            description: test.description
          });
        } catch (error) {
          results.push({
            passed: false,
            error: error.message,
            description: test.description
          });
        }
      }
    } catch (error) {
      return challenge.testCases.map(test => ({
        passed: false,
        error: `Contract Error: ${error.message}`,
        description: test.description
      }));
    }
    
    return results;
  }
}