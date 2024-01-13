import React from "react";

interface Props {}

export default function Row({ children }: Props) {
  return <div className="flex w-full flex-1  flex-row">{children}</div>;
}
