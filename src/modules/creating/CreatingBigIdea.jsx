import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import InteractiveCard from '../../components/InteractiveCard/InteractiveCard';

// Interactives
import CompletionSpaceTriadDrill from '../../components/Interactives/CompletionSpaceTriadDrill';
import SpecContextAgentSimulation from '../../components/Interactives/SpecContextAgentSimulation';

// Cover Image
import completionSpaceCover from '../../assets/creating/completion_space_cover.png';

/*
 * ============================================================================
 * BIG IDEA MODULE: CONTROL THE COMPLETION SPACE
 * ============================================================================
 * 
 * HOOK: If AI keeps "guessing," how do you make it reliably useful?
 * 
 * MEANING: Across prompting, context engineering, and agents, you're doing 
 *          the same job: SHRINKING THE MODEL'S COMPLETION SPACE so it has 
 *          fewer plausible ways to be wrong.
 *          
 *          You don't "make AI smarter." You make the task more specified, 
 *          grounded, and checkable.
 * 
 * FLOW: Recap → Insight → Explain → Relevance → Practice → Final
 * ============================================================================
 */

const CreatingBigIdea = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [canProceed, setCanProceed] = useState(true);

    const pages = [
        // =====================================================================
        // PAGE 0: Cover / Hook
        // =====================================================================
        {
            title: "The Big Idea: Control the Completion Space",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src={completionSpaceCover}
                        alt="Control the Completion Space"
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "16px",
                            marginBottom: "20px",
                        }}
                    />

                    <p style={{ marginBottom: 12 }}>
                        <strong>One insight</strong> ties everything together:
                    </p>
                    <p style={{ marginBottom: 12, fontSize: "18px", fontWeight: 700 }}>
                        Control the completion space.
                    </p>
                    <p style={{ opacity: 0.8 }}>
                        Prompts, context packs, agent briefs—same goal, different scales.
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Start",
        },

        // =====================================================================
        // PAGE 1: Recap — 3 Skills, 1 Goal
        // =====================================================================
        {
            title: "Recap: Three Skills, One Goal",
            text: (
                <>
                    <p>You've learned three skills. They all do the same thing:</p>
                </>
            ),
            component: (
                /*
                 * IMAGE PLACEHOLDER: 3 Skills Map
                 * 
                 * NANO BANANA PRO — IMAGE PROMPT
                 * STYLE: Minimal flat vector
                 * 
                 * CONTENT:
                 * Title: "3 Skills → 1 Goal"
                 * Three blocks: Prompt / Context / Agents
                 * All arrows point to a center label: "Control completion space"
                 * Footer: "Reliability comes from constraints + checks"
                 */
                <div style={{
                    background: "var(--color-bg-card)",
                    borderRadius: "12px",
                    padding: "16px"
                }}>
                    <div style={{ textAlign: "center", marginBottom: "16px" }}>
                        <div style={{ fontSize: "14px", fontWeight: 700 }}>3 Skills → 1 Goal</div>
                    </div>

                    <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "12px" }}>
                        {[
                            { icon: "📝", label: "Prompt", color: "#3b82f6" },
                            { icon: "📚", label: "Context", color: "#06b6d4" },
                            { icon: "🤖", label: "Agent", color: "#8b5cf6" },
                        ].map((skill, i) => (
                            <div key={i} style={{
                                background: `${skill.color}20`,
                                border: `1px solid ${skill.color}50`,
                                borderRadius: "10px",
                                padding: "12px",
                                textAlign: "center",
                                flex: 1
                            }}>
                                <div style={{ fontSize: "24px", marginBottom: "4px" }}>{skill.icon}</div>
                                <div style={{ fontSize: "11px", fontWeight: 600 }}>{skill.label}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: "center", fontSize: "20px", marginBottom: "12px" }}>↓</div>

                    <div style={{
                        background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(239, 68, 68, 0.15))",
                        borderRadius: "12px",
                        padding: "16px",
                        textAlign: "center",
                        border: "2px solid rgba(245, 158, 11, 0.3)"
                    }}>
                        <div style={{ fontSize: "14px", fontWeight: 700 }}>🎯 Control the Completion Space</div>
                        <div style={{ fontSize: "11px", opacity: 0.8, marginTop: "4px" }}>
                            Fewer plausible outputs = fewer wrong ones
                        </div>
                    </div>
                </div>
            ),
            nextLabel: "See the insight",
        },

        // =====================================================================
        // PAGE 2: The Insight — Completion Space Shrinks with Constraints
        // =====================================================================
        {
            title: "The Insight: Shrink the Guessing Space",
            text: (
                <>
                    <p>
                        Every time you add constraints, grounding, or checks,
                        you're <strong>shrinking</strong> the number of plausible outputs.
                    </p>
                </>
            ),
            component: (
                /*
                 * IMAGE PLACEHOLDER: Completion Space Funnel
                 * 
                 * NANO BANANA PRO — IMAGE PROMPT
                 * STYLE: Minimal flat vector
                 * 
                 * CONTENT:
                 * Title: "Control the Completion Space"
                 * A funnel showing:
                 * Top: "Vague" with many output dots
                 * Middle: "Constraints" fewer dots
                 * Bottom: "Checks" 1–2 good dots
                 * Footer: "Constraints narrow; checks catch"
                 */
                <div style={{
                    background: "var(--color-bg-card)",
                    borderRadius: "12px",
                    padding: "20px"
                }}>
                    {/* Funnel visualization */}
                    <div style={{ textAlign: "center" }}>
                        {/* Top: Vague */}
                        <div style={{
                            background: "rgba(239, 68, 68, 0.1)",
                            borderRadius: "10px 10px 0 0",
                            padding: "12px",
                            borderBottom: "none"
                        }}>
                            <div style={{ fontSize: "12px", fontWeight: 600, color: "#ef4444", marginBottom: "6px" }}>
                                ❌ Vague Input
                            </div>
                            <div style={{ display: "flex", gap: "4px", justifyContent: "center", flexWrap: "wrap" }}>
                                {Array(8).fill(null).map((_, i) => (
                                    <span key={i} style={{ fontSize: "14px" }}>•</span>
                                ))}
                            </div>
                            <div style={{ fontSize: "10px", opacity: 0.7 }}>Many plausible outputs</div>
                        </div>

                        {/* Middle: Constraints */}
                        <div style={{
                            background: "rgba(245, 158, 11, 0.1)",
                            padding: "12px",
                            marginTop: "2px"
                        }}>
                            <div style={{ fontSize: "12px", fontWeight: 600, color: "#f59e0b", marginBottom: "6px" }}>
                                🔒 + Constraints
                            </div>
                            <div style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
                                {Array(4).fill(null).map((_, i) => (
                                    <span key={i} style={{ fontSize: "14px" }}>•</span>
                                ))}
                            </div>
                            <div style={{ fontSize: "10px", opacity: 0.7 }}>Fewer outputs</div>
                        </div>

                        {/* Bottom: Checks */}
                        <div style={{
                            background: "rgba(16, 185, 129, 0.1)",
                            borderRadius: "0 0 10px 10px",
                            padding: "12px",
                            marginTop: "2px"
                        }}>
                            <div style={{ fontSize: "12px", fontWeight: 600, color: "#10b981", marginBottom: "6px" }}>
                                ✅ + Checks
                            </div>
                            <div style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
                                <span style={{ fontSize: "14px" }}>•</span>
                                <span style={{ fontSize: "14px" }}>•</span>
                            </div>
                            <div style={{ fontSize: "10px", opacity: 0.7 }}>Good outputs only</div>
                        </div>
                    </div>

                    <p style={{ fontSize: "12px", textAlign: "center", margin: "14px 0 0 0", opacity: 0.8 }}>
                        💡 Constraints narrow. Checks catch.
                    </p>
                </div>
            ),
            nextLabel: "Learn the 3 levers",
        },

        // =====================================================================
        // PAGE 3: The Three Levers
        // =====================================================================
        {
            title: "The Three Levers",
            text: (
                <>
                    <p>Three tools, every time. Turn them up as stakes rise.</p>
                </>
            ),
            component: (
                /*
                 * IMAGE PLACEHOLDER: 3 Levers
                 * 
                 * NANO BANANA PRO — IMAGE PROMPT
                 * STYLE: Minimal flat vector
                 * 
                 * CONTENT:
                 * Title: "3 Levers"
                 * Three large toggle switches labeled: Constraints / Grounding / Checks
                 * Bottom text: "Turn these up as stakes rise"
                 */
                <div style={{
                    background: "var(--color-bg-card)",
                    borderRadius: "12px",
                    padding: "16px"
                }}>
                    {[
                        {
                            icon: "🔒",
                            lever: "Constraints",
                            desc: "What must/must-not happen",
                            examples: "• Format requirements\n• Accuracy rules\n• Scope limits"
                        },
                        {
                            icon: "📚",
                            lever: "Grounding",
                            desc: "What facts/sources to use",
                            examples: "• Reference documents\n• Data sources\n• Approved content"
                        },
                        {
                            icon: "✅",
                            lever: "Checks",
                            desc: "How to verify or flag uncertainty",
                            examples: "• List assumptions\n• Cite sources\n• Ask when unsure"
                        },
                    ].map((item, i) => (
                        <div key={i} style={{
                            background: "var(--color-bg-main)",
                            borderRadius: "10px",
                            padding: "14px",
                            marginBottom: i < 2 ? "10px" : 0
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                                <span style={{ fontSize: "24px" }}>{item.icon}</span>
                                <div>
                                    <div style={{ fontSize: "14px", fontWeight: 700 }}>{item.lever}</div>
                                    <div style={{ fontSize: "11px", opacity: 0.8 }}>{item.desc}</div>
                                </div>
                            </div>
                            <pre style={{
                                fontSize: "10px",
                                margin: 0,
                                opacity: 0.7,
                                whiteSpace: "pre-wrap",
                                paddingLeft: "34px"
                            }}>
                                {item.examples}
                            </pre>
                        </div>
                    ))}

                    <div style={{
                        marginTop: "14px",
                        padding: "10px",
                        background: "rgba(245, 158, 11, 0.1)",
                        borderRadius: "8px",
                        textAlign: "center",
                        fontSize: "12px"
                    }}>
                        ⬆️ Turn these up as stakes rise
                    </div>
                </div>
            ),
            nextLabel: "Practice the pattern",
        },

        // =====================================================================
        // PAGE 4: Interactive — Triad Drill
        // =====================================================================
        {
            title: "🎯 One Insight, Three Applications",
            text: (
                <>
                    <p>
                        Apply the same levers across prompts, context packs, and agent tasks.
                    </p>
                    <p style={{ opacity: 0.8, fontSize: "13px" }}>
                        Complete all three tabs to see how the pattern transfers.
                    </p>
                </>
            ),
            component: <CompletionSpaceTriadDrill onComplete={() => setCanProceed(true)} />,
            nextLabel: "Choose your approach",
        },

        // =====================================================================
        // PAGE 5: Scenario — Choose the Right Tooling Level
        // =====================================================================
        {
            title: "Scenario: Choose the Right Level",
            text: (
                <>
                    <p>
                        Not every task needs an agent. Match the tool to the stakes.
                    </p>
                    <p style={{ opacity: 0.8, fontSize: "13px" }}>
                        Which approach fits this scenario best?
                    </p>
                </>
            ),
            component: <SpecContextAgentSimulation onComplete={() => setCanProceed(true)} />,
            nextLabel: "Final takeaway",
        },

        // =====================================================================
        // PAGE 6: Final Recap
        // =====================================================================
        {
            title: "The Big Idea: You Control the Space",
            text: (
                <div style={{ textAlign: "center" }}>
                    <p style={{ marginBottom: 16 }}>
                        You don't make AI smarter. You make the task <strong>more specified,
                            grounded, and checkable</strong>.
                    </p>
                </div>
            ),
            component: (
                <div style={{
                    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(239, 68, 68, 0.15))",
                    borderRadius: "16px",
                    padding: "20px",
                    border: "2px solid rgba(245, 158, 11, 0.3)"
                }}>
                    <div style={{ textAlign: "center", marginBottom: "16px" }}>
                        <span style={{ fontSize: "40px" }}>🎯</span>
                        <div style={{ fontSize: "16px", fontWeight: 700, marginTop: "8px" }}>
                            Control the Completion Space
                        </div>
                    </div>

                    {/* Summary grid */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "8px",
                        marginBottom: "16px"
                    }}>
                        {[
                            { label: "📝 Prompts", lever: "= Single-turn specs" },
                            { label: "📚 Context", lever: "= Working memory" },
                            { label: "🤖 Agents", lever: "= Loop control" },
                            { label: "🔒 Levers", lever: "= Constraints + Checks" },
                        ].map((item, i) => (
                            <div key={i} style={{
                                background: "var(--color-bg-main)",
                                borderRadius: "8px",
                                padding: "10px",
                                fontSize: "11px"
                            }}>
                                <div style={{ fontWeight: 600 }}>{item.label}</div>
                                <div style={{ opacity: 0.7 }}>{item.lever}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        padding: "14px",
                        background: "rgba(16, 185, 129, 0.1)",
                        borderRadius: "10px",
                        textAlign: "center"
                    }}>
                        <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>
                            💡 Your Cheat Sheet
                        </div>
                        <div style={{ fontSize: "12px", lineHeight: "1.6" }}>
                            1. <strong>Constrain</strong> — limit what's possible<br />
                            2. <strong>Ground</strong> — add real sources<br />
                            3. <strong>Check</strong> — make uncertainty visible
                        </div>
                    </div>

                    <p style={{
                        fontSize: "11px",
                        opacity: 0.6,
                        textAlign: "center",
                        margin: "14px 0 0 0",
                        fontStyle: "italic"
                    }}>
                        Reliability comes from constraints + checks, not smarter AI.
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

export default CreatingBigIdea;
