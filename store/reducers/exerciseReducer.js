import { produce } from 'immer';
import * as types from '../types';
import initialState from '../initialState';

export default (state = initialState.exercise, action) => {
  // draft param reassign is the main thing of immer, so
  /* eslint-disable no-param-reassign */

  return produce(state, (draft) => {
    switch (action.type) {
      // EXERCISE
      case types.COLOR_SELECTED:
        draft.activeColor = action.color;
        break;
      case types.TOOL_SELECTED:
        draft.activeTool = action.tool;
        break;
      case types.RESET_EXERCISE:
        draft.key++;
        break;
      default:
        return state;
    }
  });
};
