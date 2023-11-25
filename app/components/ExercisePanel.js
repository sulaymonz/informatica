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
    <div className="w-full flex flex-row justify-center items-center gap-4">
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
        <div className="rounded-lg shadow-xl overflow-hidden">
          <Canvas
            brushColor={activeColor}
            bgColor="#f2cfd2"
            images={[
              {
                type: 'map',
                src: '/images/exercises/grade1/grade1_exercise1-map.png',
              },
              {
                type: 'outline',
                src: '/images/exercises/grade1/grade1_exercise1-outline.png',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ExercisePanel;
