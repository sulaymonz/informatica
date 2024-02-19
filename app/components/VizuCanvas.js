'use client';

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import LoadingSpinner from './LoadingSpinner';

const fullConfig = resolveConfig(tailwindConfig);
let curLoadedResNum = 0;

const Canvas = ({ images, onClick }) => {
  const totalResToLoad = images.length;
  const onScreenCvsRef = useRef();
  const onScreenCtxRef = useRef();
  const cvsArr = useRef([]);
  const [loading, setLoading] = useState(true);
  const [itemImages, setItemImages] = useState([]);
  const { palette } = useSelector((state) => state.exercise);

  const redrawCanvas = () => {
    let cvsIndex = 0;
    onScreenCtxRef.current.clearRect(0, 0, 500, 600);
    itemImages.forEach((image, i) => {
      if (images[i].layerType === 'dynamic_color') {
        cvsArr.current[cvsIndex].context.globalCompositeOperation = 'normal';
        cvsArr.current[cvsIndex].context.clearRect(0, 0, 1500, 1800);
        cvsArr.current[cvsIndex].context.drawImage(image, 0, 0);
        cvsArr.current[cvsIndex].context.globalCompositeOperation = 'source-in';
        cvsArr.current[cvsIndex].context.fillStyle = `#${
          palette[cvsIndex + 1]
        }`;
        cvsArr.current[cvsIndex].context.fillRect(0, 0, 1500, 1800);
        onScreenCtxRef.current.drawImage(
          cvsArr.current[cvsIndex].canvas,
          0,
          0,
          500,
          600,
        );
        cvsIndex++;
      } else {
        onScreenCtxRef.current.drawImage(image, 0, 0, 500, 600);
      }
    });
  };

  const resourceLoaded = () => {
    curLoadedResNum++;
  };

  const handleImageLoad = (e) => {
    const img = e.target;
    setItemImages((prevState) => {
      const newState = [...prevState];
      newState[img.index] = img;
      return newState;
    });
    resourceLoaded();
  };

  useEffect(() => {
    if (curLoadedResNum === totalResToLoad) {
      setLoading(false);
      redrawCanvas();
    }
  }, [itemImages]);

  useEffect(() => {
    if (!loading) {
      redrawCanvas();
    }
  }, [palette]);

  useEffect(() => {
    onScreenCtxRef.current = onScreenCvsRef.current.getContext('2d');

    setItemImages([]);
    const tempImages = [];
    images.forEach((image, i) => {
      if (image.layerType === 'dynamic_color') {
        const cvs = document.createElement('canvas');
        cvs.width = 1500;
        cvs.height = 1800;
        cvsArr.current.push({
          canvas: cvs,
          context: cvs.getContext('2d'),
        });
      }
      let img = new Image();
      img.src = image.src;
      tempImages.push(img);
      img.index = i;
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
        <div className="absolute w-[500px] h-[600px] flex justify-center items-center">
          <LoadingSpinner
            mainColor={fullConfig.theme.colors.black}
            secondaryColor="none"
          />
        </div>
      )}
      <canvas
        className="bg-white"
        ref={onScreenCvsRef}
        width="500"
        height="600"
        onClick={onClick}
      />
    </>
  );
};

export default Canvas;
