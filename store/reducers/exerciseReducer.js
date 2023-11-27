import { produce } from 'immer';
import * as types from '../types';
import initialState from '../initialState';

export default (state = initialState.newAdBuilder, action) => {
  // draft param reassign is the main thing of immer, so
  /* eslint-disable no-param-reassign */

  return produce(state, (draft) => {
    switch (action.type) {
      // EXERCISE
      case types.COLOR_SELECTED:
        draft.exercise.activeColor = action.color;
        break;
      case types.TOOL_SELECTED:
        draft.exercise.activeTool = action.tool;
        break;
      default:
        return state;
    }
  });
};
