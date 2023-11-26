'use client';

import { useRef, useState, useEffect } from 'react';

const Canvas = ({ brushColor, images }) => {
  const onScreenCvsRef = useRef();
  const onScreenCtxRef = useRef();
  const offScreenCvsRef = useRef();
  const offScreenCtxRef = useRef();
  const [curLoadedResNum, setCurLoadedResNum] = useState(0);
  const [mapImg, setMapImg] = useState(null);
  const [outlineImg, setOutlineImg] = useState(null);
  const totalResToLoad = images.length;

  const onClick = (e) => {
    /* if (curLoadedResNum < totalResToLoad) {
      return;
    } */
    const rect = onScreenCvsRef.current.getBoundingClientRect();
    const mouseX = Math.floor(e.pageX - rect.x);
    const mouseY = Math.floor(e.pageY - rect.y);
    actionFill(mouseX, mouseY, brushColor);
  };

  const resourceLoaded = () => {
    setCurLoadedResNum(curLoadedResNum + 1);
  };

  const actionFill = (startX, startY, currentColor) => {
    // get imageData
    let colorLayer = offScreenCtxRef.current.getImageData(
      0,
      0,
      offScreenCvsRef.current.width,
      offScreenCvsRef.current.height,
    );

    let startPos = (startY * offScreenCvsRef.current.width + startX) * 4;

    // clicked color
    let startR = colorLayer.data[startPos];
    let startG = colorLayer.data[startPos + 1];
    let startB = colorLayer.data[startPos + 2];
    let startA = colorLayer.data[startPos + 3];

    // exit if transparent
    if (startA === 0) {
      return;
    }

    // exit if color is the same
    if (
      currentColor.r === startR &&
      currentColor.g === startG &&
      currentColor.b === startB
    ) {
      return;
    }

    // start with click coords
    let pixelStack = [[startX, startY]];
    let newPos, x, y, pixelPos, reachLeft, reachRight;

    //helpers
    const matchStartColor = (pixelPos) => {
      let r = colorLayer.data[pixelPos];
      let g = colorLayer.data[pixelPos + 1];
      let b = colorLayer.data[pixelPos + 2];
      let a = colorLayer.data[pixelPos + 3];
      return r === startR && g === startG && b === startB && a > 0;
    };
    const colorPixel = (pixelPos) => {
      colorLayer.data[pixelPos] = currentColor.r;
      colorLayer.data[pixelPos + 1] = currentColor.g;
      colorLayer.data[pixelPos + 2] = currentColor.b;
      colorLayer.data[pixelPos + 3] = 255;
    };

    const floodFill = () => {
      newPos = pixelStack.pop();
      x = newPos[0];
      y = newPos[1];

      // get current pixel position
      pixelPos = (y * offScreenCvsRef.current.width + x) * 4;
      // Go up as long as the color matches and are inside the canvas
      while (y >= 0 && matchStartColor(pixelPos)) {
        y--;
        pixelPos -= offScreenCvsRef.current.width * 4;
      }
      //Don't overextend
      pixelPos += offScreenCvsRef.current.width * 4;
      y++;
      reachLeft = false;
      reachRight = false;

      // Go down as long as the color matches and in inside the canvas
      while (y < offScreenCvsRef.current.height && matchStartColor(pixelPos)) {
        colorPixel(pixelPos);
        if (x > 0) {
          if (matchStartColor(pixelPos - 4)) {
            if (!reachLeft) {
              //Add pixel to stack
              pixelStack.push([x - 1, y]);
              reachLeft = true;
            }
          } else if (reachLeft) {
            reachLeft = false;
          }
        }
        if (x < offScreenCvsRef.current.width - 1) {
          if (matchStartColor(pixelPos + 4)) {
            if (!reachRight) {
              //Add pixel to stack
              pixelStack.push([x + 1, y]);
              reachRight = true;
            }
          } else if (reachRight) {
            reachRight = false;
          }
        }
        y++;
        pixelPos += offScreenCvsRef.current.width * 4;
      }

      // recursive until no more pixels to change
      if (pixelStack.length) {
        floodFill();
      }
    };

    floodFill();

    // render floodFill result
    offScreenCtxRef.current.putImageData(colorLayer, 0, 0);
    onScreenCtxRef.current.drawImage(offScreenCvsRef.current, 0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(outlineImg, 0, 0, 870, 500);
  };

  useEffect(() => {
    // outline on onscreen canvas
    onScreenCtxRef.current = onScreenCvsRef.current.getContext('2d');
    const img1 = new Image();
    img1.src = images.find((i) => i.type === 'outline').src;
    img1.onload = () => {
      resourceLoaded();
      setOutlineImg(img1);
      onScreenCtxRef.current.drawImage(img1, 0, 0, 870, 500);
    };

    // fill availability area map on off screen canvas
    offScreenCvsRef.current = document.createElement('canvas');
    offScreenCvsRef.current.width = 870;
    offScreenCvsRef.current.height = 500;
    offScreenCtxRef.current = offScreenCvsRef.current.getContext('2d');
    const img2 = new Image();
    img2.src = images.find((i) => i.type === 'map').src;
    img2.onload = () => {
      resourceLoaded();
      setMapImg(img2);
      offScreenCtxRef.current.drawImage(img2, 0, 0, 870, 500);
    };
  }, []);

  return (
    <canvas
      className="cursor-crosshair"
      ref={onScreenCvsRef}
      width="870"
      height="500"
      onClick={onClick}
    ></canvas>
  );
};

export default Canvas;
