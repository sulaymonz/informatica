'use client';

import { useState, useEffect, useRef, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import LoadingSpinner from './LoadingSpinner';

const fullConfig = resolveConfig(tailwindConfig);
let curLoadedResNum = 0;

const Canvas = ({ images }) => {
  const totalResToLoad = images.length;
  const onScreenCvsRef = useRef();
  const onScreenCtxRef = useRef();
  const [loading, setLoading] = useState(true);
  const [mainImg, setMainImg] = useState(null);
  const [clicked, setClicked] = useState(false);
  const { activeTool } = useSelector((state) => state.exercise);

  const onMouseMove = (e) => {
    const rect = onScreenCvsRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.x;
    const mouseY = e.clientY - rect.y;
    if (activeTool === 'move' && clicked) {
      // move action
    }
  };

  const onMouseDown = (e) => {
    setClicked(true);
    const rect = onScreenCvsRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.x;
    const mouseY = e.clientY - rect.y;
    if (activeTool === 'move') {
      // do something
    }
  };

  const onMouseUp = () => {
    setClicked(false);
    if (activeTool === 'move') {
      // do nothing
    }
  };

  const drawCanvas = () => {
    /*
    onScreenCtxRef.current.clearRect(0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(fillCvsRef.current, 0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(mainImg, 0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(pencilDrawCvs.current, 0, 0, 870, 500);
    */
  };

  const resourceLoaded = () => {
    curLoadedResNum++;
  };

  const handleMainImgLoad = (e) => {
    // setMainImg(e.target);
    resourceLoaded();
  };

  const handleFillImgLoad = (e) => {
    // setFillAreaImg(e.target);
    resourceLoaded();
  };

  useEffect(() => {
    if (curLoadedResNum === totalResToLoad) {
      setLoading(false);
      /*
      fillCtxRef.current.drawImage(fillAreaImg, 0, 0, 870, 500);
      onScreenCtxRef.current.drawImage(fillCvsRef.current, 0, 0, 870, 500);
      onScreenCtxRef.current.drawImage(mainImg, 0, 0, 870, 500);
      */
    }
  }, [mainImg]);

  useEffect(() => {
    /*
    // main image
    onScreenCtxRef.current = onScreenCvsRef.current.getContext('2d');
    const img1 = new Image();
    img1.src = images.find((i) => i.type === 'mainImage').src;
    img1.addEventListener('load', handleMainImgLoad);

    // fill availability area map on a separate canvas
    fillCvsRef.current = document.createElement('canvas');
    fillCvsRef.current.width = 870;
    fillCvsRef.current.height = 500;
    fillCtxRef.current = fillCvsRef.current.getContext('2d');
    const img2 = new Image();
    img2.src = images.find((i) => i.type === 'fillArea').src;
    img2.addEventListener('load', handleFillImgLoad);

    // a separate canvas for pencil draw
    pencilDrawCvs.current = document.createElement('canvas');
    pencilDrawCvs.current.width = 870;
    pencilDrawCvs.current.height = 500;
    pencilDrawCtx.current = pencilDrawCvs.current.getContext('2d');
    // pencilDrawCtx.current.lineWidth = brushSize;
    pencilDrawCtx.current.lineWidth = 4;
    pencilDrawCtx.current.lineCap = 'round';
    pencilDrawCtx.current.lineJoin = 'round';

    return () => {
      // clearing things up on component unmount
      img1.removeEventListener('load', handleMainImgLoad);
      img2.removeEventListener('load', handleFillImgLoad);
      curLoadedResNum = 0;
    };
    */
    console.log('ba hayray');
  }, []);

  return (
    <>
      {loading && (
        <div className="absolute w-[870px] h-[500px] flex justify-center items-center">
          <LoadingSpinner
            mainColor={fullConfig.theme.colors.white}
            secondaryColor="none"
          />
        </div>
      )}
      <canvas
        className="cursor-crosshair bg-secondary-light"
        ref={onScreenCvsRef}
        width="870"
        height="500"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      />
    </>
  );
};

export default Canvas;
