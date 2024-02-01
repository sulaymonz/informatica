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
  const arrowsCvsRef = useRef();
  const arrowsCtxRef = useRef();
  const [loading, setLoading] = useState(true);
  const [itemImages, setItemImages] = useState([]);
  const [grid, setGrid] = useState(
    initialGrid.map((row) =>
      row.map(() => ({
        empty: true,
        image: '',
      })),
    ),
  );
  const [grabbing, setGrabbing] = useState(false);
  const [grabbingItem, setGrabbingItem] = useState(null);
  const { activeTool } = useSelector((state) => state.exercise);

  const onMouseMove = (e) => {
    const rect = onScreenCvsRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.x;
    const mouseY = e.clientY - rect.y;
    if (activeTool === 'grab' && grabbing) {
      drawGrabbing(mouseX, mouseY);
      redrawCanvas();
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

    if (activeTool === 'grab') {
      setGrabbing(false);
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
                    empty: false,
                    image: grabbingItem,
                  }
                : spot,
            ),
          ),
        );
      }
    }
  };

  const drawGrid = () => {
    gridCtxRef.current.clearRect(0, 0, 870, 500);
    grid.forEach((row, i) => {
      row.forEach((spot, j) => {
        const spotX = j * 2 * (spotRadius + spotPadding) + gridX;
        const spotY = i * 2 * (spotRadius + spotPadding) + gridY;
        gridCtxRef.current.globalAlpha = spot.empty ? 0.03 : 0.2;
        gridCtxRef.current.beginPath();
        gridCtxRef.current.arc(spotX, spotY, spotRadius, 0, 2 * Math.PI);
        gridCtxRef.current.fillStyle = 'red';
        gridCtxRef.current.fill();
        if (!spot.empty) {
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
  const drawArrow = (x1, y1, x2, y2, t = 0.9) => {
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
    arrowsCtxRef.current.beginPath();
    arrowsCtxRef.current.moveTo(x1, y1);
    arrowsCtxRef.current.lineTo(middle.x, middle.y);
    arrowsCtxRef.current.moveTo(
      middle.x + 0.5 * tip.dy,
      middle.y - 0.5 * tip.dx,
    );
    arrowsCtxRef.current.lineTo(
      middle.x - 0.5 * tip.dy,
      middle.y + 0.5 * tip.dx,
    );
    arrowsCtxRef.current.lineTo(x2, y2);
    arrowsCtxRef.current.closePath();
    arrowsCtxRef.current.stroke();
    arrowsCtxRef.current.fill();
  };

  const redrawCanvas = () => {
    onScreenCtxRef.current.clearRect(0, 0, 870, 500);
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

    // a separate canvas for arrows
    arrowsCvsRef.current = document.createElement('canvas');
    arrowsCvsRef.current.width = 870;
    arrowsCvsRef.current.height = 500;
    arrowsCtxRef.current = arrowsCvsRef.current.getContext('2d');

    const angle = Math.atan2(308 - 194, 308 - 194);
    console.log('angle', (angle * 180) / Math.PI);
    const a = spotRadius * Math.cos(angle);
    const b = spotRadius * Math.sin(angle);
    console.log('a', a);
    console.log('b', b);
    drawArrow(194, 308, 308 - a, 194 + b, 0.95);

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
