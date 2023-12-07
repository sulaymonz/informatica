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
          tools={['fill', 'eraser', 'pencil', 'grab', 'undo', 'redo']}
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
                type: 'mainImage',
                src: '/images/exercises/grade1/exercise6-mainImage.png',
              },
              {
                type: 'fillArea',
                src: '/images/exercises/grade1/exercise6-fillArea.png',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ExercisePanel;
