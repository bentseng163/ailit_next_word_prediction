import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import InteractiveCard from '../../components/InteractiveCard/InteractiveCard';

// Interactives
import TaskDecomposer from '../../components/Interactives/TaskDecomposer';
import ReliabilitySpeedKnob from '../../components/Interactives/ReliabilitySpeedKnob';

/*
 * ============================================================================
 * MANAGING AI - LESSON 2: DELEGATION DESIGN
 * ============================================================================
 * 
 * HOOK: If you say "handle this," the agent will handle *something*.
 * You want it to handle the right something.
 * 
 * MEANING: Agents perform best when tasks are bounded, testable, and well-scoped.
 * Vague tasks expand the failure space.
 * ============================================================================
 */

const ManagingLesson2 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [canProceed, setCanProceed] = useState(true);

    const pages = [
        // =====================================================================
        // PAGE 0: The Delegation Problem
        // =====================================================================
        {
            title: "The Delegation Problem",
            text: (
                <div>
                    <div style={{
                        background: 'rgba(245, 158, 11, 0.1)',
                        border: '1px dashed rgba(245, 158, 11, 0.4)',
                        borderRadius: '12px',
                        padding: '16px',
                        textAlign: 'center',
                        marginBottom: '16px'
                    }}>
                        <p style={{ margin: 0, fontSize: '14px', fontStyle: 'italic' }}>
                            "Monitor competitors and tell me what matters"
                        </p>
                    </div>

                    <p>
                        This is not a task.<br />
                        It's a <strong>lifestyle</strong>. 😅
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        marginTop: '16px'
                    }}>
                        <div style={{
                            flex: 1,
                            background: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '10px',
                            padding: '12px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', marginBottom: '6px' }}>
                                VAGUE
                            </div>
                            <p style={{ fontSize: '12px', margin: 0 }}>Monitor competitors</p>
                        </div>
                        <div style={{
                            flex: 1,
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '10px',
                            padding: '12px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', marginBottom: '6px' }}>
                                BOUNDED
                            </div>
                            <p style={{ fontSize: '11px', margin: 0, lineHeight: '1.4' }}>
                                Scan 5 sources weekly, summarize 3 changes, flag risks, cite links
                            </p>
                        </div>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Theory",
        },

        // =====================================================================
        // PAGE 1: Theory - Failure Space
        // =====================================================================
        {
            title: "Vague Tasks Expand Failure Space",
            text: (
                <div>
                    <p>More ambiguity → more plausible paths → more wrong outcomes.</p>
                    <p>Your goal is to <strong>shrink the space</strong>.</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '16px'
                    }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🌳</div>
                                <div style={{ fontSize: '11px', opacity: 0.7 }}>Vague task</div>
                                <div style={{ fontSize: '20px', marginTop: '4px' }}>❓❓❓❓</div>
                            </div>
                            <div style={{ fontSize: '24px', alignSelf: 'center' }}>→</div>
                            <div style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎯</div>
                                <div style={{ fontSize: '11px', opacity: 0.7 }}>Bounded task</div>
                                <div style={{ fontSize: '20px', marginTop: '4px' }}>✅</div>
                            </div>
                        </div>
                        <p style={{ margin: '12px 0 0', fontSize: '12px', textAlign: 'center', opacity: 0.8 }}>
                            "Constraints collapse the tree."
                        </p>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Task Spec",
        },

        // =====================================================================
        // PAGE 2: Agent-Friendly Task Spec
        // =====================================================================
        {
            title: "The Agent-Friendly Task Spec",
            text: (
                <div>
                    <p>A delegatable task includes:</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '12px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                { icon: '🎯', label: 'Objective', desc: '1 sentence' },
                                { icon: '📥', label: 'Inputs', desc: 'links/files' },
                                { icon: '🚧', label: 'Boundaries', desc: 'what\'s in/out' },
                                { icon: '📋', label: 'Steps', desc: 'optional order' },
                                { icon: '✅', label: 'Done when...', desc: 'acceptance tests' },
                                { icon: '🚨', label: 'Escalate when...', desc: 'edge cases' },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '8px',
                                    background: 'var(--color-bg-main)',
                                    borderRadius: '8px'
                                }}>
                                    <span style={{ fontSize: '16px' }}>{item.icon}</span>
                                    <span style={{ fontWeight: 600, fontSize: '13px' }}>{item.label}</span>
                                    <span style={{ fontSize: '11px', opacity: 0.7, marginLeft: 'auto' }}>{item.desc}</span>
                                </div>
                            ))}
                        </div>
                        <p style={{ margin: '12px 0 0', fontSize: '12px', textAlign: 'center', opacity: 0.8 }}>
                            "Make success measurable."
                        </p>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Practice",
        },

        // =====================================================================
        // PAGE 3: Interactive - Task Decomposer
        // =====================================================================
        {
            title: "Practice: Decompose a Vague Task",
            text: (
                <p>
                    Turn this vague goal into an agent-friendly task spec with
                    <strong> steps</strong>, <strong>acceptance criteria</strong>, and <strong>escalation rules</strong>.
                </p>
            ),
            component: <TaskDecomposer onComplete={() => setCanProceed(true)} />,
            nextLabel: "Acceptance Criteria",
        },

        // =====================================================================
        // PAGE 4: Acceptance Criteria
        // =====================================================================
        {
            title: "Acceptance Criteria: The Secret to Reliability",
            text: (
                <div>
                    <p>Examples of good "done when..." criteria:</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '12px'
                    }}>
                        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '2' }}>
                            <li>Includes 3 insights + 1 risk</li>
                            <li>All numbers traced to a source link</li>
                            <li>Output in a specific format (table, bullets)</li>
                            <li>Flags anomalies instead of explaining them away</li>
                        </ul>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
                        borderRadius: '10px',
                        padding: '12px',
                        marginTop: '12px',
                        textAlign: 'center',
                        fontSize: '13px'
                    }}>
                        💡 "If you can test it, you can trust it."
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Input Packs",
        },

        // =====================================================================
        // PAGE 5: Input Packs
        // =====================================================================
        {
            title: "Input Packs: Garbage In, Garbage Out",
            text: (
                <div>
                    <p>Agents need:</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '12px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '32px' }}>📁</span>
                            <span style={{ fontWeight: 600 }}>Input Pack</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {[
                                '🔗 The right docs/links',
                                '📅 The latest data range',
                                '📊 Definitions of metrics',
                                '📝 Examples of desired output'
                            ].map((item, i) => (
                                <div key={i} style={{
                                    padding: '8px 12px',
                                    background: 'var(--color-bg-main)',
                                    borderRadius: '6px',
                                    fontSize: '12px'
                                }}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <p style={{ marginTop: '12px', fontSize: '13px', textAlign: 'center', opacity: 0.8 }}>
                        "Better inputs reduce guessing."
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Speed vs Reliability",
        },

        // =====================================================================
        // PAGE 6: Interactive - Reliability Speed Knob
        // =====================================================================
        {
            title: "Reliability vs Speed: Find Your Balance",
            text: (
                <p>
                    Adjust the <strong>checks</strong> and <strong>scope</strong> sliders
                    to see how they affect speed, reliability, and risk.
                </p>
            ),
            component: <ReliabilitySpeedKnob onComplete={() => setCanProceed(true)} />,
            nextLabel: "Checklist",
        },

        // =====================================================================
        // PAGE 7: Delegation Checklist
        // =====================================================================
        {
            title: "Delegation Checklist",
            text: (
                <div>
                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px'
                    }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
                            ✅ Before Delegating to an Agent
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                { label: 'Objective', check: 'Is it 1 sentence?' },
                                { label: 'Boundaries', check: 'What\'s in/out of scope?' },
                                { label: 'Inputs', check: 'All docs/links provided?' },
                                { label: 'Output format', check: 'How should it look?' },
                                { label: 'Done when...', check: 'Can you test success?' },
                                { label: 'Escalate when...', check: 'When should it stop?' },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '10px 12px',
                                    background: 'var(--color-bg-main)',
                                    borderRadius: '8px'
                                }}>
                                    <span style={{ fontWeight: 600, fontSize: '13px' }}>☐ {item.label}</span>
                                    <span style={{ fontSize: '11px', opacity: 0.7 }}>{item.check}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p style={{ marginTop: '12px', fontSize: '13px', textAlign: 'center', opacity: 0.8 }}>
                        "This turns tasks into systems."
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Recap",
        },

        // =====================================================================
        // PAGE 8: Recap
        // =====================================================================
        {
            title: "Recap: You're Designing Work, Not Just Using AI",
            text: (
                <div>
                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '16px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            flexWrap: 'wrap'
                        }}>
                            <span style={{
                                padding: '6px 12px',
                                background: 'rgba(245, 158, 11, 0.2)',
                                borderRadius: '8px',
                                fontSize: '12px'
                            }}>📝 Messy work</span>
                            <span>→</span>
                            <span style={{
                                padding: '6px 12px',
                                background: 'rgba(59, 130, 246, 0.2)',
                                borderRadius: '8px',
                                fontSize: '12px'
                            }}>📋 Task spec</span>
                            <span>→</span>
                            <span style={{
                                padding: '6px 12px',
                                background: 'rgba(168, 85, 247, 0.2)',
                                borderRadius: '8px',
                                fontSize: '12px'
                            }}>🤖 Agent executes</span>
                            <span>→</span>
                            <span style={{
                                padding: '6px 12px',
                                background: 'rgba(16, 185, 129, 0.2)',
                                borderRadius: '8px',
                                fontSize: '12px'
                            }}>👤 Human approves</span>
                        </div>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                        borderRadius: '12px',
                        padding: '16px',
                        textAlign: 'center'
                    }}>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>
                            💡 "Scale comes from specs + checks."
                        </p>
                    </div>
                </div>
            ),
            component: null,
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

export default ManagingLesson2;
