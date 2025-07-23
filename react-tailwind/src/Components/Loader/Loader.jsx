import React from 'react';


export default function Loader() {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-3 h-3 bg-primary rounded-full animate-ping"></div>
        <div className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full animate-ping delay-150"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-primary rounded-full animate-ping delay-300"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full animate-ping delay-500"></div>
      </div>
    </div>
  );
}
