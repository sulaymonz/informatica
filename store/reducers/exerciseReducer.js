import { produce } from 'immer';
import * as types from '../types';
import initialState from '../initialState';

const paletteList = [
  ['606c38', '283618', 'fefae0', 'dda15e', 'bc6c25'],
  ['8ecae6', '219ebc', '023047', 'ffb703', 'fb8500'],
  ['cdb4db', 'ffc8dd', 'ffafcc', 'bde0fe', 'a2d2ff'],
  ['264653', '2a9d8f', 'e9c46a', 'f4a261', 'e76f51'],
  ['edede9', 'd6ccc2', 'f5ebe0', 'e3d5ca', 'd5bdaf'],
  ['780000', 'c1121f', 'fdf0d5', '003049', '669bbc'],
  ['dad7cd', 'a3b18a', '588157', '3a5a40', '344e41'],
  ['ffbe0b', 'fb5607', 'ff006e', '8338ec', '3a86ff'],
  ['ccd5ae', 'e9edc9', 'fefae0', 'faedcd', 'd4a373'],
  ['f08080', 'f4978e', 'f8ad9d', 'fbc4ab', 'ffdab9'],
  ['000000', '14213d', 'fca311', 'e5e5e5', 'ffffff'],
  ['f4f1de', 'e07a5f', '3d405b', '81b29a', 'f2cc8f'],
  ['e63946', 'f1faee', 'a8dadc', '457b9d', '1d3557'],
  ['f6bd60', 'f7ede2', 'f5cac3', '84a59d', 'f28482'],
  ['03045e', '0077b6', '00b4d8', '90e0ef', 'caf0f8'],
  ['003049', 'd62828', 'f77f00', 'fcbf49', 'eae2b7'],
  ['ffcdb2', 'ffb4a2', 'e5989b', 'b5838d', '6d6875'],
  ['000814', '001d3d', '003566', 'ffc300', 'ffd60a'],
  ['9b5de5', 'f15bb5', 'fee440', '00bbf9', '00f5d4'],
  ['006d77', '83c5be', 'edf6f9', 'ffddd2', 'e29578'],
  ['0a0908', '22333b', 'eae0d5', 'c6ac8f', '5e503f'],
];

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
      case types.UPDATE_PALETTE:
        if (state.paletteIndex < paletteList.length - 1) {
          draft.paletteIndex++;
        } else {
          draft.paletteIndex = 0;
        }
        draft.palette = paletteList[draft.paletteIndex];
        break;
      default:
        return state;
    }
  });
};
