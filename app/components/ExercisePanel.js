'use client';

import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Canvas from './Canvas';
import DocumentPanel from './DocumentPanel';
import ToolsPanel from '../components/ToolsPanel';
import ColorPanel from '../components/ColorPanel';
import CurrentColorPanel from './CurrentColorPanel';

const ExercisePanel = ({ description, colors, tools, images }) => {
  const canvasRef = useRef();
  const { key } = useSelector((state) => state.exercise);

  const onClickUndo = () => {
    canvasRef.current.handleUndo();
  };

  const onClickRedo = () => {
    canvasRef.current.handleRedo();
  };

  return (
    <>
      <p className="my-3 text-center">{description}</p>
      <br />
      <div className="w-full flex flex-row justify-center items-center gap-4">
        <div>
          <DocumentPanel className="mb-4" />
          <ToolsPanel
            className="mb-4"
            tools={tools}
            onClickUndo={onClickUndo}
            onClickRedo={onClickRedo}
          />
          <ColorPanel className="mb-4" colors={colors} />
          <CurrentColorPanel />
        </div>
        <div>
          <div className="rounded-lg shadow-xl overflow-hidden">
            <Canvas key={key} ref={canvasRef} images={images} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExercisePanel;
