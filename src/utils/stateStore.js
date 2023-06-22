import { create } from 'zustand';
import { nanoid } from 'nanoid';

import { searchCourse, capitalizeWords, indexOfObject } from './helpers';

const statesStore = {
  semesterDoc: {},
  setSemesterDoc: (doc) => set((state) => ({ semesterDoc: doc })),
  lcpCourses: [],
  setLcpCourses: (coursesRes, department) =>
    set((state) => ({
      lcpCourses: coursesRes.map((res) => {
        console.log('tata', res);
        const courseCodeUnitObj = searchCourse(
          department,
          res.data.deptCodeUnitEntries
        );
        console.log('tata2', courseCodeUnitObj);

        return {
          ...res.data,
          code: courseCodeUnitObj.code,
          units: courseCodeUnitObj.units,
          score: '',
        };
      }),
    })),
  isLcpGpaCalc: true,
  setIsLcpGpaCalc: (value) => set((state) => ({ isLcpGpaCalc: value })),
  nbteCourses: [], // randomId[]
  addNbteCourse: () =>
    set((state) => {
      let newCourse = {
        id: nanoid(),
        title: 'course',
        code: 'course' + (state.nbteCourses.length + 1),
        units: '',
        score: '',
      };

      return { nbteCourses: [...state.nbteCourses, newCourse] };
    }),
  removeNbteCourse: (id) =>
    set((state) => {
      let courseIndex = indexOfObject(state.nbteCourses, 'id', id);
      if (courseIndex == -1) return;

      let nbteCourses = [...state.nbteCourses]; // cloning the array to prevent mutating state.nbteCourses directly during splicing.

      nbteCourses.splice(courseIndex, 1);

      return { nbteCourses };
    }),
};

export const useStore = create((set) => statesStore);

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
    nbteCourses: ['addNbteCourse', 'removeNbteCourse'],
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
