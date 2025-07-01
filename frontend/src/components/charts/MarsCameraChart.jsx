import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LabelList } from 'recharts';

const MarsCameraChart = ({ photos }) => {
  if (!photos || photos.length === 0) return null;

  // Count photos per camera
  const counts = photos.reduce((acc, photo) => {
    const cam = photo.camera.name;
    acc[cam] = (acc[cam] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(counts).map(([camera, count]) => ({
    camera,
    count
  }));

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h4>Camera Photo Counts</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="camera" />
          <YAxis scale="log" domain={[1, 'auto']} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8">
          <LabelList dataKey="count" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarsCameraChart;
