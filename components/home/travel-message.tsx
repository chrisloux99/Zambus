"use client";

import { motion } from 'framer-motion';

export function TravelMessage() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient">
            Travel With Ease Across Zambia
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book your bus tickets online and enjoy comfortable intercity travel with our trusted partners
          </p>
        </motion.div>
      </div>
    </section>
  );
}