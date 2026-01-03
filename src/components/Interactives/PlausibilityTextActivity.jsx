import React, { useState } from 'react';
import { Check, X, AlertTriangle, FileText } from 'lucide-react';

const PlausibilityTextActivity = ({ onComplete }) => {
    const [claims, setClaims] = useState([
        {
            id: 1,
            text: "The new QX-5000 processor accelerates AI workloads by 400% using its proprietary quantum-flux core.",
            status: 'unanswered', // 'safe', 'verify', 'source', 'rewrite'
            correctAnswer: 'source',
            feedback: "Correct! 'Quantum-flux core' sounds highly plausible tech-speak, but it's likely a hallucinated term. Needs a source to verify existence.",
            userChoice: null
        },
        {
            id: 2,
            text: "It is compatible with all standard DDR5 motherboards.",
            status: 'unanswered',
            correctAnswer: 'safe',
            feedback: "Correct. This is a standard compatibility claim. Low risk, likely safe if the general context is correct.",
            userChoice: null
        },
        {
            id: 3,
            text: "Early adopters will receive a 50% tax rebate directly from the federal government.",
            status: 'unanswered',
            correctAnswer: 'verify',
            feedback: "Correct! A specific financial promise is high risk. The model might be predicting a 'desirable' offer pattern rather than a real policy.",
            userChoice: null
        }
    ]);

    const handleChoice = (id, choice) => {
        setClaims(prev => prev.map(c =>
            c.id === id ? { ...c, status: 'replied', userChoice: choice } : c
        ));

        // Check completion
        const allAnswered = claims.every(c => c.id === id ? true : c.status === 'replied'); // current one is about to be replied
        if (allAnswered && onComplete) {
            onComplete();
        }
    };

    const getButtonStyle = (claim, choiceType) => {
        const isSelected = claim.userChoice === choiceType;
        const isCorrect = choiceType === claim.correctAnswer;

        if (claim.status === 'replied') {
            if (isSelected) {
                return isCorrect ?
                    { backgroundColor: '#10b981', color: 'white', borderColor: '#10b981' } : // Green if correct choice
                    { backgroundColor: '#ef4444', color: 'white', borderColor: '#ef4444' }; // Red if wrong choice
            }
            // Show the correct answer if user missed it
            if (isCorrect && !isSelected && claim.userChoice) {
                return { backgroundColor: '#d1fae5', color: '#065f46', borderColor: '#10b981', borderStyle: 'dashed' };
            }
            return { opacity: 0.5, cursor: 'not-allowed' };
        }
        return {};
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #3b82f6' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={18} /> Generated Draft Email
                </p>
                <p style={{ fontStyle: 'italic', color: '#475569' }}>
                    "Here are the key selling points for the launch..."
                </p>
            </div>

            {claims.map((claim) => (
                <div key={claim.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                    <p style={{ fontSize: '1.1rem', marginBottom: '16px', fontWeight: '500' }}>
                        "{claim.text}"
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                        <button
                            onClick={() => handleChoice(claim.id, 'safe')}
                            disabled={claim.status === 'replied'}
                            className="interactive-btn"
                            style={getButtonStyle(claim, 'safe')}
                        >
                            Safe
                        </button>
                        <button
                            onClick={() => handleChoice(claim.id, 'verify')}
                            disabled={claim.status === 'replied'}
                            className="interactive-btn"
                            style={getButtonStyle(claim, 'verify')}
                        >
                            Verify
                        </button>
                        <button
                            onClick={() => handleChoice(claim.id, 'source')}
                            disabled={claim.status === 'replied'}
                            className="interactive-btn"
                            style={getButtonStyle(claim, 'source')}
                        >
                            Need Source
                        </button>
                        <button
                            onClick={() => handleChoice(claim.id, 'rewrite')}
                            disabled={claim.status === 'replied'}
                            className="interactive-btn"
                            style={getButtonStyle(claim, 'rewrite')}
                        >
                            Rewrite
                        </button>
                    </div>

                    {claim.status === 'replied' && (
                        <div style={{
                            marginTop: '12px',
                            padding: '12px',
                            borderRadius: '8px',
                            background: claim.userChoice === claim.correctAnswer ? '#f0fdf4' : '#fef2f2',
                            color: claim.userChoice === claim.correctAnswer ? '#166534' : '#991b1b',
                            fontSize: '0.9rem',
                            display: 'flex',
                            gap: '8px'
                        }}>
                            {claim.userChoice === claim.correctAnswer ? <Check size={16} /> : <AlertTriangle size={16} />}
                            {claim.feedback}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PlausibilityTextActivity;
