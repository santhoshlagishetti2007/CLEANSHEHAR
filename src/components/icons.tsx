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
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-primary">Clear</span><span className="text-accent">शहर</span>
    </div>
  );
}
