import React, { lazy, Suspense } from "react";
import { useTheme } from "./use-theme";

const DarkTheme = lazy(() => import("./dark"));
const LightTheme = lazy(() => import("./light"));

export const ThemeProvider: React.FC<{ children?: any }> = ({ children }) => {
  const [darkMode] = useTheme();

  return (
    <>
      <Suspense fallback={<span />}>
        {darkMode ? <DarkTheme /> : <LightTheme />}
      </Suspense>
      {children}
    </>
  );
};
