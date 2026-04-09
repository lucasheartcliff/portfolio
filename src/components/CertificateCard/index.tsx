import ExportOutlined from '@ant-design/icons/ExportOutlined';
import Tooltip from 'antd/lib/tooltip';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { getPlatformColor } from '@/utils';

import Link from '../Link';

interface Props {
  name: string;
  platform: string;
  url: string;
}

export default function CertificateCard({ name, platform, url }: Props) {
  const { t } = useTranslation('common');
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
      className="flex h-20 w-full flex-row items-center justify-center overflow-hidden border border-gray-200 p-4 text-base shadow-md transition-shadow duration-200 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 md:text-xl"
    >
      <div className="min-w-0 flex-1">
        <Tooltip title={t(name)}>
          <div className="truncate font-semibold text-black dark:text-white">
            {t(name)}
          </div>
        </Tooltip>
        <div
          style={{ backgroundColor: getPlatformColor(platform) }}
          className={`inline-flex items-center rounded-md px-2 py-1  text-sm font-semibold capitalize text-white md:text-base`}
        >
          {platform}
        </div>
      </div>

      <div className="ml-5 items-end justify-center font-bold no-underline hover:no-underline">
        <Link target="_blank" href={url}>
          <ExportOutlined className="text-base font-extrabold text-black dark:text-white" />
        </Link>
      </div>
    </motion.div>
  );
}
