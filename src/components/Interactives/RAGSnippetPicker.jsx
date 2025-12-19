import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './RAGSnippetPicker.module.css';
import { FileText, CheckCircle, XCircle, Search } from 'lucide-react';

const RAGSnippetPicker = ({ onComplete }) => {
    const [selectedIds, setSelectedIds] = useState([]);
    const [result, setResult] = useState(null);

    const snippets = [
        { id: 1, title: "Q3 Strategy Memo", text: "Falcon feature launch delayed to Q4.", type: "relevant" },
        { id: 2, title: "Lunch Menu", text: "Taco Tuesday specials.", type: "noise" },
        { id: 3, title: "Comp. Intel Report", text: "Falcon's beta shows UI clone of our product.", type: "relevant" },
        { id: 4, title: "Holiday Policy", text: "2024 bank holidays list.", type: "noise" },
        { id: 5, title: "IT Helpdesk", text: "Reset password instructions.", type: "noise" }
    ];

    const handleToggle = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(sid => sid !== id));
        } else {
            if (selectedIds.length < 2) {
                setSelectedIds([...selectedIds, id]);
            }
        }
        setResult(null); // Reset result on change
    };

    const handleGenerate = () => {
        const relevantCount = selectedIds.filter(id => [1, 3].includes(id)).length;

        let output = "";
        let feedback = "";
        let isSuccess = false;

        if (relevantCount === 2) {
            output = "Summary: Competitor Falcon is cloning our UI (Source: Intel Report), but their launch is delayed to Q4 (Source: Q3 Memo).";
            feedback = "Excellent. High-relevance context shifted probability towards specific, grounded facts.";
            isSuccess = true;
        } else if (relevantCount === 1) {
            output = "Summary: Falcon is cloning our UI. Launch date is unclear but might be soon (hallucinated 'soon' to fill gap).";
            feedback = "Better. Partial context helped, but missing the delay info caused a minor gap-fill.";
        } else {
            output = "Summary: Falcon launched a clone feature today. (Hallucinated based on plausible fears).";
            feedback = "Risky. Without relevant docs, the model guessed based on general anxiety patterns.";
        }

        setResult({ output, feedback, isSuccess });
        if (relevantCount >= 1 && onComplete) onComplete();
    };

    return (
        <div className={styles.container}>
            <div className={styles.instruction}>
                Pick 2 relevant snippets to answer: <strong>"What is Falcon up to?"</strong>
            </div>

            <div className={styles.grid}>
                {snippets.map(s => (
                    <motion.div
                        key={s.id}
                        className={`${styles.card} ${selectedIds.includes(s.id) ? styles.selected : ''}`}
                        onClick={() => handleToggle(s.id)}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className={styles.cardIcon}>
                            {selectedIds.includes(s.id) ? <CheckCircle size={16} /> : <FileText size={16} />}
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.cardTitle}>{s.title}</div>
                            <div className={styles.cardText}>{s.text}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button
                className={styles.genBtn}
                onClick={handleGenerate}
                disabled={selectedIds.length === 0}
            >
                Generate Answer
            </button>

            {result && (
                <motion.div
                    className={`${styles.resultBox} ${result.isSuccess ? styles.success : ''}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className={styles.outputLabel}>Model Layout:</div>
                    <p className={styles.outputText}>"{result.output}"</p>
                    <div className={styles.feedback}>
                        <strong>Analysis:</strong> {result.feedback}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default RAGSnippetPicker;
