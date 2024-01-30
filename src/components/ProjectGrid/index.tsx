import React, { useState } from 'react';

import type { Props as CardProps } from '@/components/ProjectCard';
import ProjectCard from '@/components/ProjectCard';

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
  const [visibleItems, setVisibleItems] = useState(initialItemsCount);

  const handleShowMore = () => {
    setVisibleItems((prevCount) => prevCount + itemsToAdd);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="my-2 flex w-full flex-wrap justify-items-start gap-1.5">
        {items.slice(0, visibleItems).map((item, index) => (
          <ProjectCard key={index} {...item} />
        ))}
      </div>
      {visibleItems < items.length && (
        <button
          onClick={handleShowMore}
          className="mt-4 rounded bg-blue-500 p-4 text-white"
        >
          {'Show more projects...'}
        </button>
      )}
    </div>
  );
}
