'use client';

import { useState } from 'react';
import Canvas from './Canvas';
import ToolsPanel from '../components/ToolsPanel';
import ColorPanel from '../components/ColorPanel';
import CurrentColorPanel from './CurrentColorPanel';

const ExercisePanel = ({ colors }) => {
  const [activeColor, setActiveColor] = useState(colors[0]);
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
          className="mb-4"
          colors={colors}
          activeColor={activeColor}
          onChange={(color) => {
            setActiveColor(color);
          }}
        />
        <CurrentColorPanel activeColor={activeColor} />
      </div>
      <div className="col-span-10 rounded-lg shadow-xl min-h-[300px] p-5">
        <Canvas brushColor={activeColor} />
      </div>
    </div>
  );
};

export default ExercisePanel;
