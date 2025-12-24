import React, { useState } from 'react';
import styles from './ReferencePackPicker.module.css';
import { Package, Image as ImageIcon, Type, AlertCircle } from 'lucide-react';

const ReferencePackPicker = ({ onComplete }) => {
    const [selectedPacks, setSelectedPacks] = useState([]);

    const packs = [
        { id: 'logo', label: 'Logo Vector', icon: <Type size={18} /> },
        { id: 'product', label: 'Product Photos', icon: <Package size={18} /> },
        { id: 'style', label: 'Style Frames', icon: <ImageIcon size={18} /> },
    ];

    const togglePack = (id) => {
        setSelectedPacks(prev => {
            if (prev.includes(id)) {
                return prev.filter(p => p !== id);
            } else {
                return [...prev, id];
            }
        });

        // Check completion if 2 or more are selected (just to encourage interaction)
        if (selectedPacks.length >= 1 && onComplete) {
            // Delay slightly to feel natural
            setTimeout(() => onComplete(), 500);
        }
    };

    const getRiskLevel = () => {
        const count = selectedPacks.length;
        if (count === 0) return { level: 'Critical', color: '#ef4444', height: '100%' };
        if (count === 1) return { level: 'High', color: '#f97316', height: '70%' };
        if (count === 2) return { level: 'Medium', color: '#eab308', height: '40%' };
        return { level: 'Low', color: '#22c55e', height: '15%' };
    };

    const risk = getRiskLevel();

    return (
        <div className={styles.container}>
            <div className={styles.topSection}>
                <div className={styles.packGrid}>
                    {packs.map(pack => (
                        <button
                            key={pack.id}
                            className={`${styles.packCard} ${selectedPacks.includes(pack.id) ? styles.selected : ''}`}
                            onClick={() => togglePack(pack.id)}
                        >
                            <div className={styles.iconArea}>
                                {pack.icon}
                            </div>
                            <div className={styles.packLabel}>{pack.label}</div>
                            {selectedPacks.includes(pack.id) && <div className={styles.checkBadge}>✓</div>}
                        </button>
                    ))}
                </div>

                <div className={styles.meterContainer}>
                    <div className={styles.meterLabel}>Identity Drift Risk</div>
                    <div className={styles.meterTrack}>
                        <div
                            className={styles.meterFill}
                            style={{
                                height: risk.height,
                                backgroundColor: risk.color
                            }}
                        />
                    </div>
                    <div className={styles.riskValue} style={{ color: risk.color }}>
                        {risk.level}
                    </div>
                </div>
            </div>

            <div className={styles.feedbackArea}>
                {selectedPacks.length === 0 ? (
                    <div className={styles.instruction}>
                        Select reference assets to lock the identity.
                    </div>
                ) : (
                    <div className={styles.insightBox}>
                        <AlertCircle size={16} className={styles.icon} />
                        <p>
                            <strong>Mechanism:</strong> Every reference you add acts as a "ground truth" anchor.
                            The model no longer has to <em>guess</em> what your product looks like—it just has to <em>animate</em> it.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReferencePackPicker;
