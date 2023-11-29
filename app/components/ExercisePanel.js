'use client';

import { useRef } from 'react';
import Canvas from './Canvas';
import ToolsPanel from '../components/ToolsPanel';
import ColorPanel from '../components/ColorPanel';
import CurrentColorPanel from './CurrentColorPanel';

const ExercisePanel = ({ colors }) => {
  const canvasRef = useRef();

  const onClickUndo = () => {
    canvasRef.current.handleUndo();
  };

  const onClickRedo = () => {
    canvasRef.current.handleRedo();
  };

  return (
    <div className="w-full flex flex-row justify-center items-center gap-4">
      <div>
        <ToolsPanel
          className="mb-4"
          tools={['undo', 'redo', 'pencil', 'fill', 'grab']}
          onClickUndo={onClickUndo}
          onClickRedo={onClickRedo}
        />
        <ColorPanel className="mb-4" colors={colors} />
        <CurrentColorPanel />
      </div>
      <div>
        <div className="rounded-lg shadow-xl overflow-hidden">
          <Canvas
            ref={canvasRef}
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
