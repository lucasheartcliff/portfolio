import React from "react";

import Scroll from "@/components/Scroll";

interface Props {}

export default function Block({ children }: Props) {
  return <div className="flex h-32 flex-1 p-5">{children}</div>;
}
