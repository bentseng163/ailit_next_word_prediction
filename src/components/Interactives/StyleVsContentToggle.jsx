import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './StyleVsContentToggle.module.css';
import { Palette, Box } from 'lucide-react';

const StyleVsContentToggle = ({ onComplete }) => {
    const [styleShift, setStyleShift] = useState(false);
    const [contentShift, setContentShift] = useState(false);

    const toggleStyle = () => {
        setStyleShift(!styleShift);
        checkComplete(!styleShift, contentShift);
    };

    const toggleContent = () => {
        setContentShift(!contentShift);
        checkComplete(styleShift, !contentShift);
    };

    const checkComplete = (s, c) => {
        if ((s || c) && onComplete) onComplete();
    };

    // Determine visual state based on toggles
    // 00: Base (City - Cyberpunk)
    // 10: Style Shift (City - Watercolor)
    // 01: Content Shift (Forest - Cyberpunk)
    // 11: Both (Forest - Watercolor)

    const getVisualLabel = () => {
        const style = styleShift ? "Watercolor" : "Cyberpunk";
        const content = contentShift ? "Ancient Forest" : "Futuristic City";
        return `${style} ${content}`;
    };

    const getVisualStyles = () => {
        let background = "linear-gradient(135deg, #111 0%, #333 100%)";
        if (!styleShift && !contentShift) background = "linear-gradient(135deg, #0f172a 0%, #d946ef 100%)"; // Cyber City
        if (styleShift && !contentShift) background = "linear-gradient(135deg, #fefce8 0%, #facc15 100%)"; // Watercolor City
        if (!styleShift && contentShift) background = "linear-gradient(135deg, #022c22 0%, #10b981 100%)"; // Cyber Forest
        if (styleShift && contentShift) background = "linear-gradient(135deg, #f0fdf4 0%, #86efac 100%)"; // Watercolor Forest

        return { background };
    };

    return (
        <div className={styles.container}>
            <div className={styles.imagePreview} style={getVisualStyles()}>
                <div className={styles.labelOverlay}>
                    {getVisualLabel()}
                </div>
            </div>

            <div className={styles.controls}>
                <button
                    className={`${styles.toggleBtn} ${styleShift ? styles.active : ''}`}
                    onClick={toggleStyle}
                >
                    <Palette size={18} />
                    Change Style
                </button>

                <button
                    className={`${styles.toggleBtn} ${contentShift ? styles.active : ''}`}
                    onClick={toggleContent}
                >
                    <Box size={18} />
                    Change Content
                </button>
            </div>

            <div className={styles.explanation}>
                <div className={styles.expHeader}>What changed?</div>
                <div className={styles.expText}>
                    {!styleShift && !contentShift && "Base Prompt: 'City in neon lights'."}
                    {styleShift && !contentShift && "Style drifted: Now it's a soft painting."}
                    {!styleShift && contentShift && "Content drifted: City became a forest."}
                    {styleShift && contentShift && "Total drift: Everything changed!"}
                </div>
            </div>
        </div>
    );
};

export default StyleVsContentToggle;
