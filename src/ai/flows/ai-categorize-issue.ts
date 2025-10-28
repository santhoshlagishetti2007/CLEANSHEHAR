'use server';

/**
 * @fileOverview This file contains the Genkit flow for AI-powered issue categorization.
 *
 * It allows the application to automatically suggest the relevant government department for an issue report based on the uploaded images/videos.
 *
 * @interface AICategorizeIssueInput - Defines the input schema for the aiCategorizeIssue flow, including media and description.
 * @interface AICategorizeIssueOutput - Defines the output schema for the aiCategorizeIssue flow, providing department suggestions.
 * @function aiCategorizeIssue - The main function to categorize the issue.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICategorizeIssueInputSchema = z.object({
  mediaDataUri: z
    .string()
    .describe(
      "A photo or video of the issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('A description of the issue.'),
});
export type AICategorizeIssueInput = z.infer<typeof AICategorizeIssueInputSchema>;

const AICategorizeIssueOutputSchema = z.object({
  suggestedDepartment: z
    .string()
    .describe(
      'The AI-suggested government department most relevant to the reported issue.'
    ),
  confidenceScore: z
    .number()
    .describe(
      'A numerical score (0-1) indicating the AI confidence in the department suggestion.'
    ),
});
export type AICategorizeIssueOutput = z.infer<typeof AICategorizeIssueOutputSchema>;

export async function aiCategorizeIssue(input: AICategorizeIssueInput): Promise<AICategorizeIssueOutput> {
  return aiCategorizeIssueFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCategorizeIssuePrompt',
  input: {schema: AICategorizeIssueInputSchema},
  output: {schema: AICategorizeIssueOutputSchema},
  prompt: `You are an AI assistant that helps categorize civic issues for efficient reporting.

  Based on the provided image/video and description, determine the most relevant government department to handle the issue.

  Consider factors like the nature of the issue, visual cues in the media, and keywords in the description.

  Respond with the suggested department and a confidence score (0-1).

  Description: {{{description}}}
  Media: {{media url=mediaDataUri}}
  `,
});

const aiCategorizeIssueFlow = ai.defineFlow(
  {
    name: 'aiCategorizeIssueFlow',
    inputSchema: AICategorizeIssueInputSchema,
    outputSchema: AICategorizeIssueOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
