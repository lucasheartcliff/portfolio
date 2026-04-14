import { motion } from 'framer-motion';
import React from 'react';

import type { DevtoArticleIndex } from '@/services/devto';

import ArticleCard from '../ArticleCard';

interface Props {
  articles: DevtoArticleIndex[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function ArticleGrid({ articles }: Props) {
  if (!articles.length) return null;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="my-2 flex w-full flex-wrap justify-start gap-1.5"
      >
        {articles.map((article) => (
          <motion.div key={article.id} variants={itemVariants} className="min-w-0 w-full md:w-auto">
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
