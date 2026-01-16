/**
 * Image Generation Pipeline using Google Gemini API
 * 
 * This script generates nanobanana pro style images for the lesson pages.
 * Run with: node scripts/generate-images.js
 */

import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
import 'dotenv/config';

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
    console.error('❌ GOOGLE_API_KEY not found in .env file');
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Output directory
const OUTPUT_DIR = path.join(__dirname, '../src/assets/creating');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Image prompts with nanobanana pro style
const IMAGE_PROMPTS = [
    {
        filename: 'ambiguity_garbage_out.png',
        prompt: `STYLE: minimal flat vector on warm beige/cream card, thick black outlines, solid fills, clean sans-serif typography. Simple educational infographic.

CONTENT:
Title at top in bold: "Ambiguity In, Garbage Out"

Two-column comparison:

Left column - titled "Traditional Code":
- A code snippet box showing "if(x)" with a red X
- Text below: "Missing semicolon → Code breaks"

Right column - titled "Prompt Engineering":
- A speech bubble with "Make it better?" 
- Text below: "Vague prompt → AI guesses confidently"

Below, a horizontal bar showing spectrum:
Left end (labeled "Generic"): blob shape in gray
Right end (labeled "Specific"): targeted arrow in green
Arrow pointing from gray to green labeled "Add constraints"

Footer text: "Generic question = Average internet answer"`
    },
    {
        filename: 'cpco_framework.png',
        prompt: `STYLE: minimal flat vector on warm beige/cream card, thick black outlines, solid fills, clean sans-serif typography. Simple educational infographic.

CONTENT:
Title at top in bold: "The CPCO Framework"
Subtitle: "A prompt is a function with defined variables"

Four stacked horizontal cards, each with a letter and description:

1. Blue card with "C" - "Context" - "(The Global Variables)" - icon of globe/world
2. Purple card with "P" - "Persona" - "(The Processing Logic)" - icon of person/mask
3. Orange card with "C" - "Constraints" - "(The Filter)" - icon of funnel
4. Green card with "O" - "Output" - "(The Return Statement)" - icon of document/export

Footer text: "Identify ambiguity. Fill the gaps."`
    },
    {
        filename: 'context_global_vars.png',
        prompt: `STYLE: minimal flat vector on warm beige/cream card, thick black outlines, solid fills, clean sans-serif typography. Simple educational infographic.

CONTENT:
Title at top: "C = Context"
Subtitle: "(The Global Variables)"

A simple illustration showing:
- A person icon with a question mark above head (representing the AI)
- Three speech bubbles pointing to the person with text:
  - "Who are we?" (blue bubble)
  - "What's the goal?" (green bubble)  
  - "Who's the audience?" (orange bubble)

Below, a metaphor box:
Icon of confused person at meeting table
Text: "Like joining a meeting with zero prior knowledge"

Footer: "Context = Situational awareness"`
    },
    {
        filename: 'persona_processing.png',
        prompt: `STYLE: minimal flat vector on warm beige/cream card, thick black outlines, solid fills, clean sans-serif typography. Simple educational infographic.

CONTENT:
Title at top: "P = Persona"
Subtitle: "(The Processing Logic)"

Center illustration:
A brain icon with different colored sections/segments
Three mask/role icons around it labeled "Expert", "Writer", "Analyst"

Below, a simple equation card:
"Task X" + "Act as Y" → "Activated expertise"

Example box with blue background:
"For customer research → Act as UX Researcher"

Footer: "Persona fills ambiguity gaps efficiently"`
    },
    {
        filename: 'constraints_filter.png',
        prompt: `STYLE: minimal flat vector on warm beige/cream card, thick black outlines, solid fills, clean sans-serif typography. Simple educational infographic.

CONTENT:
Title at top: "C = Constraints"
Subtitle: "(The Filter)"

Center illustration:
A funnel shape with items going in at top (chaos/many items)
Clean filtered output coming out bottom (few organized items)

Four constraint type cards arranged in 2x2 grid:
- "Length" icon ruler: "Under 200 words"
- "Format" icon list: "No bullet points"
- "Exclusion" icon X: "Don't mention price"
- "Style" icon pen: "Active voice only"

Footer: "Constraints can matter more than capability"`
    },
    {
        filename: 'output_return.png',
        prompt: `STYLE: minimal flat vector on warm beige/cream card, thick black outlines, solid fills, clean sans-serif typography. Simple educational infographic.

CONTENT:
Title at top: "O = Output"
Subtitle: "(The Return Statement)"

Two-column comparison:

Left column (red/orange tint) - titled "Unstructured":
- Messy paragraph blob icon
- Text: "Write a paragraph"
- Label below: "Hard to process"

Right column (green tint) - titled "Structured":
- Clean table/grid icon with rows and columns
- Text: "Markdown table with [Idea], [Impact], [Effort]"
- Label below: "Ready for tools"

Arrow from structured output pointing to icons of Excel, Notion, API

Footer: "Structured = Pipeable to other tools"`
    },
    {
        filename: 'template_variables.png',
        prompt: `STYLE: minimal flat vector on warm beige/cream card, thick black outlines, solid fills, clean sans-serif typography. Simple educational infographic.

CONTENT:
Title at top: "Template Variable Injection"
Subtitle: "Make prompts reusable"

Center illustration:
A prompt template card showing:
"Act as Product Manager. Write user story for {FEATURE_NAME} solving {USER_PAIN_POINT}"

The {FEATURE_NAME} and {USER_PAIN_POINT} parts highlighted in yellow/gold boxes

Below, two scenarios showing the same template filled differently:
- Scenario 1: {Login Flow} + {Forgot password}
- Scenario 2: {Checkout} + {Cart abandonment}

Footer: "Fixed structure + Variable slots = Scalable prompts"`
    }
];

async function generateImage(prompt, filename) {
    console.log(`\n🎨 Generating: ${filename}`);

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp-image-generation',
            contents: prompt,
            config: {
                responseModalities: ['Text', 'Image']
            }
        });

        // Extract image from response
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const imageData = part.inlineData.data;
                const outputPath = path.join(OUTPUT_DIR, filename);

                // Decode base64 and save
                const buffer = Buffer.from(imageData, 'base64');
                fs.writeFileSync(outputPath, buffer);

                console.log(`✅ Saved: ${outputPath}`);
                return true;
            }
        }

        console.log('⚠️ No image in response');
        return false;
    } catch (error) {
        console.error(`❌ Error generating ${filename}:`, error.message);
        return false;
    }
}

async function main() {
    console.log('🚀 Starting image generation pipeline...');
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);
    console.log(`📋 Images to generate: ${IMAGE_PROMPTS.length}\n`);

    let successCount = 0;
    let failCount = 0;

    for (const { filename, prompt } of IMAGE_PROMPTS) {
        const success = await generateImage(prompt, filename);
        if (success) {
            successCount++;
        } else {
            failCount++;
        }

        // Rate limiting - wait 2 seconds between requests
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log('\n========================================');
    console.log(`✅ Success: ${successCount}/${IMAGE_PROMPTS.length}`);
    console.log(`❌ Failed: ${failCount}/${IMAGE_PROMPTS.length}`);
    console.log('========================================');
}

main();
