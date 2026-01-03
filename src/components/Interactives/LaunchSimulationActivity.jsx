import React, { useState } from 'react';
import { Send, ShieldAlert, Rocket, Eye, Lock } from 'lucide-react';

const LaunchSimulationActivity = ({ onComplete }) => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const plans = [
        {
            id: 'ship_all',
            label: "Ship Fast",
            desc: "Launch everything as-is. Speed is priority.",
            icon: <Rocket size={20} />,
            outcome: "disaster",
            feedback: "🚨 Crisis! The video contained a physics glitch that went viral for the wrong reasons. The text claimed a feature that doesn't exist. Reputation hit: -50."
        },
        {
            id: 'ship_internal',
            label: "Internal Only",
            desc: "Use assets for internal brainstorming only.",
            icon: <Lock size={20} />,
            outcome: "safe_but_slow",
            feedback: "🔒 Safe. You avoided risk, but you didn't launch anything. The stakeholders are asking why we aren't moving faster."
        },
        {
            id: 'ship_guarded',
            label: "Ship with Guardrails",
            desc: "Text + Source. Image + Ref. Video + Review.",
            icon: <ShieldAlert size={20} />,
            outcome: "success",
            feedback: "✅ Perfect. You verified the claims, fixed the image hands with a reference, and cut the bad video frames. Launch successful! Reputation: +100."
        }
    ];

    const handleSelect = (id) => {
        setSelectedPlan(id);
        setShowResult(true);
        if (id === 'ship_guarded' && onComplete) {
            onComplete();
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Context */}
            <div style={{ background: '#f1f5f9', padding: '16px', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 8px 0' }}>🚀 Launch Decision</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569' }}>
                    <strong>Asset Status:</strong><br />
                    📝 Text: "High confidence" (unchecked)<br />
                    🖼️ Image: "Looks cool" (no reference)<br />
                    🎥 Video: "Beta model" (raw output)
                </p>
            </div>

            {!showResult ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {plans.map(plan => (
                        <button
                            key={plan.id}
                            onClick={() => handleSelect(plan.id)}
                            className="interactive-btn"
                            style={{
                                justifyContent: 'flex-start',
                                padding: '16px',
                                gap: '12px',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <div style={{ background: '#eff6ff', padding: '8px', borderRadius: '50%', color: '#2563eb' }}>
                                {plan.icon}
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>{plan.label}</div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{plan.desc}</div>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div style={{ animation: 'slideUp 0.3s ease-out' }}>
                    <div style={{
                        padding: '20px',
                        borderRadius: '12px',
                        background: selectedPlan === 'ship_guarded' ? '#f0fdf4' : '#fef2f2',
                        border: selectedPlan === 'ship_guarded' ? '1px solid #16a34a' : '1px solid #ef4444',
                        marginBottom: '16px'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>
                            {selectedPlan === 'ship_guarded' ? '🎉' : (selectedPlan === 'ship_all' ? '💥' : '🐢')}
                        </div>
                        <p style={{ margin: 0, lineHeight: 1.5 }}>
                            {plans.find(p => p.id === selectedPlan).feedback}
                        </p>
                    </div>

                    {selectedPlan !== 'ship_guarded' ? (
                        <button
                            onClick={() => setShowResult(false)}
                            className="interactive-btn"
                            style={{ width: '100%', justifyContent: 'center' }}
                        >
                            Try Again
                        </button>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#166534', fontWeight: 'bold' }}>
                            Simulation Complete
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LaunchSimulationActivity;
