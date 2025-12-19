import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import modules from './Layout.module.css';

const Layout = ({ children, progress, totalPages, currentPage }) => {
  return (
    <div className={modules.container}>
      {/* Mobile Frame Constraint (for desktop viewing) */}
      <div className={modules.mobileFrame}>
        
        {/* Header / Progress */}
        <div className={modules.header}>
          <div className={modules.progressBarContainer}>
            <motion.div 
              className={modules.progressBarFill}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className={modules.pageIndicator}>
            {currentPage + 1} / {totalPages}
          </div>
        </div>

        {/* Main Content Area */}
        <div className={modules.content}>
          {children}
        </div>

      </div>
    </div>
  );
};

export default Layout;
