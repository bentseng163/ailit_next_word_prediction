import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import InteractiveCard from '../../components/InteractiveCard/InteractiveCard';

// Interactives
import CPCODragDrop from '../../components/Interactives/CPCODragDrop';
import CPCOMissingPart from '../../components/Interactives/CPCOMissingPart';

// Cover Image
import promptSpecCover from '../../assets/creating/prompt_spec_cover.png';

// Page Images
import llmGenerateAnything from '../../assets/creating/llm_generate_anything.png';
import engineeringIsControl from '../../assets/creating/engineering_is_control.png';
import ambiguityGarbageOut from '../../assets/creating/ambiguity_garbage_out.png';
import cpcoFramework from '../../assets/creating/cpco_framework.png';
import contextGlobalVars from '../../assets/creating/context_global_vars.png';
import personaProcessing from '../../assets/creating/persona_processing.png';
import constraintsFilter from '../../assets/creating/constraints_filter.png';
import outputReturn from '../../assets/creating/output_return.png';
import templateVariables from '../../assets/creating/template_variables.png';

/*
 * ============================================================================
 * LESSON 1: PROMPT ENGINEERING — THE CPCO FRAMEWORK
 * ============================================================================
 * 
 * HOOK: "Speaking to AI" is engineering because you're defining specifications.
 * 
 * MEANING: Ambiguity causes generic outputs. The CPCO Framework 
 * (Context, Persona, Constraints, Output) fills the gaps systematically.
 * 
 * FLOW: Hook → Problem → CPCO intro → Practice → Deep dive each → Practice → Template → Recap
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
            title: "Prompt Engineering: The CPCO Framework",
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
                        In 10 minutes, you'll learn a framework to write prompts that
                        deliver <em>consistent, reliable results</em>. 🎯
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Start",
        },

        // =====================================================================
        // PAGE 1: LLMs Generate Anything
        // =====================================================================
        {
            title: "LLMs Can Generate Anything",
            text: (
                <>
                    <p>
                        An LLM can generate <strong>anything</strong>—Shakespearean sonnets,
                        Python scripts, or erroneous hallucinations.
                    </p>
                    <p>
                        It all depends on how you structure your prompt.
                    </p>
                </>
            ),
            component: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src={llmGenerateAnything}
                        alt="LLMs Generate Anything"
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "12px",
                            marginBottom: "12px"
                        }}
                    />
                    <div style={{
                        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))",
                        borderRadius: "10px",
                        padding: "12px",
                        fontSize: "13px"
                    }}>
                        In this lesson, we'll dive into <strong>prompt engineering</strong>.<br />
                        But wait—how can speaking to an LLM be called "engineering"? 🤔
                    </div>
                </div>
            ),
            nextLabel: "Why 'Engineering'?",
        },

        // =====================================================================
        // PAGE 2: Engineering = Control
        // =====================================================================
        {
            title: "Engineering = Control",
            text: (
                <>
                    <p>
                        While you can chat with an LLM casually, if you want <strong>reliable
                            output consistently</strong>, you need to set up constraints.
                    </p>
                </>
            ),
            component: (
                <div>
                    <img
                        src={engineeringIsControl}
                        alt="Engineering = Control"
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
                        padding: "14px",
                        fontSize: "13px",
                        lineHeight: "1.6"
                    }}>
                        <p style={{ margin: "0 0 10px 0" }}>
                            <strong>Prompt Engineering</strong> is the practice of applying
                            constraints, context, and logical structures to force the model
                            into a specific "solution space."
                        </p>
                        <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12px" }}>
                            <li><strong>Requirement Gathering:</strong> Define exactly what you want.</li>
                            <li><strong>System Design:</strong> Build a repeatable workflow, not a one-off chat.</li>
                        </ul>
                    </div>
                    <div style={{
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        borderRadius: "8px",
                        padding: "10px",
                        marginTop: "10px",
                        fontSize: "12px",
                        textAlign: "center",
                        fontWeight: 600
                    }}>
                        ⚠️ If you get a bad output, the model didn't fail. Your instructions failed.
                    </div>
                </div>
            ),
            nextLabel: "The Problem",
        },

        // =====================================================================
        // PAGE 3: Ambiguity In, Garbage Out
        // =====================================================================
        {
            title: "Ambiguity In, Garbage Out",
            text: (
                <>
                    <p>
                        In traditional coding, if you miss a semicolon, the code <strong>breaks</strong>.
                    </p>
                    <p>
                        In Prompt Engineering, if you're vague, the model doesn't break—it <strong>guesses</strong>.
                    </p>
                </>
            ),
            component: (
                <div>
                    <img
                        src={ambiguityGarbageOut}
                        alt="Ambiguity In, Garbage Out"
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
                        fontSize: "12px",
                        lineHeight: "1.5"
                    }}>
                        <strong>🪤 The "Average" Trap:</strong> LLMs are trained on the internet.
                        Generic questions get <em>generic answers</em>—safe, boring, corporate speak.
                    </div>
                </div>
            ),
            nextLabel: "The Solution",
        },

        // =====================================================================
        // PAGE 4: The CPCO Framework
        // =====================================================================
        {
            title: "The CPCO Framework",
            text: (
                <>
                    <p>
                        Good news: there's a way to formalize this into your practice.
                    </p>
                    <p>
                        A good prompt is a <strong>function</strong> with clearly defined variables.
                        We use the <strong>CPCO Framework</strong> to identify ambiguity and fill the gaps.
                    </p>
                </>
            ),
            component: (
                <img
                    src={cpcoFramework}
                    alt="CPCO Framework"
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
        // PAGE 5: Interactive - CPCO Drag Drop
        // =====================================================================
        {
            title: "Identify the Building Blocks",
            text: (
                <p>
                    Before we dive into each part, let's identify the building blocks of this
                    <strong> well-defined prompt</strong> for an AI customer service ticket categorizer.
                </p>
            ),
            component: <CPCODragDrop onComplete={() => setCanProceed(true)} />,
            nextLabel: "Deep Dive: Context",
        },

        // =====================================================================
        // PAGE 6: C = Context
        // =====================================================================
        {
            title: "C = Context",
            text: (
                <>
                    <p>
                        Context sets the <strong>"state"</strong> of the world.
                        Without it, the model has zero situational awareness.
                    </p>
                </>
            ),
            component: (
                <img
                    src={contextGlobalVars}
                    alt="Context = Global Variables"
                    style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "12px"
                    }}
                />
            ),
            nextLabel: "P = Persona",
        },

        // =====================================================================
        // PAGE 7: P = Persona
        // =====================================================================
        {
            title: "P = Persona",
            text: (
                <>
                    <p>
                        You tell the model <strong>"who" to be</strong> to activate specific
                        subsets of its training data.
                    </p>
                    <p>
                        Persona is an efficient way to fill ambiguity gaps since a role contains
                        a lot of decision-making criteria.
                    </p>
                </>
            ),
            component: (
                <img
                    src={personaProcessing}
                    alt="Persona = Processing Logic"
                    style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "12px"
                    }}
                />
            ),
            nextLabel: "C = Constraints",
        },

        // =====================================================================
        // PAGE 8: C = Constraints
        // =====================================================================
        {
            title: "C = Constraints",
            text: (
                <>
                    <p>
                        Sometimes constraints can be <strong>more important than capability</strong>,
                        especially when the task involves risks.
                    </p>
                    <p>They define boundaries for the output.</p>
                </>
            ),
            component: (
                <img
                    src={constraintsFilter}
                    alt="Constraints = Filter"
                    style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "12px"
                    }}
                />
            ),
            nextLabel: "O = Output",
        },

        // =====================================================================
        // PAGE 9: O = Output
        // =====================================================================
        {
            title: "O = Output",
            text: (
                <>
                    <p>
                        Don't let the model decide how to present data. <strong>Define the schema.</strong>
                    </p>
                </>
            ),
            component: (
                <img
                    src={outputReturn}
                    alt="Output = Return Statement"
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
        // PAGE 10: Interactive - Missing Part Identifier
        // =====================================================================
        {
            title: "Spot the Missing Part",
            text: (
                <p>
                    Now let's put the framework into practice. Each prompt below is
                    missing one CPCO component. <strong>Can you identify which one?</strong>
                </p>
            ),
            component: <CPCOMissingPart onComplete={() => setCanProceed(true)} />,
            nextLabel: "Pro Tip",
        },

        // =====================================================================
        // PAGE 11: Make Prompts Reusable
        // =====================================================================
        {
            title: "Make Your Prompts Reusable",
            text: (
                <>
                    <p>
                        Once you've built a good prompt, you can <strong>turn it into a template</strong>
                        by leaving blank spaces for the parts that change.
                    </p>
                </>
            ),
            component: (
                <div>
                    <img
                        src={templateVariables}
                        alt="Prompt Templates"
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
                        fontSize: "12px",
                        lineHeight: "1.6"
                    }}>
                        <div style={{ marginBottom: "8px" }}>
                            <strong>How to fill the blanks:</strong>
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <div style={{
                                flex: 1,
                                padding: "8px",
                                background: "rgba(59, 130, 246, 0.1)",
                                borderRadius: "6px",
                                textAlign: "center"
                            }}>
                                <div style={{ fontSize: "16px", marginBottom: "4px" }}>✍️</div>
                                <div style={{ fontSize: "11px" }}>Manually<br />(you type it)</div>
                            </div>
                            <div style={{
                                flex: 1,
                                padding: "8px",
                                background: "rgba(16, 185, 129, 0.1)",
                                borderRadius: "6px",
                                textAlign: "center"
                            }}>
                                <div style={{ fontSize: "16px", marginBottom: "4px" }}>⚙️</div>
                                <div style={{ fontSize: "11px" }}>With a script<br />(code fills it)</div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            nextLabel: "Summary",
        },

        // =====================================================================
        // PAGE 12: Summary
        // =====================================================================
        {
            title: "Summary: The CPCO Framework",
            text: null,
            component: (
                <div>
                    <div style={{
                        background: "var(--color-bg-card)",
                        borderRadius: "12px",
                        padding: "16px",
                        marginBottom: "12px"
                    }}>
                        {[
                            { letter: "C", name: "Context", key: "Who, what, why", color: "#3b82f6" },
                            { letter: "P", name: "Persona", key: "Act as...", color: "#8b5cf6" },
                            { letter: "C", name: "Constraints", key: "Do/don't", color: "#f59e0b" },
                            { letter: "O", name: "Output", key: "Format/schema", color: "#10b981" }
                        ].map((item, i) => (
                            <div key={i} style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "10px",
                                background: `${item.color}10`,
                                borderRadius: "8px",
                                marginBottom: i < 3 ? "6px" : 0
                            }}>
                                <div style={{
                                    width: "28px",
                                    height: "28px",
                                    background: item.color,
                                    borderRadius: "6px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontWeight: 800,
                                    fontSize: "14px"
                                }}>
                                    {item.letter}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontWeight: 600, fontSize: "13px" }}>{item.name}</span>
                                </div>
                                <div style={{ fontSize: "11px", opacity: 0.7 }}>{item.key}</div>
                            </div>
                        ))}
                    </div>

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
                            <strong>Flexible, not rigid:</strong> You don't always need to fill every part.
                            Use what fits your task.
                        </div>
                    </div>

                    <div style={{
                        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))",
                        borderRadius: "12px",
                        padding: "14px",
                        textAlign: "center"
                    }}>
                        <p style={{ margin: "0 0 6px 0", fontSize: "13px", fontWeight: 600 }}>
                            🎯 Key Takeaway
                        </p>
                        <p style={{ margin: 0, fontSize: "12px", opacity: 0.9 }}>
                            Ambiguity causes generic outputs.<br />
                            <strong>CPCO helps you fill the gaps.</strong>
                        </p>
                    </div>

                    <div style={{
                        background: "rgba(245, 158, 11, 0.1)",
                        borderRadius: "8px",
                        padding: "10px",
                        marginTop: "10px",
                        fontSize: "11px",
                        textAlign: "center"
                    }}>
                        🍌 Bad output? Your instructions failed—not the model.
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
                    <div style={{ marginTop: currentContent.text ? 0 : 0 }}>
                        {currentContent.component}
                    </div>
                )}
            </InteractiveCard>
        </Layout>
    );
};

export default CreatingLesson1;
