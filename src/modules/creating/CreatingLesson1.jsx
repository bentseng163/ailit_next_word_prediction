import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import InteractiveCard from '../../components/InteractiveCard/InteractiveCard';

// Interactives
import PromptDoctor from '../../components/Interactives/PromptDoctor';
import PromptPickScenario from '../../components/Interactives/PromptPickScenario';

// Cover Image
import promptSpecCover from '../../assets/creating/prompt_spec_cover.png';

/*
 * ============================================================================
 * LESSON 1: PROMPT ENGINEERING — WRITE SPECS, NOT WISHES
 * ============================================================================
 * 
 * HOOK: Why does the AI sometimes deliver gold… and sometimes deliver a 
 *       beautifully formatted wrong answer?
 * 
 * MEANING: In single-turn use, an AI model behaves like a pattern-completion 
 *          machine: it generates what's most plausible given your prompt.
 *          So your prompt isn't a "question"—it's a SPEC.
 *          Clear specs improve quality, reduce risk, and save time.
 * 
 * FLOW: Theory anchor → Relevance bridge → Practical insights → Scenario practice → Recap
 * ============================================================================
 */

const CreatingLesson1 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [canProceed, setCanProceed] = useState(true);

    const pages = [
        // =====================================================================
        // PAGE 0: Cover / Hook
        // =====================================================================
        {
            title: "Prompt Engineering: Write Specs, Not Wishes",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src={promptSpecCover}
                        alt="Prompt = Spec"
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "16px",
                            marginBottom: "20px",
                        }}
                    />

                    <p style={{ marginBottom: 12 }}>
                        <strong>Hot take:</strong> Your prompts aren't "questions."
                        They're <strong>specifications</strong>.
                    </p>
                    <p style={{ marginBottom: 12, opacity: 0.9 }}>
                        Why does the AI sometimes deliver gold… and sometimes deliver
                        a <em>beautifully formatted wrong answer</em>?
                    </p>
                    <p style={{ opacity: 0.8 }}>
                        In 10 minutes, you'll learn to write prompts that behave
                        like specs—not wishes. 🎯
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Start",
        },

        // =====================================================================
        // PAGE 1: The "Wish vs Spec" Problem
        // =====================================================================
        {
            title: "The Wish vs Spec Problem",
            text: (
                <>
                    <p>Most people prompt like this:</p>
                    <div style={{
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        borderRadius: "10px",
                        padding: "12px",
                        margin: "12px 0",
                        fontStyle: "italic"
                    }}>
                        "Make this better."
                    </div>

                    <p>The model hears:</p>
                    <div style={{
                        background: "rgba(245, 158, 11, 0.1)",
                        border: "1px solid rgba(245, 158, 11, 0.3)",
                        borderRadius: "10px",
                        padding: "12px",
                        margin: "12px 0"
                    }}>
                        "Better… according to what pattern? 🤔"
                    </div>

                    <p style={{ marginTop: 12 }}>
                        So it guesses. <strong>Confidently. Politely. Sometimes incorrectly.</strong> 😅
                    </p>
                </>
            ),
            component: (
                /*
                 * IMAGE PLACEHOLDER: Wish vs Spec Visual
                 * 
                 * NANO BANANA PRO — IMAGE PROMPT
                 * STYLE: Minimal flat vector infographic for mobile learning. 
                 * Warm beige background (#F5F1E6) as a rounded card with generous padding.
                 * Thick black outlines (3–4px). Solid color fills only. 
                 * No gradients, no shadows, no textures. Clean sans-serif typography.
                 * 
                 * CONTENT:
                 * Title: "Wish vs Spec"
                 * Two side-by-side speech bubbles:
                 * Left (orange): "Make this better."
                 * Right (green): "Rewrite for: executive tone, 120 words, include 3 bullets, keep facts, add 1 risk."
                 * Under left: label "Ambiguous → AI guesses"
                 * Under right: label "Constrained → AI delivers"
                 * Small playful sticker: "No mind-reading feature"
                 */
                <div style={{
                    width: "100%",
                    padding: "20px",
                    background: "linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(16, 185, 129, 0.1))",
                    borderRadius: "12px",
                    border: "1px dashed rgba(139, 92, 246, 0.3)",
                    textAlign: "center"
                }}>
                    <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "12px" }}>
                        <div style={{
                            flex: 1,
                            background: "rgba(249, 115, 22, 0.2)",
                            borderRadius: "10px",
                            padding: "10px",
                            fontSize: "12px"
                        }}>
                            <div style={{ fontSize: "20px", marginBottom: "6px" }}>🙏</div>
                            <strong>Wish</strong><br />
                            "Make it better"
                        </div>
                        <div style={{
                            flex: 1,
                            background: "rgba(16, 185, 129, 0.2)",
                            borderRadius: "10px",
                            padding: "10px",
                            fontSize: "12px"
                        }}>
                            <div style={{ fontSize: "20px", marginBottom: "6px" }}>📋</div>
                            <strong>Spec</strong><br />
                            "120 words, 3 bullets, exec tone"
                        </div>
                    </div>
                    <p style={{ fontSize: "11px", opacity: 0.7, margin: 0 }}>
                        🤖 "Mind-reading feature not included"
                    </p>
                </div>
            ),
            nextLabel: "Learn the structure",
        },

        // =====================================================================
        // PAGE 2: The Core Theory — Prompt = Spec Sheet
        // =====================================================================
        {
            title: "The Core Theory: Prompt = Spec Sheet",
            text: (
                <>
                    <p>A single-turn prompt works like a spec with four parts:</p>
                </>
            ),
            component: (
                /*
                 * IMAGE PLACEHOLDER: Prompt Spec Template
                 * 
                 * NANO BANANA PRO — IMAGE PROMPT
                 * STYLE: Same as above — minimal flat vector, mobile-first
                 * 
                 * CONTENT:
                 * Title: "Prompt = Spec"
                 * A simple 4-row template card:
                 * 1) Goal (target icon)
                 * 2) Constraints (lock icon)
                 * 3) Format (doc icon)
                 * 4) Checks (checklist icon)
                 * Footer: "Less ambiguity = fewer wrong-but-pretty outputs"
                 */
                <div style={{
                    background: "var(--color-bg-card)",
                    borderRadius: "12px",
                    padding: "16px",
                    border: "1px solid var(--color-bg-card-highlight)"
                }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "12px", textAlign: "center" }}>
                        📋 The Prompt Spec Template
                    </div>

                    {[
                        { icon: "🎯", label: "Goal", desc: "What outcome do you need?" },
                        { icon: "🔒", label: "Constraints", desc: "What must/must-not happen?" },
                        { icon: "📄", label: "Format", desc: "Length, structure, style?" },
                        { icon: "✓", label: "Checks", desc: "How to verify or flag uncertainty?" }
                    ].map((item, i) => (
                        <div key={i} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "10px",
                            background: "var(--color-bg-main)",
                            borderRadius: "8px",
                            marginBottom: i < 3 ? "8px" : 0
                        }}>
                            <span style={{ fontSize: "20px" }}>{item.icon}</span>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: "13px" }}>{item.label}</div>
                                <div style={{ fontSize: "11px", opacity: 0.7 }}>{item.desc}</div>
                            </div>
                        </div>
                    ))}

                    <p style={{ fontSize: "11px", opacity: 0.7, textAlign: "center", margin: "12px 0 0 0" }}>
                        If you don't provide these, the model fills the gaps with "most likely."
                    </p>
                </div>
            ),
            nextLabel: "Practice building specs",
        },

        // =====================================================================
        // PAGE 3: Interactive — Prompt Doctor
        // =====================================================================
        {
            title: "🩺 Prompt Doctor: Fix a Weak Prompt",
            text: (
                <>
                    <p>
                        Time to operate! Take this vague prompt and organize it into a proper spec.
                    </p>
                    <p style={{ opacity: 0.8, fontSize: "13px" }}>
                        Tap a chip, then place it in the right bin. See how your spec scores.
                    </p>
                </>
            ),
            component: <PromptDoctor onComplete={() => setCanProceed(true)} />,
            nextLabel: "Learn about Checks",
        },

        // =====================================================================
        // PAGE 4: The "Checks" Part Most People Forget
        // =====================================================================
        {
            title: "The Part Most People Forget: Checks",
            text: (
                <>
                    <p>
                        Even great specs can produce plausible errors.
                        So add <strong>"Checks"</strong>—your seatbelt for AI outputs.
                    </p>
                </>
            ),
            component: (
                /*
                 * IMAGE PLACEHOLDER: Checks = Seatbelt
                 * 
                 * NANO BANANA PRO — IMAGE PROMPT
                 * STYLE: Same minimal flat vector
                 * 
                 * CONTENT:
                 * Title: "Checks = Seatbelt"
                 * Illustrate a seatbelt icon over a document icon.
                 * Three small checklist items:
                 * - "State assumptions"
                 * - "Ask clarifying questions"
                 * - "Use provided sources only"
                 * Footer: "Checks reduce confident guessing"
                 */
                <div style={{
                    background: "var(--color-bg-card)",
                    borderRadius: "12px",
                    padding: "16px",
                    border: "1px solid rgba(16, 185, 129, 0.3)"
                }}>
                    <div style={{ textAlign: "center", marginBottom: "14px" }}>
                        <span style={{ fontSize: "40px" }}>🦺</span>
                        <div style={{ fontSize: "14px", fontWeight: 700, marginTop: "8px" }}>
                            Checks = Your Safety Net
                        </div>
                    </div>

                    {[
                        { text: '"List any assumptions you made"', why: "Makes hidden inferences visible" },
                        { text: '"If info is missing, ask 2 questions first"', why: "Prevents confident guessing" },
                        { text: '"Cite sources from provided text only"', why: "Grounds output in facts" },
                        { text: '"Return \'unknown\' if unsure"', why: "Allows graceful uncertainty" }
                    ].map((check, i) => (
                        <div key={i} style={{
                            background: "rgba(16, 185, 129, 0.1)",
                            borderRadius: "8px",
                            padding: "10px",
                            marginBottom: i < 3 ? "8px" : 0
                        }}>
                            <div style={{ fontSize: "12px", fontWeight: 500 }}>{check.text}</div>
                            <div style={{ fontSize: "11px", opacity: 0.7, marginTop: "4px" }}>↳ {check.why}</div>
                        </div>
                    ))}

                    <p style={{ fontSize: "11px", opacity: 0.7, textAlign: "center", margin: "12px 0 0 0" }}>
                        💡 Checks don't make AI smarter—they make failures visible.
                    </p>
                </div>
            ),
            nextLabel: "Scenario practice",
        },

        // =====================================================================
        // PAGE 5: Scenario Practice — The 20-Minute Deliverable
        // =====================================================================
        {
            title: "Scenario: The 20-Minute Deliverable",
            text: (
                <>
                    <p>
                        Real-world test: You have 20 minutes to produce an accurate,
                        concise update for a stakeholder.
                    </p>
                    <p style={{ opacity: 0.8, fontSize: "13px" }}>
                        Which prompt do you choose? Each choice has tradeoffs.
                    </p>
                </>
            ),
            component: <PromptPickScenario onComplete={() => setCanProceed(true)} />,
            nextLabel: "Final recap",
        },

        // =====================================================================
        // PAGE 6: Recap Cheat Sheet
        // =====================================================================
        {
            title: "Recap: Your Copy-Paste Prompt Card",
            text: (
                <div style={{ textAlign: "center" }}>
                    <p style={{ marginBottom: 16 }}>
                        Bookmark this. Use it. <strong>Prompts that behave like specs are reliable.</strong>
                    </p>
                </div>
            ),
            component: (
                /*
                 * IMAGE PLACEHOLDER: Copy-Paste Prompt Card
                 * 
                 * NANO BANANA PRO — IMAGE PROMPT
                 * STYLE: Same minimal flat vector
                 * 
                 * CONTENT:
                 * Title: "Copy/Paste Prompt Card"
                 * Show a single card template:
                 * Goal:
                 * Constraints:
                 * Format:
                 * Checks:
                 * Footer: "Prompts that behave like specs are reliable"
                 * Small humor note: "'Make it better' is not a spec."
                 */
                <div style={{
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))",
                    borderRadius: "16px",
                    padding: "20px",
                    border: "2px solid rgba(59, 130, 246, 0.3)"
                }}>
                    <div style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        textAlign: "center",
                        marginBottom: "16px"
                    }}>
                        📋 The Prompt Spec Template
                    </div>

                    <div style={{
                        background: "var(--color-bg-main)",
                        borderRadius: "10px",
                        padding: "14px",
                        fontFamily: "monospace",
                        fontSize: "12px",
                        lineHeight: "1.8"
                    }}>
                        <div><span style={{ color: "#3b82f6" }}>Goal:</span> [What you need + who it's for]</div>
                        <div><span style={{ color: "#8b5cf6" }}>Constraints:</span> [Must-haves, must-nots]</div>
                        <div><span style={{ color: "#06b6d4" }}>Format:</span> [Length, structure, tone]</div>
                        <div><span style={{ color: "#10b981" }}>Checks:</span> [Verify, cite, flag uncertainty]</div>
                    </div>

                    <div style={{
                        marginTop: "16px",
                        padding: "12px",
                        background: "rgba(16, 185, 129, 0.1)",
                        borderRadius: "10px",
                        textAlign: "center"
                    }}>
                        <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                            🎯 Key Insight
                        </div>
                        <div style={{ fontSize: "12px", opacity: 0.9 }}>
                            Clear specs shrink the model's "guessing space."<br />
                            Fewer plausible outputs = fewer wrong ones.
                        </div>
                    </div>

                    <p style={{
                        fontSize: "11px",
                        opacity: 0.6,
                        textAlign: "center",
                        margin: "12px 0 0 0",
                        fontStyle: "italic"
                    }}>
                        Remember: "Make it better" is not a spec. 😉
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

export default CreatingLesson1;
