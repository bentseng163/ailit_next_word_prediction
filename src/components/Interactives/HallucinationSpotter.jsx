import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './HallucinationSpotter.module.css';
import { Search, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

const HallucinationSpotter = ({ onComplete }) => {
    const [found, setFound] = useState([]);
    const [showDrawer, setShowDrawer] = useState(false);

    const content = {
        title: "Meeting Notes: Q3 Strategy",
        items: [
            { id: 1, text: "Revenue is up 12% YoY, driven by enterprise sales.", isFake: false },
            { id: 2, text: "User retention remains stable at 85%.", isFake: false },
            { id: 3, text: "Competitor Falcon just launched a features clone this morning.", isFake: true, feedback: "Evidence Check: No signal of this launch in any news or feed. The model predicted this because 'Competitor' + 'launch' is a common pattern." },
            { id: 4, text: "Team morale is reported as high across engineering.", isFake: false }
        ]
    };

    const handleTap = (item) => {
        if (found.includes(item.id)) return;

        if (item.isFake) {
            setFound([...found, item.id]);
            setShowDrawer(true);
            if (onComplete) onComplete();
        } else {
            alert("No red flags here. This statement tracks with known data.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Search size={18} />
                <span>Tap the "hallucinated" update</span>
            </div>

            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <FileText size={16} />
                    <span>{content.title}</span>
                </div>
                <ul className={styles.list}>
                    {content.items.map((item) => (
                        <motion.li
                            key={item.id}
                            className={`${styles.listItem} ${found.includes(item.id) ? styles.flagged : ''}`}
                            onClick={() => handleTap(item)}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className={styles.bullet}>•</span>
                            <span>{item.text}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>

            {showDrawer && (
                <motion.div
                    className={styles.drawer}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <div className={styles.drawerHeader}>
                        <AlertTriangle size={20} className={styles.warningIcon} />
                        <h4>Evidence Check</h4>
                    </div>
                    <p className={styles.feedback}>{content.items.find(i => i.isFake).feedback}</p>
                    <div className={styles.mechanicNote}>
                        <strong>Why?</strong> The model prioritized a plausible dramatic update over facts.
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default HallucinationSpotter;
