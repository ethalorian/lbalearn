export const challenges: Challenge[] = [
    {
      id: 'two-sum',
      title: 'Two Sum',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers in nums such that they add up to target.',
      difficulty: 'easy',
      starterCode: `function twoSum(nums, target) {
    // Your code here
  }`,
      testCases: [
        {
          input: [[2, 7, 11, 15], 9],
          expected: [0, 1],
          description: 'Basic case with solution at start of array'
        },
        {
          input: [[3, 2, 4], 6],
          expected: [1, 2],
          description: 'Solution in middle of array'
        },
        {
          input: [[3, 3], 6],
          expected: [0, 1],
          description: 'Same number used twice'
        }
      ],
      solution: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      if (map.has(complement)) {
        return [map.get(complement), i];
      }
      map.set(nums[i], i);
    }
    return [];
  }`
    },
    {
      id: 'secure-bank',
      title: 'Secure Bank Contract',
      type: 'solidity',
      contractName: 'SecureBank',
      description: `Create a secure bank contract that allows users to:
1. Deposit ETH
2. Withdraw their deposited ETH
3. Check their balance

Requirements:
- Users can only withdraw what they have deposited
- Contract must be protected against reentrancy attacks
- Must emit appropriate events for deposits and withdrawals
- Must include proper access controls`,
      difficulty: 'medium',
      starterCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SecureBank {
    // Add your state variables here
    
    // Events
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    
    constructor() {
        // Initialize your contract
    }
    
    function deposit() external payable {
        // Implement deposit logic
    }
    
    function withdraw(uint256 amount) external {
        // Implement withdrawal logic
    }
    
    function getBalance() external view returns (uint256) {
        // Implement balance check
    }
}`,
      testCases: [
        {
          type: 'solidity',
          description: 'Should allow deposits and track balances correctly',
          test: `async (contract, ethers) => {
          const [owner, user1] = await ethers.getSigners();
          const depositAmount = ethers.utils.parseEther("1.0");
          
          await expect(
            contract.connect(user1).deposit({ value: depositAmount })
          ).to.emit(contract, "Deposit")
            .withArgs(user1.address, depositAmount);
          
          expect(await contract.connect(user1).getBalance())
            .to.equal(depositAmount);
        }`
        },
        {
          type: 'solidity',
          description: 'Should prevent unauthorized withdrawals',
          test: `async (contract, ethers) => {
          const [owner, user1, user2] = await ethers.getSigners();
          const depositAmount = ethers.utils.parseEther("1.0");
          
          await contract.connect(user1).deposit({ value: depositAmount });
          
          await expect(
            contract.connect(user2).withdraw(depositAmount)
          ).to.be.revertedWith("Insufficient balance");
        }`
        }
      ],
      solution: `// Solution code here...`
    }
];