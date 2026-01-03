import React, { useState } from 'react';
import styles from './TransformerConnect.module.css';
import { Unplug, Zap, Link as LinkIcon } from 'lucide-react';

const TransformerConnect = ({ onComplete }) => {
    const [connected, setConnected] = useState(false);

    const handleConnect = () => {
        setConnected(true);
        if (onComplete) onComplete();
    };

    return (
        <div className={styles.container}>
            <div className={styles.stripContainer}>
                {/* Frame 1 */}
                <div className={styles.frame}>
                    <div className={styles.frameLabel}>Sec 1</div>
                    <div className={styles.objectA}>🐶</div>
                </div>

                {/* Connection Line */}
                <div className={styles.connectionZone}>
                    {connected ? (
                        <div className={styles.activeLink}>
                            <div className={styles.pulse} />
                        </div>
                    ) : (
                        <div className={styles.brokenLink}>
                            <Unplug size={24} className={styles.disconnectIcon} />
                        </div>
                    )}
                </div>

                {/* Frame 2 */}
                <div className={styles.frame}>
                    <div className={styles.frameLabel}>Sec 5</div>
                    {connected ? (
                        <div className={styles.objectA}>🐶</div>
                    ) : (
                        <div className={styles.objectB}>🐱</div> // Glitch: Dog becomes Cat
                    )}
                </div>
            </div>

            <div className={styles.controls}>
                {!connected ? (
                    <button className={styles.connectBtn} onClick={handleConnect}>
                        <LinkIcon size={16} /> Connect Attention
                    </button>
                ) : (
                    <div className={styles.status}>
                        <Zap size={16} color="#eab308" fill="#eab308" />
                        <span>Transformer Sync Active</span>
                    </div>
                )}
            </div>

            <div className={styles.caption}>
                {connected ? (
                    <p>
                        <strong>The Editor (Transformer):</strong> connects "dog" at Sec 1 to Sec 5. No teleporting. No morphing into a cat.
                    </p>
                ) : (
                    <p>
                        <strong>Without Attention:</strong> The model forgets what it drew 4 seconds ago. The dog might drift into a cat.
                    </p>
                )}
            </div>
        </div>
    );
};

export default TransformerConnect;
