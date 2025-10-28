
'use server';

/**
 * @fileOverview This file contains the Genkit flow for AI-powered text translation.
 *
 * It allows the application to translate text from a source language to a target language.
 *
 * @interface AITranslateTextInput - Defines the input schema for the aiTranslateText flow.
 * @interface AITranslateTextOutput - Defines the output schema for the aiTranslateText flow.
 * @function aiTranslateText - The main function to translate text.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { languages } from '@/lib/translations';

const languageCodes = Object.keys(languages) as (keyof typeof languages)[];


const AITranslateTextInputSchema = z.object({
  text: z.string().describe('The text to be translated.'),
  targetLanguage: z.enum(languageCodes).describe('The target language for the translation.'),
});
export type AITranslateTextInput = z.infer<typeof AITranslateTextInputSchema>;

const AITranslateTextOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type AITranslateTextOutput = z.infer<typeof AITranslateTextOutputSchema>;


export async function aiTranslateText(input: AITranslateTextInput): Promise<AITranslateTextOutput> {
  return aiTranslateTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTranslateTextPrompt',
  input: {schema: AITranslateTextInputSchema},
  output: {schema: AITranslateTextOutputSchema},
  prompt: `Translate the following text to {{targetLanguage}}.

  Text: {{{text}}}
  `,
});


const aiTranslateTextFlow = ai.defineFlow(
  {
    name: 'aiTranslateTextFlow',
    inputSchema: AITranslateTextInputSchema,
    outputSchema: AITranslateTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
