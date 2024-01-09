import React from "react";

import Navbar from "../Navbar";
import Scroll from "../Scroll";

interface Props {}

export default function Layout({ children }: Props) {
  return (
    <div className="h-screen">
      <Navbar logoTitle="LucasHeartcliff" />
      <div className="container h-full">
        <Scroll>{children}</Scroll>
      </div>
    </div>
  );
}
