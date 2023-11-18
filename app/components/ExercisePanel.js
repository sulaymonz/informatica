'use client';

import { useState } from 'react';
import Canvas from './Canvas';
import ToolsPanel from '../components/ToolsPanel';
import ColorPanel from '../components/ColorPanel';

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
          colors={[
            'pink',
            'purple',
            'red',
            'orange',
            'yellow',
            'green',
            'blue',
            'black',
          ]}
          activeColor={activeColor}
          onChange={(color) => {
            setActiveColor(color);
          }}
        />
      </div>
      <div className="col-span-10 rounded-lg shadow-xl min-h-[300px] p-5">
        <Canvas />
      </div>
    </div>
  );
};

export default ExercisePanel;
