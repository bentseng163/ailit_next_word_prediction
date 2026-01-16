import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import InteractiveCard from '../../components/InteractiveCard/InteractiveCard';

// Interactives
import ContextWindowStepper from '../../components/Interactives/ContextWindowStepper';
import PromptSpecificitySlider from '../../components/Interactives/PromptSpecificitySlider';
import ContextOptimizer from '../../components/Interactives/ContextOptimizer';
import ContextScenarios from '../../components/Interactives/ContextScenarios';

// Images
import contextWindowCover from '../../assets/creating/context_window_cover.png';
import humanForgetting from '../../assets/creating/human_forgetting.png';
import contextLikeMemory from '../../assets/creating/context_like_memory.png';
import contextResources from '../../assets/creating/context_resources.png';
import contextRot from '../../assets/creating/context_rot.png';
import promptVsContextEng from '../../assets/creating/prompt_vs_context_eng.png';

/*
 * ============================================================================
 * LESSON 2: CONTEXT ENGINEERING
 * ============================================================================
 * 
 * HOOK: Context is finite, like human working memory
 * 
 * MEANING: More context ≠ better results. Learn to optimize what goes in.
 * 
 * FLOW: Hook → Analogy → Context Window → Evolution → Resources → Rot → 
 *       Tradeoff → Optimize → Comparison → Scenarios → Summary
 * ============================================================================
 */

