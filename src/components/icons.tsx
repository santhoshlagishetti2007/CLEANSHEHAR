import * as React from "react";

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center justify-center text-2xl font-bold font-headline">
      <span className="text-primary">Clear</span><span className="text-accent">शहर</span>
    </div>
  );
}
