import React from "react";
import type { TooltipProps } from "recharts";
import "@/app/styles/tooltip.css";

type CustomTooltipProps = TooltipProps<number, string>;

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const { version, crashCount } = payload[0].payload;

  return (
    <div className="tooltip">
      <div>
        <strong>Version: {version}</strong>
      </div>
      <p>Crash Count: {crashCount}</p>
    </div>
  );
};
export default CustomTooltip;
