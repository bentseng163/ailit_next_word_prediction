/**
 * Image Generation for CreatingLesson2: Context Engineering
 * Run with: node scripts/generate-lesson2-images.js
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
        filename: 'context_window_cover.png',
        prompt: `STYLE: minimal flat vector on warm beige/cream card, thick black outlines, solid fills, clean sans-serif typography. Simple educational infographic.

CONTENT:
Title at top in bold: "Context Engineering"
Subtitle: "Managing the AI's Working Memory"

Center illustration:
A brain icon made of connected nodes/dots
Around it, speech bubbles and document icons flowing in
A meter/gauge showing "Context Window" with a fill level

Visual metaphor of information flowing INTO a limited container

Footer text: "Context is finite. Use it wisely."`
    },
    {
        filename: 'human_forgetting.png',
        prompt: `STYLE: minimal flat vector on warm beige/cream card, thick black outlines, solid fills, clean sans-serif typography. Simple educational infographic.

CONTENT:
Title: "Even Smart People Forget"

A person icon with many thought bubbles around their head:
- Gift icon (with X)
- Laundry basket (with X)
- Dishes (with X)
- Work tasks (with checkmarks)

The person looks slightly overwhelmed

Below: "Too much on your mind at once"

Message: Not lazy, just overloaded`
    },
    {
        filename: 'context_like_memory.png',
        prompt: `STYLE: minimal flat vector on warm beige/cream card, thick black outlines, solid fills, clean sans-serif typography. Simple educational infographic.

CONTENT:
Title: "Context Window = Working Memory"

Two-column comparison:

Left - Human Brain:
- Brain icon
- Label: "Working Memory"
- Small capacity indicator

Right - LLM:
- Robot/AI head icon  
- Label: "Context Window"
- Token counter/meter

Arrow showing similarity between them

Footer: "Both have limits on active attention"`
    },
    {
        filename: 'context_resources.png',
        prompt: `STYLE: minimal flat vector on warm beige/cream card, thick black outlines, solid fills, clean sans-serif typography. Simple educational infographic.

CONTENT:
Title: "What Goes in the Context Window?"

A vertical stack of labeled blocks/cards:

1. System Prompt (purple) - gear icon - "Instructions"
2. Documents (orange) - file icon - "Reference material"
3. Images (blue) - photo icon - "Visual context"
4. Message History (green) - chat icon - "Conversation"
5. Search Results (pink) - search icon - "Retrieved info"

Each block sized proportionally to typical usage`
    },
    {
        filename: 'context_rot.png',
        prompt: `STYLE: minimal flat vector on warm beige/cream card, thick black outlines, solid fills, clean sans-serif typography. Simple educational infographic.

CONTENT:
Title: "Context Rot: Less is More"

A graph/chart showing:
- X-axis: "Tokens in Context"
- Y-axis: "Recall Accuracy"
- A declining curve from top-left to bottom-right
- The curve starts high and drops as tokens increase

Below the graph:
"More tokens = Lower accuracy"
"Diminishing returns on context"

Warning icon: "Treat context as finite resource"`
    },
    {
        filename: 'prompt_vs_context_eng.png',
        prompt: `STYLE: minimal flat vector on warm beige/cream card, thick black outlines, solid fills, clean sans-serif typography. Simple educational infographic.

CONTENT:
Title: "Prompt Engineering ⊂ Context Engineering"

A Venn diagram where:
- Large outer circle: "Context Engineering" (blue)
  - Labels around it: Documents, History, Search, Images
- Smaller inner circle: "Prompt Engineering" (purple)
  - Labels: System prompt, User message

The prompt circle is INSIDE the context circle

Footer: "Context engineering is the bigger picture"`
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
    console.log('🚀 Generating Context Engineering images...');
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
