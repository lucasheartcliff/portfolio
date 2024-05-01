import BranchesOutlined from '@ant-design/icons/BranchesOutlined';
import ExportOutlined from '@ant-design/icons/ExportOutlined';
import StarOutlined from '@ant-design/icons/StarOutlined';
import Tooltip from 'antd/lib/tooltip';
import React from 'react';

import { getLanguageColor } from '@/utils';

import ColorfulDot from '../ColorfulDot';
import Link from '../Link';

export interface Props {
  name: string;
  language: string;
  forks: number;
  stars: number;
  url: string;
}

export default function ProjectCard({
  name,
  language,
  forks,
  stars,
  url,
}: Props) {
  return (
    <div className="flex h-28 w-full flex-row items-center justify-center border p-4 text-base shadow-md md:w-fit md:text-xl">
      <div className="w-full">
        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-black">
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

      <div className="ml-5 items-end justify-center">
        <Link target="_blank" href={url}>
          <ExportOutlined className="text-base font-extrabold text-black" />
        </Link>
      </div>
    </div>
  );
}
