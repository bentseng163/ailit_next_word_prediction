import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import InteractiveCard from '../../components/InteractiveCard/InteractiveCard';

// Interactives
import CompletionSpaceVisualizer from '../../components/Interactives/CompletionSpaceVisualizer';
import DiagnoseTheFailure from '../../components/Interactives/DiagnoseTheFailure';

// Images
import bigIdeaCover from '../../assets/creating/big_idea_cover.png';
import samplingNotThinking from '../../assets/creating/sampling_not_thinking.png';
import funnelConstraints from '../../assets/creating/funnel_constraints.png';
import twoLevers from '../../assets/creating/two_levers.png';

/*
 * ============================================================================
 * BIG IDEA: CONTROL THE COMPLETION SPACE
 * ============================================================================
 * 
 * TARGET AUDIENCE: PM/MBA learners
 * 
 * CORE INSIGHT: AI doesn't understand—it samples from plausible completions.
 *               Your job is to shrink that space until only right answers remain.
 * 
 * CONNECTION: This ties together Lesson 1 (CPCO specification) and 
 *             Lesson 2 (context curation) as two levers for the same goal.
 * 
 * FLOW:
 * 1. Hook - "One insight ties it all together"
 * 2. Reframe - AI samples, it doesn't think
 * 3. Insight - The completion space concept
 * 4. Interactive - Watch constraints shrink the space
 * 5. Two Levers - Specification + Curation
 * 6. Connection - How L1 and L2 work together
 * 7. Interactive - Diagnose the failure (case studies)
 * 8. Summary - The PM's mental model
 * ============================================================================
 */

