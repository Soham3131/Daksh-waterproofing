import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center p-4">
      {/* Simple spinner animation */}
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      <p className="ml-3 text-blue-700">Loading...</p>
    </div>
  );
};

export default Loader;