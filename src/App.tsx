import React from "react";
import { motion } from "framer-motion";
import "./App.css";

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

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

// https://www.framer.com/motion/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <motion.div
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <h1 id="logo" className="font-effect-anaglyph">
            J-Along
          </h1>
          <motion.button className="item" variants={item}>
            Play
          </motion.button>
          <motion.button className="item" variants={item}>
            Stats
          </motion.button>
        </motion.div>
      </header>
      <footer id="footer">build 36d4f24c - v 0.1.0</footer>
    </div>
  );
}

export default App;
