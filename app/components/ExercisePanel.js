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
    <div className="w-full flex flex-row justify-center gap-4">
      <div>
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
      <div>
        <Canvas brushColor={activeColor} />
      </div>
    </div>
  );
};

export default ExercisePanel;
