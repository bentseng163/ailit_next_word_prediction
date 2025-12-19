import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './FewShotPromptFixer.module.css';
import { Layout, AlertCircle, CheckCircle } from 'lucide-react';

const FewShotPromptFixer = ({ onComplete }) => {
    const [selectedTemplate, setSelectedTemplate] = useState(null); // 'none', 'action', 'risk'

    const handleSelect = (tmpl) => {
        setSelectedTemplate(tmpl);
        if (tmpl !== 'none' && onComplete) onComplete();
    };

    const getResult = () => {
        if (!selectedTemplate) return { text: "Select a template to prevent the model from guessing the format...", type: "neutral" };
        if (selectedTemplate === 'none') return { text: "Notes: met client X. they are happy. want feature Y. pricing issue. \n\n(Model output is unstructured because it predicted next words based on messy input style.)", type: "bad" };
        if (selectedTemplate === 'action') return { text: "**Action Plan:**\n- [ ] Scope Feature Y for Client X\n- [ ] Review Pricing Strategy\n\n(Model followed the 'Action Plan' example pattern.)", type: "good" };
        if (selectedTemplate === 'risk') return { text: "**Risk Register:**\n| Risk | Impact | Owner |\n| Pricing | High | Sales |\n\n(Model followed the 'Table' example pattern.)", type: "good" };
    };

    const result = getResult();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Fix the messy notes by choosing an example format:
            </div>

            <div className={styles.options}>
                <button
                    className={`${styles.optBtn} ${selectedTemplate === 'none' ? styles.active : ''}`}
                    onClick={() => handleSelect('none')}
                >
                    No Example
                </button>
                <button
                    className={`${styles.optBtn} ${selectedTemplate === 'action' ? styles.active : ''}`}
                    onClick={() => handleSelect('action')}
                >
                    + Action Item Ex.
                </button>
                <button
                    className={`${styles.optBtn} ${selectedTemplate === 'risk' ? styles.active : ''}`}
                    onClick={() => handleSelect('risk')}
                >
                    + Risk Table Ex.
                </button>
            </div>

            <motion.div
                className={`${styles.outputBox} ${styles[result.type]}`}
                key={selectedTemplate}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className={styles.boxLabel}>
                    {result.type === 'good' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                    LLM Output
                </div>
                <div className={styles.boxContent}>{result.text}</div>
            </motion.div>
        </div>
    );
};

export default FewShotPromptFixer;
