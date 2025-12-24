import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import InteractiveCard from '../components/InteractiveCard/InteractiveCard';

// Interactives
import NoiseToImageScrubber from '../components/Interactives/NoiseToImageScrubber';
import PromptClarityMeter from '../components/Interactives/PromptClarityMeter';
import PromptSurgery from '../components/Interactives/PromptSurgery';
import VariationKnob from '../components/Interactives/VariationKnob';
import PipelineBuilder from '../components/Interactives/PipelineBuilder';

// Assets (Nano Banana Generations)
import imgRemote from '../assets/imggen-01-remote.png';
import imgTags from '../assets/imggen-02-tags.png';

const Lesson2 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [canProceed, setCanProceed] = useState(true);

    const pages = [
        // ## 1) Theory Anchor (5 pages)

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
                    <p>If you treat the model like a “camera,” you lose. If you treat it like a “design intern with infinite energy,” you win.</p>
                    <p>Knowing it’s <strong>denoising toward likely patterns</strong> means you can give:</p>
                    <ul>
                        <li>composition</li>
                        <li>lighting</li>
                        <li>palette</li>
                        <li>do/don’t constraints</li>
                    </ul>
                    <p>Result: <strong>less ambiguity → fewer regenerations</strong>.</p>
                </div>
            ),
            /*
            INTERACTIVE SPEC (Page 6): prompt-clarity-meter
            Goal: Make constraints = fewer re-rolls insight visceral.
            */
            component: <PromptClarityMeter onComplete={() => setCanProceed(true)} />,
            nextLabel: "Debugging outputs",
        },

        // ### Page 7 — Credibility Move: Debugging
        {
            title: "Credibility Move: Debugging",
            text: (
                <div>
                    <p>When an output looks wrong, “the model sucks” is not actionable. A credible leader asks:</p>
                    <ul>
                        <li>Is it <strong>prompt ambiguity</strong> (content vs style mixed)?</li>
                        <li>Is it <strong>missing reference</strong> (identity not anchored)?</li>
                        <li>Is it a <strong>known limitation</strong> (text/logos/hands)?</li>
                    </ul>
                    <p>That’s not being technical. That’s being <em>usefully diagnostic</em>.</p>

                    <div style={{ margin: '20px 0', border: '2px solid #000', borderRadius: 8, overflow: 'hidden' }}>
                        {/* Placeholder for assets/imggen-07-debug-tree.svg */}
                        <div style={{ background: '#F5F1E6', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', flexDirection: 'column' }}>
                            <strong>[Image: Debug Tree]</strong>
                            <span style={{ fontSize: '0.8rem' }}>Ambiguity / Ref / Limitation</span>
                        </div>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Insight 1: Structure",
        },

        // ## 3) Practical Insights (3 pages)

        // ### Page 8 — Insight 1: Separate Content vs Style
        {
            title: "Insight 1: Separate Content vs Style",
            text: (
                <div>
                    <p>Bad prompt: <em>“Make it premium and modern and cool and also show the thermostat with the new UI.”</em> (Mixing soup)</p>
                    <p>Good prompt structure:</p>
                    <ul>
                        <li><strong>Content:</strong> what makes the image</li>
                        <li><strong>Style:</strong> how it should look</li>
                        <li><strong>Constraints:</strong> what must NOT happen</li>
                        <li><strong>Format:</strong> aspect ratio, specs</li>
                    </ul>
                </div>
            ),
            /*
            INTERACTIVE SPEC (Page 8): prompt-surgery
            Goal: Separation reduces ambiguity.
            */
            component: <PromptSurgery onComplete={() => setCanProceed(true)} />,
            nextLabel: "Insight 2: Identity",
        },

        // ### Page 9 — Insight 2: Anchor Identity With References
        {
            title: "Insight 2: Anchor Identity",
            text: (
                <div>
                    <p>If you need <em>the</em> product, <em>the</em> logo, or <em>the</em> character… Text alone is a weak leash.</p>
                    <p>Use:</p>
                    <ul>
                        <li>reference image</li>
                        <li>style frame</li>
                        <li>brand color tokens</li>
                        <li>“must-match” notes</li>
                    </ul>

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
            nextLabel: "Insight 3: Variation",
        },

        // ### Page 10 — Insight 3: Control Variation
        {
            title: "Insight 3: Control Variation",
            text: (
                <div>
                    <p>Variation is like telling the model: “Explore more possibilities.”</p>
                    <p>Great for <strong>ideation</strong> (brainstorming new angles).</p>
                    <p>Risky for <strong>brand-precise assets</strong> (we need the logo to stay put).</p>
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

        // ### Page 11 — Scenario: Build a Pipeline
        {
            title: "Scenario: Build a Pipeline",
            text: (
                <div>
                    <p>You need 12 campaign images for a landing page by tomorrow.</p>
                    <p><strong>Goal:</strong> Consistent brand look, correct product identity, safe to publish.</p>
                    <p>Build the pipeline by filling the missing pieces.</p>
                </div>
            ),
            /*
            INTERACTIVE SPEC (Page 11): pipeline-builder
            Goal: Apply concept "denoise toward likely patterns" via constraints.
            */
            component: <PipelineBuilder onComplete={() => setCanProceed(true)} />,
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
