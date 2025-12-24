import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './HumanReviewChecklist.module.css';
import { Check, ShieldCheck } from 'lucide-react';

const HumanReviewChecklist = ({ onComplete }) => {
    const items = [
        "Logo Integrity (No swirls/glitches)",
        "Text Readability (No gibberish)",
        "Product Accuracy (Correct buttons/ports)",
        "Policy (No Safety Violations)",
        "Representation Fairness",
        "Claims (Not misleading)"
    ];

    const [checked, setChecked] = useState(new Set());
    const [approved, setApproved] = useState(false);

    const toggleItem = (index) => {
        if (approved) return;
        const next = new Set(checked);
        if (next.has(index)) next.delete(index);
        else next.add(index);
        setChecked(next);
    };

    const handleApprove = () => {
        setApproved(true);
        if (onComplete) onComplete();
    };

    const allChecked = items.every((_, i) => checked.has(i));

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        className={`${styles.item} ${checked.has(i) ? styles.checkedItem : ''}`}
                        onClick={() => toggleItem(i)}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className={styles.checkbox}>
                            {checked.has(i) && <Check size={14} strokeWidth={3} />}
                        </div>
                        <span className={styles.itemText}>{item}</span>
                    </motion.div>
                ))}
            </div>

            <button
                className={`${styles.approveBtn} ${allChecked ? styles.activeBtn : ''} ${approved ? styles.successBtn : ''}`}
                disabled={!allChecked || approved}
                onClick={handleApprove}
            >
                {approved ? (
                    <>
                        <ShieldCheck size={20} />
                        Assets Approved
                    </>
                ) : (
                    "Approve for Launch"
                )}
            </button>
        </div>
    );
};

export default HumanReviewChecklist;
