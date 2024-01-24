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
  const gridCvsRef = useRef();
  const gridCtxRef = useRef();
  const itemsCvsRef = useRef();
  const itemsCtxRef = useRef();
  const [loading, setLoading] = useState(true);
  const [itemImages, setItemImages] = useState([]);
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

  const drawGrid = () => {
    const grid = [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ];

    grid.forEach((row, i) => {
      row.forEach((spot, j) => {
        const spotX = j * (2 * 50 + 25) + 70;
        const spotY = i * (2 * 50 + 25) + 63;
        gridCtxRef.current.globalAlpha = 0.03;
        gridCtxRef.current.beginPath();
        gridCtxRef.current.arc(spotX, spotY, 50, 0, 2 * Math.PI);
        gridCtxRef.current.fillStyle = 'red';
        gridCtxRef.current.fill();
      });
    });
  };

  const drawItemsBar = () => {
    itemImages.forEach((img, i) => {
      itemsCtxRef.current.drawImage(img, 800, 25 + i * 60);
    });
  };

  const drawCanvas = () => {
    /*
    onScreenCtxRef.current.clearRect(0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(fillCvsRef.current, 0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(mainImg, 0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(pencilDrawCvs.current, 0, 0, 870, 500);
    */
    onScreenCtxRef.current.drawImage(gridCvsRef.current, 0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(itemsCvsRef.current, 0, 0, 870, 500);
  };

  const resourceLoaded = () => {
    curLoadedResNum++;
  };

  const handleImageLoad = (e) => {
    const img = e.target;
    setItemImages((prevState) => [...prevState, img]);
    resourceLoaded();
  };

  useEffect(() => {
    if (curLoadedResNum === totalResToLoad) {
      setLoading(false);
      drawItemsBar();
      drawCanvas();
    }
  }, [itemImages]);

  useEffect(() => {
    onScreenCtxRef.current = onScreenCvsRef.current.getContext('2d');

    // a separate canvas for grid
    gridCvsRef.current = document.createElement('canvas');
    gridCvsRef.current.width = 870;
    gridCvsRef.current.height = 500;
    gridCtxRef.current = gridCvsRef.current.getContext('2d');
    drawGrid();

    // a separate canvas for items bar
    itemsCvsRef.current = document.createElement('canvas');
    itemsCvsRef.current.width = 870;
    itemsCvsRef.current.height = 500;
    itemsCtxRef.current = itemsCvsRef.current.getContext('2d');

    setItemImages([]);
    const tempImages = [];
    images
      .filter((image) => image.type === 'item')
      .forEach((image) => {
        let img = new Image();
        img.src = image.src;
        tempImages.push(img);
        img.addEventListener('load', handleImageLoad);
      });

    return () => {
      // clearing things up on component unmount
      tempImages.forEach((image) => {
        image.removeEventListener('load', handleImageLoad);
      });
      curLoadedResNum = 0;
    };
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
