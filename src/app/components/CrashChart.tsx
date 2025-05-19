"use client";

import React, { useMemo, useState, useEffect, Suspense } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChartPoint } from "../types/VersionedMertrics";
import CustomTooltip from "./primitives/CustomToolTip";
import { groupChartDataByVersion } from "../utils/chartUtils";
import VersionSelector from "./primitives/VersionSelector";

interface CrashChartProps {
  data: ChartPoint[];
  start: number;
  end: number;
}

const CHART_MARGINS = { top: 20, right: 30, bottom: 20, left: 20 };
const XAXIS_LABEL_OFFSET = -10;
const YAXIS_LABEL_OFFSET = 10;
const AXIS_LABEL_FONT_SIZE = 14;
const LEGEND_WRAPPER_STYLE = { bottom: -40 };

const CrashChartWrapper: React.FC<CrashChartProps> = (props) => (
  <Suspense fallback={<div>Loading chart...</div>}>
    <CrashChart {...props} />
  </Suspense>
);

const CrashChart: React.FC<CrashChartProps> = ({
  start,
  end,
  data,
}: CrashChartProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const allAvailableVersions = useMemo(() => {
    return Array.from(new Set(data.map((p) => p.version))).sort();
  }, [data]);

  const [selectedVersions, setSelectedVersions] = useState<string[]>(() => {
    const versionsFromQuery = searchParams.get("versions");
    if (versionsFromQuery) {
      const decodedVersions = versionsFromQuery.split(',').filter(v => allAvailableVersions.includes(v));
      return decodedVersions.length > 0 ? decodedVersions : allAvailableVersions;
    }
    return allAvailableVersions;
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedVersions.length === allAvailableVersions.length) {
      params.delete("versions");
    } else {
      params.set("versions", selectedVersions.join(','));
    }
    window.history.replaceState(null, '', pathname + '?' + params.toString());
  }, [selectedVersions, allAvailableVersions, router, pathname, searchParams]);

  useEffect(() => {
    const versionsFromQuery = searchParams.get("versions");
    let initialSelection = allAvailableVersions;
    if (versionsFromQuery) {
      const decodedVersions = versionsFromQuery.split(',').filter(v => allAvailableVersions.includes(v));
      if (decodedVersions.length > 0) {
        initialSelection = decodedVersions;
      }
    }
    if (!selectedVersions.every(v => allAvailableVersions.includes(v)) || selectedVersions.length === 0 && allAvailableVersions.length > 0) {
      setSelectedVersions(initialSelection);
    } else if (selectedVersions.length === 0 && allAvailableVersions.length > 0) {
      setSelectedVersions(allAvailableVersions);
    }
  }, [data, allAvailableVersions, searchParams]);

  const filteredData = useMemo(() => {
    return data.filter((p) => selectedVersions.includes(p.version));
  }, [data, selectedVersions]);

  const groupedDataByVersion = useMemo(() => {
    return groupChartDataByVersion(filteredData);
  }, [filteredData]);

  const scatterPlots = useMemo(() => {
    return selectedVersions.map((version, i) => {
      const hue = Math.round((360 * allAvailableVersions.indexOf(version)) / allAvailableVersions.length);
      const saturation = 100;
      const lightness = 50;
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

      return (
        <Scatter
          key={version}
          data={groupedDataByVersion[version] || []}
          name={version}
          fill={color}
        />
      );
    });
  }, [selectedVersions, groupedDataByVersion, allAvailableVersions]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
      {allAvailableVersions.length > 0 && (
        <div style={{ marginRight: '20px', flexShrink: 0 }}>
          <VersionSelector
            allVersions={allAvailableVersions}
            selectedVersions={selectedVersions}
            onSelectionChange={setSelectedVersions}
          />
        </div>
      )}
      <div style={{ flexGrow: 1, height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={CHART_MARGINS}>
            <XAxis
              type="number"
              scale="time"
              dataKey="timestamp"
              domain={[start, end]}
              tickFormatter={(ms) => new Date(ms).toLocaleTimeString()}
              label={{
                value: "Timestamp",
                position: "insideBottom",
                offset: XAXIS_LABEL_OFFSET,
                fontSize: AXIS_LABEL_FONT_SIZE,
              }}
            />
            <YAxis
              type="number"
              dataKey="crashCount"
              allowDecimals={false}
              label={{
                value: "Crash Count",
                angle: -90,
                position: "insideLeft",
                offset: YAXIS_LABEL_OFFSET,
                fontSize: AXIS_LABEL_FONT_SIZE,
              }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={LEGEND_WRAPPER_STYLE}
            />
            <Tooltip content={<CustomTooltip />} />
            {scatterPlots}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CrashChartWrapper;
