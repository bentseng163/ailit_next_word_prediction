import React, { useState } from 'react';
import { ZoomIn, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const PlausibilityImageActivity = ({ onComplete }) => {
    const images = [
        {
            id: 1,
            title: "Concept A: Product Hero",
            desc: "A sleek smart speaker on a wooden desk.",
            issue: "Text on buttons is gibberish ('VOLUUME').",
            correctAction: 'reject',
            feedback: "Correct. The text is hallucinated. Diffusion models struggle with spelling. Reject or fix in post."
        },
        {
            id: 2,
            title: "Concept B: Lifestyle Shot",
            desc: "A happy family using the device in a living room.",
            issue: "None. Lighting is good, hands are hidden, faces are clear.",
            correctAction: 'publish',
            feedback: "Good eye. This one avoids the common failure modes (hands, text) and looks consistent."
        },
        {
            id: 3,
            title: "Concept C: Macro Detail",
            desc: "Close up of the speaker mesh texture.",
            issue: "The mesh pattern turns into organic squiggles on the left side.",
            correctAction: 'concept',
            feedback: "Right. It's a cool texture, but physically impossible for a manufactured product. Good for 'Concept' inspiration, bad for 'Product Truth'."
        }
    ];

    const [currentImageIdx, setCurrentImageIdx] = useState(0);
    const [selections, setSelections] = useState({}); // { id: 'action' }

    const handleAction = (action) => {
        const currentImg = images[currentImageIdx];
        setSelections(prev => ({ ...prev, [currentImg.id]: action }));
    };

    const nextImage = () => {
        if (currentImageIdx < images.length - 1) {
            setCurrentImageIdx(currentImageIdx + 1);
        } else {
            if (onComplete) onComplete();
        }
    };

    const currentImg = images[currentImageIdx];
    const hasSelected = selections[currentImg.id] !== undefined;
    const isCorrect = hasSelected && selections[currentImg.id] === currentImg.correctAction;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

            {/* Image Placeholder Area */}
            <div style={{
                flex: 1,
                background: '#e2e8f0',
                borderRadius: '12px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                marginBottom: '20px',
                minHeight: '200px'
            }}>
                <div style={{ fontSize: '4rem', opacity: 0.2 }}>🖼️</div>
                <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{currentImg.title}</p>
                <p style={{ textAlign: 'center', color: '#64748b' }}>{currentImg.desc}</p>
                <p style={{ marginTop: '10px', fontSize: '0.8rem', background: '#fff', padding: '4px 8px', borderRadius: '4px' }}>
                    Issue Hint: {currentImg.issue}
                </p>

                <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.1)', padding: '4px', borderRadius: '50%' }}>
                    <ZoomIn size={20} />
                </div>
            </div>

            {/* Controls */}
            {!hasSelected ? (
                <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                    <button onClick={() => handleAction('concept')} className="interactive-btn" style={{ background: '#fef3c7', borderColor: '#d97706', color: '#92400e' }}>
                        Stack: Concept Only
                    </button>
                    <button onClick={() => handleAction('publish')} className="interactive-btn" style={{ background: '#dcfce7', borderColor: '#16a34a', color: '#15803d' }}>
                        Ship: Publish
                    </button>
                    <button onClick={() => handleAction('reject')} className="interactive-btn" style={{ background: '#fee2e2', borderColor: '#dc2626', color: '#991b1b' }}>
                        Trash: Reject
                    </button>
                </div>
            ) : (
                <div style={{ animation: 'fadeIn 0.3s' }}>
                    <div style={{
                        padding: '16px',
                        borderRadius: '8px',
                        background: isCorrect ? '#f0fdf4' : '#fef2f2',
                        border: isCorrect ? '1px solid #bbf7d0' : '1px solid #fecaca',
                        marginBottom: '16px'
                    }}>
                        <p style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', color: isCorrect ? '#166534' : '#991b1b' }}>
                            {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                            {isCorrect ? "Spot On!" : "Not quite."}
                        </p>
                        <p style={{ marginTop: '8px', color: '#333' }}>{currentImg.feedback}</p>
                    </div>

                    <button
                        onClick={nextImage}
                        className="interactive-btn-primary"
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        {currentImageIdx < images.length - 1 ? "Next Image ->" : "Finish"}
                    </button>
                </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '16px', color: '#94a3b8', fontSize: '0.8rem' }}>
                Image {currentImageIdx + 1} of {images.length}
            </div>
        </div>
    );
};

export default PlausibilityImageActivity;
