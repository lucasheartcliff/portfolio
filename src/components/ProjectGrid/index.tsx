import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import type { Props as CardProps } from '@/components/ProjectCard';
import ProjectCard from '@/components/ProjectCard';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

interface Props {
  items: CardProps[];
  initialItemsCount?: number;
  itemsToAdd?: number;
}

export default function ProjectGrid({
  items,
  initialItemsCount = 5,
  itemsToAdd = 5,
}: Props) {
  const { t } = useTranslation('common');
  const [visibleItems, setVisibleItems] = useState(initialItemsCount);

  const handleShowMore = () => {
    setVisibleItems((prevCount) => prevCount + itemsToAdd);
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={visibleItems}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="my-2 flex w-full flex-wrap justify-start gap-1.5"
      >
        {items.slice(0, visibleItems).map((item, index) => (
          <motion.div key={index} variants={itemVariants} className="min-w-0 w-full md:w-auto">
            <ProjectCard {...item} />
          </motion.div>
        ))}
      </motion.div>
      {visibleItems < items.length && (
        <button
          onClick={handleShowMore}
          className="mt-4 rounded bg-blue-500 p-4 text-white"
        >
          {t('Show more projects...')}
        </button>
      )}
    </div>
  );
}
