/**
 * Image Generation for CreatingBigIdea: Completion Space
 * Run with: node scripts/generate-bigidea-images.js
 */

import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import 'dotenv/config';

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
    console.error('❌ GOOGLE_API_KEY not found in .env file');
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const OUTPUT_DIR = path.join(__dirname, '../src/assets/creating');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const IMAGE_PROMPTS = [
    {
        filename: 'big_idea_cover.png',
        prompt: `STYLE: minimal flat vector on warm beige/cream card, thick black outlines, solid fills, clean sans-serif typography. Simple educational infographic.

CONTENT:
Title at top: "The Big Idea"
Subtitle: "Controlling the Completion Space"

Center illustration:
A large circle labeled "All Possible Outputs" with many dots inside
Inside it, a smaller circle with fewer dots labeled "Plausible Outputs"
Inside that, a tiny circle with 1-2 dots labeled "Right Output"

Visual shows progressive narrowing/funneling

Footer: "Constraints eliminate everything you DON'T want"`
    },
    {
        filename: 'sampling_not_thinking.png',
        prompt: `STYLE: minimal flat vector on warm beige/cream card, thick black outlines, solid fills, clean sans-serif typography. Simple educational infographic.

CONTENT:
Title: "AI Samples, It Doesn't Think"

Two-column comparison:

Left - What people think:
- Brain icon with gears
- Label: "Understanding"
- "The AI 'gets' my request"

Right - The reality:
- Dice/probability icon
- Label: "Sampling"
- "The AI picks what seems plausible"

Bottom text: "More plausible options = less predictable"`
    },
    {
        filename: 'funnel_constraints.png',
        prompt: `STYLE: minimal flat vector on warm beige/cream card, thick black outlines, solid fills, clean sans-serif typography. Simple educational infographic.

CONTENT:
Title: "Constraints Shrink the Space"

A funnel diagram:
Top (wide): Many dots, label "Vague Prompt"
Middle: Fewer dots, label "+ CPCO"
Bottom: Even fewer dots, label "+ Context"
Very bottom (narrow): 1-2 dots, label "Controlled Output"

Each level shows progressively fewer dots

Footer: "Each constraint eliminates plausible-but-wrong outputs"`
    },
    {
        filename: 'two_levers.png',
        prompt: `STYLE: minimal flat vector on warm beige/cream card, thick black outlines, solid fills, clean sans-serif typography. Simple educational infographic.

CONTENT:
Title: "Two Levers for Control"

Two large lever/dial icons:

Lever 1 (purple):
- Icon: Lock/constraint symbol
- Label: "Specification"
- "Reduce ambiguity (CPCO)"

Lever 2 (blue):
- Icon: Filter/funnel symbol
- Label: "Curation"
- "Reduce noise (Context)"

Both levers point toward center:
"Smaller Completion Space"

Footer: "Turn up as stakes rise"`
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

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const imageData = part.inlineData.data;
                const outputPath = path.join(OUTPUT_DIR, filename);
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
    console.log('🚀 Generating Big Idea images...');
    console.log(`📁 Output: ${OUTPUT_DIR}`);
    console.log(`📋 Images: ${IMAGE_PROMPTS.length}\n`);

    let success = 0, fail = 0;

    for (const { filename, prompt } of IMAGE_PROMPTS) {
        if (await generateImage(prompt, filename)) success++;
        else fail++;
        await new Promise(r => setTimeout(r, 2000));
    }

    console.log('\n========================================');
    console.log(`✅ Success: ${success}/${IMAGE_PROMPTS.length}`);
    console.log(`❌ Failed: ${fail}/${IMAGE_PROMPTS.length}`);
    console.log('========================================');
}

main();
