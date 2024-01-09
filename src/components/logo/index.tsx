import React from "react";

interface Props {
  title: string;
  onClick?: () => void;
}

export default function Logo({ title, onClick }: Props) {
  return (
    <div
      className="flex flex-row align-middle text-2xl no-underline"
      onClick={onClick}
    >
      <span className="text-2xl">{"<"}</span>
      <div
        className="px-2 font-agustina font-bold"
        style={{ fontVariantLigatures: "no-common-ligatures" }}
      >
        {title}
      </div>
      <span className="text-2xl">{"/>"}</span>
    </div>
  );
}
