import ExportOutlined from '@ant-design/icons/ExportOutlined';
import Tooltip from 'antd/lib/tooltip';
import React from 'react';

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
          className={`inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-semibold capitalize text-blue-700 ring-1 ring-inset ring-blue-700/10`}
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
