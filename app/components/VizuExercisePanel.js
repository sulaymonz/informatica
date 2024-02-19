'use client';

import { useSelector, useDispatch } from 'react-redux';
import * as exerciseAction from '../../store/actions/exerciseActions';
import VizuCanvas from './VizuCanvas';

const description = 'This is a color palette visualization test.';
const images = [
  {
    src: '/images/vizu/1-skin-normal-100.png',
    layerType: 'normal',
    opacity: 1,
  },
  {
    src: '/images/vizu/2-color-normal-100.png',
    layerType: 'dynamic_color',
  },
  {
    src: '/images/vizu/3-color-normal-100.png',
    layerType: 'dynamic_color',
  },
  {
    src: '/images/vizu/4-color-normal-100.png',
    layerType: 'dynamic_color',
  },
  {
    src: '/images/vizu/5-color-normal-100.png',
    layerType: 'dynamic_color',
  },
  {
    src: '/images/vizu/6-shadow-multiply-30.png',
    layerType: 'multiply',
  },
  {
    src: '/images/vizu/7-light-screen-60.png',
    layerType: 'screen',
  },
  {
    src: '/images/vizu/last-outline.png',
    layerType: 'normal',
  },
];

const VizuExercisePanel = () => {
  const { palette } = useSelector((state) => state.exercise);
  const dispatch = useDispatch();
  return (
    <>
      <p className="my-3 text-center">{description}</p>
      <br />
      <div className="w-full flex flex-row justify-center items-center gap-4">
        <div>
          <div className="rounded-lg shadow-xl overflow-hidden">
            <VizuCanvas
              images={images}
              onClick={() => dispatch(exerciseAction.updatePalette(palette))}
            />
            <div className="w-full flex flex-row justify-center items-center h-[10px]">
              <div
                className={`w-[100px] h-full`}
                style={{ backgroundColor: `#${palette[0]}` }}
              />
              <div
                className={`w-[100px] h-full`}
                style={{ backgroundColor: `#${palette[1]}` }}
              />
              <div
                className={`w-[100px] h-full`}
                style={{ backgroundColor: `#${palette[2]}` }}
              />
              <div
                className={`w-[100px] h-full`}
                style={{ backgroundColor: `#${palette[3]}` }}
              />
              <div
                className={`w-[100px] h-full`}
                style={{ backgroundColor: `#${palette[4]}` }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VizuExercisePanel;
