import BranchesOutlined from '@ant-design/icons/BranchesOutlined';
import ExportOutlined from '@ant-design/icons/ExportOutlined';
import StarOutlined from '@ant-design/icons/StarOutlined';
import Tooltip from 'antd/lib/tooltip';
import { motion } from 'framer-motion';
import React from 'react';

import useShinyHover from '@/hooks/useShinyHover';
import { getLanguageColor } from '@/utils';

import ColorfulDot from '../ColorfulDot';
import Link from '../Link';

export interface Props {
  name: string;
  language: string;
  forks: number;
  stars: number;
  url: string;
  description?: string;
  tags?: string[];
}

export default function ProjectCard({
  name,
  language,
  forks,
  stars,
  url,
  description,
  tags,
}: Props) {
  const { ref, shinyOverlayStyle, onMouseMove, onMouseLeave } = useShinyHover();

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -4 }}
      transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
      className="relative flex w-full flex-col border border-gray-200 p-4 text-base shadow-md transition-shadow duration-200 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:text-white md:w-72 md:text-xl"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={shinyOverlayStyle}
      />
      <div className="flex flex-row items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold text-black dark:text-white">
            <Tooltip title={name}>
              <span>{name}</span>
            </Tooltip>
          </div>
          <div className="mt-1 flex w-full flex-row items-center capitalize">
            <ColorfulDot color={getLanguageColor(language)} label={language} />

            <div
              className={`ml-3 inline-flex justify-start text-sm md:text-base`}
            >
              <BranchesOutlined />
              <span className="ml-1">{forks}</span>
            </div>
            <div
              className={`ml-3 inline-flex justify-start text-sm md:text-base`}
            >
              <StarOutlined />
              <span className="ml-1">{stars}</span>
            </div>
          </div>
        </div>

        <div className="ml-3 mt-1 flex shrink-0 items-center justify-center">
          <Link target="_blank" href={url}>
            <ExportOutlined className="text-base font-extrabold text-black dark:text-white" />
          </Link>
        </div>
      </div>
      {description && (
        <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
      {tags && tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
