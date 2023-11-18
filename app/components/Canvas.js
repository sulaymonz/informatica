'use client';

import { useRef, useState, useEffect } from 'react';

const Canvas = () => {
  const canvasRef = useRef();
  const ctxRef = useRef();
  const [brushColor, setBrushColor] = useState({
    color: 'rgba(255, 255, 0, 255)',
    r: 255,
    g: 255,
    b: 0,
    a: 255,
  });

  const onClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = Math.floor(e.pageX - rect.x);
    const mouseY = Math.floor(e.pageY - rect.y);
    actionFill(mouseX, mouseY, brushColor);
  };

  const actionFill = (startX, startY, currentColor) => {
    // get imageData
    let colorLayer = ctxRef.current.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
    );

    let startPos = (startY * canvasRef.current.width + startX) * 4;

    // clicked color
    let startR = colorLayer.data[startPos];
    let startG = colorLayer.data[startPos + 1];
    let startB = colorLayer.data[startPos + 2];

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
      return r === startR && g === startG && b === startB;
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
      pixelPos = (y * canvasRef.current.width + x) * 4;
      // Go up as long as the color matches and are inside the canvas
      while (y >= 0 && matchStartColor(pixelPos)) {
        y--;
        pixelPos -= canvasRef.current.width * 4;
      }
      //Don't overextend
      pixelPos += canvasRef.current.width * 4;
      y++;
      reachLeft = false;
      reachRight = false;

      // Go down as long as the color matches and in inside the canvas
      while (y < canvasRef.current.height && matchStartColor(pixelPos)) {
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
        if (x < canvasRef.current.width - 1) {
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
        pixelPos += canvasRef.current.width * 4;
      }

      // recursive until no more pixels to change
      if (pixelStack.length) {
        floodFill();
      }
    };

    floodFill();

    // render floodFill result
    ctxRef.current.putImageData(colorLayer, 0, 0);
  };

  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext('2d');
    const img = new Image();
    img.src = '/images/coloring.jpg';
    img.onload = () => {
      ctxRef.current.drawImage(img, 0, 0, 450, 450);
    };
  }, []);

  return (
    <canvas ref={canvasRef} width="450" height="450" onClick={onClick}></canvas>
  );
};

export default Canvas;