const CreatingBigIdea = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [canProceed, setCanProceed] = useState(true);

    const pages = [
        // =====================================================================
        // PAGE 0: Hook - One Insight
        // =====================================================================
        {
            title: "The Big Idea",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src={bigIdeaCover}
                        alt="Control the Completion Space"
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "16px",
                            marginBottom: "16px",
                        }}
                    />
                    <p style={{ fontWeight: 600 }}>
                        One insight ties Lessons 1 and 2 together:
                    </p>
                    <p style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        margin: "8px 0"
                    }}>
                        Control the Completion Space
                    </p>
                    <p style={{ opacity: 0.8, fontSize: "13px" }}>
                        Master this, and you'll know why prompts succeed or fail.
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Start",
        },

        // =====================================================================
        // PAGE 1: Reframe - AI Samples, It Doesn't Think
        // =====================================================================
        {
            title: "AI Samples. It Doesn't Think.",
            text: (
                <>
                    <p>
                        Most people treat AI like a smart colleague who <em>"gets"</em> what
                        they want. That's the wrong mental model.
                    </p>
                    <p>
                        Reality: AI <strong>samples from a probability distribution</strong> of
                        plausible next outputs. It doesn't understand—it guesses what fits.
                    </p>
                </>
            ),
            component: (
                <div>
                    <img
                        src={samplingNotThinking}
                        alt="AI samples, not thinks"
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "12px",
                            marginBottom: "12px"
                        }}
                    />
                    <div style={{
                        background: "rgba(245, 158, 11, 0.1)",
                        borderRadius: "10px",
                        padding: "12px",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}>
                        <span style={{ fontSize: "20px" }}>💡</span>
                        <div>
                            <strong>Key insight:</strong> The more "plausible" outputs exist,
                            the less predictable the result.
                        </div>
                    </div>
                </div>
            ),
            nextLabel: "See the Space",
        },

        // =====================================================================
        // PAGE 2: Insight - The Completion Space
        // =====================================================================
        {
            title: "The Completion Space",
            text: (
                <>
                    <p>
                        Think of every possible output the AI <em>could</em> generate as a
                        <strong> "completion space."</strong>
                    </p>
                    <p>
                        A vague prompt = huge space = unpredictable output.<br />
                        A specific prompt = tiny space = controlled output.
                    </p>
                </>
            ),
            component: (
                <div>
                    <img
                        src={funnelConstraints}
                        alt="Constraints shrink the space"
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "12px",
                            marginBottom: "12px"
                        }}
                    />
                    <div style={{
                        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))",
                        borderRadius: "10px",
                        padding: "12px",
                        textAlign: "center",
                        fontSize: "13px",
                        fontWeight: 600
                    }}>
                        Your job: Shrink the space until only right answers remain.
                    </div>
                </div>
            ),
            nextLabel: "Try It",
        },

        // =====================================================================
        // PAGE 3: Interactive - Completion Space Visualizer
        // =====================================================================
        {
            title: "Watch the Space Shrink",
            text: (
                <p>
                    Toggle each constraint and watch the completion space shrink.
                    <strong> Each element you add eliminates plausible-but-wrong outputs.</strong>
                </p>
            ),
            component: <CompletionSpaceVisualizer onComplete={() => setCanProceed(true)} />,
            nextLabel: "The Two Levers",
        },

        // =====================================================================
        // PAGE 4: Two Levers - Specification + Curation
        // =====================================================================
        {
            title: "Two Levers for Control",
            text: (
                <>
                    <p>
                        Lessons 1 and 2 taught the same skill from different angles:
                    </p>
                </>
            ),
            component: (
                <div>
                    <img
                        src={twoLevers}
                        alt="Two levers for control"
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "12px",
                            marginBottom: "12px"
                        }}
                    />

                    {/* Lever breakdown */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{
                            background: "rgba(139, 92, 246, 0.1)",
                            border: "1px solid rgba(139, 92, 246, 0.3)",
                            borderRadius: "10px",
                            padding: "12px"
                        }}>
                            <div style={{ fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>
                                🔒 Lever 1: Specification (L1)
                            </div>
                            <div style={{ fontSize: "11px", opacity: 0.9 }}>
                                Use CPCO to <strong>eliminate ambiguity</strong>. Each component
                                removes outputs that don't match your constraints.
                            </div>
                        </div>

                        <div style={{
                            background: "rgba(59, 130, 246, 0.1)",
                            border: "1px solid rgba(59, 130, 246, 0.3)",
                            borderRadius: "10px",
                            padding: "12px"
                        }}>
                            <div style={{ fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>
                                📚 Lever 2: Curation (L2)
                            </div>
                            <div style={{ fontSize: "11px", opacity: 0.9 }}>
                                Use context engineering to <strong>eliminate noise</strong>.
                                Only include what helps the model focus.
                            </div>
                        </div>
                    </div>
                </div>
            ),
            nextLabel: "Why It Matters",
        },

        // =====================================================================
        // PAGE 5: PM Relevance - Why This Matters to You
        // =====================================================================
        {
            title: "Why PMs Need This",
            text: null,
            component: (
                <div>
                    {/* Business context */}
                    <div style={{
                        background: "var(--color-bg-card)",
                        borderRadius: "12px",
                        padding: "14px",
                        marginBottom: "12px"
                    }}>
                        <div style={{ fontSize: "13px", fontWeight: 700, marginBottom: "10px" }}>
                            The Stakes Are High
                        </div>
                        <div style={{ fontSize: "12px", lineHeight: "1.6" }}>
                            When your AI feature fails, it's not because "AI is bad."
                            It's because the <strong>completion space was too large</strong>.
                        </div>
                    </div>

                    {/* Diagnosis framework */}
                    <div style={{
                        background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.1))",
                        borderRadius: "12px",
                        padding: "14px"
                    }}>
                        <div style={{ fontSize: "13px", fontWeight: 700, marginBottom: "10px" }}>
                            🔍 The Diagnostic Question
                        </div>
                        <p style={{ fontSize: "13px", fontStyle: "italic", margin: "0 0 12px 0" }}>
                            "What did I leave ambiguous or noisy?"
                        </p>
                        <div style={{ fontSize: "11px", lineHeight: "1.6" }}>
                            <strong>If output is generic:</strong> Missing specification (CPCO)<br />
                            <strong>If output is wrong:</strong> Missing or noisy context<br />
                            <strong>If output is inconsistent:</strong> Space is still too large
                        </div>
                    </div>
                </div>
            ),
            nextLabel: "Practice",
        },

        // =====================================================================
        // PAGE 6: Interactive - Diagnose the Failure
        // =====================================================================
        {
            title: "Diagnose the Failure",
            text: (
                <p>
                    Real AI failures from the field. For each case: <strong>What was
                        left ambiguous?</strong> Practice the diagnostic mindset.
                </p>
            ),
            component: <DiagnoseTheFailure onComplete={() => setCanProceed(true)} />,
            nextLabel: "Summary",
        },

        // =====================================================================
        // PAGE 7: Summary - The PM's Mental Model
        // =====================================================================
        {
            title: "Your New Mental Model",
            text: null,
            component: (
                <div>
                    {/* Core insight */}
                    <div style={{
                        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15))",
                        borderRadius: "12px",
                        padding: "16px",
                        textAlign: "center",
                        marginBottom: "12px"
                    }}>
                        <span style={{ fontSize: "32px" }}>🎯</span>
                        <div style={{ fontSize: "15px", fontWeight: 700, margin: "8px 0" }}>
                            Control the Completion Space
                        </div>
                        <div style={{ fontSize: "12px", opacity: 0.8 }}>
                            AI quality = inverse of completion space size
                        </div>
                    </div>

                    {/* Two levers recap */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
                        <div style={{
                            background: "var(--color-bg-card)",
                            borderRadius: "8px",
                            padding: "10px",
                            textAlign: "center"
                        }}>
                            <div style={{ fontSize: "20px", marginBottom: "4px" }}>📝</div>
                            <div style={{ fontSize: "11px", fontWeight: 600 }}>Specification</div>
                            <div style={{ fontSize: "10px", opacity: 0.7 }}>CPCO Framework</div>
                        </div>
                        <div style={{
                            background: "var(--color-bg-card)",
                            borderRadius: "8px",
                            padding: "10px",
                            textAlign: "center"
                        }}>
                            <div style={{ fontSize: "20px", marginBottom: "4px" }}>📚</div>
                            <div style={{ fontSize: "11px", fontWeight: 600 }}>Curation</div>
                            <div style={{ fontSize: "10px", opacity: 0.7 }}>Context Engineering</div>
                        </div>
                    </div>

                    {/* Cheat sheet */}
                    <div style={{
                        background: "rgba(16, 185, 129, 0.1)",
                        borderRadius: "10px",
                        padding: "12px"
                    }}>
                        <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "8px" }}>
                            💡 When AI Fails, Ask:
                        </div>
                        <div style={{ fontSize: "11px", lineHeight: "1.7" }}>
                            1. <strong>Did I specify enough?</strong> (CPCO)<br />
                            2. <strong>Did I curate well?</strong> (Context)<br />
                            3. <strong>What's still plausible that I don't want?</strong>
                        </div>
                    </div>

                    {/* Final wisdom */}
                    <p style={{
                        fontSize: "11px",
                        textAlign: "center",
                        margin: "14px 0 0 0",
                        opacity: 0.8,
                        fontStyle: "italic"
                    }}>
                        You don't make AI smarter. You make the task more constrained.
                    </p>
                </div>
            ),
            nextLabel: "Complete Module ✅",
        },
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
                nextLabel={currentPage === pages.length - 1 ? "Complete Module" : currentContent.nextLabel}
            >
                {currentContent.text && (
                    <div style={{ marginBottom: 20 }}>
                        {currentContent.text}
                    </div>
                )}

                {currentContent.component && (
                    <div>
                        {currentContent.component}
                    </div>
                )}
            </InteractiveCard>
        </Layout>
    );
};

export default CreatingBigIdea;
