import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import InteractiveCard from '../../components/InteractiveCard/InteractiveCard';

// Interactives
import AgentBriefBuilder from '../../components/Interactives/AgentBriefBuilder';
import AgentStepThrough from '../../components/Interactives/AgentStepThrough';

// Cover Image
import agentLoopCover from '../../assets/creating/agent_loop_cover.png';

/*
 * ============================================================================
 * LESSON 3: CONTEXT ENGINEERING FOR AI AGENTS
 * ============================================================================
 * 
 * HOOK: Why do agents sometimes do 80% perfectly… then confidently click 
 *       the wrong thing 12 times?
 * 
 * MEANING: Agents run a plan → act → observe loop. They don't need 
 *          "more intelligence" as much as they need a better BRIEF:
 *          clear objectives, tool permissions, success checks, and stop rules.
 * 
 * FLOW: Theory anchor → Relevance bridge → Practical insights → Scenario practice → Recap
 * ============================================================================
 */

const CreatingLesson3 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [canProceed, setCanProceed] = useState(true);

    const pages = [
        // =====================================================================
        // PAGE 0: Cover / Hook
        // =====================================================================
        {
            title: "Agent Briefing: Delegate Work Without Chaos",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src={agentLoopCover}
                        alt="Agents = Loops Not Wizards"
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "16px",
                            marginBottom: "20px",
                        }}
                    />

                    <p style={{ marginBottom: 12 }}>
                        <strong>Hot take:</strong> Agents aren't failing because they're dumb.
                        They're failing because their <strong>brief</strong> was vague.
                    </p>
                    <p style={{ marginBottom: 12, opacity: 0.9 }}>
                        Why do agents sometimes do 80% perfectly… then confidently
                        click the wrong thing 12 times?
                    </p>
                    <p style={{ opacity: 0.8 }}>
                        In 10 minutes, you'll learn to delegate work to agents
                        without chaos. 📋
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Start",
        },

        // =====================================================================
        // PAGE 1: The Theory — Agents Are Loops, Not Wizards
        // =====================================================================
        {
            title: "Agents Are Loops, Not Wizards",
            text: (
                <>
                    <p>
                        An AI agent isn't magic. It's a <strong>loop</strong>:
                    </p>
                    <ol style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                        <li><strong>Plan</strong> - decide what to do next</li>
                        <li><strong>Act</strong> - use a tool (search, write, click)</li>
                        <li><strong>Observe</strong> - check what happened</li>
                        <li><strong>Repeat</strong> - until "done" (or forever 😅)</li>
                    </ol>
                </>
            ),
            component: (
                /*
                 * IMAGE PLACEHOLDER: Plan/Act Loop
                 * 
                 * NANO BANANA PRO — IMAGE PROMPT
                 * STYLE: Minimal flat vector
                 * 
                 * CONTENT:
                 * Title: "Agents = Plan → Act → Observe"
                 * Circular loop with 3 nodes: Plan / Act (tools) / Observe
                 * Center note: "Repeats until stop condition"
                 * Footer: "Vague goals = endless loops"
                 */
                <div style={{
                    background: "var(--color-bg-card)",
                    borderRadius: "12px",
                    padding: "16px",
                    textAlign: "center"
                }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>
                        🔄 The Agent Loop
                    </div>

                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "16px"
                    }}>
                        {[
                            { icon: "🧠", label: "Plan" },
                            { icon: "→", label: "" },
                            { icon: "🔧", label: "Act" },
                            { icon: "→", label: "" },
                            { icon: "👁️", label: "Observe" },
                            { icon: "↩️", label: "" },
                        ].map((item, i) => (
                            <div key={i} style={{ textAlign: "center" }}>
                                <div style={{ fontSize: item.label ? "24px" : "16px", opacity: item.label ? 1 : 0.5 }}>
                                    {item.icon}
                                </div>
                                {item.label && (
                                    <div style={{ fontSize: "10px", marginTop: "4px" }}>{item.label}</div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div style={{
                        background: "rgba(245, 158, 11, 0.1)",
                        borderRadius: "8px",
                        padding: "10px",
                        fontSize: "12px"
                    }}>
                        ⚠️ Without a stop condition, the loop runs forever
                    </div>
                </div>
            ),
            nextLabel: "Learn the task card",
        },

        // =====================================================================
        // PAGE 2: The Task Card (Minimum Viable Agent Brief)
        // =====================================================================
        {
            title: "The Task Card: Your Agent Brief",
            text: (
                <>
                    <p>
                        A good task card includes everything the agent needs to
                        succeed—and know when to stop.
                    </p>
                </>
            ),
            component: (
                /*
                 * IMAGE PLACEHOLDER: Task Card Template
                 * 
                 * NANO BANANA PRO — IMAGE PROMPT
                 * STYLE: Minimal flat vector
                 * 
                 * CONTENT:
                 * Title: "Task Card"
                 * A clean card with labeled fields:
                 * Objective / Inputs / Tools / Constraints / Success check / Stop rules / Escalation
                 * Footer: "If humans need clarity, agents do too."
                 */
                <div style={{
                    background: "var(--color-bg-card)",
                    borderRadius: "12px",
                    padding: "16px",
                    border: "1px solid rgba(168, 85, 247, 0.3)"
                }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, textAlign: "center", marginBottom: "14px" }}>
                        📋 The Task Card Template
                    </div>

                    {[
                        { icon: "🎯", field: "Objective", desc: "What should be accomplished?" },
                        { icon: "📥", field: "Inputs", desc: "What data/docs to work with?" },
                        { icon: "🔧", field: "Tools", desc: "What can the agent use?" },
                        { icon: "🔒", field: "Constraints", desc: "What must/must-not happen?" },
                        { icon: "✅", field: "Success Check", desc: "How do we know it's done?" },
                        { icon: "🛑", field: "Stop Rules", desc: "When to abort?" },
                        { icon: "🙋", field: "Escalation", desc: "When to ask a human?" },
                    ].map((item, i) => (
                        <div key={i} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "8px",
                            background: "var(--color-bg-main)",
                            borderRadius: "8px",
                            marginBottom: i < 6 ? "6px" : 0
                        }}>
                            <span style={{ fontSize: "16px" }}>{item.icon}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: "12px", fontWeight: 600 }}>{item.field}</div>
                                <div style={{ fontSize: "10px", opacity: 0.7 }}>{item.desc}</div>
                            </div>
                        </div>
                    ))}

                    <p style={{ fontSize: "11px", opacity: 0.7, textAlign: "center", margin: "12px 0 0 0" }}>
                        💡 If humans need clarity to do a job, agents do too.
                    </p>
                </div>
            ),
            nextLabel: "Build a task card",
        },

        // =====================================================================
        // PAGE 3: Interactive — Agent Brief Builder
        // =====================================================================
        {
            title: "🛠️ Build Your Task Card",
            text: (
                <>
                    <p>
                        Configure a task card for an AI agent. Set the objective,
                        permissions, and guardrails.
                    </p>
                    <p style={{ opacity: 0.8, fontSize: "13px" }}>
                        Watch the risk meter—broad permissions without constraints = trouble.
                    </p>
                </>
            ),
            component: <AgentBriefBuilder onComplete={() => setCanProceed(true)} />,
            nextLabel: "Practice catching drift",
        },

        // =====================================================================
        // PAGE 4: Interactive — Step-Through Simulation
        // =====================================================================
        {
            title: "🎮 Catch the Drift",
            text: (
                <>
                    <p>
                        Watch an agent execute a task. Your job: <strong>intervene
                            at critical moments</strong> before something goes wrong.
                    </p>
                    <p style={{ opacity: 0.8, fontSize: "13px" }}>
                        Continue safe steps, stop risky ones. Good luck!
                    </p>
                </>
            ),
            component: <AgentStepThrough onComplete={() => setCanProceed(true)} />,
            nextLabel: "Learn guardrail patterns",
        },

        // =====================================================================
        // PAGE 5: Practical Insight — Safe Delegation Patterns
        // =====================================================================
        {
            title: "Safe Delegation Patterns",
            text: (
                <>
                    <p>
                        Three patterns that make agent delegation scalable:
                    </p>
                </>
            ),
            component: (
                /*
                 * IMAGE PLACEHOLDER: Agent Guardrails
                 * 
                 * NANO BANANA PRO — IMAGE PROMPT
                 * STYLE: Minimal flat vector
                 * 
                 * CONTENT:
                 * Title: "Agent Guardrails"
                 * Three cards with icons: Planner/Executor/Critic, Confirmation step, Audit log
                 * Footer: "Guardrails > heroics"
                 */
                <div style={{
                    background: "var(--color-bg-card)",
                    borderRadius: "12px",
                    padding: "16px"
                }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, textAlign: "center", marginBottom: "14px" }}>
                        🛡️ Three Patterns That Scale
                    </div>

                    {[
                        {
                            icon: "👥",
                            title: "Role Split",
                            desc: "Planner → Executor → Critic",
                            detail: "Different agents check each other's work"
                        },
                        {
                            icon: "✋",
                            title: "Confirmations",
                            desc: "Ask before irreversible actions",
                            detail: "Send email? Delete file? Human confirms."
                        },
                        {
                            icon: "📝",
                            title: "Audit Logs",
                            desc: "Record decisions + sources",
                            detail: "Know what happened and why"
                        },
                    ].map((pattern, i) => (
                        <div key={i} style={{
                            background: "var(--color-bg-main)",
                            borderRadius: "10px",
                            padding: "14px",
                            marginBottom: i < 2 ? "10px" : 0
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                                <span style={{ fontSize: "20px" }}>{pattern.icon}</span>
                                <div>
                                    <div style={{ fontSize: "13px", fontWeight: 700 }}>{pattern.title}</div>
                                    <div style={{ fontSize: "11px", color: "var(--color-accent-primary)" }}>{pattern.desc}</div>
                                </div>
                            </div>
                            <div style={{ fontSize: "11px", opacity: 0.7, paddingLeft: "30px" }}>
                                {pattern.detail}
                            </div>
                        </div>
                    ))}

                    <p style={{
                        fontSize: "12px",
                        textAlign: "center",
                        margin: "14px 0 0 0",
                        opacity: 0.8
                    }}>
                        💡 Guardrails beat heroics. Set them up front.
                    </p>
                </div>
            ),
            nextLabel: "Final recap",
        },

        // =====================================================================
        // PAGE 6: Recap
        // =====================================================================
        {
            title: "Recap: Delegate with Clarity",
            text: (
                <div style={{ textAlign: "center" }}>
                    <p style={{ marginBottom: 16 }}>
                        Agents are powerful—but they need <strong>briefs, not wishes</strong>.
                    </p>
                </div>
            ),
            component: (
                <div style={{
                    background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15))",
                    borderRadius: "16px",
                    padding: "20px",
                    border: "2px solid rgba(168, 85, 247, 0.3)"
                }}>
                    <div style={{ textAlign: "center", marginBottom: "16px" }}>
                        <span style={{ fontSize: "40px" }}>📋</span>
                        <div style={{ fontSize: "14px", fontWeight: 700, marginTop: "8px" }}>
                            The Agent Checklist
                        </div>
                    </div>

                    <div style={{
                        background: "var(--color-bg-main)",
                        borderRadius: "10px",
                        padding: "14px",
                        marginBottom: "14px"
                    }}>
                        {[
                            "✅ Clear objective (1 sentence)",
                            "✅ Minimal tool permissions",
                            "✅ Explicit constraints",
                            "✅ Measurable success check",
                            "✅ Stop rules for failures",
                            "✅ Escalation path to human",
                        ].map((item, i) => (
                            <div key={i} style={{ fontSize: "12px", marginBottom: i < 5 ? "8px" : 0 }}>
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
                            Agents don't need more intelligence.<br />
                            They need better briefs.
                        </div>
                    </div>

                    <p style={{
                        fontSize: "11px",
                        opacity: 0.6,
                        textAlign: "center",
                        margin: "12px 0 0 0",
                        fontStyle: "italic"
                    }}>
                        "It did 80% perfectly then clicked wrong 12 times"<br />
                        = missing stop rule
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

export default CreatingLesson3;
