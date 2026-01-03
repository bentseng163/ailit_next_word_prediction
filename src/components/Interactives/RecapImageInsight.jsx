import React from 'react';
import PromptDebugger from './PromptDebugger';

const RecapImageInsight = ({ onComplete }) => {
    const recapScenarios = [
        {
            id: 1,
            context: "Scenario: Generative Historical Archive",
            prompt: "1920s street style photo of a gentleman in New York.",
            resultDesc: "Result: Perfect sepia tone, period suit... but he's holding an iPhone.",
            options: [
                { id: 'plausible', label: "Plausibility Trap", correct: true, reason: "Correct! The 'photo style' is plausible (sepia, suit), so the model is confident. But the 'object co-occurrence' (person + phone) leaked in from modern training data." },
                { id: 'glitch', label: "Random Error", correct: false, reason: "It's not random. The model associates 'person standing' with 'holding phone' strongly from its dataset, overriding the historical date." }
            ]
        }
    ];

    return (
        <PromptDebugger
            onComplete={onComplete}
            customScenarios={recapScenarios}
        />
    );
};

export default RecapImageInsight;
