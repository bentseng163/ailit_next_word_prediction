import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FewShotSteerer.module.css';
import { RefreshCw } from 'lucide-react';

const FewShotSteerer = ({ onComplete }) => {
    const [mode, setMode] = useState('0'); // '0', '1', '3'
    const [version, setVersion] = useState(0); // Increment to trigger re-render/animation
    const [outputs, setOutputs] = useState({
        '0': "Here are the notes: met with client, they want feature X by Q4, also mentioned pricing is high. Action item: email engineering.",
        '1': "Meeting Summary:\n- Client: Acme Corp\n- Key Ask: Feature X (Q4)\n- Risks: Pricing concerns\n- Action: Email Engineering",
        '3': "MEETING BRIEF\n\nCLIENT: Acme Corp\nKEY ASK: Feature X (Target: Q4)\nRISKS: Pricing sensitivity detected\nACTION: Engineering sync required"
    });

    // Variations for 0 examples (Chaos)
    const zeroShotVariations = [
        "Here are the notes: met with client, they want feature X by Q4, also mentioned pricing is high. Action item: email engineering.",
        "Met client. Discussed Feature X (Q4 deadline). Pricing is an issue. Need to email eng.",
        "Client notes: 1. Feature X 2. Q4 3. High Price. TODO: Eng email.",
        "Just finished call. They need feature X in Q4. Pricing pushback!! Pls email engineering.",
        "Notes from today: Client wants X. When? Q4. Cost? Too high. Action: Tell engineering."
    ];

    // Variations for 1 example (Some structure, but inconsistent details)
    const oneShotVariations = [
        "Meeting Summary:\n- Client: Acme Corp\n- Key Ask: Feature X (Q4)\n- Risks: Pricing concerns\n- Action: Email Engineering",
        "Meeting Summary:\n* Customer: Acme Corp\n* Request: Feature X (by Q4)\n* Blocker: High price\n* Next Step: Engineering Email",
        "Meeting Summary:\n• Who: Acme Corp\n• What: Feature X / Q4\n• Issues: Price\n• To Do: Email Eng team"
    ];

    // Variations for 3 examples (Consistent structure)
    const threeShotVariations = [
        "MEETING BRIEF\n\nCLIENT: Acme Corp\nKEY ASK: Feature X (Target: Q4)\nRISKS: Pricing sensitivity detected\nACTION: Engineering sync required",
        "MEETING BRIEF\n\nCLIENT: Acme Corp\nKEY ASK: Feature X (Target: Q4)\nRISKS: Pricing sensitivity detected\nACTION: Engineering sync required", // Exactly predictable
        "MEETING BRIEF\n\nCLIENT: Acme Corp\nKEY ASK: Feature X (Target: Q4)\nRISKS: Pricing sensitivity detected\nACTION: Engineering sync required"
    ];

    const generate = () => {
        setVersion(prev => prev + 1);

        let pool = [];
        if (mode === '0') pool = zeroShotVariations;
        else if (mode === '1') pool = oneShotVariations;
        else pool = threeShotVariations;

        const randomChoice = pool[Math.floor(Math.random() * pool.length)];

        setOutputs(prev => ({
            ...prev,
            [mode]: randomChoice
        }));
    };

    // Auto-generate when switching modes for the first time or if consistent
    useEffect(() => {
        generate();
    }, [mode]);

    const handleMode = (m) => {
        setMode(m);
        if (m === '3' && onComplete) onComplete();
    };

    // Calculate meter width and color based on mode
    const getMeterStats = () => {
        if (mode === '0') return { width: '15%', color: 'var(--color-warning)', label: 'Low (High Variance)' };
        if (mode === '1') return { width: '60%', color: '#facc15', label: 'Medium (Some Variance)' }; // Yellow
        if (mode === '3') return { width: '100%', color: 'var(--color-accent-success)', label: 'High (Predictable)' };
    };

    const meterStats = getMeterStats();

    return (
        <div className={styles.container}>
            <div className={styles.instruction}>
                Steer the format by adding examples:
            </div>

            <div className={styles.controls}>
                {['0', '1', '3'].map(m => (
                    <button
                        key={m}
                        className={`${styles.btn} ${mode === m ? styles.active : ''}`}
                        onClick={() => handleMode(m)}
                    >
                        {m} Example{m !== '1' && 's'}
                    </button>
                ))}
            </div>

            <div className={styles.preview}>
                <div className={styles.previewHeader}>
                    <div className={styles.label}>LLM Output Preview</div>
                    <div className={styles.consistencyBadge} style={{ color: meterStats.color }}>
                        {meterStats.label}
                    </div>
                </div>

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={`${mode}-${version}`}
                        className={styles.output}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                    >
                        {outputs[mode]}
                    </motion.div>
                </AnimatePresence>
            </div>

            <button className={styles.regenBtn} onClick={generate}>
                <RefreshCw size={16} />
                Regenerate Output
            </button>

            <div className={styles.meterBox}>
                <div className={styles.meterLabel}>Format Consistency</div>
                <div className={styles.meterTrack}>
                    <motion.div
                        className={styles.meterFill}
                        animate={{
                            width: meterStats.width,
                            backgroundColor: meterStats.color
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default FewShotSteerer;
