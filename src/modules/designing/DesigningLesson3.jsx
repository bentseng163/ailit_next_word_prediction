import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import InteractiveCard from '../../components/InteractiveCard/InteractiveCard';

/*
 * ============================================================================
 * DESIGNING AI - LESSON 3: AI EVALS
 * ============================================================================
 * 
 * HOOK: "It looks good in the demo." Cool. Now show me the evals.
 * 
 * MEANING: Evals are how you maintain control: representative tasks, rubrics,
 * adversarial cases, and thresholds. Average scores can hide worst-case harms.
 * ============================================================================
 */

const DesigningLesson3 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        // PAGE 0: Demos Lie
        {
            title: "Demos Lie (Accidentally)",
            text: (
                <div>
                    <p>
                        A demo is one cherry-picked prompt.<br />
                        An eval is a <strong>systematic test</strong>.
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        marginTop: '16px'
                    }}>
                        <div style={{
                            flex: 1,
                            background: 'rgba(245, 158, 11, 0.1)',
                            borderRadius: '10px',
                            padding: '14px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '32px', marginBottom: '6px' }}>🍒</div>
                            <div style={{ fontSize: '12px', fontWeight: 600 }}>Demo</div>
                            <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>One perfect cherry</div>
                        </div>
                        <div style={{
                            flex: 1,
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '10px',
                            padding: '14px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '32px', marginBottom: '6px' }}>🧺</div>
                            <div style={{ fontSize: '12px', fontWeight: 600 }}>Eval Set</div>
                            <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>Mixed basket</div>
                        </div>
                    </div>

                    <p style={{ marginTop: '12px', fontSize: '13px', textAlign: 'center', opacity: 0.8 }}>
                        💡 "Trust the basket, not the cherry."
                    </p>
                </div>
            ),
            nextLabel: "Eval Triangle",
        },

        // PAGE 1: Eval Triangle
        {
            title: "Representative + Edge + Adversarial",
            text: (
                <div>
                    <p>A good eval set includes:</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '12px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                { icon: '📊', label: 'Representative', desc: 'Most common tasks' },
                                { icon: '🔀', label: 'Edge cases', desc: 'Rare but important' },
                                { icon: '⚡', label: 'Adversarial', desc: 'Break it on purpose' },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '10px',
                                    background: 'var(--color-bg-main)',
                                    borderRadius: '8px'
                                }}>
                                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                                    <span style={{ fontWeight: 600, fontSize: '13px' }}>{item.label}</span>
                                    <span style={{ fontSize: '11px', opacity: 0.7, marginLeft: 'auto' }}>{item.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p style={{ marginTop: '12px', fontSize: '13px', textAlign: 'center', opacity: 0.8 }}>
                        💡 "Coverage prevents surprises."
                    </p>
                </div>
            ),
            nextLabel: "Tail Risk",
        },

        // PAGE 2: Averages Hide Harm
        {
            title: "Averages Hide Harm",
            text: (
                <div>
                    <p>If 95% is great but 5% is catastrophic…<br />you need to see the 5%.</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '16px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            gap: '4px',
                            height: '80px'
                        }}>
                            {[70, 75, 80, 85, 80, 75, 10].map((h, i) => (
                                <div key={i} style={{
                                    width: '24px',
                                    height: `${h}%`,
                                    background: i === 6 ? '#ef4444' : '#10b981',
                                    borderRadius: '4px 4px 0 0'
                                }} />
                            ))}
                        </div>
                        <p style={{ margin: '12px 0 0', fontSize: '12px', textAlign: 'center', opacity: 0.8 }}>
                            "Worst-case matters in high-stakes."
                        </p>
                    </div>
                </div>
            ),
            nextLabel: "Rubrics",
        },

        // PAGE 3: Rubrics
        {
            title: "Rubrics: Define 'Good' Clearly",
            text: (
                <div>
                    <p>Example rubric dimensions:</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '12px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                'Accuracy / grounding',
                                'Completeness',
                                'Harmfulness risk',
                                'Refusal correctness',
                                'Format compliance'
                            ].map((dim, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '8px 12px',
                                    background: 'var(--color-bg-main)',
                                    borderRadius: '6px',
                                    fontSize: '12px'
                                }}>
                                    <span>{dim}</span>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <span key={n} style={{
                                                width: '16px',
                                                height: '16px',
                                                background: n <= 3 ? 'rgba(107, 114, 128, 0.3)' : 'transparent',
                                                border: '1px solid rgba(107, 114, 128, 0.4)',
                                                borderRadius: '3px',
                                                fontSize: '9px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>{n}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p style={{ marginTop: '12px', fontSize: '13px', textAlign: 'center', opacity: 0.8 }}>
                        💡 "If you can't score it, you can't manage it."
                    </p>
                </div>
            ),
            nextLabel: "Golden Sets",
        },

        // PAGE 4: Golden Sets
        {
            title: "Golden Sets + Regression Testing",
            text: (
                <div>
                    <p><strong>Golden set</strong> = stable test prompts you never change.</p>
                    <p>Use it to detect regressions after model updates.</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '16px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <span style={{ fontSize: '32px' }}>🔒</span>
                                <div style={{ fontSize: '11px', marginTop: '4px' }}>Golden set</div>
                            </div>
                            <span style={{ fontSize: '20px' }}>→</span>
                            <div style={{ textAlign: 'center' }}>
                                <span style={{ fontSize: '24px' }}>📊</span>
                                <div style={{ fontSize: '11px', marginTop: '4px' }}>Before vs After</div>
                            </div>
                        </div>
                        <p style={{ margin: '12px 0 0', fontSize: '12px', textAlign: 'center', opacity: 0.8 }}>
                            "Protect what you care about."
                        </p>
                    </div>
                </div>
            ),
            nextLabel: "Thresholds",
        },

        // PAGE 5: Thresholds
        {
            title: "Thresholds + Ship Gates",
            text: (
                <div>
                    <p>Define thresholds:</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '12px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                { metric: 'Accuracy', op: '≥', val: '90%', status: '✅' },
                                { metric: 'Harmfulness', op: '≤', val: '1%', status: '✅' },
                                { metric: 'Refusal correctness', op: '≥', val: '95%', status: '✅' },
                                { metric: 'Tail risk incidents', op: '=', val: '0', status: '⚠️' },
                            ].map((t, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '8px 12px',
                                    background: 'var(--color-bg-main)',
                                    borderRadius: '6px',
                                    fontSize: '12px'
                                }}>
                                    <span>{t.metric}</span>
                                    <span style={{ fontFamily: 'monospace' }}>{t.op} {t.val} {t.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p style={{ marginTop: '12px', fontSize: '13px', textAlign: 'center', opacity: 0.8 }}>
                        💡 "Decisions become repeatable."
                    </p>
                </div>
            ),
            nextLabel: "Error Taxonomy",
        },

        // PAGE 6: Error Taxonomy
        {
            title: "Track Errors by Type",
            text: (
                <div>
                    <p>Categorize to find root causes faster:</p>

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginTop: '12px'
                    }}>
                        {[
                            { label: 'Hallucination', color: '#ef4444', highlight: true },
                            { label: 'Formatting', color: '#f59e0b' },
                            { label: 'Bias/tone', color: '#a855f7' },
                            { label: 'Refusal mistake', color: '#ec4899' },
                            { label: 'Tool misuse', color: '#3b82f6' },
                        ].map((tag, i) => (
                            <span key={i} style={{
                                padding: '8px 14px',
                                background: `${tag.color}20`,
                                border: tag.highlight ? `2px solid ${tag.color}` : `1px solid ${tag.color}40`,
                                borderRadius: '16px',
                                fontSize: '12px',
                                color: tag.color,
                                fontWeight: tag.highlight ? 600 : 400
                            }}>
                                {tag.label}
                            </span>
                        ))}
                    </div>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '10px',
                        padding: '12px',
                        marginTop: '12px',
                        textAlign: 'center',
                        fontSize: '13px'
                    }}>
                        ☝️ <strong>Top contributor:</strong> Hallucination (42%)
                    </div>
                </div>
            ),
            nextLabel: "Decisions",
        },

        // PAGE 7: Decision Uses
        {
            title: "Evals Power Decisions",
            text: (
                <div>
                    <p>Evals help you decide:</p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '8px',
                        marginTop: '12px'
                    }}>
                        {[
                            { icon: '🏢', label: 'Vendor selection' },
                            { icon: '⬆️', label: 'Upgrade decision' },
                            { icon: '🚀', label: 'Launch readiness' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                background: 'var(--color-bg-card)',
                                borderRadius: '10px',
                                padding: '12px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{item.icon}</div>
                                <div style={{ fontSize: '10px' }}>{item.label}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                        borderRadius: '10px',
                        padding: '12px',
                        marginTop: '12px',
                        textAlign: 'center',
                        fontSize: '13px'
                    }}>
                        💡 "Evals turn opinions into evidence."
                    </div>
                </div>
            ),
            nextLabel: "Recap",
        },

        // PAGE 8: Recap
        {
            title: "Recap: Evals = Control",
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
                            gap: '6px',
                            flexWrap: 'wrap'
                        }}>
                            {['Define rubric', 'Test set', 'Score', 'Fix', 'Retest', 'Ship'].map((step, i) => (
                                <React.Fragment key={step}>
                                    <span style={{
                                        padding: '6px 10px',
                                        background: 'rgba(59, 130, 246, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '11px'
                                    }}>{step}</span>
                                    {i < 5 && <span>→</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
                        borderRadius: '12px',
                        padding: '16px',
                        textAlign: 'center'
                    }}>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>
                            💡 "Measure, improve, repeat."
                        </p>
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
                <div style={{ marginBottom: 20 }}>
                    {currentContent.text}
                </div>
            </InteractiveCard>
        </Layout>
    );
};

export default DesigningLesson3;
