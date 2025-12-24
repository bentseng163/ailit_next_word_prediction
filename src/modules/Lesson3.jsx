import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import InteractiveCard from '../components/InteractiveCard/InteractiveCard';

// Interactives
import FlipbookIllusion from '../components/Interactives/FlipbookIllusion';
import FrameDriftViewer from '../components/Interactives/FrameDriftViewer';
import StoryboardBuilder from '../components/Interactives/StoryboardBuilder';
import KeyframeAnchorDemo from '../components/Interactives/KeyframeAnchorDemo';
import ReferencePackPicker from '../components/Interactives/ReferencePackPicker';
import VideoReviewChecklist from '../components/Interactives/VideoReviewChecklist';
import StrategySimulation from '../components/Interactives/StrategySimulation'; // Reused

// Icons and assets
import { Play, Anchor, Layers, Shield } from 'lucide-react';

const Lesson3 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [canProceed, setCanProceed] = useState(true);

    // Scenario for StrategySimulation
    const videoLaunchScenario = {
        title: "Launching a Product Video",
        description: "You have a 6-second AI video. Stakeholders love it. What do you do?",
        strategies: [
            {
                id: "ship",
                name: "Ship it as-is",
                icon: <Play size={24} />,
                result: "High risk. Casual viewers might miss the drift, but eagle-eyed customers will spot the morphing logo.",
                isRecommended: false
            },
            {
                id: "internal",
                name: "Internal Only",
                icon: <Layers size={24} />,
                result: "Safe. Great for mood boards and pitch decks where 'perfect' physics doesn't matter.",
                isRecommended: true
            },
            {
                id: "regen_guardrails",
                name: "Regen + Guardrails",
                icon: <Anchor size={24} />,
                result: "Better. Using Storyboards and Keyframes reduces the weirdness significantly.",
                isRecommended: true
            },
            {
                id: "all_check",
                name: "All + Human Review",
                icon: <Shield size={24} />,
                result: "Best for external. You caught the 3 frames where the product melted. Crisis averted.",
                isRecommended: true
            }
        ]
    };

    const pages = [
        {
            title: "The Flipbook Illusion",
            text: (
                <div style={{ textAlign: "center" }}>
                    <p>
                        Think of a video as a stack of images shown quickly.
                    </p>
                    <p>
                        To generate video, the AI just looks at the current frame and guesses:
                        <br />
                        <strong>"What pattern comes next?"</strong>
                    </p>
                </div>
            ),
            component: <FlipbookIllusion onComplete={() => setCanProceed(true)} />,
            nextLabel: "See the mechanism",
        },
        {
            title: "Mechanism: Predicting Frames",
            text: (
                <div style={{ textAlign: "center" }}>
                    {/* Placeholder Pipeline Diagram */}
                    <div style={{ padding: '20px', background: '#F5F1E6', borderRadius: '12px', marginBottom: '16px', border: '2px solid #000', color: '#000' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                            <div style={{ background: '#3b82f6', color: 'white', padding: '6px', borderRadius: '4px', fontSize: '0.6rem' }}>Text Prompt</div>
                            <div style={{ fontSize: '1rem' }}>→</div>
                            <div style={{ flex: 1, display: 'flex', gap: '2px', justifyContent: 'center' }}>
                                <div style={{ width: 15, height: 20, background: 'white', border: '1px solid #000' }}>F1</div>
                                <div style={{ width: 15, height: 20, background: 'white', border: '1px solid #000' }}>F2</div>
                                <div style={{ width: 15, height: 20, background: 'white', border: '1px solid #000' }}>F3</div>
                            </div>
                            <div style={{ fontSize: '1rem' }}>→</div>
                            <div style={{ background: '#22c55e', color: 'white', padding: '6px', borderRadius: '4px', fontSize: '0.6rem' }}>Video</div>
                        </div>
                        <div style={{ marginTop: '8px', fontSize: '0.7rem', fontWeight: 'bold' }}>Predict + Refine Frames</div>
                    </div>

                    <p>
                        This is why it feels magic, but also unreliable.
                        <br />
                        The model is optimizing for <strong>plausible motion</strong>, not physical truth.
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "The drift problem",
        },
        {
            title: "The Hard Part: Consistency",
            text: (
                <>
                    <p>
                        Generating one good image is easy. Generating 24 good images per second that <strong>all match each other</strong> is hard.
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        It’s essentially playing a game of "Telephone" with itself, 24 times a second.
                    </p>
                </>
            ),
            component: null,
            nextLabel: "Experience the drift",
        },
        {
            title: "Cognitive Conflict: The Demo That Lies",
            text: (
                <p>
                    A video might look smooth at full speed. But when you slow it down...
                    <br />
                    <strong>Can you find where the reality breaks?</strong>
                </p>
            ),
            component: <FrameDriftViewer onComplete={() => setCanProceed(true)} />,
            nextLabel: "Why does it move like that?",
        },
        {
            title: "Motion Priors (Standard Patterns)",
            text: (
                <>
                    <p>
                        Models learn "Motion Priors"—shortcuts for how things usually move.
                    </p>
                    <ul style={{ textAlign: 'left', paddingLeft: '20px', color: '#4b5563' }}>
                        <li>Clouds drift right</li>
                        <li>Water ripples</li>
                        <li>Cameras pan smoothly</li>
                    </ul>
                    <p style={{ marginTop: 8 }}>
                        It relies on these shortcuts when it doesn't know what else to do.
                    </p>
                </>
            ),
            component: null,
            nextLabel: "Plausible ≠ Accurate",
        },
        {
            title: "“Plausible” Is Not “Accurate”",
            text: (
                <div style={{ textAlign: "center" }}>
                    <p>
                        Just like a text model can hallucinate a quote, a video model can hallucinate an extra finger or a morphing logo.
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        It’s not "broken." It’s just predicting the next most likely shape.
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "How to fix it: Guardrails",
        },
        {
            title: "Guardrails Summary",
            text: (
                <div style={{ textAlign: "center" }}>
                    {/* Placeholder Guardrails 4-card Diagram */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                        <div style={{ background: '#fef9c3', padding: '8px', borderRadius: '6px', fontSize: '0.7rem' }}>
                            <strong>Storyboard</strong><br />Lock Intent
                        </div>
                        <div style={{ background: '#dbeafe', padding: '8px', borderRadius: '6px', fontSize: '0.7rem' }}>
                            <strong>Keyframes</strong><br />Lock Frames
                        </div>
                        <div style={{ background: '#f3e8ff', padding: '8px', borderRadius: '6px', fontSize: '0.7rem' }}>
                            <strong>Reference</strong><br />Lock Identity
                        </div>
                        <div style={{ background: '#dcfce7', padding: '8px', borderRadius: '6px', fontSize: '0.7rem' }}>
                            <strong>Review</strong><br />Protect Trust
                        </div>
                    </div>
                    <p>
                        Video generation is "guessing next frames." Guardrails work by reducing the <strong>degrees of freedom</strong> for those guesses.
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Guardrail 1: Storyboard",
        },
        {
            title: "Guardrail 1: Storyboard Constraints",
            text: (
                <p>
                    Don't just say "make a video." Define the beats.
                    <br />
                    <strong>Lock the intent before you generate.</strong>
                </p>
            ),
            component: <StoryboardBuilder onComplete={() => setCanProceed(true)} />,
            nextLabel: "Guardrail 2: Keyframes",
        },
        {
            title: "Guardrail 2: Keyframes",
            text: (
                <>
                    <p>
                        Keyframes are anchors. You provide the Start and End images.
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        The model just has to fill the middle, rather than inventing the whole journey.
                    </p>
                </>
            ),
            component: <KeyframeAnchorDemo onComplete={() => setCanProceed(true)} />,
            nextLabel: "Guardrail 3: References",
        },
        {
            title: "Guardrail 3: Reference Lock",
            text: (
                <p>
                    If the brand matters, you can't rely on text prompts.
                    <br />
                    <strong>Upload the assets acting as "ground truth."</strong>
                </p>
            ),
            component: <ReferencePackPicker onComplete={() => setCanProceed(true)} />,
            nextLabel: "Guardrail 4: Human Review",
        },
        {
            title: "Guardrail 4: Human Review",
            text: (
                <p>
                    Video feels "real," so the cost of a mistake is high.
                    <br />
                    <strong>Use a checklist to catch the subtle lies.</strong>
                </p>
            ),
            component: <VideoReviewChecklist onComplete={() => setCanProceed(true)} />,
            nextLabel: "Simulation Time",
        },
        {
            title: "Scenario Simulation: “Can We Use This?”",
            text: (
                <p>
                    You have a 6-second video. It looks cool.
                    <br />
                    <strong>Do you ship it?</strong>
                </p>
            ),
            component: <StrategySimulation scenario={videoLaunchScenario} onComplete={() => setCanProceed(true)} />,
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
                <div style={{ marginBottom: 20 }}>
                    {currentContent.text}
                </div>

                <div style={{ marginTop: 20 }}>
                    {currentContent.component}
                </div>
            </InteractiveCard>
        </Layout>
    );
};

export default Lesson3;
