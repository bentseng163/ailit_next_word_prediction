import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import InteractiveCard from '../components/InteractiveCard/InteractiveCard';

const Lesson2 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        {
            title: "Coming Soon",
            text: (
                <div style={{ textAlign: "center", paddingTop: 20 }}>
                    <p>This module "Advanced Prompt Engineering" is coming next week.</p>
                    <p>It will cover shifting probability distributions using context constraints.</p>
                </div>
            ),
            component: null,
            nextLabel: "Back to Home"
        }
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
                nextLabel={currentContent.nextLabel}
            >
                <div style={{ marginBottom: 20 }}>
                    {currentContent.text}
                </div>
            </InteractiveCard>
        </Layout>
    );
};

export default Lesson2;
