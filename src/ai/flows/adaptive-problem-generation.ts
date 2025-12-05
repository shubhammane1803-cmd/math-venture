'use server';

/**
 * @fileOverview A flow to dynamically generate math problems based on the player's performance.
 *
 * - generateAdaptiveProblem - A function that generates a math problem adapted to player's skill.
 * - AdaptiveProblemInput - The input type for the generateAdaptiveProblem function.
 * - AdaptiveProblemOutput - The return type for the generateAdaptiveProblem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveProblemInputSchema = z.object({
  level: z.number().describe('The current level of the player.'),
  operation: z.enum(['addition', 'subtraction', 'multiplication', 'division']).describe('The math operation for the problem.'),
  streak: z.number().describe('The player\'s current correct answer streak.'),
  lastProblemCorrect: z.boolean().describe('Whether the player answered the last problem correctly.'),
});
export type AdaptiveProblemInput = z.infer<typeof AdaptiveProblemInputSchema>;

const AdaptiveProblemOutputSchema = z.object({
  problem: z.string().describe('The math problem to display to the player.'),
  answer: z.number().describe('The correct answer to the problem.'),
  choices: z.array(z.number()).describe('The multiple choice options for the problem, including the correct answer.'),
});
export type AdaptiveProblemOutput = z.infer<typeof AdaptiveProblemOutputSchema>;

export async function generateAdaptiveProblem(input: AdaptiveProblemInput): Promise<AdaptiveProblemOutput> {
  return adaptiveProblemFlow(input);
}

const adaptiveProblemPrompt = ai.definePrompt({
  name: 'adaptiveProblemPrompt',
  input: {schema: AdaptiveProblemInputSchema},
  output: {schema: AdaptiveProblemOutputSchema},
  prompt: `You are a math problem generator for a game called Mathventure.

  The player is currently at level {{level}} and practicing {{operation}}.
  Their current streak is {{streak}}, and the last problem was {{#if lastProblemCorrect}}correctly answered{{else}}incorrectly answered{{/if}}.

  Based on this information, generate a math problem that is appropriate for their skill level.
  The multiple choice options should include the correct answer, and some plausible incorrect answers.

  Ensure that the problem and answer are mathematically correct and that the multiple-choice options are distinct.
  Do not provide an explanation of how the problem is solved, only the values in JSON format.

  For example:
  {
    "problem": "12 + 5 = ?",
    "answer": 17,
    "choices": [17, 16, 18, 20]
  }`,
});

const adaptiveProblemFlow = ai.defineFlow(
  {
    name: 'adaptiveProblemFlow',
    inputSchema: AdaptiveProblemInputSchema,
    outputSchema: AdaptiveProblemOutputSchema,
  },
  async input => {
    const {output} = await adaptiveProblemPrompt(input);
    return output!;
  }
);
