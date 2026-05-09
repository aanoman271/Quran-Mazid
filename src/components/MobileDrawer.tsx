"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SurahList from "./SurahList";
import { X } from "lucide-react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop: Fade In/Out */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar: Slide In/Out */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            /* cubic-bezier ব্যবহার করা হয়েছে একদম প্রিমিয়াম স্মুথনেসের জন্য */
            transition={{
              duration: 0.4,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="absolute top-0 left-0 h-full w-[320px] bg-surface-container-low shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Area */}
            <div className="flex justify-end p-4 border-b border-outline-variant/20">
              <button
                onClick={onClose}
                className="p-2 hover:bg-primary/10 rounded-full transition-colors active:scale-90"
              >
                <X className="w-6 h-6 text-on-surface-variant hover:text-primary" />
              </button>
            </div>

            {/* List Area */}
            <div className="flex-1 overflow-hidden">
              <SurahList isMobileDrawer={true} onClose={onClose} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
