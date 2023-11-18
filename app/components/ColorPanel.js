'use client';

const ColorPanel = ({ colors, activeColor, onChange, className = '' }) => {
  return (
    <div className={`w-28 rounded-lg shadow-xl overflow-hidden ${className}`}>
      <div className="h-8 leading-8 bg-primary text-white text-center">
        Цвета:
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        {colors.map((color) => (
          <div
            key={color.name}
            title={color.name}
            className={`h-[30px] w-[30px] rounded-lg shadow hover:shadow-lg cursor-pointer ${
              color.name === activeColor.name
                ? 'shadow-lg shadow-secondary'
                : ''
            }`}
            role="button"
            tabIndex="0"
            style={{ backgroundColor: color.cssRgbaValue }}
            onClick={() => {
              onChange(color);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPanel;
