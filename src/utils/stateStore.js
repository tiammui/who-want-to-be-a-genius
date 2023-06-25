import { create } from 'zustand';
import { nanoid } from 'nanoid';

import { searchCourse, capitalizeWords, indexOfObject } from './helpers';

export const useStore = create((set) => ({
  activeHeader: 0,
  setActiveHeader: (index) => set((state) => ({ activeHeader: index })),
  registerForm: {},
  setRegisterForm: (form) => set((state) => ({ registerForm: form })),
  registerFormChangeHnd: (e) => {
    const elem = e.target;
    return set((state) => ({
      registerForm: { ...state.registerForm, [elem.name]: elem.value },
    }));
  },
}));

/**
 * The function return an object containing the state and all action corresponding to it.
 * eg. {state, setState}
 *
 * eg. {state, action1, action2, ...} for state with custom actions
 *
 * @param stateName {string} the state name
 * @return {typeof statesStore}
 */
export function useStoreWrapper(stateName) {
  if (typeof useStore((state) => state[stateName]) == 'undefined') {
    throw new Error(`The state name, ${stateName} doesn't exist`);
  }

  let customActionStates = {
    stateName: ['actionName1', 'actionName2'],
    registerForm: ['setRegisterForm', 'registerFormChangeHnd'],
  };

  let result = {
    [stateName]: useStore((state) => state[stateName]),
  };

  if (!!customActionStates[stateName]) {
    let len = customActionStates[stateName].length;
    for (let i = 0; i < len; i++) {
      let actionName = customActionStates[stateName][i];
      result[actionName] = useStore((state) => state[actionName]);
    }
  } else {
    let setName = 'set' + capitalizeWords(stateName);
    result[setName] = useStore((state) => state[setName]);
  }

  return result;
}
