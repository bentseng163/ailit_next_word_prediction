import React, { useState, useEffect } from 'react';
import { Shirt, User, Star, Type, Film, FileText, Check, AlertCircle, Box, Layout, Camera, Lock, VolumeX, Meh, FileWarning } from 'lucide-react';

const SwiftMerchActivity = ({ onComplete, scenario }) => {
    // Fallback options if no scenario provided (backward compatibility)
    const defaultOptions = [
        { id: 'product', label: 'Product Shot', icon: Shirt, required: true },
        { id: 'celebrity', label: 'Celebrity Ref', icon: Star, required: true },
        { id: 'selfie', label: 'User Selfie', icon: User, required: true },
        { id: 'logo', label: 'Brand Logo', icon: Type, required: false, error: "Branding is important, but for the VIDEO generation itself, we need to focus on the visual subjects first." },
        { id: 'style', label: 'Cinematic Style', icon: Film, required: false, error: "Style is optional. To get the specific LOOK right, we first need the specific OBJECTS and PEOPLE." },
        { id: 'script', label: 'Detailed Script', icon: FileText, required: false, error: "A script describes action, but reference images are 'Must Haves' to define the identity of the characters." },
    ];

    const currentOptions = scenario?.options || defaultOptions;

    // Map types to icons dynamically if needed
    const getIcon = (item) => {
        if (item.icon) return item.icon; // Use specific icon if provided

        // Dynamic mapping based on 'type' or 'id'
        const map = {
            'object': Shirt,
            'subject': Star,
            'user': User,
            'branding': Type,
            'style': Film,
            'text': FileText,
            'structure': Layout,
            'concept': Meh,
            'ref': Box,
            'context': Camera,
            'security': Lock,
            'data': FileWarning,
            'audio': VolumeX
        };
        return map[item.type] || Box;
    };

    const [selected, setSelected] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    // Reset state when scenario changes
    useEffect(() => {
        setSelected([]);
        setShowFeedback(false);
        setIsCorrect(false);
    }, [scenario]);

    const toggleSelection = (id) => {
        if (isCorrect) return;
        setShowFeedback(false);
        setSelected(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const checkAnswer = () => {
        const requiredIds = currentOptions.filter(o => o.required).map(o => o.id);
        const selectedRequired = selected.filter(id => requiredIds.includes(id));
        const selectedIncorrect = selected.filter(id => !requiredIds.includes(id));

        const hasAllRequired = requiredIds.every(id => selected.includes(id));
        const hasNoIncorrect = selectedIncorrect.length === 0;

        if (hasAllRequired && hasNoIncorrect) {
            setIsCorrect(true);
            onComplete();
        }
        setShowFeedback(true);
    };

    const getFeedbackMessage = () => {
        const requiredIds = currentOptions.filter(o => o.required).map(o => o.id);
        const selectedIncorrect = selected.filter(id => !requiredIds.includes(id));

        if (selectedIncorrect.length > 0) {
            // Priority: Show feedback for the first incorrect item selected
            const firstIncorrect = currentOptions.find(o => o.id === selectedIncorrect[0]);
            return { type: 'error', text: firstIncorrect.error || "Incorrect selection." };
        }

        const missing = requiredIds.filter(id => !selected.includes(id));
        if (missing.length > 0) {
            return { type: 'error', text: scenario?.failMsg || "To personalize the video, we need to know exactly WHO (User), WHAT (Product), and WHO WITH (Celebrity)." };
        }

        return { type: 'success', text: scenario?.successMsg || "Correct! These are the 3 'Must Have' assets to ground the model for a highly personalized result." };
    };

    const feedbackMsg = showFeedback ? getFeedbackMessage() : null;

    return (
        <div style={{ padding: '10px 0' }}>
            <div style={{
                background: '#1e293b',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '20px',
                border: '1px solid #334155'
            }}>
                <h3 style={{
                    color: '#f8fafc',
                    margin: '0 0 8px 0',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                }}>
                    {scenario?.title || "The Taylor Swift Experience"}
                </h3>
                <p style={{
                    color: '#94a3b8',
                    margin: 0,
                    fontSize: '0.9rem',
                    lineHeight: '1.4'
                }}>
                    {scenario?.goalText || "Goal: Personalized video of Customer + Taylor + Product. Pick the right inputs."}
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginBottom: '24px'
            }}>
                {currentOptions.map((option) => {
                    const isSelected = selected.includes(option.id);
                    const Icon = getIcon(option);
                    return (
                        <button
                            key={option.id}
                            onClick={() => toggleSelection(option.id)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '16px',
                                background: isSelected ? '#3b82f6' : '#1e293b',
                                border: isSelected ? '1px solid #60a5fa' : '1px solid #334155',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                color: isSelected ? 'white' : '#cbd5e1',
                                opacity: isCorrect && !isSelected ? 0.5 : 1
                            }}
                        >
                            <Icon size={24} style={{ marginBottom: '8px' }} />
                            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{option.label}</span>
                        </button>
                    );
                })}
            </div>

            {feedbackMsg && (
                <div style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    background: feedbackMsg.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    border: `1px solid ${feedbackMsg.type === 'success' ? '#22c55e' : '#ef4444'}`,
                    color: feedbackMsg.type === 'success' ? '#4ade80' : '#fca5a5',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    {feedbackMsg.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{feedbackMsg.text}</p>
                </div>
            )}

            {!isCorrect && (
                <button
                    onClick={checkAnswer}
                    style={{
                        width: '100%',
                        padding: '12px',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        opacity: selected.length === 0 ? 0.5 : 1
                    }}
                    disabled={selected.length === 0}
                >
                    Check Assets
                </button>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default SwiftMerchActivity;
