'use server';

/**
 * @fileOverview AI chatbot for user support and FAQ access.
 *
 * - aiHelpSupport - A function that provides AI chatbot support.
 * - AIHelpSupportInput - The input type for the aiHelpSupport function.
 * - AIHelpSupportOutput - The return type for the aiHelpSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIHelpSupportInputSchema = z.object({
  query: z.string().describe('The user query for the AI chatbot.'),
});
export type AIHelpSupportInput = z.infer<typeof AIHelpSupportInputSchema>;

const AIHelpSupportOutputSchema = z.object({
  response: z.string().describe('The AI chatbot response to the user query.'),
});
export type AIHelpSupportOutput = z.infer<typeof AIHelpSupportOutputSchema>;

export async function aiHelpSupport(input: AIHelpSupportInput): Promise<AIHelpSupportOutput> {
  return aiHelpSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiHelpSupportPrompt',
  input: {schema: AIHelpSupportInputSchema},
  output: {schema: AIHelpSupportOutputSchema},
  prompt: `You are a helpful AI chatbot designed to answer questions about the Clearशहर app.
  Use the following FAQs to provide helpful answers. If you still don't have an answer, you may try to answer it yourself.

  FAQs:
  - How do I report an issue? Upload an image or video with a location tag and select the appropriate department.
  - How do I select my preferred language? You can select your preferred language from the language dropdown in the website header.

  User Query: {{{query}}}`,
});

const aiHelpSupportFlow = ai.defineFlow(
  {
    name: 'aiHelpSupportFlow',
    inputSchema: AIHelpSupportInputSchema,
    outputSchema: AIHelpSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
