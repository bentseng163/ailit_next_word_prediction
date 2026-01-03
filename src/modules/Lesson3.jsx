import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import InteractiveCard from '../components/InteractiveCard/InteractiveCard';

// New Interactives
import LatentPainterDemo from '../components/Interactives/LatentPainterDemo';
import TransformerConnect from '../components/Interactives/TransformerConnect';
import AudioSyncToggle from '../components/Interactives/AudioSyncToggle';
import PhysicsTraining from '../components/Interactives/PhysicsTraining';

// Reused Inteactives
import KeyframeAnchorDemo from '../components/Interactives/KeyframeAnchorDemo';
import ReferencePackPicker from '../components/Interactives/ReferencePackPicker';
import StrategySimulation from '../components/Interactives/StrategySimulation';
import SwiftMerchActivity from '../components/Interactives/SwiftMerchActivity';
import GoalSetter from '../components/GoalSetter/GoalSetter';

// Icons
import { Film, Palette, Scissors, Music, Brain, Shield, Shirt, User, FileText, Star } from 'lucide-react';

// Conceptual Images
import videoMagicImg from '../assets/lesson3/video_magic_formula.png';
import studioTeamImg from '../assets/lesson3/motion_studio_team.png';
import correlationImg from '../assets/lesson3/correlation_vs_causation.png';
import pixelParrotImg from '../assets/lesson3/pixel_parrot.png';
import recapImg from '../assets/lesson3/director_chair_recap.png';

