'use client';

import SampleTreeCanvas from './SampleTreeCanvas';
import DocumentPanel from './DocumentPanel';
import ToolsPanel from '../components/ToolsPanel';

const description = '';
const tools = ['grab', 'tree'];
const images = [
  {
    type: 'item',
    src: '/images/exercises/grade1/rectangle-red.png',
  },
  {
    type: 'item',
    src: '/images/exercises/grade1/circle-red.png',
  },
  {
    type: 'item',
    src: '/images/exercises/grade1/triangle-red.png',
  },
  {
    type: 'item',
    src: '/images/exercises/grade1/rectangle-yellow.png',
  },
  {
    type: 'item',
    src: '/images/exercises/grade1/circle-yellow.png',
  },
  {
    type: 'item',
    src: '/images/exercises/grade1/triangle-yellow.png',
  },
];

const SampleTreeExercisePanel = () => {
  return (
    <>
      <p className="my-3 text-center">{description}</p>
      <br />
      <div className="w-full flex flex-row justify-center items-center gap-4">
        <div>
          <DocumentPanel className="mb-4" />
          <ToolsPanel className="mb-4" tools={tools} />
        </div>
        <div>
          <div className="rounded-lg shadow-xl overflow-hidden">
            <SampleTreeCanvas images={images} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SampleTreeExercisePanel;
