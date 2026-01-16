import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import InteractiveCard from '../../components/InteractiveCard/InteractiveCard';

// Interactives
import FailureTriageDashboard from '../../components/Interactives/FailureTriageDashboard';

/*
 * ============================================================================
 * MANAGING AI - LESSON 3: MONITORING AGENTS
 * ============================================================================
 * 
 * HOOK: If an agent breaks quietly, you don't have an AI system.
 * You have a surprise generator.
 * 
 * MEANING: Trust isn't a feeling—it's observability. Monitoring lets you detect
 * regressions, prevent incidents, and keep agents aligned with goals over time.
 * ============================================================================
 */

const ManagingLesson3 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [canProceed, setCanProceed] = useState(true);

    const pages = [
        // =====================================================================
        // PAGE 0: Core Idea - Observability
        // =====================================================================
        {
            title: "If You Can't See It, You Can't Trust It",
            text: (
                <div>
                    <p>Monitoring answers:</p>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>What did it do?</li>
                        <li>Why did it do it?</li>
                        <li>Did it succeed?</li>
                        <li>What failed?</li>
                    </ul>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '16px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '40px', marginBottom: '8px' }}>🔍📋</div>
                        <p style={{ margin: 0, fontSize: '13px', fontWeight: 600 }}>
                            "No visibility = no control."
                        </p>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Theory",
        },

        // =====================================================================
        // PAGE 1: Theory - Drift
        // =====================================================================
        {
            title: "Reliability Is a Moving Target",
            text: (
                <div>
                    <p>Things change:</p>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>Models change</li>
                        <li>Data changes</li>
                        <li>UI changes</li>
                        <li>Tools change</li>
                    </ul>
                    <p>
                        So your agent's performance <strong>drifts</strong> unless monitored.
                    </p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '16px'
                    }}>
                        <div style={{
                            height: '60px',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'space-around',
                            marginBottom: '8px'
                        }}>
                            {[80, 75, 70, 60, 55, 65, 50].map((h, i) => (
                                <div key={i} style={{
                                    width: '20px',
                                    height: `${h}%`,
                                    background: h < 60 ? '#ef4444' : h < 70 ? '#f59e0b' : '#10b981',
                                    borderRadius: '4px 4px 0 0'
                                }} />
                            ))}
                        </div>
                        <p style={{ margin: 0, fontSize: '12px', textAlign: 'center', opacity: 0.8 }}>
                            "Evals are continuous."
                        </p>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "What to Log",
        },

        // =====================================================================
        // PAGE 2: What to Log
        // =====================================================================
        {
            title: "What to Log (Minimum Viable Telemetry)",
            text: (
                <div>
                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                { icon: '📥', label: 'Inputs', desc: 'what it saw' },
                                { icon: '⚡', label: 'Actions', desc: 'what it did' },
                                { icon: '🔧', label: 'Tool results', desc: 'API responses' },
                                { icon: '📤', label: 'Outputs', desc: 'final result' },
                                { icon: '❌', label: 'Errors', desc: 'failures + stack' },
                                { icon: '🕐', label: 'Timestamps', desc: 'when' },
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
                    </div>

                    <p style={{ marginTop: '12px', fontSize: '13px', textAlign: 'center', opacity: 0.8 }}>
                        💡 "Logs make debugging possible."
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Error Taxonomy",
        },

        // =====================================================================
        // PAGE 3: Error Taxonomy
        // =====================================================================
        {
            title: "Error Taxonomy",
            text: (
                <div>
                    <p>Common failure buckets:</p>

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginTop: '12px'
                    }}>
                        {[
                            { label: 'Tool Error', color: '#3b82f6', desc: 'API fails' },
                            { label: 'UI Misread', color: '#f59e0b', desc: 'wrong click' },
                            { label: 'Assumption', color: '#a855f7', desc: 'hallucination' },
                            { label: 'Permission', color: '#ec4899', desc: 'access denied' },
                            { label: 'Loop', color: '#ef4444', desc: 'infinite retry' },
                            { label: 'Data', color: '#06b6d4', desc: 'schema mismatch' },
                        ].map((tag, i) => (
                            <span key={i} style={{
                                padding: '6px 12px',
                                background: `${tag.color}20`,
                                border: `1px solid ${tag.color}40`,
                                borderRadius: '16px',
                                fontSize: '12px',
                                color: tag.color
                            }}>
                                {tag.label}
                            </span>
                        ))}
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                        borderRadius: '10px',
                        padding: '12px',
                        marginTop: '16px',
                        textAlign: 'center',
                        fontSize: '13px'
                    }}>
                        💡 "Name the failure → choose the fix."
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Practice",
        },

        // =====================================================================
        // PAGE 4: Interactive - Failure Triage
        // =====================================================================
        {
            title: "Practice: Triage Failures",
            text: (
                <p>
                    Label each incident by failure type, then choose the best mitigation.
                </p>
            ),
            component: <FailureTriageDashboard onComplete={() => setCanProceed(true)} />,
            nextLabel: "Metrics",
        },

        // =====================================================================
        // PAGE 5: Metrics That Matter
        // =====================================================================
        {
            title: "Metrics That Matter",
            text: (
                <div>
                    <p>Track:</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px'
                    }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            {[
                                { icon: '✅', label: 'Success rate' },
                                { icon: '⏱️', label: 'Time to complete' },
                                { icon: '🔄', label: 'Retry/loop rate' },
                                { icon: '👤', label: 'Human intervention' },
                                { icon: '🚨', label: 'Incident rate' },
                                { icon: '❓', label: 'Ask/unknown rate' },
                            ].map((m, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '10px',
                                    background: 'var(--color-bg-main)',
                                    borderRadius: '8px',
                                    fontSize: '12px'
                                }}>
                                    <span>{m.icon}</span>
                                    <span>{m.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p style={{ marginTop: '12px', fontSize: '13px', textAlign: 'center', opacity: 0.8 }}>
                        💡 "Measure what predicts trust."
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Thresholds",
        },

        // =====================================================================
        // PAGE 6: Thresholds
        // =====================================================================
        {
            title: "Thresholds: When to Restrict or Stop",
            text: (
                <div>
                    <p>Set thresholds like:</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                { condition: 'Loop > 3 retries', action: '→ Stop' },
                                { condition: 'Success < 95%', action: '→ Restrict scope' },
                                { condition: 'Severity = High', action: '→ Rollback' },
                                { condition: 'Tool errors spike', action: '→ Disable tool' },
                            ].map((rule, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '10px 12px',
                                    background: 'var(--color-bg-main)',
                                    borderRadius: '8px',
                                    fontSize: '12px'
                                }}>
                                    <span style={{ fontFamily: 'monospace' }}>IF {rule.condition}</span>
                                    <span style={{ fontWeight: 600, color: '#ef4444' }}>{rule.action}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p style={{ marginTop: '12px', fontSize: '13px', textAlign: 'center', opacity: 0.8 }}>
                        💡 "Automate safety decisions."
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Runbooks",
        },

        // =====================================================================
        // PAGE 7: Runbooks + Kill Switch
        // =====================================================================
        {
            title: "Runbooks + Kill Switches",
            text: (
                <div>
                    <p>A runbook answers:</p>
                    <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                        <li>What happened?</li>
                        <li>Impact?</li>
                        <li>Immediate mitigation?</li>
                        <li>Long-term fix?</li>
                    </ul>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{
                            flex: 1,
                            background: 'var(--color-bg-card)',
                            borderRadius: '10px',
                            padding: '12px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '6px' }}>📋</div>
                            <div style={{ fontSize: '12px', fontWeight: 600 }}>Runbook</div>
                            <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>Step-by-step response</div>
                        </div>
                        <div style={{
                            flex: 1,
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '10px',
                            padding: '12px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '6px' }}>🛑</div>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: '#ef4444' }}>Kill Switch</div>
                            <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>Stop immediately</div>
                        </div>
                    </div>

                    <p style={{ marginTop: '12px', fontSize: '13px', textAlign: 'center', opacity: 0.8 }}>
                        💡 "Fast response prevents damage."
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
            title: "Recap: Monitoring Is How You Stay in Control",
            text: (
                <div>
                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '16px'
                    }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
                            🔄 Control Loop
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            flexWrap: 'wrap'
                        }}>
                            {['Deploy', 'Observe', 'Triage', 'Improve'].map((step, i) => (
                                <React.Fragment key={step}>
                                    <span style={{
                                        padding: '6px 10px',
                                        background: 'rgba(59, 130, 246, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '12px'
                                    }}>{step}</span>
                                    {i < 3 && <span>→</span>}
                                </React.Fragment>
                            ))}
                            <span>→ 🔄</span>
                        </div>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
                        borderRadius: '12px',
                        padding: '16px',
                        textAlign: 'center'
                    }}>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>
                            💡 "Management is continuous, not one-time."
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

export default ManagingLesson3;
