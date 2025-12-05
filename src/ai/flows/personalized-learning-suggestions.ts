'use server';

/**
 * @fileOverview A flow for generating personalized learning suggestions based on player performance.
 *
 * - generatePersonalizedSuggestions - A function that generates personalized learning suggestions.
 * - PersonalizedSuggestionsInput - The input type for the generatePersonalizedSuggestions function.
 * - PersonalizedSuggestionsOutput - The return type for the generatePersonalizedSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedSuggestionsInputSchema = z.object({
  playerLevel: z.number().describe('The current level of the player.'),
  recentPerformance: z
    .string()
    .describe(
      'A summary of the player’s recent performance, including accuracy and common mistakes.'
    ),
  availableLevels: z
    .array(z.object({level: z.number(), operation: z.string()}))
    .describe('List of available levels with operation types.'),
});
export type PersonalizedSuggestionsInput = z.infer<typeof PersonalizedSuggestionsInputSchema>;

const PersonalizedSuggestionsOutputSchema = z.object({
  suggestedLevels: z
    .array(z.object({level: z.number(), reason: z.string()}))
    .describe('A list of suggested levels to practice, with reasons.'),
  suggestedProblemTypes: z
    .array(z.string())
    .describe('A list of suggested problem types to practice.'),
  overallFeedback: z.string().describe('Overall feedback on player performance.'),
});
export type PersonalizedSuggestionsOutput = z.infer<typeof PersonalizedSuggestionsOutputSchema>;

export async function generatePersonalizedSuggestions(
  input: PersonalizedSuggestionsInput
): Promise<PersonalizedSuggestionsOutput> {
  return personalizedSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedSuggestionsPrompt',
  input: {schema: PersonalizedSuggestionsInputSchema},
  output: {schema: PersonalizedSuggestionsOutputSchema},
  prompt: `You are an AI math tutor. Based on the player's level, recent performance, and available levels, provide personalized learning suggestions.

Player Level: {{{playerLevel}}}
Recent Performance: {{{recentPerformance}}}
Available Levels: {{#each availableLevels}}{{{this.level}}} ({{{this.operation}}}), {{/each}}

Suggest levels that would help the player improve their skills, along with a reason for each suggestion.
Also suggest specific problem types to practice based on their mistakes.
Provide overall feedback on the player's performance.

Output in JSON format:
`,
});

const personalizedSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedSuggestionsFlow',
    inputSchema: PersonalizedSuggestionsInputSchema,
    outputSchema: PersonalizedSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
