// 代码生成时间: 2025-10-11 01:47:20
// dynamic_programming_solver.js
// A dynamic programming solver in Node.js

// Define a function to solve a dynamic programming problem
function dynamicProgrammingSolver(problem) {
  // Check if the problem is valid
  if (!problem || typeof problem !== 'object' || !problem.length) {
    throw new Error('Invalid problem definition');
  }

  // Initialize a 2D array to store the results of subproblems
  const dp = Array.from({ length: problem.length }, () => Array(problem[0].length).fill(0));

  // Base case: If there's only one row or one column, return the sum of that row or column
  for (let i = 0; i < problem.length; i++) {
    dp[i][0] = problem[i][0];
    dp[0][i] = problem[0][i];
  }

  // Fill the dp array
  for (let i = 1; i < problem.length; i++) {
    for (let j = 1; j < problem[i].length; j++) {
      dp[i][j] = Math.max(
        problem[i - 1][j] + problem[i][j - 1], // Top + Left
        problem[i - 1][j - 1] + problem[i][j] - dp[i - 1][j - 1] // Diagonal
      );
    }
  }

  // Return the solution to the original problem
  return dp[problem.length - 1][problem[0].length - 1];
}

// Export the function for use in other modules
module.exports = dynamicProgrammingSolver;
