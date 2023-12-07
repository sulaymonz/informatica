'use client';

import { useSelector, useDispatch } from 'react-redux';
import * as exerciseActions from '../../store/actions/exerciseActions';
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import PanToolIcon from '@mui/icons-material/PanTool';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

const icons = {
  pencil: CreateIcon,
  eraser: ClearIcon,
  fill: FormatColorFillIcon,
  grab: PanToolIcon,
  undo: UndoIcon,
  redo: RedoIcon,
};

const ToolsPanel = ({ tools, className = '', onClickUndo, onClickRedo }) => {
  const { activeTool } = useSelector((state) => state.exercise);
  const dispatch = useDispatch();
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
                if (tool === 'undo') {
                  onClickUndo();
                } else if (tool === 'redo') {
                  onClickRedo();
                } else {
                  dispatch(exerciseActions.toolSelected(tool));
                }
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
