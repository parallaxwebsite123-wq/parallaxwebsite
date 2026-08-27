import { motion, useInView } from 'motion/react';
import React, { useRef, useEffect, useState } from 'react';

export default function MotionReveal({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -50px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // premium custom easing
      }}
    >
      {children}
    </motion.div>
  );
}
