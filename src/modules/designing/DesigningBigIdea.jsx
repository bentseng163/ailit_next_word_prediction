import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import InteractiveCard from '../../components/InteractiveCard/InteractiveCard';

/*
 * ============================================================================
 * DESIGNING AI - BIG IDEA: SHAPING AI RESPONSIBLY
 * ============================================================================
 * 
 * HOOK: If models predict plausibility, how do you make them reliably aligned
 * with your goals and values?
 * 
 * MEANING: AI behavior is not a single knob. It's a system you shape through:
 * 1) Behavior shaping (examples/tuning/prompting/retrieval)
 * 2) Risk reduction (layers: data, prompts, UI, policy, escalation)
 * 3) Measurement & gates (rubrics, tail risk checks, regression tests)
 * ============================================================================
 */

const DesigningBigIdea = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        // PAGE 0: Recap
        {
            title: "Three Lessons, One Responsibility",
            text: (
                <div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        marginBottom: '16px'
                    }}>
                        {[
                            { icon: '🏋️', label: 'Fine-tuning', desc: 'Changes defaults' },
                            { icon: '⚖️', label: 'Bias mitigation', desc: 'Requires layers' },
                            { icon: '📊', label: 'Evals', desc: 'Prevent self-deception' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px',
                                background: 'var(--color-bg-card)',
                                borderRadius: '10px'
                            }}>
                                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '13px' }}>{item.label}</div>
                                    <div style={{ fontSize: '11px', opacity: 0.7 }}>{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
                        borderRadius: '12px',
                        padding: '14px',
                        textAlign: 'center'
                    }}>
                        <p style={{ margin: 0, fontSize: '13px', fontWeight: 600 }}>
                            💡 "Shape, safeguard, measure."
                        </p>
                    </div>
                </div>
            ),
            nextLabel: "Big Insight",
        },

        // PAGE 1: System, Not Setting
        {
            title: "AI Behavior Is a System, Not a Setting",
            text: (
                <div>
                    <p>
                        You don't "set" the model to be safe/fair/good.<br />
                        You build a system that makes it <strong>more likely</strong>.
                    </p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '16px'
                    }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style={{
                                textAlign: 'center',
                                opacity: 0.5,
                                textDecoration: 'line-through'
                            }}>
                                <div style={{ fontSize: '32px' }}>🎛️</div>
                                <div style={{ fontSize: '11px' }}>Single toggle</div>
                            </div>
                            <span style={{ fontSize: '24px' }}>→</span>
                            <div style={{
                                flex: 1,
                                display: 'flex',
                                gap: '6px',
                                flexWrap: 'wrap'
                            }}>
                                <span style={{ padding: '6px 10px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '8px', fontSize: '11px' }}>Shaping</span>
                                <span style={{ padding: '6px 10px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '8px', fontSize: '11px' }}>Safeguards</span>
                                <span style={{ padding: '6px 10px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '8px', fontSize: '11px' }}>Measurement</span>
                            </div>
                        </div>
                        <p style={{ margin: '12px 0 0', fontSize: '12px', textAlign: 'center', opacity: 0.8 }}>
                            "Reliability comes from the system."
                        </p>
                    </div>
                </div>
            ),
            nextLabel: "Shaping",
        },

        // PAGE 2: Shaping
        {
            title: "Shaping = How You Steer Outputs",
            text: (
                <div>
                    <p>Tools:</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '12px'
                    }}>
                        <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '12px' }}>🎡</div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ padding: '8px 14px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '20px', fontSize: '12px' }}>📝 Prompt</span>
                            <span style={{ padding: '8px 14px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '20px', fontSize: '12px' }}>📡 RAG</span>
                            <span style={{ padding: '8px 14px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '20px', fontSize: '12px' }}>🏋️ Fine-tune</span>
                        </div>
                        <p style={{ margin: '12px 0 0', fontSize: '12px', textAlign: 'center', opacity: 0.8 }}>
                            "Choose the right steering method."
                        </p>
                    </div>
                </div>
            ),
            nextLabel: "Safeguards",
        },

        // PAGE 3: Safeguards
        {
            title: "Safeguards = Layers Prevent Harm",
            text: (
                <div>
                    <p>Layers:</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '12px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {[
                                { label: 'Escalation + logging', color: '#ef4444' },
                                { label: 'Policy / refusals', color: '#f59e0b' },
                                { label: 'UI transparency', color: '#10b981' },
                                { label: 'Counterexamples', color: '#3b82f6' },
                                { label: 'Data coverage', color: '#8b5cf6' },
                            ].map((layer, i) => (
                                <div key={i} style={{
                                    padding: '10px',
                                    background: `${layer.color}20`,
                                    borderRadius: '6px',
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    fontWeight: 500
                                }}>
                                    {layer.label}
                                </div>
                            ))}
                        </div>
                        <p style={{ margin: '12px 0 0', fontSize: '12px', textAlign: 'center', opacity: 0.8 }}>
                            "Layers beat single fixes."
                        </p>
                    </div>
                </div>
            ),
            nextLabel: "Measurement",
        },

        // PAGE 4: Measurement
        {
            title: "Measurement = Evals Keep You Honest",
            text: (
                <div>
                    <p>Measurement:</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '12px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            flexWrap: 'wrap',
                            marginBottom: '12px'
                        }}>
                            {['Golden sets', 'Rubrics', 'Adversarial', 'Ship gates'].map((item, i) => (
                                <React.Fragment key={item}>
                                    <span style={{
                                        padding: '6px 10px',
                                        background: 'rgba(59, 130, 246, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '11px'
                                    }}>{item}</span>
                                    {i < 3 && <span>→</span>}
                                </React.Fragment>
                            ))}
                        </div>
                        <p style={{ margin: 0, fontSize: '12px', textAlign: 'center', opacity: 0.8 }}>
                            "If you don't measure it, you're guessing."
                        </p>
                    </div>
                </div>
            ),
            nextLabel: "Decisions",
        },

        // PAGE 5: Decision Framework
        {
            title: "Better Product & Business Decisions",
            text: (
                <div>
                    <p>This framework helps decide:</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '12px'
                    }}>
                        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8', fontSize: '13px' }}>
                            <li>Should we fine-tune?</li>
                            <li>What mitigations are required?</li>
                            <li>Can we ship, beta, or hold?</li>
                            <li>Which vendor is acceptable?</li>
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
                        💡 "Repeatable decisions reduce risk and rework."
                    </div>
                </div>
            ),
            nextLabel: "Playbook",
        },

        // PAGE 6: Playbook
        {
            title: "The Responsible AI Playbook",
            text: (
                <div>
                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '16px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{
                                padding: '12px',
                                background: 'rgba(59, 130, 246, 0.1)',
                                borderRadius: '8px',
                                borderLeft: '4px solid #3b82f6'
                            }}>
                                <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>🎨 SHAPE</div>
                                <div style={{ fontSize: '11px', opacity: 0.8 }}>Prompt / RAG / Fine-tune</div>
                            </div>
                            <div style={{
                                padding: '12px',
                                background: 'rgba(16, 185, 129, 0.1)',
                                borderRadius: '8px',
                                borderLeft: '4px solid #10b981'
                            }}>
                                <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>🛡️ SAFEGUARD</div>
                                <div style={{ fontSize: '11px', opacity: 0.8 }}>Data + Prompt + UI + Policy</div>
                            </div>
                            <div style={{
                                padding: '12px',
                                background: 'rgba(139, 92, 246, 0.1)',
                                borderRadius: '8px',
                                borderLeft: '4px solid #8b5cf6'
                            }}>
                                <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>📊 MEASURE</div>
                                <div style={{ fontSize: '11px', opacity: 0.8 }}>Evals + Gates + Regression</div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
                        borderRadius: '12px',
                        padding: '16px',
                        textAlign: 'center'
                    }}>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>
                            💡 "Design the system, not just outputs."
                        </p>
                        <p style={{ margin: '8px 0 0', fontSize: '11px', opacity: 0.7 }}>
                            🍌 Vibes are not a metric.
                        </p>
                    </div>
                </div>
            ),
            nextLabel: "Complete Module",
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
                <div style={{ marginBottom: 20 }}>
                    {currentContent.text}
                </div>
            </InteractiveCard>
        </Layout>
    );
};

export default DesigningBigIdea;