const Lesson3 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(-1);
    const [canProceed, setCanProceed] = useState(true);
    const [userGoal, setUserGoal] = useState('default');

    const scenarioContent = {
        default: {
            title: "Activity: SwiftMerch Campaign",
            text: (
                <p>
                    Our firm, <strong>SwiftMerch</strong>, wants to let fans generate a video of themselves hanging out with Taylor Swift while wearing the new tour T-shirt.
                    <br /><br />
                    Select the Reference Assets needed to balance accuracy and personalization:
                </p>
            ),
            nextLabel: "Review Logic",
            activityProps: {
                title: "The Taylor Swift Experience",
                goalText: "Goal: Personalized video of Customer + Taylor + Product.",
                options: [
                    { id: 'product', label: 'Product Shot', type: 'object', required: true },
                    { id: 'celebrity', label: 'Celebrity Ref', type: 'subject', required: true },
                    { id: 'selfie', label: 'User Selfie', type: 'user', required: true },
                    { id: 'logo', label: 'Brand Logo', type: 'branding', required: false, error: "Branding is important, but for the VIDEO generation itself, we need to focus on the visual subjects first." },
                    { id: 'style', label: 'Cinematic Style', type: 'style', required: false, error: "Style is optional. To get the specific LOOK right, we first need the specific OBJECTS and PEOPLE." },
                    { id: 'script', label: 'Detailed Script', type: 'text', required: false, error: "A script describes action, but reference images are 'Must Haves' to define the identity of the characters." },
                ],
                successMsg: "Correct! These are the 3 'Must Have' assets to ground the model for a highly personalized result.",
                failMsg: "To personalize the video, we need to know exactly WHO (User), WHAT (Product), and WHO WITH (Celebrity)."
            }
        },
        productivity: {
            title: "Activity: E-Commerce Automator",
            text: (
                <p>
                    You need to generate 10,000 unique product videos for the new catalog. Consistency is impossible if you prompt every video manually.
                    <br /><br />
                    Select the Reference Assets to lock in the <strong>Brand Identity</strong> across all videos:
                </p>
            ),
            nextLabel: "Review Pipeline",
            activityProps: {
                title: "The 10,000 Video Pipeline",
                goalText: "Goal: Automate product videos that all look like the same brand.",
                options: [
                    { id: 'catalog', label: 'Product Catalog', type: 'object', required: true },
                    { id: 'brandguide', label: 'Brand Style Guide', type: 'style', required: true },
                    { id: 'template', label: 'Motion Template', type: 'structure', required: true },
                    { id: 'meme', label: 'Viral Meme', type: 'concept', required: false, error: "Memes are unpredictable. For a catalog, we need strict brand adherence, not random humor." },
                    { id: 'competitor', label: 'Competitor Ad', type: 'ref', required: false, error: "Using a competitor's ad might copy their style too closely. Use our own Style Guide." },
                    { id: 'copy', label: 'Marketing Copy', type: 'text', required: false, error: "Text copy is for the voiceover or captions, not the visual generation references." },
                ],
                successMsg: "Perfect! Product (Subject), Style Guide (Look), and Template (Structure) ensure consistency at scale.",
                failMsg: "To automate 10k videos, you need to lock the Product, the Look, and the Structure."
            }
        },
        shipping: {
            title: "Activity: SwiftMerch Campaign",
            text: (
                <p>
                    Our firm, <strong>SwiftMerch</strong>, wants to let fans generate a video of themselves hanging out with Taylor Swift while wearing the new tour T-shirt.
                    <br /><br />
                    Select the Reference Assets needed to balance accuracy and personalization:
                </p>
            ),
            nextLabel: "Review Logic",
            activityProps: {
                title: "The Taylor Swift Experience",
                goalText: "Goal: Personalized video of Customer + Taylor + Product.",
                options: [
                    { id: 'product', label: 'Product Shot', type: 'object', required: true },
                    { id: 'celebrity', label: 'Celebrity Ref', type: 'subject', required: true },
                    { id: 'selfie', label: 'User Selfie', type: 'user', required: true },
                    { id: 'logo', label: 'Brand Logo', type: 'branding', required: false, error: "Branding is important, but for the VIDEO generation itself, we need to focus on the visual subjects first." },
                    { id: 'style', label: 'Cinematic Style', type: 'style', required: false, error: "Style is optional. To get the specific LOOK right, we first need the specific OBJECTS and PEOPLE." },
                    { id: 'script', label: 'Detailed Script', type: 'text', required: false, error: "A script describes action, but reference images are 'Must Haves' to define the identity of the characters." },
                ],
                successMsg: "Correct! These are the 3 'Must Have' assets to ground the model for a highly personalized result.",
                failMsg: "To personalize the video, we need to know exactly WHO (User), WHAT (Product), and WHO WITH (Celebrity)."
            }
        }
    };

    const handleGoalSet = (goalType) => {
        setUserGoal(goalType);
        setCurrentPage(0);
    };

    const currentScenario = scenarioContent[userGoal] || scenarioContent.default;

    const pages = [
        {
            title: "Video Generation: The Magic Show",
            text: (
                <div style={{ textAlign: "center" }}>

                    {/* Visual: Image Gen + Next Token = Video */}
                    <img
                        src={videoMagicImg}
                        alt="Equation: Image Gen + Next Token = Video"
                        style={{ width: '100%', borderRadius: '8px', margin: '16px 0', border: '1px solid #e2e8f0' }}
                    />
                    <p>
                        Ever feel Video generation AI models feels like magic? It actually builds on top of concepts you already learned so far: image generation, next-word prediction and more! Let’s find out how that magic works.
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "The Studio Analogy",
        },
        {
            title: "The Motion Production Studio",
            text: (
                <div style={{ textAlign: "center" }}>
                    <p>
                        Think of a video model as a tiny digital studio inside your GPU, with three key employees:
                    </p>
                    {/* Visual: The 3 Employees */}
                    <img
                        src={studioTeamImg}
                        alt="The Painter, Editor, and Composer"
                        style={{ width: '100%', borderRadius: '8px', margin: '16px 0', border: '1px solid #e2e8f0' }}
                    />
                    <ul style={{ textAlign: 'left', paddingLeft: '20px', color: '#ffffff', lineHeight: '1.6' }}>
                        <li style={{ marginBottom: '8px' }}>
                            <strong>The Painter</strong> (Diffusion): Generates the raw visual frames from scratch.
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <strong>The Editor</strong> (Transformers): Stitches frames together so they flow logically.
                        </li>
                        <li>
                            <strong>The Composer</strong> (Audio Gen): Syncs the sound effects beat-for-beat.
                        </li>
                    </ul>
                </div>
            ),
            component: null,
            nextLabel: "Meet The Painter",
        },
        {
            title: "The Painter (Latent Diffusion)",
            text: (
                <p>
                    Just like in Image Generation, the Painter starts with pure static (noise) and hallucinates structure until a clear image emerges.
                </p>
            ),
            component: <LatentPainterDemo onComplete={() => setCanProceed(true)} />,
            nextLabel: "Meet The Editor",
        },
        {
            title: "The Editor (Temporal Consistency)",
            text: (
                <>
                    <p>
                        <strong>Transformers</strong>, the mechanism that powers next-word prediction is great at processing sequences of data.
                    </p>
                    <p>
                        In video, instead of words, they connect <strong>frames and time</strong>. Just like an Editor, they ensure the movie flows logically so objects don't teleport or vanish.
                    </p>
                </>
            ),
            component: <TransformerConnect onComplete={() => setCanProceed(true)} />,
            nextLabel: "Meet The Composer",
        },
        {
            title: "The Composer (Audio Generation)",
            text: (
                <>
                    <p>
                        In newer models (like Veo), sound isn't added later.
                    </p>
                    <p>
                        The model generates the video and audio <strong>together</strong>, ensuring the *thud* happens exactly when the ball hits.
                    </p>
                </>
            ),
            component: <AudioSyncToggle onComplete={() => setCanProceed(true)} />,
            nextLabel: "But do they know physics?",
        },
        {
            title: "Question: Understanding Physics",
            text: (
                <p>
                    These models make things bounce and fall. But do they honestly know why it falls?
                </p>
            ),
            component: <PhysicsTraining onComplete={() => setCanProceed(true)} />,
            nextLabel: "Reveal the truth",
        },
        {
            title: "The Answer: Statistical Correlation",
            text: (
                <div style={{ textAlign: "center" }}>

                    {/* Visual: Correlation vs Causation */}
                    <img
                        src={correlationImg}
                        alt="Correlation vs Causation"
                        style={{ width: '100%', borderRadius: '8px', margin: '16px 0', border: '1px solid #e2e8f0' }}
                    />
                    <p>
                        If the model sees a glass shatter 10,000 times, it learns "Impact + Glass = Shards."
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        It doesn't know <em>why</em>. It just knows the pattern based on it's training data.
                    </p>
                </div>
            ),
            component: null, // Results shown in previous step effectively, but this reinforces
            nextLabel: "Why it fails",
        },
        {
            title: "The Result: Pixel Parrots",
            text: (
                <div style={{ textAlign: "center" }}>
                    {/* Visual: Pixel Parrot */}
                    <img
                        src={pixelParrotImg}
                        alt="Pixel Parrot Glitch"
                        style={{ width: '100%', borderRadius: '8px', margin: '16px 0', border: '1px solid #e2e8f0' }}
                    />
                    <p>
                        Despite their beauty, these models are "Pixel Parrots."
                    </p>
                    <p>
                        They repeat patterns of motion without understanding the causality. That's why hands morph and objects float.
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "How to fix it",
        },
        {
            title: "Guardrail 1: Keyframes",
            text: (
                <p>
                    Since the model is just guessing the path, you can guide it by pinning the destination.
                    <br />
                    <strong>Provide Keyframes to lock the start and end.</strong>
                </p>
            ),
            component: <KeyframeAnchorDemo onComplete={() => setCanProceed(true)} />,
            nextLabel: "Guardrail 2: References",
        },
        {
            title: "Guardrail 2: Reference Assets",
            text: (
                <p>
                    To stop the "Painter" from improvising your logo, give it a ground truth.
                    <br />
                    <strong>Upload reference assets as constraints.</strong>
                </p>
            ),
            component: <ReferencePackPicker onComplete={() => setCanProceed(true)} />,
            nextLabel: "The Taylor Swift Experience",
        },
        {
            title: currentScenario.title,
            text: currentScenario.text,
            component: <SwiftMerchActivity
                onComplete={() => setCanProceed(true)}
                scenario={currentScenario.activityProps}
            />,
            nextLabel: currentScenario.nextLabel,
        },

        {
            title: "Recap: The Motion Studio",
            text: (
                <div style={{ textAlign: "center" }}>
                    <p style={{ marginBottom: 16 }}>
                        Video generation is a collaboration between:
                    </p>
                    {/* Visual: Director Chair Structure */}
                    <img
                        src={recapImg}
                        alt="You are the Director"
                        style={{ width: '100%', borderRadius: '8px', margin: '0 0 24px 0', border: '1px solid #e2e8f0' }}
                    />
                    <ul style={{ textAlign: 'left', paddingLeft: '20px', color: '#4b5563', marginBottom: 24 }}>
                        <li style={{ marginBottom: 8 }}><strong>The Painter:</strong> Creates the pixels (Diffusion)</li>
                        <li style={{ marginBottom: 8 }}><strong>The Editor:</strong> Connects time (Transformers)</li>
                        <li style={{ marginBottom: 8 }}><strong>The Composer:</strong> Syncs audio (Lockstep generation)</li>
                    </ul>
                    <p>
                        And you are the <strong>Director</strong>. Use Keyframes and References to keep them all in sync.
                    </p>
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
