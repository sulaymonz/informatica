'use client';

import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useSelector } from 'react-redux';

const Canvas = forwardRef(({ images }, ref) => {
  const onScreenCvsRef = useRef();
  const onScreenCtxRef = useRef();
  const fillCvsRef = useRef();
  const fillCtxRef = useRef();
  const pencilDrawCvs = useRef();
  const pencilDrawCtx = useRef();
  const action = useRef({ type: '', color: {}, points: [] });
  const undoStack = useRef([]);
  const redoStack = useRef([]);
  const [curLoadedResNum, setCurLoadedResNum] = useState(0);
  const [mapImg, setMapImg] = useState(null);
  const [outlineImg, setOutlineImg] = useState(null);
  const [clicked, setClicked] = useState(false);
  const lastPos = useRef({ x: null, y: null });
  const drawInterval = 5;
  const { activeColor: brushColor, activeTool } = useSelector(
    (state) => state.exercise,
  );
  const totalResToLoad = images.length;

  useImperativeHandle(ref, () => ({
    handleUndo() {
      if (undoStack.current.length > 0) {
        actionUndoRedo(redoStack.current, undoStack.current);
      }
    },
    handleRedo() {
      if (redoStack.current.length >= 1) {
        actionUndoRedo(undoStack.current, redoStack.current);
      }
    },
  }));

  const onMouseMove = (e) => {
    const rect = onScreenCvsRef.current.getBoundingClientRect();
    const mouseX = Math.floor(e.pageX - rect.x);
    const mouseY = Math.floor(e.pageY - rect.y);
    if (clicked) {
      if (
        Math.abs(mouseX - lastPos.current.x) > drawInterval ||
        Math.abs(mouseY - lastPos.current.y) > drawInterval
      ) {
        switch (activeTool) {
          case 'fill':
            // do nothing
            break;
          case 'pencil':
            actionDraw(mouseX, mouseY);
            action.current.points.push({
              x: mouseX,
              y: mouseY,
            });
            drawCanvas();
            break;
          default:
            break;
        }
        lastPos.current = { x: mouseX, y: mouseY };
      }
    }
  };

  const onMouseDown = (e) => {
    /* if (curLoadedResNum < totalResToLoad) {
      return;
    } */
    setClicked(true);
    const rect = onScreenCvsRef.current.getBoundingClientRect();
    const mouseX = Math.floor(e.pageX - rect.x);
    const mouseY = Math.floor(e.pageY - rect.y);
    lastPos.current = { x: mouseX, y: mouseY };
    switch (activeTool) {
      case 'fill':
        actionFill(mouseX, mouseY, brushColor);
        action.current = {
          type: activeTool,
          color: { ...brushColor },
          points: [
            {
              x: mouseX,
              y: mouseY,
            },
          ],
        };
        drawCanvas();
        break;
      case 'pencil':
        actionStartDraw(brushColor);
        actionDraw(mouseX, mouseY);
        action.current = {
          type: activeTool,
          color: { ...brushColor },
          // size: brushSize,
          points: [
            {
              x: mouseX,
              y: mouseY,
              // size: brushSize,
              color: { ...brushColor },
            },
          ],
        };
        drawCanvas();
      default:
        break;
    }
  };

  const onMouseUp = () => {
    setClicked(false);
    if (action.current.points.length) {
      undoStack.current.push(action.current);
    }
    if (activeTool === 'pencil') {
      // do nothing
    }
    action.current = { type: '', color: {}, points: [] };
    redoStack.current = [];
  };

  const resourceLoaded = () => {
    setCurLoadedResNum(curLoadedResNum + 1);
  };

  // Action functions
  const actionStartDraw = (color) => {
    pencilDrawCtx.current.strokeStyle = color.cssRgbaValue;
    pencilDrawCtx.current.beginPath();
  };

  const actionDraw = (x, y) => {
    pencilDrawCtx.current.lineTo(x, y);
    pencilDrawCtx.current.stroke();
  };
  const actionFill = (startX, startY, currentColor) => {
    // get imageData
    let colorLayer = fillCtxRef.current.getImageData(
      0,
      0,
      fillCvsRef.current.width,
      fillCvsRef.current.height,
    );

    let startPos = (startY * fillCvsRef.current.width + startX) * 4;

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
      pixelPos = (y * fillCvsRef.current.width + x) * 4;
      // Go up as long as the color matches and are inside the canvas
      while (y >= 0 && matchStartColor(pixelPos)) {
        y--;
        pixelPos -= fillCvsRef.current.width * 4;
      }
      //Don't overextend
      pixelPos += fillCvsRef.current.width * 4;
      y++;
      reachLeft = false;
      reachRight = false;

      // Go down as long as the color matches and in inside the canvas
      while (y < fillCvsRef.current.height && matchStartColor(pixelPos)) {
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
        if (x < fillCvsRef.current.width - 1) {
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
        pixelPos += fillCvsRef.current.width * 4;
      }

      // recursive until no more pixels to change
      if (pixelStack.length) {
        floodFill();
      }
    };

    floodFill();

    // draw to fill-canvas
    fillCtxRef.current.putImageData(colorLayer, 0, 0);
  };

  const drawCanvas = () => {
    onScreenCtxRef.current.clearRect(0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(fillCvsRef.current, 0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(outlineImg, 0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(pencilDrawCvs.current, 0, 0, 870, 500);
  };

  // helper functions
  const actionUndoRedo = (pushStack, popStack) => {
    pushStack.push(popStack.pop());
    fillCtxRef.current.clearRect(0, 0, 870, 500);
    fillCtxRef.current.drawImage(mapImg, 0, 0, 870, 500);
    pencilDrawCtx.current.clearRect(0, 0, 870, 500);
    redrawPoints();
    drawCanvas();
  };

  const redrawPoints = () => {
    undoStack.current.forEach((action) => {
      switch (action.type) {
        case 'fill':
          action.points.forEach((p) => {
            actionFill(p.x, p.y, action.color);
          });
          break;
        case 'pencil':
          actionStartDraw(action.color);
          action.points.forEach((p) => {
            actionDraw(p.x, p.y);
          });
        default:
          break;
      }
    });
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
    fillCvsRef.current = document.createElement('canvas');
    fillCvsRef.current.width = 870;
    fillCvsRef.current.height = 500;
    fillCtxRef.current = fillCvsRef.current.getContext('2d');
    const img2 = new Image();
    img2.src = images.find((i) => i.type === 'map').src;
    img2.onload = () => {
      resourceLoaded();
      setMapImg(img2);
      fillCtxRef.current.drawImage(img2, 0, 0, 870, 500);
    };

    // a separate canvas for pencil draw
    pencilDrawCvs.current = document.createElement('canvas');
    pencilDrawCvs.current.width = 870;
    pencilDrawCvs.current.height = 500;
    pencilDrawCtx.current = pencilDrawCvs.current.getContext('2d');
    // pencilDrawCtx.current.lineWidth = brushSize;
    pencilDrawCtx.current.lineWidth = 4;
    pencilDrawCtx.current.lineCap = 'round';
    pencilDrawCtx.current.lineJoin = 'round';
  }, []);

  return (
    <canvas
      className="cursor-crosshair"
      ref={onScreenCvsRef}
      width="870"
      height="500"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    />
  );
});

export default Canvas;
