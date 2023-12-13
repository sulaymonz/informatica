'use client';

import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Canvas from './Canvas';
import DocumentPanel from './DocumentPanel';
import ToolsPanel from '../components/ToolsPanel';
import ColorPanel from '../components/ColorPanel';
import CurrentColorPanel from './CurrentColorPanel';

const ExercisePanel = ({ colors }) => {
  const canvasRef = useRef();
  const { key } = useSelector((state) => state.exercise);

  const onClickUndo = () => {
    canvasRef.current.handleUndo();
  };

  const onClickRedo = () => {
    canvasRef.current.handleRedo();
  };

  return (
    <div className="w-full flex flex-row justify-center items-center gap-4">
      <div>
        <DocumentPanel className="mb-4" />
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
            key={key}
            ref={canvasRef}
            images={[
              {
                type: 'mainImage',
                src: '/images/exercises/grade1/exercise45-mainImage.png',
              },
              {
                type: 'fillArea',
                src: '/images/exercises/grade1/exercise45-fillArea.png',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ExercisePanel;
