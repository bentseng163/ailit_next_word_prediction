import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import InteractiveCard from '../../components/InteractiveCard/InteractiveCard';

/*
 * ============================================================================
 * DESIGNING AI - LESSON 2: BIAS MITIGATION
 * ============================================================================
 * 
 * HOOK: If you "fix bias" with one prompt line… why does it still show up later?
 * 
 * MEANING: Bias emerges from data + objectives + interaction design. 
 * Mitigation must be layered: data, prompting, UI, policy rules, and escalation.
 * ============================================================================
 */

const DesigningLesson2 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        // PAGE 0: System Property
        {
            title: "Bias Is a System Property",
            text: (
                <div>
                    <p>Bias doesn't live in one place. It can appear in:</p>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>Training data patterns</li>
                        <li>Reward/objective ("helpful" → "confident")</li>
                        <li>UI flow (what you ask, show, hide)</li>
                    </ul>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '16px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ padding: '6px 10px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '8px', fontSize: '12px' }}>📊 Data</span>
                            <span>+</span>
                            <span style={{ padding: '6px 10px', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '8px', fontSize: '12px' }}>🎯 Objective</span>
                            <span>+</span>
                            <span style={{ padding: '6px 10px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '8px', fontSize: '12px' }}>📱 UI</span>
                            <span>=</span>
                            <span style={{ padding: '6px 10px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '8px', fontSize: '12px' }}>Output</span>
                        </div>
                        <p style={{ margin: '12px 0 0', fontSize: '12px', textAlign: 'center', opacity: 0.8 }}>
                            "Mitigation must be layered."
                        </p>
                    </div>
                </div>
            ),
            nextLabel: "Patterns",
        },

        // PAGE 1: Bias Patterns
        {
            title: "What Bias Looks Like in GenAI",
            text: (
                <div>
                    <p>Common patterns:</p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '8px',
                        marginTop: '12px'
                    }}>
                        {[
                            { icon: '👤', label: 'Stereotyping' },
                            { icon: '🗣️', label: 'Tone shift' },
                            { icon: '📋', label: 'Unequal recs' },
                            { icon: '🚫', label: 'Refusal gaps' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                background: 'var(--color-bg-card)',
                                borderRadius: '10px',
                                padding: '12px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{item.icon}</div>
                                <div style={{ fontSize: '11px' }}>{item.label}</div>
                            </div>
                        ))}
                    </div>

                    <p style={{ marginTop: '12px', fontSize: '13px', textAlign: 'center', opacity: 0.8 }}>
                        💡 "Look for patterns across groups."
                    </p>
                </div>
            ),
            nextLabel: "High Stakes",
        },

        // PAGE 2: High Stakes
        {
            title: "Why This Matters: Real Stakes",
            text: (
                <div>
                    <p>High-risk contexts where bias becomes harm:</p>

                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '12px'
                    }}>
                        <div style={{ fontSize: '32px', textAlign: 'center', marginBottom: '12px' }}>⚠️</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                            {['Hiring', 'Finance', 'Education', 'Housing', 'Moderation'].map((area, i) => (
                                <span key={i} style={{
                                    padding: '6px 12px',
                                    background: 'rgba(239, 68, 68, 0.2)',
                                    borderRadius: '16px',
                                    fontSize: '12px'
                                }}>
                                    {area}
                                </span>
                            ))}
                        </div>
                        <p style={{ margin: '12px 0 0', fontSize: '12px', textAlign: 'center' }}>
                            "Bias becomes harm when stakes are high."
                        </p>
                    </div>
                </div>
            ),
            nextLabel: "Layer 1",
        },

        // PAGE 3: Layer 1 - Data & Coverage
        {
            title: "Layer 1: Data + Test Coverage",
            text: (
                <div>
                    <p>You can't mitigate what you don't test.</p>
                    <p>Start with diverse test cases:</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '12px'
                    }}>
                        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                            <li>Varied demographics/personas</li>
                            <li>Language variations</li>
                            <li>Edge cases</li>
                            <li>Adversarial prompts</li>
                        </ul>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                        borderRadius: '10px',
                        padding: '12px',
                        marginTop: '12px',
                        textAlign: 'center',
                        fontSize: '13px'
                    }}>
                        💡 "No test cases = invisible bias."
                    </div>
                </div>
            ),
            nextLabel: "Layer 2",
        },

        // PAGE 4: Layer 2 - Prompting
        {
            title: "Layer 2: Prompting + Counterexamples",
            text: (
                <div>
                    <p>Prompts can reduce bias:</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '12px'
                    }}>
                        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                            <li>Specify fairness goals</li>
                            <li>Require neutral, evidence-based language</li>
                            <li>Include counterexamples / balanced cases</li>
                        </ul>
                    </div>

                    <div style={{
                        background: 'rgba(245, 158, 11, 0.1)',
                        borderRadius: '10px',
                        padding: '12px',
                        marginTop: '12px',
                        textAlign: 'center',
                        fontSize: '13px'
                    }}>
                        ⚠️ But prompting alone isn't enough.
                    </div>
                </div>
            ),
            nextLabel: "Layer 3",
        },

        // PAGE 5: Layer 3 - UI
        {
            title: "Layer 3: UI Transparency",
            text: (
                <div>
                    <p>UI can prevent harm even when the model is imperfect:</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '12px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                '🔍 "Why am I seeing this?"',
                                '🚨 "Report issue"',
                                '⚙️ "Adjust preferences"',
                                '📊 Show confidence/limits'
                            ].map((item, i) => (
                                <div key={i} style={{
                                    padding: '10px 12px',
                                    background: 'var(--color-bg-main)',
                                    borderRadius: '8px',
                                    fontSize: '12px'
                                }}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <p style={{ marginTop: '12px', fontSize: '13px', textAlign: 'center', opacity: 0.8 }}>
                        💡 "UI can prevent harm even when model is imperfect."
                    </p>
                </div>
            ),
            nextLabel: "Layer 4",
        },

        // PAGE 6: Layer 4 - Policy
        {
            title: "Layer 4: Policy Rules + Escalation",
            text: (
                <div>
                    <p>Use policy layers:</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '12px'
                    }}>
                        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                            <li>Refusal rules for sensitive asks</li>
                            <li>Escalation to human review</li>
                            <li>Constrained outputs in high-stakes areas</li>
                        </ul>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        marginTop: '12px'
                    }}>
                        <div style={{
                            flex: 1,
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '10px',
                            padding: '12px',
                            textAlign: 'center'
                        }}>
                            <span style={{ fontSize: '24px' }}>🛡️</span>
                            <div style={{ fontSize: '11px', marginTop: '4px' }}>Policy Shield</div>
                        </div>
                        <div style={{
                            flex: 1,
                            background: 'rgba(59, 130, 246, 0.1)',
                            borderRadius: '10px',
                            padding: '12px',
                            textAlign: 'center'
                        }}>
                            <span style={{ fontSize: '24px' }}>👤</span>
                            <div style={{ fontSize: '11px', marginTop: '4px' }}>Human Escalation</div>
                        </div>
                    </div>
                </div>
            ),
            nextLabel: "Communication",
        },

        // PAGE 7: Communication
        {
            title: "How to Talk About Fairness",
            text: (
                <div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                        <div style={{
                            flex: 1,
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '10px',
                            padding: '12px'
                        }}>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', marginBottom: '8px' }}>✓ SAY</div>
                            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', lineHeight: '1.6' }}>
                                <li>"Reduce risk through layers"</li>
                                <li>"Monitor for regressions"</li>
                                <li>"Provide user controls"</li>
                            </ul>
                        </div>
                        <div style={{
                            flex: 1,
                            background: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '10px',
                            padding: '12px'
                        }}>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', marginBottom: '8px' }}>✗ DON'T SAY</div>
                            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', lineHeight: '1.6' }}>
                                <li>"Bias-free"</li>
                                <li>"Guaranteed fair"</li>
                                <li>"100% safe"</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
                        borderRadius: '10px',
                        padding: '12px',
                        marginTop: '12px',
                        textAlign: 'center',
                        fontSize: '13px'
                    }}>
                        💡 "Be credible."
                    </div>
                </div>
            ),
            nextLabel: "Recap",
        },

        // PAGE 8: Recap
        {
            title: "Recap: Layered Mitigation Wins",
            text: (
                <div>
                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '16px'
                    }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
                            🎂 Layer Cake
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {[
                                { label: 'Policy', color: '#ef4444' },
                                { label: 'UI', color: '#f59e0b' },
                                { label: 'Prompt', color: '#10b981' },
                                { label: 'Data', color: '#3b82f6' },
                            ].map((layer, i) => (
                                <div key={i} style={{
                                    padding: '10px',
                                    background: `${layer.color}20`,
                                    borderRadius: '6px',
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    fontWeight: 600
                                }}>
                                    {layer.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
                        borderRadius: '12px',
                        padding: '16px',
                        textAlign: 'center'
                    }}>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>
                            💡 "One fix is fragile. Layers are resilient."
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

export default DesigningLesson2;
