import React from "react";
import Tooltip from "antd/lib/tooltip";
import ExportOutlined from "@ant-design/icons/ExportOutlined";

interface Props {
  name: string;
  platform: string;
  url: string;
}

export default function CertificateCard({ name, platform, url }: Props) {
  const colors: { [k: string]: string } = {
    udemy: "purple",
    alura: "blue",
  };

  const color: string = "gray";

  return (
    <div className="flex p-4 h-20 w-9/12 shadow-lg  items-center justify-center flex-row">
      <div className="w-11/12">
        <Tooltip title={name}>
          <div className="whitespace-nowrap w-full text-ellipsis overflow-hidden font-semibold text-black text-base">
            {name}
          </div>
        </Tooltip>
        <div
          className={`capitalize inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10`}
        >
          {platform}
        </div>
      </div>

      <div className=" ml-5 items-end justify-center text-bold ">
        <a target="_blank" href={url}>
          <ExportOutlined className="font-extrabold text-black  text-base" />
        </a>
      </div>
    </div>
  );
}
