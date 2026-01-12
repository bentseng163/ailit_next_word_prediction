import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import InteractiveCard from '../../components/InteractiveCard/InteractiveCard';

// Interactives
import ContextBudgetBuilder from '../../components/Interactives/ContextBudgetBuilder';
import ContextPackChoice from '../../components/Interactives/ContextPackChoice';

// Cover Image
import contextWindowCover from '../../assets/creating/context_window_cover.png';

/*
 * ============================================================================
 * LESSON 2: CONTEXT ENGINEERING 101
 * ============================================================================
 * 
 * HOOK: Why did the AI ignore your requirement… when you swear you told it?
 * 
 * MEANING: The model's "working memory" is the context window (the text you 
 *          provide in the conversation). If key constraints aren't in the 
 *          context RIGHT NOW, the model can't reliably use them—so it guesses.
 * 
 * FLOW: Theory anchor → Relevance bridge → Practical insights → Scenario practice → Recap
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
            title: "Context Engineering: Control the Model's Working Memory",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src={contextWindowCover}
                        alt="Context = Working Memory"
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "16px",
                            marginBottom: "20px",
                        }}
                    />

                    <p style={{ marginBottom: 12 }}>
                        <strong>Hot take:</strong> The AI didn't "forget" your requirement.
                        It never saw it. 👀
                    </p>
                    <p style={{ marginBottom: 12, opacity: 0.9 }}>
                        Why did the AI ignore your constraint… when you swear you told it?
                    </p>
                    <p style={{ opacity: 0.8 }}>
                        In 10 minutes, you'll learn to manage the model's "working memory"
                        so key constraints stay in play. 🎛️
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Start",
        },

        // =====================================================================
        // PAGE 1: The Short-Term Memory Reality
        // =====================================================================
        {
            title: "The Short-Term Memory Reality",
            text: (
                <>
                    <p>
                        The model does <strong>not</strong> "remember" like a human.
                        It uses what's in the <strong>current context</strong>—the text
                        visible in this conversation right now.
                    </p>
                    <p style={{ marginTop: 12, opacity: 0.9 }}>
                        If you mentioned a constraint 3 messages ago but it's no longer
                        in the window? <em>Gone.</em>
                    </p>
                </>
            ),
            component: (
                /*
                 * IMAGE PLACEHOLDER: Context Window = Working Memory
                 * 
                 * NANO BANANA PRO — IMAGE PROMPT
                 * STYLE: Minimal flat vector infographic. Mobile-first.
                 * 
                 * CONTENT:
                 * Title: "Context Window = Working Memory"
                 * Illustrate a head icon with a small "window" inside showing limited text area.
                 * Outside the window: faded text labeled "Not visible → not usable"
                 * Footer: "If it's not in the window, it's not in play."
                 */
                <div style={{
                    background: "var(--color-bg-card)",
                    borderRadius: "12px",
                    padding: "16px",
                    border: "1px solid var(--color-bg-card-highlight)"
                }}>
                    <div style={{ textAlign: "center", marginBottom: "14px" }}>
                        <div style={{
                            width: "80px",
                            height: "80px",
                            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))",
                            borderRadius: "50%",
                            margin: "0 auto",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative"
                        }}>
                            <span style={{ fontSize: "32px" }}>🧠</span>
                            <div style={{
                                position: "absolute",
                                bottom: "-4px",
                                right: "-4px",
                                background: "#3b82f6",
                                borderRadius: "4px",
                                padding: "2px 6px",
                                fontSize: "10px",
                                fontWeight: "bold",
                                color: "white"
                            }}>
                                📄 Context
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                        <div style={{
                            flex: 1,
                            background: "rgba(16, 185, 129, 0.1)",
                            borderRadius: "8px",
                            padding: "10px",
                            textAlign: "center"
                        }}>
                            <div style={{ fontSize: "18px", marginBottom: "4px" }}>✅</div>
                            <div style={{ fontSize: "11px" }}>In context = usable</div>
                        </div>
                        <div style={{
                            flex: 1,
                            background: "rgba(239, 68, 68, 0.1)",
                            borderRadius: "8px",
                            padding: "10px",
                            textAlign: "center"
                        }}>
                            <div style={{ fontSize: "18px", marginBottom: "4px" }}>🚫</div>
                            <div style={{ fontSize: "11px" }}>Out of context = gone</div>
                        </div>
                    </div>

                    <p style={{ fontSize: "12px", opacity: 0.7, textAlign: "center", margin: 0 }}>
                        If it's not in the window, it's improv time. 🎭
                    </p>
                </div>
            ),
            nextLabel: "Why this matters",
        },

        // =====================================================================
        // PAGE 2: Missing Constraints = Wider Completion Space
        // =====================================================================
        {
            title: "Missing Constraints = Wider Completion Space",
            text: (
                <>
                    <p>
                        When constraints are missing, the model has <strong>more plausible directions</strong> to go.
                    </p>
                    <p style={{ marginTop: 10, opacity: 0.9 }}>
                        That's where drift, rework, and "why did it do that?!" come from.
                    </p>
                </>
            ),
            component: (
                /*
                 * IMAGE PLACEHOLDER: Ambiguity Expands Outputs
                 * 
                 * NANO BANANA PRO — IMAGE PROMPT
                 * STYLE: Minimal flat vector
                 * 
                 * CONTENT:
                 * Title: "Ambiguity Expands Outputs"
                 * Show a funnel:
                 * Left: "Vague context" → splits into 5 branching arrows labeled "many plausible outputs"
                 * Right: "Constrained context" → 1–2 arrows labeled "fewer outputs"
                 * Footer: "Constraints shrink the search space"
                 */
                <div style={{
                    background: "var(--color-bg-card)",
                    borderRadius: "12px",
                    padding: "16px"
                }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, textAlign: "center", marginBottom: "14px" }}>
                        🎯 Constraints Shrink the Output Space
                    </div>

                    <div style={{ display: "flex", gap: "12px" }}>
                        <div style={{ flex: 1, textAlign: "center" }}>
                            <div style={{
                                background: "rgba(239, 68, 68, 0.1)",
                                borderRadius: "10px",
                                padding: "12px",
                                marginBottom: "8px"
                            }}>
                                <div style={{ fontSize: "11px", fontWeight: 600, color: "#ef4444", marginBottom: "6px" }}>
                                    ❌ Vague Context
                                </div>
                                <div style={{ fontSize: "24px" }}>📨</div>
                                <div style={{ fontSize: "20px", margin: "4px 0" }}>↓</div>
                                <div style={{ display: "flex", justifyContent: "center", gap: "2px", flexWrap: "wrap" }}>
                                    {["📄", "📝", "📋", "📃", "📑"].map((e, i) => (
                                        <span key={i} style={{ fontSize: "14px" }}>{e}</span>
                                    ))}
                                </div>
                            </div>
                            <div style={{ fontSize: "10px", opacity: 0.7 }}>Many plausible outputs</div>
                        </div>

                        <div style={{ flex: 1, textAlign: "center" }}>
                            <div style={{
                                background: "rgba(16, 185, 129, 0.1)",
                                borderRadius: "10px",
                                padding: "12px",
                                marginBottom: "8px"
                            }}>
                                <div style={{ fontSize: "11px", fontWeight: 600, color: "#10b981", marginBottom: "6px" }}>
                                    ✅ Constrained Context
                                </div>
                                <div style={{ fontSize: "24px" }}>📨+🔒</div>
                                <div style={{ fontSize: "20px", margin: "4px 0" }}>↓</div>
                                <div style={{ display: "flex", justifyContent: "center", gap: "2px" }}>
                                    <span style={{ fontSize: "14px" }}>📄</span>
                                </div>
                            </div>
                            <div style={{ fontSize: "10px", opacity: 0.7 }}>Fewer (better) outputs</div>
                        </div>
                    </div>

                    <p style={{ fontSize: "11px", opacity: 0.7, textAlign: "center", margin: "12px 0 0 0" }}>
                        💡 Tight context = less rework
                    </p>
                </div>
            ),
            nextLabel: "Practice budgeting",
        },

        // =====================================================================
        // PAGE 3: Interactive — Context Budget Builder
        // =====================================================================
        {
            title: "🎛️ Context Budget Builder",
            text: (
                <>
                    <p>
                        Context space is limited. How do you allocate it?
                    </p>
                    <p style={{ opacity: 0.8, fontSize: "13px" }}>
                        Adjust the sliders to prioritize different context types.
                        Watch how your choices affect output quality.
                    </p>
                </>
            ),
            component: <ContextBudgetBuilder onComplete={() => setCanProceed(true)} />,
            nextLabel: "Learn the template",
        },

        // =====================================================================
        // PAGE 4: The Practical Move — Constraints-First Headers
        // =====================================================================
        {
            title: "The Practical Move: Constraints First",
            text: (
                <>
                    <p>
                        Use a simple structure that front-loads the important stuff:
                    </p>
                </>
            ),
            component: (
                /*
                 * IMAGE PLACEHOLDER: Context Pack Template
                 * 
                 * NANO BANANA PRO — IMAGE PROMPT
                 * STYLE: Minimal flat vector
                 * 
                 * CONTENT:
                 * Title: "Context Pack (Constraints First)"
                 * A document with bold headers:
                 * GOAL / MUST-HAVE / MUST-NOT / SOURCES / OUTPUT / CHECKS
                 * Footer: "Put constraints before prose"
                 */
                <div style={{
                    background: "var(--color-bg-card)",
                    borderRadius: "12px",
                    padding: "16px",
                    border: "1px solid rgba(6, 182, 212, 0.3)"
                }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, textAlign: "center", marginBottom: "14px" }}>
                        📋 Context Pack Template
                    </div>

                    <div style={{
                        background: "var(--color-bg-main)",
                        borderRadius: "10px",
                        padding: "14px",
                        fontFamily: "monospace",
                        fontSize: "12px",
                        lineHeight: "2"
                    }}>
                        <div><span style={{ color: "#3b82f6", fontWeight: 700 }}>GOAL:</span> [outcome + audience]</div>
                        <div><span style={{ color: "#10b981", fontWeight: 700 }}>MUST-HAVE:</span> [required elements]</div>
                        <div><span style={{ color: "#ef4444", fontWeight: 700 }}>MUST-NOT:</span> [prohibited elements]</div>
                        <div><span style={{ color: "#8b5cf6", fontWeight: 700 }}>SOURCES:</span> [reference material]</div>
                        <div><span style={{ color: "#06b6d4", fontWeight: 700 }}>OUTPUT:</span> [format spec]</div>
                        <div><span style={{ color: "#f59e0b", fontWeight: 700 }}>CHECKS:</span> [verification rules]</div>
                    </div>

                    <div style={{
                        marginTop: "14px",
                        padding: "10px",
                        background: "rgba(16, 185, 129, 0.1)",
                        borderRadius: "8px",
                        fontSize: "12px",
                        textAlign: "center"
                    }}>
                        💡 <strong>Pro tip:</strong> Put constraints before prose.
                        The model pays more attention to what comes first.
                    </div>
                </div>
            ),
            nextLabel: "Scenario practice",
        },

        // =====================================================================
        // PAGE 5: Scenario Practice — Choose What to Include
        // =====================================================================
        {
            title: "Scenario: Context Pack Under Pressure",
            text: (
                <>
                    <p>
                        You have limited context budget. What do you include?
                    </p>
                    <p style={{ opacity: 0.8, fontSize: "13px" }}>
                        Choose wisely—every item costs tokens. Miss the essentials
                        and the model will fill the gaps with guesses.
                    </p>
                </>
            ),
            component: <ContextPackChoice onComplete={() => setCanProceed(true)} />,
            nextLabel: "Final recap",
        },

        // =====================================================================
        // PAGE 6: Recap — You're Managing Attention
        // =====================================================================
        {
            title: "Recap: You're Managing Attention",
            text: (
                <div style={{ textAlign: "center" }}>
                    <p style={{ marginBottom: 16 }}>
                        Context engineering is basically: <strong>deciding what the model
                            is allowed to pay attention to.</strong>
                    </p>
                </div>
            ),
            component: (
                /*
                 * IMAGE PLACEHOLDER: Context = Attention Control
                 * 
                 * NANO BANANA PRO — IMAGE PROMPT
                 * STYLE: Minimal flat vector
                 * 
                 * CONTENT:
                 * Title: "Context = Attention Control"
                 * A spotlight shining on a few text blocks labeled "Goal / Constraints / Sources"
                 * Other blocks outside spotlight are faded.
                 * Footer: "If it's not spotlighted, it's improv time."
                 */
                <div style={{
                    background: "linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(59, 130, 246, 0.15))",
                    borderRadius: "16px",
                    padding: "20px",
                    border: "2px solid rgba(6, 182, 212, 0.3)"
                }}>
                    <div style={{ textAlign: "center", marginBottom: "16px" }}>
                        <span style={{ fontSize: "40px" }}>🔦</span>
                        <div style={{ fontSize: "14px", fontWeight: 700, marginTop: "8px" }}>
                            Context = Attention Control
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "16px" }}>
                        {["🎯 Goal", "🔒 Constraints", "📚 Sources"].map((item, i) => (
                            <div key={i} style={{
                                background: "rgba(16, 185, 129, 0.2)",
                                borderRadius: "8px",
                                padding: "8px 12px",
                                fontSize: "11px",
                                fontWeight: 600,
                                border: "1px solid rgba(16, 185, 129, 0.4)"
                            }}>
                                {item}
                            </div>
                        ))}
                    </div>

                    <div style={{
                        display: "flex",
                        gap: "8px",
                        justifyContent: "center",
                        opacity: 0.4,
                        marginBottom: "16px"
                    }}>
                        {["Background", "History", "Details"].map((item, i) => (
                            <div key={i} style={{
                                background: "var(--color-bg-card)",
                                borderRadius: "8px",
                                padding: "6px 10px",
                                fontSize: "10px"
                            }}>
                                {item}
                            </div>
                        ))}
                    </div>

                    <div style={{
                        padding: "12px",
                        background: "rgba(16, 185, 129, 0.1)",
                        borderRadius: "10px",
                        textAlign: "center"
                    }}>
                        <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                            🎯 Key Insight
                        </div>
                        <div style={{ fontSize: "12px", opacity: 0.9 }}>
                            What you include in context determines what the model can use.<br />
                            Everything else is improv. 🎭
                        </div>
                    </div>

                    <p style={{
                        fontSize: "11px",
                        opacity: 0.6,
                        textAlign: "center",
                        margin: "12px 0 0 0",
                        fontStyle: "italic"
                    }}>
                        Minimum viable context: Goal + Constraints + Sources + Format
                    </p>
                </div>
            ),
            nextLabel: "Complete Lesson ✅",
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

export default CreatingLesson2;
