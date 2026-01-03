import React, { useState } from 'react';
import { Play, Pause, AlertTriangle, Flag } from 'lucide-react';

const FrameDriftActivity = ({ onComplete }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sliderVal, setSliderVal] = useState(0);
    const [flagged, setFlagged] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        // In a real app, this would drive a requestAnimationFrame loop
    };

    const handleFlag = (issue) => {
        if (!flagged.includes(issue)) {
            setFlagged([...flagged, issue]);
        }
    };

    const issues = [
        { id: 'logo', label: "Logo Morph", time: 30, correct: true },
        { id: 'shadow', label: "Missing Shadow", time: 70, correct: true },
        { id: 'color', label: "Color Shift", time: 90, correct: false }, // distractor
    ];

    const handleSubmit = () => {
        setSubmitted(true);
        if (onComplete) onComplete();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Video Placeholder */}
            <div style={{
                aspectRatio: '16/9',
                background: '#1e293b',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ fontSize: '2rem' }}>🎥</div>
                <p>AI Video Preview</p>
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: `${sliderVal}%`,
                    transition: 'left 0.1s linear'
                }}>
                    {/* Fake moving element */}
                    <div style={{ width: 20, height: 20, background: 'red', borderRadius: '50%' }}></div>
                </div>

                {flagged.map((f, i) => (
                    <div key={i} style={{ position: 'absolute', top: 10 + (i * 25), right: 10, background: '#f59e0b', color: 'black', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                        🚩 {issues.find(issue => issue.id === f)?.label}
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                    onClick={togglePlay}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: 'none',
                        background: '#3b82f6',
                        color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderVal}
                    onChange={(e) => setSliderVal(e.target.value)}
                    style={{ flex: 1 }}
                />
            </div>

            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                Scrub the video. Flag any "Plausibility Drift" errors.
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {issues.map(issue => (
                    <button
                        key={issue.id}
                        onClick={() => handleFlag(issue.id)}
                        disabled={flagged.includes(issue.id) || submitted}
                        className="interactive-btn"
                        style={{
                            flex: 1,
                            borderColor: flagged.includes(issue.id) ? '#f59e0b' : '#e2e8f0',
                            background: flagged.includes(issue.id) ? '#fffbeb' : 'white'
                        }}
                    >
                        <Flag size={16} /> {issue.label}
                    </button>
                ))}
            </div>

            {!submitted ? (
                <button
                    onClick={handleSubmit}
                    className="interactive-btn-primary"
                    disabled={flagged.length === 0}
                >
                    Submit Flags
                </button>
            ) : (
                <div style={{ padding: '12px', background: '#f0fdf4', borderRadius: '8px', color: '#166534' }}>
                    <p><strong>Analysis:</strong> Good catch. The Logo Morph and Shadow pop are classic "Temporal Inconsistency" issues. The model forgot the object's properties between frames.</p>
                </div>
            )}
        </div>
    );
};

export default FrameDriftActivity;
