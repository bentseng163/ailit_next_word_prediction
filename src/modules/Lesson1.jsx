import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import InteractiveCard from '../components/InteractiveCard/InteractiveCard';

// Components
import LyricsCompleter from '../components/Interactives/LyricsCompleter';
import PredictionVisualizer from '../components/Interactives/PredictionVisualizer';
import ProbabilityGraph from '../components/Interactives/ProbabilityGraph';
import AmbiguityScenario from '../components/Interactives/AmbiguityScenario';
import HallucinationSpotter from '../components/Interactives/HallucinationSpotter';
import StrategySimulation from '../components/Interactives/StrategySimulation';
import RAGProbabilityShift from '../components/Interactives/RAGProbabilityShift';
import RAGSnippetPicker from '../components/Interactives/RAGSnippetPicker';
import FewShotSteerer from '../components/Interactives/FewShotSteerer';
import FewShotPromptFixer from '../components/Interactives/FewShotPromptFixer';
import AccuracyCheck from '../components/Interactives/AccuracyCheck';

// Icons for Strategy Simulation
import { ClipboardList, FolderSearch, Layers, ShieldCheck } from 'lucide-react';

const Lesson1 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [canProceed, setCanProceed] = useState(true);

    const pages = [
        {
            title: "How LLMs Actually Work",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/cover.png"
                        alt="LLM cover"
                        style={{
                            width: "75%",
                            height: "auto",
                            display: "block",
                            margin: "0 auto 16px auto",
                            borderRadius: "12px",
                            boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                        }}
                    />
                    <p style={{ marginBottom: 8 }}>
                        <strong>Hot take:</strong> LLMs don’t “think.” They only guess the next word with confidence.
                    </p>
                    <p style={{ marginBottom: 8 }}>
                        In 10 minutes, you’ll learn <strong>one mechanism</strong> that explains the capabilities, creativity, hallucinations,
                        of LLMs and how to reduce “confident nonsense” in real decisions.
                    </p>
                    <p style={{ opacity: 0.85 }}>
                        You’ll also get three practical guardrails that make LLM output feel less like a magic trick and more like a reliable assistant.
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Start",
        },


        {
            title: "The Autocomplete Mystery (You’ve Done This Before)",
            /*
              Activity: LyricsCompleter
              Purpose: Demonstrate prediction ≠ thinking using a low-barrier fill-in-the-blank.
              Learner Action: Tap a word chip to complete a phrase.
            */
            text: (
                <>
                    <p>
                        If a sentence has a missing word, you can often fill it in instantly. Not because you’re “thinking deeply,”
                        but because you’ve seen similar patterns before.
                    </p>
                    <p>
                        That pattern-based guessing is the key to understanding LLMs. (Congrats—you’re a tiny biological autocomplete.)
                    </p>
                </>
            ),
            component: <LyricsCompleter onComplete={() => setCanProceed(true)} />,
            nextLabel: "So what is the mechanism?",
        },

        {
            title: "The Mechanism: Next-Word Prediction",
            /*
              Activity: PredictionVisualizer
              Purpose: Visualize context -> probability distribution -> next token -> repeat.
              Learner Action: Tap “Predict” to animate top candidates + probabilities.
            */
            text: (
                <>
                    <p>
                        An LLM reads the words so far, then computes a <strong>probability distribution</strong> over what word should come next.
                    </p>
                    <p>
                        It doesn’t “know” facts. It predicts language that looks most likely in this context.
                    </p>
                    <p style={{ marginTop: 8, opacity: 0.9 }}>
                        One mechanism, many outcomes: helpful drafts, creative ideas… and occasional hallucinations wearing a suit.
                    </p>
                </>
            ),
            component: <PredictionVisualizer onComplete={() => setCanProceed(true)} />,
            nextLabel: "Show me probabilities",
        },

        {
            title: "Probability, Not Truth (The Plot Twist)",
            /*
              Activity: ProbabilityGraph
              Purpose: Show multiple plausible next-words + optional 'creative' toggle.
              Learner Action: Observe probabilities; optional toggle shifts distribution.
            */
            text: (
                <>
                    <p>
                        The model doesn’t pick the “right” word. It picks a <strong>likely</strong> one.
                    </p>
                    <p>
                        Most of the time it chooses the top option. Sometimes it samples a lower-probability one—hello creativity 👋 and hello occasional nonsense.
                    </p>
                    <p style={{ marginTop: 8 }}>
                        Key idea: it’s always guessing. Just with a very fancy calculator.
                    </p>
                </>
            ),
            component: <ProbabilityGraph />,
            nextLabel: "So why hallucinations?",
        },

        {
            title: "Same Concept: Autocomplete vs LLM",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/autocomplete_vs_llm.png"
                        alt="Autocomplete vs LLM"
                        style={{
                            width: "75%",
                            height: "auto",
                            display: "block",
                            margin: "0 auto 16px auto",
                            borderRadius: "12px",
                        }}
                    />
                    <p>
                        Your phone autocomplete and an LLM share the same core move: predict what comes next.
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        The difference is scale. LLMs learned patterns from an enormous amount of text—so their guesses can look impressively “expert.”
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Where it goes wrong",
        },

        {
            title: "The Plausibility Trap (Fluent ≠ Grounded)",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/plausibility_scale.png"
                        alt="Plausibility vs Evidence"
                        style={{
                            width: "75%",
                            height: "auto",
                            display: "block",
                            margin: "0 auto 16px auto",
                            borderRadius: "12px",
                        }}
                    />
                    <p>
                        LLMs are optimized for <strong>plausible continuation</strong>—language that “fits.”
                    </p>
                    <p>
                        Plausible doesn’t mean verified. It means “this is what usually gets said next.”
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        The trap: polished text triggers human trust. (We are emotionally vulnerable to well-structured bullet points.)
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Ambiguity makes it worse…",
        },

        {
            title: "Interactive: The Ambiguity Trap",
            /*
              Activity: AmbiguityScenario
              Purpose: Show vague prompts increase degrees of freedom → model fills gaps via next-word prediction.
              Learner Action: Tap ambiguous parts -> Choose tighter rewrite.
            */
            text: (
                <>
                    <p>
                        When a question is vague, the model still has to produce the next word. So it fills missing details with the most “normal-sounding” story.
                    </p>
                    <p>
                        Your mission: spot the ambiguity, then tighten the prompt so the model’s probabilities align with what you actually mean.
                    </p>
                </>
            ),
            component: <AmbiguityScenario onComplete={() => setCanProceed(true)} />,
            nextLabel: "How do we mitigate it?",
        },

        {
            title: "3 Guardrails to Reduce Confident Guessing",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/strategy_summary.png"
                        alt="Strategy summary"
                        style={{
                            width: "75%",
                            height: "auto",
                            display: "block",
                            margin: "0 auto 12px auto",
                            borderRadius: "12px",
                        }}
                    />
                    <p style={{ marginBottom: 10, textAlign: "left" }}>
                        Since the model predicts what comes next, mitigation is about giving it better context so the “most likely next words” are closer to what you want.
                    </p>
                    <ul style={{ textAlign: "left", paddingLeft: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                        <li>
                            <strong>RAG:</strong> add relevant reference material so grounded words become more likely than generic storytelling.
                        </li>
                        <li>
                            <strong>One-shot / Few-shot:</strong> show examples so the structure and tone you want become more likely.
                        </li>
                        <li>
                            <strong>Human check:</strong> verify key claims so fluent errors don’t become real decisions.
                        </li>
                    </ul>
                </div>
            ),
            component: null,
            nextLabel: "Start with RAG",
        },

        // =========================
        // RAG (SCAFFOLDED)
        // =========================
        {
            title: "RAG: “Bring the Docs into the Room”",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/rag_before_after.png"
                        alt="RAG before/after"
                        style={{
                            width: "75%",
                            height: "auto",
                            display: "block",
                            margin: "0 auto 16px auto",
                            borderRadius: "12px",
                        }}
                    />
                    <p>
                        <strong>RAG</strong> (Retrieval-Augmented Generation) means: before the model predicts the next word, you first pull in relevant snippets
                        (notes, policies, reports, FAQs).
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        It’s still next-word prediction—just with better material to predict from.
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "See the probability shift",
        },

        {
            title: "RAG Visual: Context Shifts the Next Words",
            /*
              Activity: RAGProbabilityShift
              Purpose: Show task-specific probability distribution shift.
              Learner Action: Toggle "No Ref" vs "With Ref" -> Observe probability bars.
            */
            text: (
                <>
                    <p>
                        Watch the next-word probabilities change when you add the right snippets. “Evidence-aligned words” become more likely than “generic narratives.”
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        That’s RAG in one sentence: <strong>you shift the distribution by changing the context.</strong>
                    </p>
                </>
            ),
            component: <RAGProbabilityShift onComplete={() => setCanProceed(true)} />,
            nextLabel: "Try it yourself",
        },

        {
            title: "Interactive: RAG Builder (Pick the Best Snippets)",
            /*
              Activity: RAGSnippetPicker
              Purpose: Practice choosing what context to retrieve for grounding.
              Learner Action: Choose 2 of 5 snippet cards -> See generated output.
            */
            text: (
                <>
                    <p>
                        Quick practice: choose which snippets to attach so the model is less likely to “fill the gap” with confident guessing.
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        Your goal isn’t perfection. It’s making grounded continuations more likely than vibes.
                    </p>
                </>
            ),
            component: <RAGSnippetPicker onComplete={() => setCanProceed(true)} />,
            nextLabel: "Next: examples (few-shot)",
        },

        // =========================
        // ONE-SHOT / FEW-SHOT
        // =========================
        {
            title: "One-shot / Few-shot: “Show an Example Like This”",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/fewshot_before_after.png"
                        alt="Few-shot before/after"
                        style={{
                            width: "75%",
                            height: "auto",
                            display: "block",
                            margin: "0 auto 16px auto",
                            borderRadius: "12px",
                        }}
                    />
                    <p>
                        One-shot / few-shot means giving one or a few examples of what you want—especially when your request is underspecified.
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        You’re not adding new facts. You’re teaching the model what pattern to continue.
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "See it steer output",
        },

        {
            title: "Interactive: Few-shot Steering",
            /*
              Activity: FewShotSteerer
              Purpose: Show how adding examples changes probability of "follows format".
              Learner Action: Toggle Examples (0/1/3) -> Observe output & consistency meter.
            */
            text: (
                <>
                    <p>
                        Try toggling examples. Notice how the output becomes more consistent—not because the model “understands,”
                        but because the next words are now guided by a template-like pattern.
                    </p>
                </>
            ),
            component: <FewShotSteerer onComplete={() => setCanProceed(true)} />,
            nextLabel: "Do a quick challenge",
        },

        {
            title: "Interactive: Customer Review Summary Feature",
            /*
              Activity: FewShotPromptFixer
              Purpose: Learners practice choosing the best example template to reduce ambiguity.
              Learner Action: Select an example format -> Compare outputs.
            */
            text: (
                <>
                    <p>
                        <strong>Challenge:</strong> You are designing an AI customer review summary feature for an e-commerce website. The feature needs to auto-summarize reviews for *every* product category (Socks, Toasters, Laptops).
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        How do you prompt the model so it works for all of them?
                    </p>
                </>
            ),
            component: <FewShotPromptFixer onComplete={() => setCanProceed(true)} />,
            nextLabel: "Last: verify accuracy",
        },

        // =========================
        // HUMAN-IN-THE-LOOP
        // =========================
        {
            title: "Human Check: Catch Mistakes Before They Spread",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/hitl_loop.png"
                        alt="Human check loop"
                        style={{
                            width: "75%",
                            height: "auto",
                            display: "block",
                            margin: "0 auto 16px auto",
                            borderRadius: "12px",
                        }}
                    />
                    <p>
                        Even with RAG and examples, the model can still produce a confident mistake—because it’s still predicting words.
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        A human check is the final guardrail: verify key claims before they become a “fact” everyone repeats.
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Practice verifying claims",
        },

        {
            title: "Interactive: Accuracy Check (Supported or Not?)",
            /*
              Activity: AccuracyCheck
              Purpose: Practice verifying claims against provided sources.
              Learner Action: Tap claims -> Verify/Unverify in drawer.
            */
            text: (
                <>
                    <p>
                        Here’s a short AI-generated summary. Tap each claim to see whether the provided notes actually support it.
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        The skill isn’t “trusting AI” or “distrusting AI.” It’s knowing what needs verification.
                    </p>
                </>
            ),
            component: <AccuracyCheck onComplete={() => setCanProceed(true)} />,
            nextLabel: "Combine guardrails",
        },

        {
            title: "Scenario Practice: Pick the Right Guardrails",
            /*
              Activity: StrategySimulation (Calibration)
              Purpose: Choose guardrail bundles; feedback includes tradeoffs.
            */
            text: (
                <p>
                    You need a weekly update generated from messy notes + dashboards. It must be structured and safe enough to share broadly.
                    Which guardrails do you apply?
                </p>
            ),
            component: (
                <StrategySimulation
                    scenario={{
                        title: "Weekly Update Generator",
                        description: "Inputs: messy notes + dashboards. Output: structured update. Constraint: limited time.",
                        strategies: [
                            {
                                id: "fewshot",
                                name: "Few-shot Only",
                                icon: <ClipboardList size={24} />,
                                result: "Helps structure and tone, but doesn’t add evidence. The model can still fill gaps with plausible claims.",
                                isRecommended: false,
                            },
                            {
                                id: "rag",
                                name: "RAG Only",
                                icon: <FolderSearch size={24} />,
                                result: "Adds evidence, but output may still be inconsistent in structure. Great for grounding; weaker for predictable formatting.",
                                isRecommended: false,
                            },
                            {
                                id: "rag_fewshot",
                                name: "RAG + Few-shot",
                                icon: <Layers size={24} />,
                                result: "Best default. Evidence becomes more likely (RAG), and structure becomes more likely (Few-shot).",
                                isRecommended: true,
                            },
                            {
                                id: "all",
                                name: "RAG + Few-shot + Check",
                                icon: <ShieldCheck size={24} />,
                                result: "Safest for high visibility. Adds evidence + structure, then catches remaining confident errors.",
                                isRecommended: true,
                            },
                        ],
                    }}
                    onComplete={() => setCanProceed(true)}
                />
            ),
            nextLabel: "Finish",
        },

        {
            title: "Takeaway: One Mechanism, Three Guardrails",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/cheat_sheet_v2.png"
                        alt="Cheat sheet"
                        style={{
                            width: "75%",
                            height: "auto",
                            display: "block",
                            margin: "0 auto 16px auto",
                            borderRadius: "12px",
                        }}
                    />
                    <p style={{ marginBottom: 8 }}>
                        Everything today comes from one idea: the model predicts the next word.
                    </p>
                    <p style={{ marginBottom: 8 }}>
                        So the best mitigations don’t “fight the model.” They <strong>shape its context</strong> so the most likely next words are closer to what you want.
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        Bonus life lesson: be careful around anything that’s confident and well-written. (Including this page. 😄)
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Done ✅",
        },
    ];

    const nextSlide = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            onExit();
        }
    };

    const prevSlide = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        } else {
            onExit();
        }
    };

    const currentContent = pages[currentPage];
    const progress = ((currentPage + 1) / pages.length) * 100;

    return (
        <Layout
            progress={progress}
            totalPages={pages.length}
            currentPage={currentPage}
        >
            <InteractiveCard
                key={currentPage}
                title={currentContent.title}
                onNext={nextSlide}
                onBack={prevSlide}
                nextLabel={currentPage === pages.length - 1 ? "Complete Lesson" : currentContent.nextLabel}
                isNextDisabled={!canProceed && false}
            >
                <div style={{ marginBottom: 20 }}>
                    {currentContent.text}
                </div>

                <div style={{ marginTop: 20 }}>
                    {currentContent.component}
                </div>
            </InteractiveCard>
        </Layout>
    );
};

export default Lesson1;
