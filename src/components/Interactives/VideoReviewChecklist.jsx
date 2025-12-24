import React, { useState } from 'react';
import styles from './VideoReviewChecklist.module.css';
import { Square, CheckSquare, ShieldCheck, ArrowRight } from 'lucide-react';

const VideoReviewChecklist = ({ onComplete }) => {
    const [checks, setChecks] = useState({});

    // Checklist items: 7 items as requested
    const items = [
        { id: 'continuity', text: "Continuity (logo, product shape)" },
        { id: 'legibility', text: "Text legibility (no morphing words)" },
        { id: 'claims', text: "Claims match reality" },
        { id: 'ui', text: "No misleading UI behavior" },
        { id: 'safety', text: "Safety / Compliance check" },
        { id: 'fairness', text: "Representation fairness" },
        { id: 'zoom', text: "Zoom-in pass (inspect frames)" },
    ];

    const toggleCheck = (id) => {
        setChecks(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const isAllChecked = items.every(item => checks[item.id]);

    const handleApprove = () => {
        if (onComplete) onComplete();
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Review Protocol
                <span className={styles.countBadge}>
                    {Object.values(checks).filter(Boolean).length}/{items.length}
                </span>
            </div>

            <div className={styles.list}>
                {items.map(item => (
                    <button
                        key={item.id}
                        className={`${styles.itemBtn} ${checks[item.id] ? styles.checked : ''}`}
                        onClick={() => toggleCheck(item.id)}
                    >
                        {checks[item.id] ? (
                            <CheckSquare size={20} className={styles.iconCheck} />
                        ) : (
                            <Square size={20} className={styles.iconSquare} />
                        )}
                        <span className={styles.itemText}>{item.text}</span>
                    </button>
                ))}
            </div>

            <div className={styles.actionArea}>
                <button
                    className={styles.approveBtn}
                    disabled={!isAllChecked}
                    onClick={handleApprove}
                >
                    {isAllChecked ? (
                        <>
                            Approved for Release <ShieldCheck size={18} />
                        </>
                    ) : (
                        "Complete Checklist to Approve"
                    )}
                </button>
            </div>

            {isAllChecked && (
                <div className={styles.feedbackText}>
                    <p>
                        This is the final line of defense. AI generates "plausible" lies; only you know the truth!
                    </p>
                </div>
            )}
        </div>
    );
};

export default VideoReviewChecklist;
