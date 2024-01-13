import React from "react";

import Link from "@/components/Link";

import Logo from "../logo";

interface Props {
  logoTitle: string;
}

export default function Navbar({ logoTitle }: Props) {
  return (
    <nav className="sticky  top-0 z-50 bg-white p-4 text-white no-underline shadow-md">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <Link href="/" className={"text-primary hover:border-0"}>
            <Logo title={logoTitle} />
          </Link>
          <div className="flex space-x-4">
            <Link href="#about">{"About"}</Link>
            <Link href="#experience">{"Experience"}</Link>
            <Link href="#education">{"Education"}</Link>
            <Link href="#certification">{"Certification"}</Link>
            <Link href="projects">{"Projects"}</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
