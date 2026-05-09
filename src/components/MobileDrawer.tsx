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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="fixed top-0 left-0 h-full w-[320px] bg-surface-container-low shadow-lg flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the drawer
          >
            <div className="flex justify-end p-4 border-b border-outline-variant/30">
              <X
                className="cursor-pointer text-on-surface-variant hover:text-primary transition"
                onClick={onClose}
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              <SurahList isMobileDrawer={true} onClose={onClose} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
