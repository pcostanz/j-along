import React from "react";
// import Confetti from "react-confetti";
import { motion } from "framer-motion";
import "./ClueDailyDoubleSplash.css";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

// TODO: Originally I wanted to have confetti but it's not true to Jeopardy
// so look into animate rotate and scale to flip the text like the show does
const ClueDailyDoubleSplash: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="daily-double-splash"
    >
      {/* <Confetti /> */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
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
