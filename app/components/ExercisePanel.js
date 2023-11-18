'use client';

import { useState } from 'react';
import Canvas from './Canvas';
import ToolsPanel from '../components/ToolsPanel';
import ColorPanel from '../components/ColorPanel';

const colors = [
  {
    name: 'red',
    cssRgbaValue: 'rgba(255, 0, 0, 255)',
    r: 255,
    g: 0,
    b: 0,
    a: 255,
  },
  {
    name: 'orange',
    cssRgbaValue: 'rgba(255, 128, 0, 255)',
    r: 255,
    g: 128,
    b: 0,
    a: 255,
  },
  {
    name: 'yellow',
    cssRgbaValue: 'rgba(255, 255, 0, 255)',
    r: 255,
    g: 255,
    b: 0,
    a: 255,
  },
  {
    name: 'green',
    cssRgbaValue: 'rgba(0, 255, 0, 255)',
    r: 0,
    g: 255,
    b: 0,
    a: 255,
  },
  {
    name: 'aqua',
    cssRgbaValue: 'rgba(0, 255, 255, 255)',
    r: 0,
    g: 255,
    b: 255,
    a: 255,
  },
  {
    name: 'blue',
    cssRgbaValue: 'rgba(0, 0, 255, 255)',
    r: 0,
    g: 0,
    b: 255,
    a: 255,
  },
  {
    name: 'pink',
    cssRgbaValue: 'rgba(255, 0, 255, 255)',
    r: 255,
    g: 0,
    b: 255,
    a: 255,
  },
  {
    name: 'black',
    cssRgbaValue: 'rgba(0, 0, 0, 255)',
    r: 0,
    g: 0,
    b: 0,
    a: 255,
  },
];

const ExercisePanel = () => {
  const [activeColor, setActiveColor] = useState('pink');
  const [activeTool, setActiveTool] = useState('pencil');

  return (
    <div className="grid grid-cols-12 gap-4 m-10">
      <div className="col-span-2 min-h-[300px] p-5">
        <ToolsPanel
          className="mb-4"
          tools={['pencil', 'color-bucket', 'grab', 'refresh']}
          activeTool={activeTool}
          onChange={(tool) => {
            setActiveTool(tool);
          }}
        />
        <ColorPanel
          colors={colors}
          activeColor={activeColor}
          onChange={(color) => {
            setActiveColor(color);
          }}
        />
      </div>
      <div className="col-span-10 rounded-lg shadow-xl min-h-[300px] p-5">
        <Canvas brushColor={activeColor} />
      </div>
    </div>
  );
};

export default ExercisePanel;
