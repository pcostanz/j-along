import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RELEASE, IS_PREVIEW } from "../../env";
import "./Home.css";

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

const MotionLink = motion(Link);

const Home: React.FC = () => {
  return (
    <div>
      <div id="home">
        <motion.div
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <h1 id="logo" className="font-effect-anaglyph">
            J-Along
          </h1>
          <MotionLink
            whileTap={{ scale: 1.1 }}
            to="/play"
            className="item"
            variants={item}
          >
            Play
          </MotionLink>
          <MotionLink
            whileTap={{ scale: 1.1 }}
            to="/stats"
            className="item"
            variants={item}
          >
            Stats
          </MotionLink>
        </motion.div>
      </div>
      <footer id="footer">{`version: ${IS_PREVIEW && "PREVIEW /"} ${
        RELEASE || "local"
      }`}</footer>
    </div>
  );
};

export default Home;
