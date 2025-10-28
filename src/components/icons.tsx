import * as React from "react";

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center justify-center gap-2 text-2xl font-bold font-headline">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
        {...props}
      >
        <path d="M8 2.5l8 5.5v10l-8-5.5zM8 2.5L0 8l8 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M16 8l8 5.5-8 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
      <span className="text-primary">Clear</span><span className="text-accent">शहर</span>
    </div>
  );
}
