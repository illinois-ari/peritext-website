import React from "react";
import { motion } from "framer-motion";
import styles from "./Bookshelf.module.css";

const Bookshelf: React.FC = () => {
  const text = "PERITEXT".split("");

  // Framer Motion variants for smooth sliding in from further left
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Increased stagger for a slower cascade
      },
    },
  };

  const letterVariants = {
    hidden: { x: -100, opacity: 0 }, // Start farther left
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12, // Reduced damping for a smooth slide
        duration: 0.6,
      },
    },
  };

  return (
    <div className={styles.bookshelfWrapper}>
      <div className={styles.booksContainer}>
        <div className={styles.bookend}></div>
        <div className={`${styles.book} ${styles.book1}`}></div>
        <div className={`${styles.book} ${styles.book2}`}></div>
        <div className={`${styles.book} ${styles.book3}`}></div>
        <div className={`${styles.book} ${styles.book4}`}></div>

        {/* Animated Text Container */}
        <motion.div
          className={styles.textContainer}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {text.map((letter, index) => (
            <motion.h1
              key={index}
              className={styles.letter}
              variants={letterVariants}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.h1>
          ))}
        </motion.div>

        <div className={styles.shelf}></div>
      </div>
    </div>
  );
};

export default Bookshelf;
