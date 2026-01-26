import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
    </div>
  );
};

export default LoadingScreen;
