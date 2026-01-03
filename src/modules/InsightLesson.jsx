import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import InteractiveCard from '../components/InteractiveCard/InteractiveCard';

// Refactored Interactives
import RecapTextInsight from '../components/Interactives/RecapTextInsight';
import RecapImageInsight from '../components/Interactives/RecapImageInsight';
import RecapVideoInsight from '../components/Interactives/RecapVideoInsight';
import LaunchCrisisActivity from '../components/Interactives/LaunchCrisisActivity';

// Icons for placeholders
import { Brain, Eye, Layers, ShieldCheck, AlertTriangle } from 'lucide-react';

const InsightLesson = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [canProceed, setCanProceed] = useState(true);

    // Updated Placeholder: Light BG, Dark Text
    const AssetPlaceholder = ({ icon: Icon, title, desc }) => (
        <div style={{
            background: '#f1f5f9', // Light Slate 100
            color: '#1e293b',      // Dark Slate 800
            borderRadius: '12px',
            border: '2px dashed #94a3b8',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            margin: '20px 0',
            aspectRatio: '16/9'
        }}>
            <Icon size={48} strokeWidth={1.5} style={{ marginBottom: '16px', color: '#3b82f6' }} />
            <h3 style={{ margin: '0 0 8px 0' }}>{title}</h3>
            <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>{desc}</p>
        </div>
    );

    const pages = [
        // Page 1: Recap
        {
            title: "Recap: Three Lessons, One Engine",
            text: (
                <div>
                    <p>You’ve learned three different "faces" of GenAI:</p>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                        <li><strong>Text (LLMs):</strong> predicts the next <strong>token</strong></li>
                        <li><strong>Images (Diffusion):</strong> refines noise toward likely <strong>pixels</strong></li>
                        <li><strong>Video:</strong> predicts likely <strong>frames</strong> over time</li>
                    </ul>
                    <p>Different outputs, same underlying move: <strong>continue the pattern.</strong></p>
                    <AssetPlaceholder
                        icon={Layers}
                        title="3 Lessons → 1 Engine"
                        desc="Text (lines), Image (mountain), Video (play frame)"
                    />
                </div>
            ),
            component: null,
            nextLabel: "The Insight",
        },

        // Page 2: The Insight
        {
            title: "Reveal the Insight",
            text: (
                <div>
                    <p>Here’s the insight that ties everything together:</p>
                    <blockquote style={{ background: '#fef3c7', padding: '12px', borderLeft: '4px solid #d97706', borderRadius: '4px', margin: '16px 0' }}>
                        <strong>GenAI predicts what’s plausible, not what’s true.</strong>
                    </blockquote>
                    <p>It’s optimized to <strong>look right</strong>, not to <strong>be right</strong>. Confidence is often just a style, not a guarantee.</p>
                    <AssetPlaceholder
                        icon={AlertTriangle}
                        title="Plausible ≠ True"
                        desc="Venn Diagram: Plausible vs True. Small overlap."
                    />
                </div>
            ),
            component: null,
            nextLabel: "Why it happens",
        },

        // Page 3: Why (Training)
        {
            title: "Why Plausibility Happens",
            text: (
                <div>
                    <p>GenAI learns from massive data patterns: <em>"When I see X context, Y usually follows."</em></p>
                    <p>At generation time, it’s not verifying reality. It’s asking:</p>
                    <p><strong>“Given what I’ve seen before, what comes next?”</strong></p>
                    <AssetPlaceholder
                        icon={Brain}
                        title="Training → Completion"
                        desc="Stack of docs -> Pattern Learning -> Likely Output"
                    />
                </div>
            ),
            component: null,
            nextLabel: "3 Surprises",
        },

        // Page 4: 3 Surprises
        {
            title: "The Three Surprises",
            text: (
                <div>
                    <p>This one insight explains why GenAI can be:</p>
                    <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                        <li><strong>Helpful:</strong> predicts useful continuations fast</li>
                        <li><strong>Creative:</strong> picks less common paths</li>
                        <li><strong>Wrong:</strong> hallucinates when plausible &gt; true</li>
                    </ol>
                    <p><strong>GenAI is a plausibility machine. You are the truth machine.</strong></p>
                    <AssetPlaceholder
                        icon={Eye}
                        title="Helpful / Creative / Wrong"
                        desc="Three cards. Helpful (Green), Creative (Blue), Wrong (Orange)"
                    />
                </div>
            ),
            component: null,
            nextLabel: "Relevancy",
        },

        // Page 5: Relevancy at Work
        {
            title: "Why This Matters at Work",
            text: (
                <div>
                    <p>The risk isn’t "AI is bad." The risk is <strong>over-trust</strong>.</p>
                    <p>Understanding plausibility helps you choose when output is safe as a <strong>draft</strong> vs when you need <strong>sources</strong>.</p>
                    <AssetPlaceholder
                        icon={ShieldCheck}
                        title="Trust Calibration Ladder"
                        desc="Ladder: Draft -> Check -> Evidence -> Expert Review"
                    />
                </div>
            ),
            component: null,
            nextLabel: "Decision Making",
        },

        // Page 6: Business Decisions
        {
            title: "Better Business Decisions",
            text: (
                <div>
                    <p>This insight improves decisions like:</p>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                        <li><strong>Where to use it:</strong> Ideation vs Claims</li>
                        <li><strong>Guardrails:</strong> Sources & References</li>
                        <li><strong>Measurement:</strong> Not "looks good" but "correct & safe"</li>
                    </ul>
                    <AssetPlaceholder
                        icon={Layers}
                        title="Decision Map"
                        desc="2x2 Grid: Stakes vs Tolerance. Guardrails for high stakes."
                    />
                </div>
            ),
            component: null,
            nextLabel: "Practice: Text",
        },

        // Page 7: Interactive Text
        {
            title: "Applied to Text (Lesson 1 Recap)",
            text: (
                <p>GenAI is a next-token predictor. It fills gaps with "likely" text. Can you spot when "likely" becomes a lie?</p>
            ),
            component: <RecapTextInsight onComplete={() => setCanProceed(true)} />,
            nextLabel: "Practice: Image",
        },

        // Page 8: Interactive Image
        {
            title: "Applied to Image (Lesson 2 Recap)",
            text: (
                <p>GenAI is a denoiser. It fills pixels based on visual patterns. Can you spot when the "visual pattern" conflicts with "historical truth"?</p>
            ),
            component: <RecapImageInsight onComplete={() => setCanProceed(true)} />,
            nextLabel: "Practice: Video",
        },

        // Page 9: Interactive Video
        {
            title: "Applied to Video (Lesson 3 Recap)",
            text: (
                <p>GenAI predicts next frames. It mimics motion patterns. Does it understand the biology of the things moving?</p>
            ),
            component: <RecapVideoInsight onComplete={() => setCanProceed(true)} />,
            nextLabel: "Final Boss",
        },

        // Page 10: Final Scenario
        {
            title: "Final Boss: The Launch Crisis",
            text: (
                <p><strong>Scenario:</strong> You are the PM. Assets are generating LIVE for a campaign launch. You have 30 seconds. Ship or Kill.</p>
            ),
            component: <LaunchCrisisActivity onComplete={() => setCanProceed(true)} />,
            nextLabel: "Complete Lesson",
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

                {currentContent.component && (
                    <div style={{ marginTop: 24 }}>
                        {currentContent.component}
                    </div>
                )}
            </InteractiveCard>
        </Layout>
    );
};

export default InsightLesson;
