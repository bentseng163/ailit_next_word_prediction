import React, { useState } from 'react';
import { Check, X, TrendingUp, AlertTriangle, ShieldAlert, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LaunchCrisisActivity = ({ onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [lastCorrect, setLastCorrect] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);

    // 6 Cases: 2 Text, 2 Image, 2 Video
    const scenarios = [
        // --- LLM ---
        {
            id: 1,
            type: "LLM (Text)",
            useCase: "Customer Support Bot",
            context: "Automating refunds for a fintech app.",
            outputDesc: "Bot: 'I have processed your full refund including interest.' (Policy: No interest).",
            metric: "Accuracy: 92% (Hallucinates policies occasionally)",
            shouldLaunch: false,
            reason: "High Risk. Financial hallucinations carry legal liability. 92% isn't good enough for banking."
        },
        {
            id: 2,
            type: "LLM (Text)",
            useCase: "Marketing Ideation",
            context: "Generate 50 slogans for a new soda.",
            outputDesc: "Slogans: 'Fizz the Future', 'Pop Life', 'Bubble Trouble'...",
            metric: "Accuracy: N/A (Creative Task)",
            shouldLaunch: true,
            reason: "Safe. It's an internal creative tool. There is no 'truth' to hallucinate, only bad ideas."
        },
        // --- Image ---
        {
            id: 3,
            type: "Image Gen",
            useCase: "Medical Textbook",
            context: "Diagram of a human heart for students.",
            outputDesc: "Image: Looks anatomical with red/blue veins, but connects the aorta to the wrong chamber.",
            metric: "Anatomical Accuracy: 95%",
            shouldLaunch: false,
            reason: "Critical Error. In education/science, plausible-but-wrong is dangerous."
        },
        {
            id: 4,
            type: "Image Gen",
            useCase: "Blog Thumbnail",
            context: "Generic 'Cyberpunk City' for a tech blog post.",
            outputDesc: "Image: Cool neon lights. Some windows look a bit warped.",
            metric: "Vibe Match: 99% | Realism: 80%",
            shouldLaunch: true,
            reason: "Safe. The goal is 'Vibe', not structural engineering. Glitches are acceptable."
        },
        // --- Video ---
        {
            id: 5,
            type: "Video Gen",
            useCase: "Security Footage Analysis",
            context: "Summarizing suspicious activity from CCTV.",
            outputDesc: "Video: Generates a frame of a person in a red hoodie who wasn't there.",
            metric: "Truthfulness: Low (Predicts likely events)",
            shouldLaunch: false,
            reason: "Dangerous. Generative video predicts pixels, it doesn't 'playback' reality. Cannot be used for evidence."
        },
        {
            id: 6,
            type: "Video Gen",
            useCase: "Social Media Promo",
            context: "15s hype video for a music festival.",
            outputDesc: "Video: psychedelic colors, clouds turning into speakers.",
            metric: "Consistency: Low (High Morphing)",
            shouldLaunch: true,
            reason: "Safe. Morphing/Drift is a feature here, not a bug. It looks cool."
        }
    ];

    const handleDecision = (launch) => {
        const currentCase = scenarios[currentIndex];
        const isCorrect = launch === currentCase.shouldLaunch;

        setLastCorrect(isCorrect);
        if (isCorrect) setScore(score + 1);
        setShowFeedback(true);
    };

    const nextCase = () => {
        setShowFeedback(false);
        if (currentIndex < scenarios.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setGameEnded(true);
            if (onComplete) onComplete();
        }
    };

    const currentCase = scenarios[currentIndex];

    // Summary Screen
    if (gameEnded) {
        return (
            <div className="flex flex-col items-center justify-center p-6 h-full text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                    {score === 6 ? '🏆' : (score >= 4 ? '⚖️' : '💥')}
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>
                    Score: {score} / 6
                </h2>
                <p style={{ margin: '16px 0', fontSize: '1.1rem', color: '#334155' }}>
                    {score === 6
                        ? "Perfect! You understand the difference between 'Plausible' and 'Safe'."
                        : "Remember: High stakes need Truth. Low stakes can accept Plausibility."}
                </p>
                <button
                    onClick={() => {
                        setGameEnded(false);
                        setCurrentIndex(0);
                        setScore(0);
                    }}
                    className="interactive-btn-primary"
                    style={{ padding: '16px 32px', fontSize: '1.1rem' }}
                >
                    Replay
                </button>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Inter, sans-serif' }}>
            {/* Progress */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '0.85rem', fontWeight: '500', color: 'rgba(0,0,0,0.5)' }}>
                <span>Case {currentIndex + 1} of 6</span>
                <span>Score: {score}</span>
            </div>

            {/* Case Card */}
            <AnimatePresence mode="wait">
                {!showFeedback ? (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                    >
                        <div style={{
                            background: '#ffffff',
                            borderRadius: '16px',
                            padding: '24px',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            border: '1px solid #e2e8f0'
                        }}>
                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{
                                    background: '#2563eb', color: 'white',
                                    padding: '6px 10px', borderRadius: '6px',
                                    fontSize: '0.75rem', fontWeight: '700',
                                    textTransform: 'uppercase', letterSpacing: '0.5px'
                                }}>
                                    {currentCase.type}
                                </span>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '800',
                                    margin: 0,
                                    color: '#0f172a' // Very dark slate
                                }}>
                                    {currentCase.useCase}
                                </h3>
                            </div>

                            <div style={{ height: '1px', background: '#e2e8f0', width: '100%' }} />

                            <p style={{ fontSize: '1rem', color: '#334155', lineHeight: '1.5' }}>
                                <strong style={{ color: '#0f172a' }}>Context:</strong> {currentCase.context}
                            </p>

                            <div style={{
                                background: '#f8fafc',
                                padding: '16px',
                                borderRadius: '12px',
                                borderLeft: '4px solid #64748b',
                                fontSize: '1rem',
                                color: '#1e293b',
                                fontStyle: 'italic',
                                fontWeight: '500'
                            }}>
                                "{currentCase.outputDesc}"
                            </div>

                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#475569', background: '#f1f5f9', padding: '12px', borderRadius: '8px' }}>
                                <Target size={18} className="text-blue-500" style={{ color: '#3b82f6' }} />
                                <span>
                                    <strong style={{ color: '#334155' }}>Metric:</strong> {currentCase.metric}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
                            <button
                                onClick={() => handleDecision(false)}
                                className="interactive-btn"
                                style={{
                                    flex: 1,
                                    background: '#fee2e2',
                                    color: '#7f1d1d',
                                    border: '1px solid #fecaca',
                                    height: '64px',
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    boxShadow: '0 4px 0 #fecaca',
                                    transform: 'translateY(0)',
                                    transition: 'all 0.1s'
                                }}
                            >
                                <X size={24} style={{ marginRight: '8px' }} />
                                Don't Launch
                            </button>
                            <button
                                onClick={() => handleDecision(true)}
                                className="interactive-btn"
                                style={{
                                    flex: 1,
                                    background: '#dcfce7',
                                    color: '#14532d',
                                    border: '1px solid #bbf7d0',
                                    height: '64px',
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    boxShadow: '0 4px 0 #bbf7d0'
                                }}
                            >
                                <Check size={24} style={{ marginRight: '8px' }} />
                                Launch
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="feedback"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            background: '#ffffff',
                            borderRadius: '16px',
                            border: `4px solid ${lastCorrect ? '#4ade80' : '#f87171'}`,
                            padding: '32px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}
                    >
                        <div style={{
                            fontSize: '2.5rem',
                            marginBottom: '16px',
                            color: lastCorrect ? '#16a34a' : '#dc2626'
                        }}>
                            {lastCorrect ? "Correct!" : "Wrong Choice"}
                        </div>

                        <p style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '32px', color: '#1e293b', fontWeight: '500' }}>
                            {currentCase.reason}
                        </p>

                        <button
                            onClick={nextCase}
                            className="interactive-btn-primary"
                            style={{
                                width: '100%',
                                fontSize: '1.1rem',
                                padding: '16px'
                            }}
                        >
                            Next Case
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LaunchCrisisActivity;
