import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import InteractiveCard from '../components/InteractiveCard/InteractiveCard';

// Interactives
import NoiseToImageScrubber from '../components/Interactives/NoiseToImageScrubber';
import PromptClarityMeter from '../components/Interactives/PromptClarityMeter';
import PromptSurgery from '../components/Interactives/PromptSurgery';
import VariationKnob from '../components/Interactives/VariationKnob';
import PipelineBuilder from '../components/Interactives/PipelineBuilder';
import PromptDebugger from '../components/Interactives/PromptDebugger';
import PromptTemplateMaker from '../components/Interactives/PromptTemplateMaker';
import GoalSetter from '../components/GoalSetter/GoalSetter';

// Assets (Nano Banana Generations)
import imgRemote from '../assets/imggen-01-remote.png';
import imgTags from '../assets/imggen-02-tags.png';

const Lesson2 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(-1); // Start at -1 for GoalSetter
    const [canProceed, setCanProceed] = useState(true);
    const [userGoal, setUserGoal] = useState('default'); // 'default', 'productivity', 'shipping'

    // --- Dynamic Scenarios ---

    // Page 6: Debugger Scenarios
    const debugScenarios = {
        default: undefined,
        productivity: [
            {
                id: 1,
                context: "Scenario: Batch generating 100 blog headers.",
                prompt: "Professional office header.",
                resultDesc: "Result: 40% of images are cartoons. 60% are photos.",
                options: [
                    { id: 'ambiguity', label: "Ambiguity", correct: true, reason: "Correct! You didn't specify 'Photo Realism'. The model filled the gap with random styles." },
                    { id: 'bad', label: "Bad Model", correct: false, reason: "The model isn't bad, it's just guessing unrelated styles because you didn't constrain it." }
                ]
            },
            {
                id: 2,
                context: "Scenario: Need a team photo in Company Blue.",
                prompt: "Team in blue shirts.",
                resultDesc: "Result: Shirts are Navy, Cyan, Teal, and Sky Blue.",
                options: [
                    { id: 'ref', label: "Missing Reference", correct: true, reason: "Correct! 'Blue' is a spectrum. To get 'Company Blue', you need a Hex Token or Image Reference." },
                    { id: 'glitch', label: "Color Glitch", correct: false, reason: "Not a glitch. Without a specific reference, the model samples from 'all possible blues'." }
                ]
            },
            {
                id: 3,
                context: "Scenario: Need 10 people in a row.",
                prompt: "10 people standing in a straight line.",
                resultDesc: "Result: A crowd of 15 overlapping people.",
                options: [
                    { id: 'limit', label: "Counting Limitation", correct: true, reason: "Correct! Models are bad at counting past 3-4 objects. Don't rely on it for exact numbers." },
                    { id: 'vague', label: "Vague Prompt", correct: false, reason: "Your prompt was specific ('10'), but the model's architecture struggles with numeracy." }
                ]
            }
        ],
        shipping: [
            {
                id: 1,
                context: "Scenario: Generating a user avatar for the app.",
                prompt: "Friendly user profile picture.",
                resultDesc: "Result: A photo of a person with 7 fingers and a distorted eye.",
                options: [
                    { id: 'limit', label: "Anatomy Limitation", correct: true, reason: "Correct! Hands and eyes are common failure points. You need a negative prompt or post-processing restoration." },
                    { id: 'vague', label: "Vague Prompt", correct: false, reason: "Even with a detailed prompt, structural anatomy can fail. It's a known model quirk." }
                ]
            },
            {
                id: 2,
                context: "Scenario: Login screen background.",
                prompt: "Clean gradient with a Login button.",
                resultDesc: "Result: A button that says 'LGIN' or 'LOGGN'.",
                options: [
                    { id: 'text', label: "Text Limitation", correct: true, reason: "Correct! Never trust image models to spell key UI text. Generate it blank and overlay real text in code." },
                    { id: 'ref', label: "Missing Reference", correct: false, reason: "A reference might help style, but the spelling issue is a fundamental tokenizer limitation." }
                ]
            },
            {
                id: 3,
                context: "Scenario: Feature announcement card.",
                prompt: "Exciting new feature launch!",
                resultDesc: "Result: Chaos. Confetti, random robots, and lasers everywhere.",
                options: [
                    { id: 'ambiguity', label: "Ambiguity", correct: true, reason: "Correct! 'Exciting' is subjective. You need to constrain the subject: 'Minimalist 3D icon of a rocket'." },
                    { id: 'bad', label: "Bad Luck", correct: false, reason: "Not luck. You gave a 'Concept' prompt instead of a 'Visual' prompt." }
                ]
            }
        ]
    };

    // Page 8: Template Scenarios
    const templateConfigs = {
        default: undefined,
        productivity: {
            goal: "Scale Asset Production (100x)",
            staticPrefix: "generating a social asset:",
            chunks: [
                { id: 0, text: "Minimalist layout of", type: "composition", isVar: false, lockedLabel: "Minimal Layout", varLabel: "[Layout]" },
                { id: 1, text: "a productivity dashboard", type: "subject", isVar: false, lockedLabel: "Dashboard", varLabel: "[Product]" },
                { id: 2, text: "on a clean white desk", type: "background", isVar: false, lockedLabel: "White Desk", varLabel: "[Background]" },
                { id: 3, text: "high key lighting", type: "style", isVar: false, lockedLabel: "High Key", varLabel: "[Lighting]" },
            ]
        },
        shipping: {
            goal: "Consistent User Avatars",
            staticPrefix: "creating a user avatar:",
            chunks: [
                { id: 0, text: "Close up portrait of", type: "composition", isVar: false, lockedLabel: "Portrait", varLabel: "[Angle]" },
                { id: 1, text: "a friendly designer", type: "subject", isVar: true, lockedLabel: "Designer", varLabel: "[Persona]" },
                { id: 2, text: "solid brand-blue background", type: "background", isVar: false, lockedLabel: "Blue Bg", varLabel: "[Background]" },
                { id: 3, text: "flat vector art style", type: "style", isVar: false, lockedLabel: "Vector Style", varLabel: "[Style]" },
            ]
        }
    };

    // Page 11 & 12 Scenarios Labels
    const scenarioContent = {
        default: {
            p11_title: "Boss Level: The High-Stakes Launch",
            p11_desc: "Constraints: Brand must be identical to website. No hallucinated products. Zero risk.",
            p12_title: "Bonus Level: The Ideation Jam",
            p12_desc: "Constraints: Speed matters. Coherence doesn't. We want accidents."
        },
        productivity: {
            p11_title: "The Deadline Crunch",
            p11_desc: "Constraints: You need 50 assets by 5 PM. Pipeline must require ZERO manual editing.",
            p12_title: "Rapid Prototyping",
            p12_desc: "Constraints: Generate 20 different UI layouts in 2 minutes to unblock the design team."
        },
        shipping: {
            p11_title: "The Production Release",
            p11_desc: "Constraints: This image will be seen by 1M users. No 7-fingered hands allowed.",
            p12_title: "Feature Exploration",
            p12_desc: "Constraints: Explore wildly different visual directions for a new feature icon."
        }
    };

    const handleGoalSet = (goalType) => {
        setUserGoal(goalType);
        setCurrentPage(0);
    };

    const currentScenarioData = scenarioContent[userGoal] || scenarioContent.default;

    const pages = [
        // ## 1) Theory Anchor (5 pages)
        // ... (Pages 1-6 unchanged) ...


        // ### Page 1 — The Magic Trick (Spoiler: It’s Not Magic)
        {
            title: "The Magic Trick (Spoiler: It’s Not Magic)",
            text: (
                <div>
                    <p>AI image generation feels like: <em>“I typed words… and got a picture.”</em></p>
                    <p>What’s really happening is closer to:<br />
                        <strong>“The model learned patterns from tons of images + captions, and it tries to produce an image that matches the patterns your words point to.”</strong></p>
                    <p>Think of your prompt as a <strong>pattern remote control</strong>:</p>
                    <ul>
                        <li>“product hero shot” → centered object, clean background</li>
                        <li>“soft studio lighting” → gentle shadows, smooth highlights</li>
                        <li>“minimal premium” → fewer props, cleaner composition</li>
                    </ul>

                    <div style={{ margin: '20px 0', borderRadius: 8, overflow: 'hidden', border: '2px solid #000' }}>
                        <img src={imgRemote} alt="Prompt Pattern Remote" style={{ width: '100%', display: 'block' }} />
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "How it reads",
        },

        // ### Page 2 — Step 1: The Model Hunts for Patterns in Your Prompt
        {
            title: "Step 1: The Model Hunts for Patterns",
            text: (
                <div>
                    <p>When you type:</p>
                    <blockquote style={{ background: 'rgba(255,255,255,0.1)', padding: 12, borderLeft: '4px solid #3b82f6', borderRadius: 4 }}>
                        “A premium smart thermostat hero image, soft studio lighting, minimal background”
                    </blockquote>
                    <p>The model doesn’t read it like a human brief. It “tags” it into patterns it has seen before:</p>
                    <ul>
                        <li><strong>thermostat</strong> (object category)</li>
                        <li><strong>hero image</strong> (composition template)</li>
                        <li><strong>premium, minimal</strong> (style cluster)</li>
                        <li><strong>soft studio lighting</strong> (lighting pattern)</li>
                    </ul>

                    <div style={{ margin: '20px 0', borderRadius: 8, overflow: 'hidden', border: '2px solid #000' }}>
                        <img src={imgTags} alt="Prompt to Pattern Tags" style={{ width: '100%', display: 'block' }} />
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Where it starts",
        },

        // ### Page 3 — Step 2: It Starts From Noise (Yes, TV Static)
        {
            title: "Step 2: It Starts From Noise",
            text: (
                <div>
                    <p>Now the weird part: The model usually starts from <strong>random noise</strong> (TV static).</p>
                    <p>Why? Because noise is a flexible “raw material.” It lets the model gradually shape <em>any</em> image.</p>
                    <p>Think sculpting:</p>
                    <ul>
                        <li>You don’t start with a statue.</li>
                        <li>You start with a block, then remove randomness until a form appears.</li>
                    </ul>
                </div>
            ),
            /*
            INTERACTIVE SPEC (Page 3): noise-to-image-scrubber
            Goal: Make learners *feel* iterative refinement.
            */
            component: <NoiseToImageScrubber onComplete={() => setCanProceed(true)} />,
            nextLabel: "The refinement loop",
        },

        // ### Page 4 — Step 3: Iterative Refinement
        {
            title: "Step 3: Iterative Refinement",
            text: (
                <div>
                    <p>Image generation is basically this loop:</p>
                    <ol>
                        <li>Look at current noisy image</li>
                        <li>Ask: “What tiny changes make this look <em>more like the prompt’s patterns</em>?”</li>
                        <li>Apply tiny changes</li>
                        <li>Repeat… again… and again… (50+ times)</li>
                    </ol>
                    <p>It’s not painting one perfect stroke. It’s more like <strong>cleaning a window</strong> until the scene becomes visible.</p>

                    <div style={{ margin: '20px 0', border: '2px solid #000', borderRadius: 8, overflow: 'hidden' }}>
                        {/* Placeholder for assets/imggen-04-loop.svg */}
                        <div style={{ background: '#F5F1E6', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', flexDirection: 'column' }}>
                            <strong>[Image: Refinement Loop]</strong>
                            <span style={{ fontSize: '0.8rem' }}>Check → Adjust → Repeat</span>
                        </div>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Plausible vs. Correct",
        },

        // ### Page 5 — “Guessing Pixel by Pixel”
        {
            title: "“Guessing Pixel by Pixel”",
            text: (
                <div>
                    <p>People say “it guesses pixel by pixel.” The useful meaning is:</p>
                    <ul>
                        <li>It doesn’t verify reality.</li>
                        <li>It nudges <strong>every region</strong> toward what’s <em>statistically likely</em> for your prompt.</li>
                    </ul>
                    <p>So it’s amazing at: ✅ vibe, lighting, composition</p>
                    <p>…but weaker at: ⚠️ logos, text, counting, exact details</p>
                    <p>Because “looks plausible” ≠ “is correct.”</p>

                    <div style={{ margin: '20px 0', border: '2px solid #000', borderRadius: 8, overflow: 'hidden' }}>
                        {/* Placeholder for assets/imggen-05-plausible-correct.svg */}
                        <div style={{ background: '#F5F1E6', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', flexDirection: 'column' }}>
                            <strong>[Image: Plausible vs Correct]</strong>
                            <span style={{ fontSize: '0.8rem' }}>Plausible (Vibe) ≠ Correct (Facts)</span>
                        </div>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Why this matters",
        },

        // ## 2) Relevance Bridge (1–2 pages)

        // ### Page 6 — Why This Matters
        {
            title: "Why This Matters: Fewer Re-Rolls",
            text: (
                <div>
                    <p>Now you know that the model is “iteratively denoising toward what’s likely,” you can give <strong>constraints that shrink ambiguity</strong>, for example:</p>
                    <ul>
                        <li>composition</li>
                        <li>lighting</li>
                        <li>palette</li>
                        <li>do/don’t constraints</li>
                    </ul>
                    <p>This will help you get your desired output with fewer regenerations.</p>
                </div>
            ),
            /*
            INTERACTIVE SPEC (Page 6): prompt-clarity-meter
            Goal: Make constraints = fewer re-rolls insight visceral.
            */
            component: <PromptClarityMeter onComplete={() => setCanProceed(true)} />,
            nextLabel: "Debugging outputs",
        },

        // ### Page 7 — Diagnosing Glitches
        {
            title: "Diagnosing Glitches",
            text: (
                <div>
                    <p>When an image comes out wrong, it’s usually not random. It's a specific type of failure.</p>
                    <p>To fix it, you need to identify the <strong>root cause</strong>:</p>
                    <ul>
                        <li>Is it <strong>Ambiguity</strong>? (You left it open to interpretation)</li>
                        <li>Is it a <strong>Missing Reference</strong>? (The model had to guess)</li>
                        <li>Is it a <strong>Limitation</strong>? (Models just struggle with this)</li>
                    </ul>
                    <p>Can you identify the error in these 3 examples?</p>
                </div>
            ),
            /*
            INTERACTIVE SPEC (Page 7): prompt-debugger
            */
            component: <PromptDebugger onComplete={() => setCanProceed(true)} customScenarios={debugScenarios[userGoal]} />,
            nextLabel: "Insight 1: Templates",
        },

        // ## 3) Practical Insights (3 pages)

        // ### Page 8 — Scalable Templates
        {
            title: "Scalable Templates",
            text: (
                <div>
                    <p>Sometimes you aren’t aiming for a single perfect image, but a <strong>consistent pipeline</strong>.</p>
                    <p>To generate a 100-item catalog that looks like one cohesive photoshoot, you build a <strong>Template</strong>:</p>
                    <ul>
                        <li><strong>Lock elements</strong> you want to keep consistent (Style, Lighting).</li>
                        <li><strong>Vary elements</strong> you want to change (Product, Subject).</li>
                    </ul>
                </div>
            ),
            /*
            INTERACTIVE SPEC (Page 8): prompt-template-maker
            */
            component: <PromptTemplateMaker onComplete={() => setCanProceed(true)} config={templateConfigs[userGoal]} />,
            nextLabel: "Identity",
        },

        // ### Page 9 — Anchoring Identity
        {
            title: "Anchoring Identity",
            text: (
                <div>
                    <p>Templates handle style validation, but what about specific products?</p>
                    <p>If you need <em>the</em> exact sneaker or <em>the</em> official logo, text alone is a weak leash. You need to <strong>anchor</strong> the model:</p>
                    <ul>
                        <li>Use an <strong>image reference</strong>.</li>
                        <li>Upload a <strong>style frame</strong>.</li>
                        <li>Define <strong>brand color tokens</strong>.</li>
                    </ul>
                    <p>This prevents the model from "hallucinating" your product's details.</p>
                    <div style={{ margin: '20px 0', border: '2px solid #000', borderRadius: 8, overflow: 'hidden' }}>
                        {/* Placeholder for assets/imggen-09-reference-lock.svg */}
                        <div style={{ background: '#F5F1E6', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', flexDirection: 'column' }}>
                            <strong>[Image: Reference Lock]</strong>
                            <span style={{ fontSize: '0.8rem' }}>Text Only (Drift) vs. Ref Locked (Stable)</span>
                        </div>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Variation",
        },

        // ### Page 10 — Controlling Variation
        {
            title: "Controlling Variation",
            text: (
                <div>
                    <p>You will often see a setting called <strong>Variation</strong> (or "Chaos").</p>
                    <p>It controls how far the model can stray from your prompt's patterns:</p>
                    <ul>
                        <li><strong>Low Variation:</strong> Safe, predictable, adheres strictly to the prompt. Great for brand assets.</li>
                        <li><strong>High Variation:</strong> Wild, unexpected, exploring new angles. Great for ideation.</li>
                    </ul>
                </div>
            ),
            /*
            INTERACTIVE SPEC (Page 10): variation-knob
            Goal: Variation changes sampling, not truthfulness.
            */
            component: <VariationKnob onComplete={() => setCanProceed(true)} />,
            nextLabel: "Practice Scenario",
        },

        // ## 4) Scenario-based Personalized Practice & Recap

        // ### Page 11 — Scenario A
        {
            title: currentScenarioData.p11_title,
            text: (
                <div>
                    <p>Now that you've mastered the components of a prompt, let's put it to the test.</p>
                    <p>{currentScenarioData.p11_desc}</p>
                    <p><strong>Mission:</strong> Configure the pipeline below to minimize risk and errors.</p>
                </div>
            ),
            component: <PipelineBuilder scenarioType="safety" onComplete={() => setCanProceed(true)} />,
            nextLabel: "Next Scenario",
        },

        // ### Page 12 — Scenario B
        {
            title: currentScenarioData.p12_title,
            text: (
                <div>
                    <p>Great work on safety. Now let's switch gears to pure creativity.</p>
                    <p>{currentScenarioData.p12_desc}</p>
                    <p><strong>Mission:</strong> Configure the pipeline to maximize variety and new ideas.</p>
                </div>
            ),
            component: <PipelineBuilder scenarioType="creative" onComplete={() => setCanProceed(true)} />,
            nextLabel: "Recap",
        },

        // ### Page 12 — Recap: The Credibility Upgrade
        {
            title: "Recap: The Credibility Upgrade",
            text: (
                <div>
                    <p><strong>You now know the whole process:</strong></p>
                    <ol>
                        <li>Prompt activates learned patterns</li>
                        <li>Start from noise</li>
                        <li>Repeatedly refine until it matches patterns</li>
                    </ol>
                    <p><strong>And you can lead the workflow:</strong></p>
                    <ul>
                        <li>shrink ambiguity (split content/style)</li>
                        <li>anchor identity (references)</li>
                        <li>control variation (explore vs ship)</li>
                        <li>review smartly</li>
                    </ul>

                    <div style={{ margin: '20px 0', border: '2px solid #000', borderRadius: 8, overflow: 'hidden' }}>
                        {/* Placeholder for assets/imggen-12-cheatsheet.svg */}
                        <div style={{ background: '#F5F1E6', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', flexDirection: 'column' }}>
                            <strong>[Image: Cheat Sheet]</strong>
                            <span style={{ fontSize: '0.8rem' }}>Process + Guardrails Summary</span>
                        </div>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Finish Lesson",
        }
    ];

    const nextSlide = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            onExit();
        }
    };

    const prevSlide = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        } else {
            onExit();
        }
    };

    if (currentPage === -1) {
        return <GoalSetter onGoalSet={handleGoalSet} />;
    }

    const currentContent = pages[currentPage];
    const progress = ((currentPage + 1) / pages.length) * 100;

    return (
        <Layout
            progress={progress}
            totalPages={pages.length}
            currentPage={currentPage}
        >
            <InteractiveCard
                key={currentPage}
                title={currentContent.title}
                onNext={nextSlide}
                onBack={prevSlide}
                nextLabel={currentPage === pages.length - 1 ? "Complete Lesson" : currentContent.nextLabel}
                isNextDisabled={!canProceed && false}
            >
                <div>
                    {currentContent.text}
                </div>

                {currentContent.component && (
                    <div style={{ marginTop: 24 }}>
                        {currentContent.component}
                    </div>
                )}
            </InteractiveCard>
        </Layout>
    );
};

export default Lesson2;
