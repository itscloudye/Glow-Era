import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full h-full flex-grow flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
