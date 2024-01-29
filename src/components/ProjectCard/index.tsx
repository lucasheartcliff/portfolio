import BranchesOutlined from "@ant-design/icons/BranchesOutlined";
import ExportOutlined from "@ant-design/icons/ExportOutlined";
import StarOutlined from "@ant-design/icons/StarOutlined";
import Badge from "antd/lib/badge";
import Tooltip from "antd/lib/tooltip";
import React from "react";

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
    <div className="flex h-28 flex-row items-center justify-center  border p-4 shadow-lg">
      <div className="w-full">
        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold text-black">
          <Tooltip title={name}>
            <span>{name}</span>
          </Tooltip>
        </div>
        <div className="mt-1 w-full items-center capitalize">
          <Badge status="success" text={language} />

          <div className={`ml-3 inline-flex justify-start text-sm`}>
            <BranchesOutlined />
            <span className="ml-1">{forks}</span>
          </div>
          <div className={`ml-3 inline-flex justify-start text-sm`}>
            <StarOutlined />
            <span className="ml-1">{stars}</span>
          </div>
        </div>
      </div>

      <div className="ml-5 items-end justify-center">
        <a target="_blank" href={url}>
          <ExportOutlined className="text-base font-extrabold text-black" />
        </a>
      </div>
    </div>
  );
}
