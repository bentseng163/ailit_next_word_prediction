import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import InteractiveCard from '../../components/InteractiveCard/InteractiveCard';

// Interactives
import ComputerAgentStepThrough from '../../components/Interactives/ComputerAgentStepThrough';
import GuardrailPickerScenario from '../../components/Interactives/GuardrailPickerScenario';

/*
 * ============================================================================
 * MANAGING AI - LESSON 1: COMPUTER-USER AGENTS
 * ============================================================================
 * 
 * HOOK: "Why did the agent click the wrong button… three times… confidently?"
 * 
 * MEANING: Computer-user agents act like fast junior assistants who can see
 * a screen and click/type, but they operate through prediction. Mistakes
 * happen via UI misreads, goal drift, and loops.
 * 
 * FLOW: What is it → Core loop → Failure modes → Interactive → Guardrails → Scenario → Recap
 * ============================================================================
 */

const ManagingLesson1 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [canProceed, setCanProceed] = useState(true);

    const pages = [
        // =====================================================================
        // PAGE 0: What Is a Computer-User Agent?
        // =====================================================================
        {
            title: "What Is a Computer-User Agent?",
            text: (
                <div>
                    <p>A computer-user agent can:</p>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>📖 <strong>Read</strong> what's on a screen</li>
                        <li>🤔 <strong>Decide</strong> an action</li>
                        <li>🖱️ <strong>Click/type/scroll</strong></li>
                        <li>🔁 <strong>Repeat</strong> until it thinks the task is done</li>
                    </ul>
                    <p style={{ marginTop: 16 }}>
                        It's not "automation." It's more like <strong>delegation to a digital operator</strong>.
                    </p>

                    <div style={{
                        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '16px',
                        textAlign: 'center'
                    }}>
                        <span style={{ fontSize: '48px' }}>🤖💻</span>
                        <p style={{ margin: '8px 0 0', fontSize: '13px', opacity: 0.9 }}>
                            "It acts step-by-step, not perfectly."
                        </p>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "The Core Loop",
        },

        // =====================================================================
        // PAGE 1: The Core Loop
        // =====================================================================
        {
            title: "The Core Loop: Observe → Decide → Act → Check",
            text: (
                <div>
                    <p>This is the loop:</p>
                    <ol style={{ paddingLeft: '24px', lineHeight: '2' }}>
                        <li><strong>Observe</strong> (screen + task)</li>
                        <li><strong>Decide</strong> (next action)</li>
                        <li><strong>Act</strong> (click/type)</li>
                        <li><strong>Check</strong> (did it work?)</li>
                    </ol>
                    <p>Repeat.</p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '16px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                            🔄
                        </div>
                        <p style={{ margin: 0, fontSize: '13px' }}>
                            Loops are powerful… and also how <strong>small mistakes snowball</strong>.
                        </p>
                    </div>

                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        padding: '12px',
                        marginTop: '12px',
                        fontSize: '13px'
                    }}>
                        ⚠️ <strong>No stop rules</strong> → infinite confidence
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Failure Mode #1",
        },

        // =====================================================================
        // PAGE 2: Failure Mode #1 - UI Misread
        // =====================================================================
        {
            title: "Failure Mode #1: UI Misread",
            text: (
                <div>
                    <p>Agents can misread UI like humans do:</p>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>Confusing "Submit" vs "Save"</li>
                        <li>Missing a dropdown state</li>
                        <li>Misinterpreting a modal</li>
                        <li>Clicking the wrong account/profile</li>
                    </ul>
                    <p style={{ marginTop: 12 }}>
                        It's not evil. It's just… <strong>very literal</strong>.
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
                            <div style={{ marginBottom: '8px' }}>
                                <span style={{
                                    background: '#10b981',
                                    color: 'white',
                                    padding: '4px 12px',
                                    borderRadius: '4px',
                                    fontSize: '11px',
                                    marginRight: '6px'
                                }}>Confirm</span>
                                <span style={{
                                    background: '#ef4444',
                                    color: 'white',
                                    padding: '4px 12px',
                                    borderRadius: '4px',
                                    fontSize: '11px'
                                }}>Cancel</span>
                            </div>
                            <span style={{ fontSize: '11px', opacity: 0.8 }}>Agent clicks wrong</span>
                        </div>
                        <div style={{
                            flex: 1,
                            background: 'rgba(245, 158, 11, 0.1)',
                            borderRadius: '10px',
                            padding: '12px',
                            textAlign: 'center'
                        }}>
                            <div style={{ marginBottom: '8px', fontSize: '12px' }}>
                                Account: <span style={{ opacity: 0.5 }}>▼</span>
                            </div>
                            <span style={{ fontSize: '11px', opacity: 0.8 }}>Agent misses state</span>
                        </div>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Failure Mode #2",
        },

        // =====================================================================
        // PAGE 3: Failure Mode #2 - Goal Drift
        // =====================================================================
        {
            title: "Failure Mode #2: Goal Drift",
            text: (
                <div>
                    <p>If the task is vague, the agent fills gaps with <strong>plausible assumptions</strong>:</p>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>Picks the wrong file</li>
                        <li>Uses the wrong date range</li>
                        <li>Solves the wrong problem (confidently)</li>
                    </ul>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '16px',
                        textAlign: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '14px' }}>🎯 Goal</span>
                            <span style={{ fontSize: '20px' }}>→</span>
                            <span style={{
                                fontSize: '14px',
                                padding: '4px 8px',
                                background: 'rgba(245, 158, 11, 0.2)',
                                borderRadius: '4px'
                            }}>assumption</span>
                            <span style={{ fontSize: '20px' }}>→</span>
                            <span style={{ fontSize: '14px', opacity: 0.6 }}>🎯 Nearby goal</span>
                        </div>
                        <p style={{ margin: '12px 0 0', fontSize: '12px', opacity: 0.8 }}>
                            "Vague goals expand failure space."
                        </p>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Failure Mode #3",
        },

        // =====================================================================
        // PAGE 4: Failure Mode #3 - Loops
        // =====================================================================
        {
            title: "Failure Mode #3: Loops & Repetition",
            text: (
                <div>
                    <p>When agents fail a step, they often:</p>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>Retry the same action</li>
                        <li>Try random alternatives</li>
                        <li>Repeat until timeouts</li>
                    </ul>

                    <p style={{ marginTop: 12 }}>
                        This looks like determination.<br />
                        It is actually <strong>confusion in a trench coat</strong>. 😄
                    </p>

                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '16px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔄</div>
                        <div style={{
                            display: 'inline-block',
                            background: 'rgba(239, 68, 68, 0.2)',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            marginBottom: '8px'
                        }}>
                            Attempt #7
                        </div>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
                            "Without stop rules, retries keep happening."
                        </p>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Practice",
        },

        // =====================================================================
        // PAGE 5: Interactive - Agent Step Through
        // =====================================================================
        {
            title: "Practice: When to Intervene",
            text: (
                <p>
                    Watch this agent execute a task. At each step, decide:
                    <strong> Continue</strong>, <strong>Ask/Clarify</strong>, or <strong>Stop</strong>.
                </p>
            ),
            component: <ComputerAgentStepThrough onComplete={() => setCanProceed(true)} />,
            nextLabel: "Guardrail #1",
        },

        // =====================================================================
        // PAGE 6: Guardrail #1 - Confirmation Steps
        // =====================================================================
        {
            title: "Guardrail #1: Confirmation Steps",
            text: (
                <div>
                    <p>Add explicit confirmation for:</p>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>Send, submit, delete</li>
                        <li>Exporting sensitive data</li>
                        <li>Changing account settings</li>
                    </ul>
                    <p style={{ marginTop: 12 }}>
                        Think <strong>"seatbelts,"</strong> not "speed bumps."
                    </p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '16px',
                        textAlign: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '24px' }}>🚧</span>
                            <span style={{ fontSize: '20px' }}>→</span>
                            <span style={{
                                background: '#ef4444',
                                color: 'white',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                fontSize: '13px'
                            }}>🗑️ Delete</span>
                        </div>
                        <p style={{ margin: '12px 0 0', fontSize: '12px', opacity: 0.8 }}>
                            "Prevent the 1-click disaster."
                        </p>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Guardrail #2",
        },

        // =====================================================================
        // PAGE 7: Guardrail #2 - Safe Mode
        // =====================================================================
        {
            title: "Guardrail #2: Safe Mode + Sandbox",
            text: (
                <div>
                    <p>Use:</p>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>Read-only access when possible</li>
                        <li>Sandbox/test accounts</li>
                        <li>Limited permissions by default</li>
                    </ul>
                    <p style={{ marginTop: 12 }}>
                        This reduces <strong>"blast radius."</strong>
                    </p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '16px'
                    }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '12px' }}>
                            <span style={{
                                background: 'rgba(16, 185, 129, 0.2)',
                                color: '#10b981',
                                padding: '4px 10px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: 600
                            }}>Read-only</span>
                            <span style={{
                                background: 'rgba(59, 130, 246, 0.2)',
                                color: '#3b82f6',
                                padding: '4px 10px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: 600
                            }}>Limited scope</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8, textAlign: 'center' }}>
                            "Limit damage when mistakes happen."
                        </p>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Guardrail #3",
        },

        // =====================================================================
        // PAGE 8: Guardrail #3 - Audit Trails
        // =====================================================================
        {
            title: "Guardrail #3: Audit Trails",
            text: (
                <div>
                    <p>You want a record of:</p>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>What it did</li>
                        <li>When it did it</li>
                        <li>What it used as input</li>
                        <li>Why it chose an action (if available)</li>
                    </ul>
                    <p style={{ marginTop: 12 }}>
                        This makes <strong>debugging possible</strong>.
                    </p>

                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginTop: '16px'
                    }}>
                        <div style={{ fontSize: '11px', fontFamily: 'monospace', lineHeight: '1.8' }}>
                            <div style={{ opacity: 0.7 }}>10:14:22 | Click "Export" | ✓</div>
                            <div style={{ opacity: 0.7 }}>10:14:25 | Select format | ✓</div>
                            <div style={{ color: '#ef4444' }}>10:14:28 | Click "Send" | ⚠️</div>
                        </div>
                        <p style={{ margin: '12px 0 0', fontSize: '12px', opacity: 0.8, textAlign: 'center' }}>
                            "If you can't see it, you can't trust it."
                        </p>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Scenario",
        },

        // =====================================================================
        // PAGE 9: Scenario - Guardrail Picker
        // =====================================================================
        {
            title: "Scenario: Choose Your Guardrails",
            text: (
                <p>
                    Configure the right guardrails for this agent task.
                    Balance <strong>speed</strong>, <strong>reliability</strong>, and <strong>risk</strong>.
                </p>
            ),
            component: <GuardrailPickerScenario onComplete={() => setCanProceed(true)} />,
            nextLabel: "Recap",
        },

        // =====================================================================
        // PAGE 10: Recap
        // =====================================================================
        {
            title: "Recap: Treat Agents Like Operators",
            text: (
                <div>
                    <div style={{
                        background: 'var(--color-bg-card)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '16px'
                    }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
                            📋 Agent Operating Manual
                        </div>
                        <ul style={{ paddingLeft: '20px', lineHeight: '1.8', margin: 0 }}>
                            <li>Step-by-step loop (Observe → Decide → Act → Check)</li>
                            <li>UI misreads happen</li>
                            <li>Goals drift when vague</li>
                            <li>Guardrails prevent disasters</li>
                        </ul>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))',
                        borderRadius: '12px',
                        padding: '16px',
                        textAlign: 'center'
                    }}>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>
                            💡 "Delegate like a manager, not a gambler."
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
                isNextDisabled={!canProceed && false}
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

export default ManagingLesson1;