const CreatingLesson2 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [canProceed, setCanProceed] = useState(true);

    const pages = [
        // =====================================================================
        // PAGE 0: Cover / Hook
        // =====================================================================
        {
            title: "Context Engineering",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src={contextWindowCover}
                        alt="Context Engineering"
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "16px",
                            marginBottom: "16px",
                        }}
                    />
                    <p>
                        Context is a <strong>critical but finite resource</strong> for LLMs to complete tasks.
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        In this lesson, we'll explore what context is and strategies for
                        effectively managing it. 🧠
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Start",
        },

        // =====================================================================
        // PAGE 1: Human Analogy
        // =====================================================================
        {
            title: "Even Smart People Forget",
            text: (
                <>
                    <p>
                        As brilliant as you are, you might occasionally forget to buy the
                        Christmas gift for your partner, do your laundry, or put dishes in the sink.
                    </p>
                    <p>
                        We know you're not lazy. You do care. Sometimes there's just
                        <strong> too much on your mind</strong> at once.
                    </p>
                </>
            ),
            component: (
                <img
                    src={humanForgetting}
                    alt="Human forgetting"
                    style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "12px"
                    }}
                />
            ),
            nextLabel: "Same for AI",
        },

        // =====================================================================
        // PAGE 2: Context = Working Memory
        // =====================================================================
        {
            title: "Context = Working Memory",
            text: (
                <>
                    <p>
                        That's also true for LLMs. The <strong>"context window"</strong> is like
                        the working memory of a human brain.
                    </p>
                    <p>
                        The model does a great job with what's <em>in</em> its context,
                        but even as windows grow larger, there are still limits on its attention.
                    </p>
                </>
            ),
            component: (
                <img
                    src={contextLikeMemory}
                    alt="Context window like working memory"
                    style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "12px"
                    }}
                />
            ),
            nextLabel: "See It Grow",
        },

        // =====================================================================
        // PAGE 3: Interactive - Context Window Evolution
        // =====================================================================
        {
            title: "Watch the Context Grow",
            text: (
                <p>
                    Let's see how a chatbot's context window evolves from a simple
                    system prompt to potential <strong>overflow</strong>.
                </p>
            ),
            component: <ContextWindowStepper onComplete={() => setCanProceed(true)} />,
            nextLabel: "What Goes In?",
        },

        // =====================================================================
        // PAGE 4: Common Resources
        // =====================================================================
        {
            title: "What Goes in Context?",
            text: (
                <p>
                    Different types of information compete for space in the context window.
                    Each serves a purpose—but all consume tokens.
                </p>
            ),
            component: (
                <div>
                    <img
                        src={contextResources}
                        alt="Context resources"
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "12px",
                            marginBottom: "12px"
                        }}
                    />
                    <div style={{
                        background: "var(--color-bg-card)",
                        borderRadius: "10px",
                        padding: "12px",
                        fontSize: "11px",
                        lineHeight: "1.6"
                    }}>
                        <strong>Common context resources:</strong>
                        <ul style={{ margin: "8px 0 0 0", paddingLeft: "16px" }}>
                            <li><strong>System Prompt:</strong> Instructions for behavior</li>
                            <li><strong>Documents:</strong> Reference material</li>
                            <li><strong>Images:</strong> Visual context (charts, photos)</li>
                            <li><strong>Message History:</strong> Past conversation</li>
                            <li><strong>Search Results:</strong> Retrieved information</li>
                        </ul>
                    </div>
                </div>
            ),
            nextLabel: "The Catch",
        },

        // =====================================================================
        // PAGE 5: Context Rot
        // =====================================================================
        {
            title: "Sometimes Less is More",
            text: (
                <>
                    <p>
                        Here's the counterintuitive truth: <strong>more context can hurt performance</strong>.
                    </p>
                    <p>
                        This is called <strong>"context rot"</strong>—as tokens increase,
                        the model's ability to accurately recall information decreases.
                    </p>
                </>
            ),
            component: (
                <div>
                    <img
                        src={contextRot}
                        alt="Context rot curve"
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
                        <span style={{ fontSize: "20px" }}>⚠️</span>
                        <div>
                            Context has <strong>diminishing returns</strong>.
                            Treat it as a finite resource to optimize, not maximize.
                        </div>
                    </div>
                </div>
            ),
            nextLabel: "Tradeoffs",
        },

        // =====================================================================
        // PAGE 6: Interactive - Prompt Specificity Slider
        // =====================================================================
        {
            title: "System Prompt Tradeoffs",
            text: (
                <>
                    <p>
                        The system prompt is crucial, but it always occupies a fixed chunk of your
                        context window.
                    </p>
                    <p>
                        While you <em>can</em> make it extremely detailed, that takes away space for
                        other info to come in. <strong>Finding the right balance is key.</strong>
                    </p>
                </>
            ),
            component: <PromptSpecificitySlider />,
            nextLabel: "Optimize Context",
        },

        // =====================================================================
        // PAGE 7: Interactive - Context Optimizer
        // =====================================================================
        {
            title: "Optimize the Context Window",
            text: (
                <p>
                    Now let's practice. Select the <strong>right resources</strong> for
                    this AI task. Aim for <strong>98%+ accuracy</strong> with minimal context.
                </p>
            ),
            component: <ContextOptimizer onComplete={() => setCanProceed(true)} />,
            nextLabel: "The Big Picture",
        },

        // =====================================================================
        // PAGE 8: Anatomy of Effective Context
        // =====================================================================
        {
            title: "The Art of Context Engineering",
            text: (
                <>
                    <p>
                        Given that LLMs have a <strong>finite attention budget</strong>,
                        good context engineering means finding the <em>smallest possible set</em> of
                        high-signal tokens that maximize your desired outcome.
                    </p>
                </>
            ),
            component: (
                <div style={{
                    background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))",
                    borderRadius: "12px",
                    padding: "16px",
                    textAlign: "center"
                }}>
                    <p style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600 }}>
                        🎯 The Goal
                    </p>
                    <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.6" }}>
                        <strong>Maximum signal.</strong><br />
                        <strong>Minimum tokens.</strong><br />
                        <strong>Optimal outcome.</strong>
                    </p>
                </div>
            ),
            nextLabel: "Prompt vs Context",
        },

        // =====================================================================
        // PAGE 9: Prompt vs Context Engineering
        // =====================================================================
        {
            title: "Prompt ⊂ Context Engineering",
            text: (
                <>
                    <p>
                        Remember the CPCO framework from Lesson 1? That's <strong>prompt engineering</strong>.
                    </p>
                    <p>
                        <strong>Context engineering</strong> is the bigger picture—it includes
                        everything that goes into the context window.
                    </p>
                </>
            ),
            component: (
                <img
                    src={promptVsContextEng}
                    alt="Prompt engineering is a subset of context engineering"
                    style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "12px"
                    }}
                />
            ),
            nextLabel: "Practice",
        },

        // =====================================================================
        // PAGE 10: Interactive - Context Scenarios
        // =====================================================================
        {
            title: "Context Selection Challenge",
            text: (
                <p>
                    For each scenario, select the <strong>optimal context resources</strong>.
                    Choose wisely—too little or too much will hurt accuracy.
                </p>
            ),
            component: <ContextScenarios onComplete={() => setCanProceed(true)} />,
            nextLabel: "Summary",
        },

        // =====================================================================
        // PAGE 11: Summary
        // =====================================================================
        {
            title: "Summary: Context Engineering",
            text: null,
            component: (
                <div>
                    {/* Key concepts */}
                    <div style={{
                        background: "var(--color-bg-card)",
                        borderRadius: "12px",
                        padding: "14px",
                        marginBottom: "12px"
                    }}>
                        {[
                            { icon: "🧠", text: "Context window = AI's working memory" },
                            { icon: "📉", text: "More tokens ≠ better results (context rot)" },
                            { icon: "⚖️", text: "Balance specificity vs. token usage" },
                            { icon: "🎯", text: "Goal: Maximum signal, minimum tokens" }
                        ].map((item, i) => (
                            <div key={i} style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "8px 0",
                                borderBottom: i < 3 ? "1px solid var(--color-bg-card-highlight)" : "none"
                            }}>
                                <span style={{ fontSize: "18px" }}>{item.icon}</span>
                                <span style={{ fontSize: "12px", fontWeight: 500 }}>{item.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Relationship reminder */}
                    <div style={{
                        background: "rgba(139, 92, 246, 0.1)",
                        borderRadius: "10px",
                        padding: "12px",
                        marginBottom: "12px",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}>
                        <span style={{ fontSize: "20px" }}>💡</span>
                        <div>
                            <strong>Remember:</strong> Prompt engineering is part of context engineering,
                            not the other way around.
                        </div>
                    </div>

                    {/* Takeaway */}
                    <div style={{
                        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))",
                        borderRadius: "10px",
                        padding: "12px",
                        textAlign: "center",
                        fontSize: "12px"
                    }}>
                        🍌 Context is finite. Be strategic about what you feed the model.
                    </div>
                </div>
            ),
            nextLabel: "Complete Lesson",
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
                nextLabel={currentPage === pages.length - 1 ? "Complete Lesson" : currentContent.nextLabel}
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

export default CreatingLesson2;
