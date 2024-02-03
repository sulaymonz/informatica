'use client';

import { useState, useEffect, useRef, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import LoadingSpinner from './LoadingSpinner';

const fullConfig = resolveConfig(tailwindConfig);
let curLoadedResNum = 0;

const initialGrid = [
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
];
const itemSize = 50;
const itemPadding = 5;
const itemBarX = 800;
const itemBarY = 25;
const gridX = 80;
const gridY = 80;
const spotRadius = 40;
const spotPadding = 17;
const w = initialGrid[0].length * 2 * (spotRadius + spotPadding);
const h = initialGrid.length * 2 * (spotRadius + spotPadding);
const dx = gridX - spotRadius - spotPadding;
const dy = gridY - spotRadius - spotPadding;

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
  const currArrowCvsRef = useRef();
  const currArrowCtxRef = useRef();
  const arrowsCvsRef = useRef();
  const arrowsCtxRef = useRef();
  const { activeTool } = useSelector((state) => state.exercise);
  const [loading, setLoading] = useState(true);
  const [itemImages, setItemImages] = useState([]);
  const [grid, setGrid] = useState(
    initialGrid.map((row, i) =>
      row.map((spot, j) => ({
        image: '',
        x: j * 2 * (spotRadius + spotPadding) + gridX,
        y: i * 2 * (spotRadius + spotPadding) + gridY,
        destSpots: [],
      })),
    ),
  );
  const [grabbing, setGrabbing] = useState(false);
  const [grabbingItem, setGrabbingItem] = useState(null);
  const [drawingArrow, setDrawingArrow] = useState(false);
  const [currArrowStart, setCurrArrowStart] = useState(null);

  const onClick = (e) => {
    const rect = onScreenCvsRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.x;
    const mouseY = e.clientY - rect.y;
    const inGridMouseX = mouseX - dx;
    const inGridMouseY = mouseY - dy;
    if (activeTool === 'tree') {
      if (
        // on grid area
        mouseX >= dx &&
        mouseX <= dx + w &&
        mouseY >= dy &&
        mouseY <= dy + h
      ) {
        const columnIndex = Math.floor(
          inGridMouseX / (2 * (spotRadius + spotPadding)),
        );
        const rowIndex = Math.floor(
          inGridMouseY / (2 * (spotRadius + spotPadding)),
        );
        const currSpot = grid[rowIndex][columnIndex];
        if (!drawingArrow) {
          if (currSpot.image) {
            setDrawingArrow(true);
            setCurrArrowStart({
              x: currSpot.x,
              y: currSpot.y,
            });
          }
        } else {
          // set destination spot for arrow
          setGrid(
            grid.map((row) =>
              row.map((spot) =>
                spot.x === currArrowStart.x && spot.y === currArrowStart.y
                  ? {
                      ...spot,
                      destSpots: [
                        ...spot.destSpots,
                        { x: currSpot.x, y: currSpot.y },
                      ],
                    }
                  : spot,
              ),
            ),
          );
        }
      }
    }
  };

  const onMouseMove = (e) => {
    const rect = onScreenCvsRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.x;
    const mouseY = e.clientY - rect.y;
    if (activeTool === 'grab' && grabbing) {
      drawGrabbing(mouseX, mouseY);
      redrawCanvas();
    } else if (activeTool === 'tree') {
      if (drawingArrow) {
        drawArrow(
          currArrowCtxRef.current,
          currArrowStart.x,
          currArrowStart.y,
          mouseX,
          mouseY,
          0.95,
        );
        redrawCanvas();
      }
    }
  };

  const onMouseDown = (e) => {
    const rect = onScreenCvsRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.x;
    const mouseY = e.clientY - rect.y;
    if (activeTool === 'grab') {
      if (
        // on itembar area
        mouseX >= itemBarX - itemPadding &&
        mouseX <= itemBarX + itemSize + itemPadding &&
        mouseY >= itemBarY - itemPadding &&
        mouseY <=
          itemBarY -
            itemPadding +
            itemImages.length * (itemSize + itemPadding * 2)
      ) {
        const itemIndex = Math.floor(
          (mouseY - itemBarY) / (itemSize + itemPadding * 2),
        );
        setGrabbing(true);
        setGrabbingItem(itemImages[itemIndex]);
      }
    }
  };

  useEffect(() => {
    if (!grabbing && !loading) {
      clearGrabbing();
      redrawCanvas();
    }
  }, [grabbing]);

  const onMouseUp = (e) => {
    const rect = onScreenCvsRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.x;
    const mouseY = e.clientY - rect.y;
    const inGridMouseX = mouseX - dx;
    const inGridMouseY = mouseY - dy;

    if (activeTool === 'grab' && grabbing) {
      if (
        // on grid area
        mouseX >= dx &&
        mouseX <= dx + w &&
        mouseY >= dy &&
        mouseY <= dy + h
      ) {
        const columnIndex = Math.floor(
          inGridMouseX / (2 * (spotRadius + spotPadding)),
        );
        const rowIndex = Math.floor(
          inGridMouseY / (2 * (spotRadius + spotPadding)),
        );
        setGrid(
          grid.map((row, i) =>
            row.map((spot, j) =>
              i === rowIndex && j === columnIndex
                ? {
                    ...spot,
                    image: grabbingItem,
                  }
                : spot,
            ),
          ),
        );
      }
      setGrabbing(false);
      setGrabbingItem(null);
    }
  };

  const drawGrid = () => {
    gridCtxRef.current.clearRect(0, 0, 870, 500);
    grid.forEach((row, i) => {
      row.forEach((spot, j) => {
        const spotX = j * 2 * (spotRadius + spotPadding) + gridX;
        const spotY = i * 2 * (spotRadius + spotPadding) + gridY;
        gridCtxRef.current.globalAlpha = spot.image ? 0.2 : 0.03;
        gridCtxRef.current.beginPath();
        gridCtxRef.current.arc(spotX, spotY, spotRadius, 0, 2 * Math.PI);
        gridCtxRef.current.fillStyle = 'red';
        gridCtxRef.current.fill();
        if (spot.image) {
          gridCtxRef.current.globalAlpha = 1;
          gridCtxRef.current.drawImage(spot.image, spotX - 25, spotY - 25);
        }
      });
    });
  };

  const drawItemsBar = () => {
    itemsCtxRef.current.globalAlpha = 0.2;
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

  // arrow = shaft + tip
  //
  // t argument indicates in % how big should be shaft part in drawn arrow
  // t should be in range from 0 to 1
  // t can be interpreted as: t = shaftLength / arrowLength
  //
  const drawArrow = (ctx, x1, y1, x2, y2, t = 0.9, clearPrev = true) => {
    const arrow = {
      dx: x2 - x1,
      dy: y2 - y1,
    };
    const middle = {
      x: arrow.dx * t + x1,
      y: arrow.dy * t + y1,
    };
    const tip = {
      dx: x2 - middle.x,
      dy: y2 - middle.y,
    };
    if (clearPrev) {
      ctx.clearRect(0, 0, 870, 500);
    }
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(middle.x, middle.y);
    ctx.moveTo(middle.x + 0.5 * tip.dy, middle.y - 0.5 * tip.dx);
    ctx.lineTo(middle.x - 0.5 * tip.dy, middle.y + 0.5 * tip.dx);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };

  const spotToSpotArrow = (x1, y1, x2, y2) => {
    // The arguments are the x and y coordinates to
    // the centers of starting and destination spots.
    // Arrow will be drawn from the center of the starting
    // spot to the edge of the destination spot.
    const angle = Math.atan2(y1 - y2, x2 - x1);
    const a = spotRadius * Math.cos(angle);
    const b = spotRadius * Math.sin(angle);
    drawArrow(arrowsCtxRef.current, x1, y1, x2 - a, y2 + b, 0.95, false);
  };

  const drawArrowsSet = () => {
    arrowsCtxRef.current.clearRect(0, 0, 870, 500);
    grid.forEach((row) => {
      row.forEach((spot) => {
        spot.destSpots.forEach((dest) => {
          spotToSpotArrow(spot.x, spot.y, dest.x, dest.y);
        });
      });
    });
  };

  const redrawCanvas = () => {
    onScreenCtxRef.current.clearRect(0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(currArrowCvsRef.current, 0, 0, 870, 500);
    onScreenCtxRef.current.drawImage(arrowsCvsRef.current, 0, 0, 870, 500);
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
      redrawCanvas();
    }
  }, [itemImages]);

  useEffect(() => {
    if (gridCtxRef.current) {
      drawGrid();
      redrawCanvas();
    }
    if (drawingArrow && arrowsCtxRef.current) {
      currArrowCtxRef.current.clearRect(0, 0, 870, 500);
      drawArrowsSet();
      redrawCanvas();
      setDrawingArrow(false);
      setCurrArrowStart(null);
    }
  }, grid);

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

    // a separate canvas for the arrow currently being drawn
    currArrowCvsRef.current = document.createElement('canvas');
    currArrowCvsRef.current.width = 870;
    currArrowCvsRef.current.height = 500;
    currArrowCtxRef.current = currArrowCvsRef.current.getContext('2d');

    // a separate canvas for the set of all arrows
    arrowsCvsRef.current = document.createElement('canvas');
    arrowsCvsRef.current.width = 870;
    arrowsCvsRef.current.height = 500;
    arrowsCtxRef.current = arrowsCvsRef.current.getContext('2d');

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
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      />
    </>
  );
};

export default Canvas;
