'use client';

import { useState, useEffect, useRef, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import LoadingSpinner from './LoadingSpinner';
import { Battery50 } from '@mui/icons-material';

const fullConfig = resolveConfig(tailwindConfig);
let curLoadedResNum = 0;
const itemSize = 50;
const itemPadding = 5;
const itemBarX = 800;
const itemBarY = 25;

const Canvas = ({ images }) => {
  const totalResToLoad = images.length;
  const onScreenCvsRef = useRef();
  const onScreenCtxRef = useRef();
  const gridCvsRef = useRef();
  const gridCtxRef = useRef();
  const itemsCvsRef = useRef();
  const itemsCtxRef = useRef();
  const grabCvsRef = useRef();
  const grabCtxRef = useRef();
  const [loading, setLoading] = useState(true);
  const [itemImages, setItemImages] = useState([]);
  const [grabbing, setGrabbing] = useState(false);
  const [grabbingItem, setGrabbingItem] = useState(null);
  const { activeTool } = useSelector((state) => state.exercise);

  const onMouseMove = (e) => {
    const rect = onScreenCvsRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.x;
    const mouseY = e.clientY - rect.y;
    if (activeTool === 'grab' && grabbing) {
      drawGrabbing(mouseX, mouseY);
      drawCanvas();
    }
  };

  const onMouseDown = (e) => {
    const rect = onScreenCvsRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.x;
    const mouseY = e.clientY - rect.y;
    if (activeTool === 'grab') {
      if (
        mouseX >= itemBarX - itemPadding &&
        mouseX <= itemBarX + itemSize + itemPadding &&
        mouseY >= itemBarY - itemPadding &&
        mouseY <=
          itemBarY -
            itemPadding +
            itemImages.length * (itemSize + itemPadding * 2)
      ) {
        setGrabbing(true);
        setGrabbingItem(
          itemImages[
            Math.floor((mouseY - itemBarY) / (itemSize + itemPadding * 2))
          ],
        );
      }
    }
  };

  useEffect(() => {
    if (!grabbing && !loading) {
      clearGrabbing();
    }
  }, [grabbing]);

  const onMouseUp = () => {
    setGrabbing(false);
    if (activeTool === 'grab') {
      // do nothing
    }
  };

  const drawGrid = () => {
    const grid = [
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
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
    itemsCtxRef.current.globalAlpha = 0.5;
    itemsCtxRef.current.fillStyle = '#ffffff';
    itemsCtxRef.current.fillRect(
      itemBarX - itemPadding,
      itemBarY - itemPadding,
      itemSize + itemPadding * 2,
      itemImages.length * (itemSize + itemPadding * 2),
    );
    itemsCtxRef.current.globalAlpha = 1;
    itemImages.forEach((img, i) => {
      itemsCtxRef.current.drawImage(
        img,
        itemBarX,
        itemBarY + i * (itemSize + itemPadding * 2),
      );
    });
  };

  const drawGrabbing = (x, y) => {
    clearGrabbing();
    grabCtxRef.current.drawImage(grabbingItem, x - 25, y - 25, 50, 50);
  };

  const clearGrabbing = () => {
    grabCtxRef.current.clearRect(0, 0, 870, 500);
  };

  const drawCanvas = () => {
    /*
    onScreenCtxRef.current.clearRect(0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(fillCvsRef.current, 0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(mainImg, 0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(pencilDrawCvs.current, 0, 0, 870, 500);
    */
    onScreenCtxRef.current.clearRect(0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(gridCvsRef.current, 0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(itemsCvsRef.current, 0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(grabCvsRef.current, 0, 0, 870, 500);
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

    // a separate canvas for grabbed item
    grabCvsRef.current = document.createElement('canvas');
    grabCvsRef.current.width = 870;
    grabCvsRef.current.height = 500;
    grabCtxRef.current = grabCvsRef.current.getContext('2d');

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
        className={`cursor-crosshair ${
          activeTool === 'grab' ? 'cursor-grab' : ''
        } ${grabbing ? 'cursor-grabbing' : ''} bg-secondary-light`}
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
