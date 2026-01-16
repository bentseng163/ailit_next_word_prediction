import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import InteractiveCard from '../../components/InteractiveCard/InteractiveCard';

// Interactives
import BeforeAfterCards from '../../components/Interactives/BeforeAfterCards';

/*
 * ============================================================================
 * DESIGNING AI - LESSON 1: FINE-TUNING
 * ============================================================================
 * 
 * HOOK: "Can't we just fine-tune it to behave?"
 * Yes. And you can also accidentally teach it bad habits.
 * 
 * MEANING: Fine-tuning reinforces patterns from examples. It can backfire via
 * overfitting, forgetting, and bias amplification.
 * ============================================================================
 */

const DesigningLesson1 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [canProceed, setCanProceed] = useState(true);

    const pages = [
        // =====================================================================
        // PAGE 0: Intuition
        // =====================================================================
        {
            title: "Fine-Tuning = Training a Habit",
            text: (
                <div>
                    <p>
                        <strong>Prompting</strong> is like giving instructions every time.
                    </p>
                    <p>
                        <strong>Fine-tuning</strong> is like training a new default behavior.
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        marginTop: '16px'
                    }}>
                        <div style={{
                            flex: 1,
                            background: 'var(--color-bg-card)',
                            borderRadius: '10px',
                            padding: '14px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '28px', marginBottom: '8px' }}>📝</div>
                            <div style={{ fontSize: '12px', fontWeight: 600 }}>Prompting</div>
                            <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>Tell it each time</div>
                        </div>
                        <div style={{
                            flex: 1,
                            background: 'rgba(139, 92, 246, 0.1)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '10px',
                            padding: '14px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏋️</div>
                            <div style={{ fontSize: '12px', fontWeight: 600 }}>Fine-tuning</div>
                            <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>Changes default habits</div>
                        </div>
                    </div>

                    <p style={{ marginTop: '12px', fontSize: '13px', textAlign: 'center', opacity: 0.8 }}>
                        "Fine-tuning makes behavior more consistent—sometimes <em>too</em> consistent."
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Theory",
        },

        // =====================================================================
        // PAGE 1: Theory
        // =====================================================================
        {
            title: "It Reinforces Patterns from Examples",
            text: (
                <div>
                    <p>
                        The model learns: <br />
                        <em>"When input looks like X, output should look like Y."</em>
                    </p>
                    <p>
                        So your examples become the model's new <strong>"most plausible."</strong>
                    </p>

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
                            gap: '8px',
                            marginBottom: '8px'
                        }}>
                            <span style={{
                                padding: '6px 12px',
                                background: 'rgba(59, 130, 246, 0.2)',
                                borderRadius: '8px',
                                fontSize: '12px'
                            }}>📚 Examples</span>
                            <span>→</span>
                            <span style={{
                                padding: '6px 12px',
                                background: 'rgba(139, 92, 246, 0.2)',
                                borderRadius: '8px',
                                fontSize: '12px'
                            }}>🧠 Model</span>
                            <span>→</span>
                            <span style={{
                                padding: '6px 12px',
                                background: 'rgba(16, 185, 129, 0.2)',
                                borderRadius: '8px',
                                fontSize: '12px'
                            }}>📝 Output</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '12px', textAlign: 'center', opacity: 0.8 }}>
                            "Your dataset is your steering wheel."
                        </p>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Risk #1",
        },

        // =====================================================================
        // PAGE 2: Risk #1 - Overfitting
        // =====================================================================
        {
            title: "Risk #1: Overfitting",
            text: (
                <div>
                    <p>Overfitting looks like:</p>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>Perfect on your sample</li>
                        <li>Brittle on new phrasing</li>
                        <li>Too rigid / repetitive</li>
                    </ul>

                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        marginTop: '16px'
                    }}>
                        <div style={{
                            flex: 1,
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '10px',
                            padding: '12px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '20px', marginBottom: '6px' }}>✅</div>
                            <div style={{ fontSize: '11px' }}>Works on known examples</div>
                        </div>
                        <div style={{
                            flex: 1,
                            background: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '10px',
                            padding: '12px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '20px', marginBottom: '6px' }}>❌</div>
                            <div style={{ fontSize: '11px' }}>Fails on new variants</div>
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(245, 158, 11, 0.1)',
                        borderRadius: '8px',
                        padding: '10px',
                        marginTop: '12px',
                        fontSize: '13px',
                        textAlign: 'center'
                    }}>
                        💡 "If it memorizes the homework, it fails the exam."
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Risk #2",
        },

        // =====================================================================
        // PAGE 3: Risk #2 - Forgetting
        // =====================================================================
        {
            title: "Risk #2: Forgetting",
            text: (
                <div>
                    <p>Fine-tuning can unintentionally reduce abilities:</p>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>Worse general reasoning</li>
                        <li>Weaker safety/refusal behavior</li>
                        <li>Degraded formatting versatility</li>
                    </ul>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '16px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '40px', marginBottom: '8px' }}>🧠</div>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <span style={{ padding: '4px 8px', background: 'rgba(16, 185, 129, 0.3)', borderRadius: '6px', fontSize: '11px' }}>
                                ✨ Brand voice
                            </span>
                            <span style={{ padding: '4px 8px', background: 'rgba(107, 114, 128, 0.2)', borderRadius: '6px', fontSize: '11px', textDecoration: 'line-through', opacity: 0.5 }}>
                                General knowledge
                            </span>
                            <span style={{ padding: '4px 8px', background: 'rgba(107, 114, 128, 0.2)', borderRadius: '6px', fontSize: '11px', textDecoration: 'line-through', opacity: 0.5 }}>
                                Safety
                            </span>
                        </div>
                        <p style={{ margin: '12px 0 0', fontSize: '12px', opacity: 0.8 }}>
                            "New habits can crowd out old skills."
                        </p>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Risk #3",
        },

        // =====================================================================
        // PAGE 4: Risk #3 - Bias Amplification
        // =====================================================================
        {
            title: "Risk #3: Bias Amplification",
            text: (
                <div>
                    <p>
                        If examples contain subtle patterns (tone, stereotypes, exclusions),
                        fine-tuning can <strong>amplify</strong> them.
                    </p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '16px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '24px' }}>⚖️</div>
                                <div style={{ fontSize: '11px', marginTop: '4px' }}>Small tilt</div>
                            </div>
                            <div style={{ fontSize: '24px' }}>→</div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '32px' }}>⚖️</div>
                                <div style={{ fontSize: '11px', marginTop: '4px' }}>Big tilt</div>
                            </div>
                        </div>
                        <p style={{ margin: '12px 0 0', fontSize: '12px', textAlign: 'center', opacity: 0.8 }}>
                            "Tiny skews become consistent outputs."
                        </p>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Practice",
        },

        // =====================================================================
        // PAGE 5: Interactive - Before/After Cards
        // =====================================================================
        {
            title: "Practice: Spot Gains vs Regressions",
            text: (
                <p>
                    Compare outputs before and after fine-tuning.
                    Tag each as <strong>Improved</strong>, <strong>No change</strong>, or <strong>Risky</strong>.
                </p>
            ),
            component: <BeforeAfterCards onComplete={() => setCanProceed(true)} />,
            nextLabel: "When to Use",
        },

        // =====================================================================
        // PAGE 6: When Fine-Tuning Is Useful
        // =====================================================================
        {
            title: "When Fine-Tuning Is Useful",
            text: (
                <div>
                    <p>Good fits:</p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '8px',
                        marginTop: '12px'
                    }}>
                        {[
                            { icon: '🎨', label: 'Brand voice' },
                            { icon: '💬', label: 'Support tone' },
                            { icon: '📋', label: 'Policy style' },
                            { icon: '📊', label: 'Stable format' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                background: 'var(--color-bg-card)',
                                borderRadius: '10px',
                                padding: '12px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{item.icon}</div>
                                <div style={{ fontSize: '12px' }}>{item.label}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
                        borderRadius: '10px',
                        padding: '12px',
                        marginTop: '12px',
                        textAlign: 'center',
                        fontSize: '13px'
                    }}>
                        💡 "Use it when consistency is the product."
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "When NOT to",
        },

        // =====================================================================
        // PAGE 7: When NOT to Fine-Tune
        // =====================================================================
        {
            title: "When NOT to Fine-Tune",
            text: (
                <div>
                    <p>Avoid fine-tuning when:</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '12px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span>📡</span>
                                <span style={{ fontSize: '13px' }}>Need fresh facts → <strong>Use RAG</strong></span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span>🔄</span>
                                <span style={{ fontSize: '13px' }}>Requirements change weekly → <strong>Use prompting</strong></span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span>⚠️</span>
                                <span style={{ fontSize: '13px' }}>High stakes + broad behavior → <strong>Keep guardrails</strong></span>
                            </div>
                        </div>
                    </div>

                    <p style={{ marginTop: '12px', fontSize: '13px', textAlign: 'center', opacity: 0.8 }}>
                        💡 "Don't fine-tune to fix missing data."
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
            title: "Recap: Fine-Tuning Done Right",
            text: (
                <div>
                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '16px'
                    }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
                            ✅ Before Fine-Tuning
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8', fontSize: '13px' }}>
                            <li>Use representative examples</li>
                            <li>Remove duplicates & hidden bias</li>
                            <li>Keep a "golden set" for regression tests</li>
                            <li>Set pass/fail thresholds</li>
                        </ul>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
                        borderRadius: '12px',
                        padding: '16px',
                        textAlign: 'center'
                    }}>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>
                            💡 "Training data is product design."
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

export default DesigningLesson1;
