import React, { HTMLAttributes, PropsWithChildren } from "react";

export const Content: React.FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({ children, style }) => {
  return (
    <div className="content" style={style}>
      {children}
    </div>
  );
};
