'use client';

import { useDispatch } from 'react-redux';
import * as exerciseActions from '../../store/actions/exerciseActions';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SaveIcon from '@mui/icons-material/Save';

const DocumentPanel = ({ className = '' }) => {
  const dispatch = useDispatch();
  return (
    <div className={`w-28 rounded-lg shadow-xl overflow-hidden ${className}`}>
      <div className="h-8 leading-8 bg-primary text-white text-center">
        Управление:
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        <div
          title="Создать новый"
          className="flex justify-center items-center h-[30px] w-[30px] rounded-lg shadow hover:shadow-lg cursor-pointer"
          role="button"
          tabIndex="0"
          onClick={() => {
            dispatch(exerciseActions.resetExercise());
          }}
        >
          <InsertDriveFileIcon />
        </div>
        <div
          title="Сохранить"
          className="flex justify-center items-center h-[30px] w-[30px] rounded-lg shadow hover:shadow-lg cursor-pointer"
          role="button"
          tabIndex="0"
          onClick={() => {
            console.log('save');
          }}
        >
          <SaveIcon />
        </div>
      </div>
    </div>
  );
};

export default DocumentPanel;
