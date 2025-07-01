import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const EpicLongitudeHistogram = ({ data }) => {
  // State to hold selected bin size
  const [binSize, setBinSize] = useState(50);

  // Handler for dropdown change
  const handleBinSizeChange = (e) => {
    setBinSize(Number(e.target.value));
  };

  // Bin data based on selected bin size
  const bins = {};

  data.forEach(({ centroid_coordinates }) => {
    if (!centroid_coordinates) return;
    const lon = centroid_coordinates.lon;
    const binStart = Math.floor(lon / binSize) * binSize;
    const binLabel = `${binStart} to ${binStart + binSize}`;
    bins[binLabel] = (bins[binLabel] || 0) + 1;
  });

  const histogramData = Object.keys(bins)
    .sort((a, b) => {
      const aStart = parseInt(a.split(" ")[0], 10);
      const bStart = parseInt(b.split(" ")[0], 10);
      return aStart - bStart;
    })
    .map((key) => ({ bin: key, count: bins[key] }));

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <label htmlFor="binSizeSelect" style={{ marginRight: 10 }}>
          Select Bin Size:
        </label>
        <select
          id="binSizeSelect"
          value={binSize}
          onChange={handleBinSizeChange}
          style={{ padding: "5px", fontSize: "1rem" }}
        >
          {/* Generate options from 10 to 150 with step 10 */}
          {[...Array(15)].map((_, i) => {
            const val = (i + 1) * 10;
            return (
              <option key={val} value={val}>
                {val}°
              </option>
            );
          })}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={histogramData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="bin"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={60}
          />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default EpicLongitudeHistogram;
