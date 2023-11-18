'use client';

import CreateIcon from '@mui/icons-material/Create';
import RefreshIcon from '@mui/icons-material/Refresh';
import PanToolIcon from '@mui/icons-material/PanTool';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';

const icons = {
  pencil: CreateIcon,
  'color-bucket': FormatColorFillIcon,
  grab: PanToolIcon,
  refresh: RefreshIcon,
};

const ToolsPanel = ({ tools, activeTool, onChange, className = '' }) => {
  return (
    <div className={`w-28 rounded-lg shadow-xl overflow-hidden ${className}`}>
      <div className="h-8 leading-8 bg-primary text-white text-center">
        Инструменты:
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        {tools.map((tool) => {
          const Icon = icons[tool];
          return (
            <div
              key={tool}
              className={`flex justify-center items-center h-[30px] w-[30px] rounded-lg shadow hover:shadow-lg cursor-pointer ${
                tool === activeTool ? 'shadow-lg shadow-secondary' : ''
              }`}
              role="button"
              tabIndex="0"
              onClick={() => {
                onChange(tool);
              }}
            >
              <Icon />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToolsPanel;
