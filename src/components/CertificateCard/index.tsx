import ExportOutlined from '@ant-design/icons/ExportOutlined';
import Tooltip from 'antd/lib/tooltip';
import React from 'react';

import { getPlatformColor } from '@/utils';

import Link from '../Link';

interface Props {
  name: string;
  platform: string;
  url: string;
}

export default function CertificateCard({ name, platform, url }: Props) {
  return (
    <div className="flex h-20 w-full flex-row items-center  justify-center border p-4 ">
      <div className="w-11/12">
        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold text-black">
          <Tooltip title={name}>
            <span>{name}</span>
          </Tooltip>
        </div>
        <div
          style={{ backgroundColor: getPlatformColor(platform) }}
          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold capitalize text-white `}
        >
          {platform}
        </div>
      </div>

      <div className="ml-5 items-end justify-center font-bold no-underline hover:no-underline">
        <Link target="_blank" href={url}>
          <ExportOutlined className="text-base font-extrabold text-black" />
        </Link>
      </div>
    </div>
  );
}
