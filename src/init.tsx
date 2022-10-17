import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";


const Init: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </>
  );
};

export default Init;
