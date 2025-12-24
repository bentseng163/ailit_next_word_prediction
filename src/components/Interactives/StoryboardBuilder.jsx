import React, { useState } from 'react';
import styles from './StoryboardBuilder.module.css';
import { Film, Check, ArrowRight } from 'lucide-react';

const StoryboardBuilder = ({ onComplete }) => {
    const [selections, setSelections] = useState({
        subject: null,
        action: null,
        camera: null,
    });
    const [isGenerated, setIsGenerated] = useState(false);

    const options = {
        subject: [
            { id: 'prod', label: 'Product Bottle' },
            { id: 'person', label: 'Spokesperson' },
        ],
        action: [
            { id: 'pour', label: 'Slow Pour' },
            { id: 'walk', label: 'Walking' },
        ],
        camera: [
            { id: 'cu', label: 'Close Up' },
            { id: 'wide', label: 'Wide Shot' },
        ],
    };

    const handleSelect = (category, id) => {
        setSelections(prev => ({ ...prev, [category]: id }));
    };

    const isComplete = selections.subject && selections.action && selections.camera;

    const handleGenerate = () => {
        setIsGenerated(true);
        if (onComplete) onComplete();
    };

    return (
        <div className={styles.container}>
            {!isGenerated ? (
                <>
                    <div className={styles.sectionTitle}>1. Subject</div>
                    <div className={styles.chipGrid}>
                        {options.subject.map(opt => (
                            <button
                                key={opt.id}
                                className={`${styles.chip} ${selections.subject === opt.id ? styles.active : ''}`}
                                onClick={() => handleSelect('subject', opt.id)}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    <div className={styles.sectionTitle}>2. Action</div>
                    <div className={styles.chipGrid}>
                        {options.action.map(opt => (
                            <button
                                key={opt.id}
                                className={`${styles.chip} ${selections.action === opt.id ? styles.active : ''}`}
                                onClick={() => handleSelect('action', opt.id)}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    <div className={styles.sectionTitle}>3. Camera</div>
                    <div className={styles.chipGrid}>
                        {options.camera.map(opt => (
                            <button
                                key={opt.id}
                                className={`${styles.chip} ${selections.camera === opt.id ? styles.active : ''}`}
                                onClick={() => handleSelect('camera', opt.id)}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    <div className={styles.actionArea}>
                        <button
                            className={styles.generateBtn}
                            disabled={!isComplete}
                            onClick={handleGenerate}
                        >
                            Create Storyboard <Film size={16} />
                        </button>
                    </div>
                </>
            ) : (
                <div className={styles.resultArea}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            Generation Context
                            <Check size={16} className={styles.successIcon} />
                        </div>
                        <div className={styles.cardBody}>
                            <div className={styles.contextRow}>
                                <span className={styles.label}>Subject:</span>
                                <span className={styles.value}>
                                    {options.subject.find(o => o.id === selections.subject)?.label}
                                </span>
                            </div>
                            <div className={styles.contextRow}>
                                <span className={styles.label}>Action:</span>
                                <span className={styles.value}>
                                    {options.action.find(o => o.id === selections.action)?.label}
                                </span>
                            </div>
                            <div className={styles.contextRow}>
                                <span className={styles.label}>Camera:</span>
                                <span className={styles.value}>
                                    {options.camera.find(o => o.id === selections.camera)?.label}
                                </span>
                            </div>
                        </div>
                        <div className={styles.cardFooter}>
                            Constraint Strength: <strong>High</strong>
                        </div>
                    </div>

                    <div className={styles.feedbackText}>
                        <p>
                            Great! Instead of "Make a video," you gave the model a <strong>structured map</strong>.
                            It now has significantly fewer ways to hallucinate random movements.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoryboardBuilder;
