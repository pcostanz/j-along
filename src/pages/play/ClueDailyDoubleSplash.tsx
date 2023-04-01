import React from "react";
import { motion } from "framer-motion";
import "./ClueDailyDoubleSplash.css";

// TODO: Originally I wanted to have confetti but it's not true to Jeopardy
// so look into animate rotate and scale to flip the text like the show does
// https://framermotionplayground.com/tutorial/flashcards
const ClueDailyDoubleSplash: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="daily-double-splash"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        id="daily-double-container"
        className="font-effect-anaglyph"
      >
        <div>DAILY</div>
        <div>DOUBLE</div>
      </motion.div>
    </motion.div>
  );
};

export default ClueDailyDoubleSplash;
