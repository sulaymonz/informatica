'use client';

const CurrentColorPanel = ({ activeColor, className = '' }) => {
  return (
    <div className={`w-28 rounded-lg shadow-xl overflow-hidden ${className}`}>
      <div className="h-8 leading-8 bg-primary text-white text-center">
        Ваш цвет:
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        <div
          title={activeColor.name}
          className="col-span-2 h-[30px] rounded-lg shadow"
          style={{ backgroundColor: activeColor.cssRgbaValue }}
        />
      </div>
    </div>
  );
};

export default CurrentColorPanel;
