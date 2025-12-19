import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './AccuracyCheck.module.css';
import { Search, Check, X, ExternalLink } from 'lucide-react';

const AccuracyCheck = ({ onComplete }) => {
    const [checked, setChecked] = useState({}); // { id: 'verified' | 'wrong' }

    const claims = [
        { id: 1, text: "Strategy refresh approved by VP.", status: 'verified', source: "Email: VP Approval (Oct 12)" },
        { id: 2, text: "Budget increased by 50%.", status: 'wrong', source: "Finance Sheet: Budget is flat (0% inc)." },
        { id: 3, text: "Team expansion planned for Q1.", status: 'verified', source: "Hiring Plan: 2 headcounts approved." }
    ];

    const handleVerify = (id, result) => {
        const newChecked = { ...checked, [id]: result };
        setChecked(newChecked);

        // Complete if all checked
        if (Object.keys(newChecked).length === claims.length && onComplete) {
            onComplete();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Search size={16} />
                Verify the AI summary against sources:
            </div>

            <div className={styles.claimsList}>
                {claims.map(claim => (
                    <div key={claim.id} className={styles.claimRow}>
                        <div className={styles.claimText}>"{claim.text}"</div>

                        {!checked[claim.id] ? (
                            <div className={styles.actions}>
                                <button className={styles.btnVerify} onClick={() => handleVerify(claim.id, claim.status)}>
                                    <ExternalLink size={14} /> Check Source
                                </button>
                            </div>
                        ) : (
                            <motion.div
                                className={`${styles.result} ${checked[claim.id] === 'verified' ? styles.valid : styles.invalid}`}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                {checked[claim.id] === 'verified' ? <Check size={16} /> : <X size={16} />}
                                <span>{checked[claim.id] === 'verified' ? "Verified" : "Hallucination"}</span>
                                <div className={styles.sourceNote}>Source: {claim.source}</div>
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccuracyCheck;
