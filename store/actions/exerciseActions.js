import * as types from '../types';

// EXERCISE
export function colorSelected(color) {
  return { type: types.COLOR_SELECTED, color };
}

export function toolSelected(tool) {
  return { type: types.TOOL_SELECTED, tool };
}
