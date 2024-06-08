import React, { createContext, useContext, useMemo } from 'react';

const EnvContext = createContext();

// Create a provider component
export const EnvProvider = ({ children }) => {
  // useMemo is used here to optimize performance by memoizing the env object.
  // This means that the env object is only re-computed when one of its dependencies changes.
  // In this case, there are no dependencies (the dependency array is empty), so the env object is only computed once.
  const env = useMemo(() => ({
    backEndSseApiUrl: "http://localhost:7000/sanctuary/stockfishrouter/sse", 
  }), []);

  return (
    <EnvContext.Provider value={env}>
      {children}
    </EnvContext.Provider>
  );
};

// Custom hook to use the EnvContext
export const useEnv = () => {
  return useContext(EnvContext);
};
